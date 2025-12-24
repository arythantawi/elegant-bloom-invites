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

    // Create prompt based on style
    const stylePrompts: Record<string, string> = {
      'romantic': 'a beautiful romantic wedding caricature with soft pastel colors, hearts, and floral decorations',
      'cartoon': 'a fun Disney-style cartoon caricature for a wedding invitation with cute and joyful vibes and vibrant colors',
      'elegant': 'an elegant, sophisticated caricature portrait suitable for a luxury wedding invitation with soft, muted tones and graceful artistic style',
      'whimsical': 'a whimsical, fairy-tale style caricature with magical elements like sparkles and soft glow, perfect for a romantic wedding theme',
    };

    const styleDescription = stylePrompts[style] || stylePrompts['romantic'];

    // Use Lovable AI with gemini-2.5-flash-image-preview to generate the caricature directly from the image
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
            content: [
              {
                type: 'text',
                text: `Transform this photo into ${styleDescription}. Keep the facial features recognizable but stylized as a cute caricature illustration. Add a subtle text "Wedding of Oky & Mita" at the bottom. The result should be high quality, artistic, and suitable for a wedding invitation. Create a beautiful illustrated caricature portrait.`
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
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lovable AI error:', response.status, errorData);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (response.status === 402) {
        throw new Error('AI usage limit reached. Please add credits to continue.');
      }
      throw new Error(`Failed to generate caricature: ${errorData}`);
    }

    const data = await response.json();
    console.log('Lovable AI response received');

    // Extract the generated image from the response
    const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImageUrl) {
      console.error('No image in response:', JSON.stringify(data));
      throw new Error('No image was generated. Please try again.');
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
