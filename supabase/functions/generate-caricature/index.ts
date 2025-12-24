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

    // Style prompts for different caricature styles
    const stylePrompts: Record<string, string> = {
      'cartoon': 'Transform this photo into a fun Disney/Pixar style cartoon illustration. Make the features cute and stylized while keeping the person recognizable. Use vibrant, cheerful colors. Add playful decorative elements. Include text "Wedding of Oky & Mita" at the bottom in a fun cartoon font.',
      'elegant': 'Transform this photo into an elegant, sophisticated portrait illustration suitable for a luxury wedding invitation. Use soft, muted tones like champagne, ivory, and subtle gold accents. Apply a refined artistic style while keeping facial features recognizable. Add elegant text "Wedding of Oky & Mita" at the bottom in a classic serif font.',
      'whimsical': 'Transform this photo into a magical fairy-tale style illustration. Add enchanting elements like soft sparkles, gentle glow effects, and dreamy atmosphere. Use soft pastel colors with magical undertones. Keep the person recognizable but give them an ethereal, storybook quality. Add text "Wedding of Oky & Mita" at the bottom with a whimsical font.',
      'retro': 'Transform this photo into a vintage 1950s-1960s retro style illustration. Create a nostalgic, classic American poster aesthetic with warm peachy and teal colors. Add a colorful sunburst/starburst background pattern. Include decorative vintage banner ribbons, daisies, music notes, hearts, and stars scattered around. Draw the couple in a cheerful, dancing pose with retro clothing style. Use a grainy, textured vintage print look. Add decorative banner with text "Wedding of Oky & Mita" at the top and "Forever Together" at the bottom in vintage typography.',
    };

    const prompt = stylePrompts[style] || stylePrompts['romantic'];

    // Use gemini-2.5-flash-image-preview to transform the image directly
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
                text: prompt
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

    // Check if model refused to edit the image
    const textContent = data.choices?.[0]?.message?.content;
    if (textContent && textContent.toLowerCase().includes('cannot') && !data.choices?.[0]?.message?.images) {
      console.log('Model declined to edit image, trying alternative approach');
      
      // Fallback: Use the next-gen image model
      const fallbackResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-3-pro-image-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Edit and stylize this photo: ${prompt}`
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

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        const fallbackImage = fallbackData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        
        if (fallbackImage) {
          let generatedImage = fallbackImage;
          if (fallbackImage.startsWith('data:')) {
            generatedImage = fallbackImage.split(',')[1];
          }
          
          console.log('Caricature generated with fallback model');
          return new Response(JSON.stringify({ 
            success: true,
            image: generatedImage 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
      
      throw new Error('Unable to transform this image. Please try with a different photo (clear face photo works best).');
    }

    // Extract the generated image from the response
    const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImageUrl) {
      console.error('No image in response:', JSON.stringify(data));
      throw new Error('Unable to generate caricature. Please try with a clearer photo.');
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
