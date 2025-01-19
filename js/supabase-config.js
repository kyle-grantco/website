const supabaseUrl = 'https://ndvgbjnvevheuyearoja.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kdmdiam52ZXZoZXV5ZWFyb2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyOTQyNTIsImV4cCI6MjA1Mjg3MDI1Mn0.0OExHc8eoqtHRuKIiZpaO6n8xx1VTgWHiOq4PwMJd7I'

// Create the client using the global supabase object
const supabase = createClient(supabaseUrl, supabaseKey)

// Make supabase available globally
window.supabase = supabase;
