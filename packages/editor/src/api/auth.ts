import { supabase } from '@src/api/index';

const signInWithPassword = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

const signUpWithPassword = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

const signInWithGoogle = async () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/` },
  });
};

const signOut = async () => {
  return supabase.auth.signOut();
};

const getSession = async () => {
  const response = (window as any).Cypress
    ? { data: { session: { user: { id: 1 } } } }
    : await supabase.auth.getSession();

  return response.data.session;
};

const getUserProfile = async () => {
  const session = await getSession();
  // eslint-disable-next-line no-throw-literal
  if (!session) throw { code: 404 };

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user?.id)
    .single();

  if (error) throw error;
  return data;
};

const auth = {
  signInWithPassword,
  signUpWithPassword,
  signInWithGoogle: signInWithGoogle,
  signOut,
  getSession,
  getUserProfile,
};

export default auth;
