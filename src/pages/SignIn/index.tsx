import * as S from '@src//styles';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import auth from '@src/api/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const response = await auth.signInWithPassword(form.email, form.password);
    console.log({ response });

    if (!(response as any).error) {
      navigate('/');
    }
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
        <h2 style={{ marginBottom: 20 }}>Welcome Back</h2>
        <S.GoogleButton onClick={handleSignInWithGoogle}>
          <FcGoogle size={20} />
          Continue with Google
        </S.GoogleButton>
        <S.SubLabel>Or with Your Email </S.SubLabel>
        <S.Input
          type="email"
          placeholder="Email"
          autoComplete={'off'}
          value={form.email}
          onChange={(e: any) => setForm({ ...form, email: e.target.value })}
        />
        <S.Input
          type="password"
          placeholder="Password"
          autoComplete={'off'}
          value={form.password}
          onChange={(e: any) => setForm({ ...form, password: e.target.value })}
        />
        <S.SignInButton onClick={handleSignIn}>Sign In</S.SignInButton>
      </S.Wrapper>
    </S.Container>
  );
};

export default SignIn;
