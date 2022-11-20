import * as S from '@src/styles';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { supabase } from '@src/api';

const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSignUp = async () => {
    console.log(form);

    const response = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    console.log(response);
  };
  return (
    <S.Container>
      <S.Wrapper>
        <h2 style={{ marginBottom: 20 }}>Create My Account</h2>
        <S.GoogleButton>
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
