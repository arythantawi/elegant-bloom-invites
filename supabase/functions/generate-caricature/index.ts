import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, style } = await req.json();
    
    if (!imageBase64) {
      throw new Error('No image provided');
    }

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('Lovable API key not configured');
    }

    console.log('Generating caricature with style:', style);

    // Step 1: Analyze the uploaded image to get a description of the people
    const analyzeResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this photo and describe the people in it in detail. Include their approximate age, gender, facial features, hairstyle, hair color, skin tone, and any notable characteristics. Be specific and detailed so an artist could draw them. Respond with just the description, no other text.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ]
      }),
    });

    if (!analyzeResponse.ok) {
      const errorData = await analyzeResponse.text();
      console.error('Analysis error:', analyzeResponse.status, errorData);
      throw new Error('Failed to analyze the image');
    }

    const analyzeData = await analyzeResponse.json();
    const description = analyzeData.choices?.[0]?.message?.content;
    
    if (!description) {
      throw new Error('Could not analyze the image');
    }

    console.log('Image analysis complete:', description.substring(0, 100) + '...');

    // Step 2: Generate the caricature based on the description
    const stylePrompts: Record<string, string> = {
      'romantic': 'soft pastel colors, hearts, floral decorations, romantic wedding theme, dreamy atmosphere',
      'cartoon': 'Disney-style cartoon, cute and joyful vibes, vibrant colors, fun and playful',
      'elegant': 'sophisticated portrait style, soft muted tones, graceful artistic style, luxury wedding theme',
      'whimsical': 'fairy-tale style, magical elements, sparkles and soft glow, enchanted romantic theme',
    };

    const styleDescription = stylePrompts[style] || stylePrompts['romantic'];

    const generateResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: `Create a beautiful wedding caricature illustration of a couple with the following characteristics: ${description}

Style: ${styleDescription}

Requirements:
- Draw them as a cute caricature couple in wedding attire
- The groom should wear a formal suit or traditional wedding attire
- The bride should wear a beautiful wedding dress
- Add decorative elements matching the style
- Add elegant text "Wedding of Oky & Mita" at the bottom
- Make it high quality and artistic, suitable for a wedding invitation
- Keep their facial features recognizable but stylized in a cute caricature way`
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!generateResponse.ok) {
      const errorData = await generateResponse.text();
      console.error('Generation error:', generateResponse.status, errorData);
      
      if (generateResponse.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (generateResponse.status === 402) {
        throw new Error('AI usage limit reached. Please add credits to continue.');
      }
      throw new Error('Failed to generate caricature');
    }

    const generateData = await generateResponse.json();
    console.log('Generation response received');

    // Extract the generated image from the response
    const generatedImageUrl = generateData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImageUrl) {
      console.error('No image in response:', JSON.stringify(generateData));
      throw new Error('No image was generated. Please try again with a clearer photo.');
    }

    // Extract base64 from data URL
    let generatedImage = generatedImageUrl;
    if (generatedImageUrl.startsWith('data:')) {
      generatedImage = generatedImageUrl.split(',')[1];
    }

    console.log('Caricature generated successfully');

    return new Response(JSON.stringify({ 
      success: true,
      image: generatedImage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in generate-caricature function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
