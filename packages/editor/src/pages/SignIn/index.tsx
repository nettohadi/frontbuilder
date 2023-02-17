import * as G from '@src/styles';
import { FaRegEye, FaRegEyeSlash, FaGoogle } from 'react-icons/fa';
import React, { useState } from 'react';
import auth from '@src/api/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { COLORS } from '@src/global/variables';
import { MdDashboard, MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Spinner } from '@components/Loading';
import { Link } from '@src/styles';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setIsLoading(true);
    const response = await auth.signInWithPassword(form.email, form.password);

    if (response.error) {
      toast.error(response.error.message);
    } else {
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    const { error } = await auth.signInWithGoogle();
    if (error) {
      toast.error(error.message);
    }
  };

  const goToSignUp = (e: any) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <G.Container>
      <G.LogoWrapper>
        <MdDashboard size={47} color={COLORS.PRIMARY} />
        <h1>Frontbuilder</h1>
      </G.LogoWrapper>
      <G.Wrapper>
        <h2>Welcome Back</h2>
        <G.GoogleButton onClick={handleSignInWithGoogle}>
          <FaGoogle size={16} />
          Continue with Google
        </G.GoogleButton>
        <G.SubLabel>Or with your email </G.SubLabel>
        <G.InputWrapper>
          <MdEmail size={20} color={COLORS.PRIMARY} />
          <G.Input
            type="email"
            placeholder="Email"
            autoComplete={'off'}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </G.InputWrapper>
        <G.InputWrapper>
          <RiLockPasswordFill size={20} color={COLORS.PRIMARY} />
          <G.Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            autoComplete={'off'}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {showPassword ? (
            <FaRegEyeSlash
              size={20}
              onClick={() => setShowPassword(false)}
              color={COLORS.PRIMARY}
              cursor={'pointer'}
            />
          ) : (
            <FaRegEye
              size={20}
              onClick={() => setShowPassword(true)}
              color={COLORS.PRIMARY}
              cursor={'pointer'}
            />
          )}
        </G.InputWrapper>
        <G.SignInButton onClick={handleSignIn} disabled={isLoading}>
          {isLoading && <Spinner size={20} />}
          {isLoading ? 'Signing in...' : 'Sign in'}
        </G.SignInButton>
        <G.SubLabel>
          Don't have an account yet? <Link onClick={goToSignUp}>Sign up</Link>
        </G.SubLabel>
      </G.Wrapper>
    </G.Container>
  );
};

export default SignIn;
