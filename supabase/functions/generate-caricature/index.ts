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

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating caricature with style:', style);

    // Create prompt based on style
    const stylePrompts: Record<string, string> = {
      'romantic': 'Transform this photo into a beautiful romantic wedding caricature with soft pastel colors, hearts, and floral decorations. Keep the facial features recognizable but stylized.',
      'cartoon': 'Transform this photo into a fun Disney-style cartoon caricature for a wedding invitation. Make it cute and joyful with vibrant colors.',
      'elegant': 'Transform this photo into an elegant, sophisticated caricature portrait suitable for a luxury wedding invitation. Use soft, muted tones and graceful artistic style.',
      'whimsical': 'Transform this photo into a whimsical, fairy-tale style caricature with magical elements like sparkles and soft glow. Perfect for a romantic wedding theme.',
    };

    const promptStyle = stylePrompts[style] || stylePrompts['romantic'];
    const fullPrompt = `${promptStyle} Add a subtle watermark text "Wedding of Oky & Mita" at the bottom corner. The result should be high quality and suitable for a wedding invitation.`;

    // Use GPT-4o Vision to analyze the image and generate a description
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Describe this person\'s appearance in detail for creating an artistic caricature. Focus on key facial features, hair style, and any accessories. Be specific but concise.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 300
      }),
    });

    const visionData = await visionResponse.json();
    
    if (!visionResponse.ok) {
      console.error('Vision API error:', visionData);
      throw new Error(visionData.error?.message || 'Failed to analyze image');
    }

    const personDescription = visionData.choices?.[0]?.message?.content || '';
    console.log('Person description:', personDescription);

    // Generate caricature using DALL-E
    const dallePrompt = `Create a ${style} caricature illustration of a person with these features: ${personDescription}. ${fullPrompt}`;
    
    console.log('DALL-E prompt:', dallePrompt);

    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: dallePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'b64_json'
      }),
    });

    const dalleData = await dalleResponse.json();

    if (!dalleResponse.ok) {
      console.error('DALL-E API error:', dalleData);
      throw new Error(dalleData.error?.message || 'Failed to generate caricature');
    }

    const generatedImage = dalleData.data?.[0]?.b64_json;
    
    if (!generatedImage) {
      throw new Error('No image generated');
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