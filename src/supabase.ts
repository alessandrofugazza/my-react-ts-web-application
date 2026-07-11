import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://immdxaerayxmdydoxcjq.supabase.co'
const supabaseKey = 'sb_publishable_NIJJEX9j5UCsH1omiARrFw_f5NZ3zQ5'

export const supabase = createClient(supabaseUrl, supabaseKey)
