export const REACT_APP_SUPABASE_URL =
  // @ts-ignore
  process.env.REACT_APP_SUPABASE_URL || Cypress.env('SUPABASE_URL');
export const REACT_APP_SUPABASE_KEY =
  // @ts-ignore
  process.env.REACT_APP_SUPABASE_KEY || Cypress.env('SUPABASE_KEY');
