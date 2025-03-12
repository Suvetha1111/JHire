const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

if (!supabase) {
    console.error('Error connecting to Supabase in cofig directry')
}
else {
    console.log('Connected to Supabase in cofig directry')
}
module.exports = supabase