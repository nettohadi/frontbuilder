import { supabase } from '@src/api/index';

const signInWithPassword = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log({ signIn: response });

  return response;
};

const signUpWithPassword = async (email: string, password: string) => {
  const response = await supabase.auth.signUp({
    email,
    password,
  });

  return response;
};

const signOut = async () => {
  const response = await supabase.auth.signOut();

  console.log({ signOut: response });
};

const getSession = async () => {
  const response = await supabase.auth.getSession();
  return response.data.session;
};

const getUser = async () => {
  const session = await getSession();
  return session?.user;
};

const auth = {
  signInWithPassword,
  signUpWithPassword,
  signOut,
  getSession,
  getUser,
};

export default auth;
