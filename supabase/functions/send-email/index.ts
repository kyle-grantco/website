import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from 'https://esm.sh/resend@1.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400'
}

console.log("Function starting...")

serve(async (req) => {
  console.log("Request received:", req.method)

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request")
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Skip auth check for now
    const { email } = await req.json()
    console.log("Processing email for:", email)

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    const resend = new Resend(RESEND_API_KEY)

    console.log("Sending email via Resend...")
    const data = await resend.emails.send({
      from: 'kyle@thegrant.co',
      to: email,
      subject: 'Mastercard Foundation Grant Insights',
      text: `Sounds like you're a great fit for the Mastercard Foundation grant!

In our experience there are some secrets to putting together a winning proposal. Here are the secrets: https://drive.google.com/file/d/1f5oJd0hdMqVU0zz7S3mGYzaMbqD4YNOc/view?usp=drive_open

If you want help applying please let us know and we'd be happy.

Yours, Kyle
Founder Grant&Co`
    })

    console.log("Email sent successfully:", data)

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error("Error occurred:", error)
    
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack
      }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})