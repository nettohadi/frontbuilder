import { supabase } from '@src/api/index';

const signInWithPassword = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
};

const signUpWithPassword = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

const signOut = async () => {
  await supabase.auth.signOut();
};

const getSession = async () => {
  const response = (window as any).Cypress
    ? { data: { session: { user: { id: 1 } } } }
    : await supabase.auth.getSession();

  return response.data.session;
};

const getUserProfile = async () => {
  const session = await getSession();
  const response = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user?.id)
    .single();

  return response.data;
};

const auth = {
  signInWithPassword,
  signUpWithPassword,
  signOut,
  getSession,
  getUserProfile: getUserProfile,
};

export default auth;
