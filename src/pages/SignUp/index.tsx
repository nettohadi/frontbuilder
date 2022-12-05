import * as S from '@src/styles';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { supabase } from '@src/api';
import auth from '@src/api/auth';
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  // const navigate = useNavigate();

  const handleSignUp = async () => {
    const response = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
  };

  const handleSignInWithGoogle = async () => {
    const { error } = await auth.signInWithGoogle();
    if (error) {
      toast.error(error.message);
    }
  };
  return (
    <S.Container>
      <S.Wrapper>
        <h2 style={{ marginBottom: 20 }}>Create My Account</h2>
        <S.GoogleButton onClick={handleSignInWithGoogle}>
          <FcGoogle size={20} />
          Continue with Google
        </S.GoogleButton>
        <S.SubLabel>Or Sign Up with Your Email </S.SubLabel>
        <S.Input
          type="email"
          placeholder="Email"
          autoComplete={'off'}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <S.Input
          type="password"
          placeholder="Password"
          autoComplete={'off'}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <S.SubLabel>
          I agree to the terms of service and privacy policy.
        </S.SubLabel>
        <S.SignInButton onClick={handleSignUp}>Sign Up</S.SignInButton>
      </S.Wrapper>
    </S.Container>
  );
};

export default SignUp;
