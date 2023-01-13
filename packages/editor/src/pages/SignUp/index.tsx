import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdEmail } from 'react-icons/md';
import { FaGoogle, FaRegEye, FaRegEyeSlash, FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import { supabase } from '@src/api';
import auth from '@src/api/auth';

import { COLORS } from '@src/global/variables';
import * as G from '@src/styles';
import { Spinner } from '@components/Loading';
import { Link } from '@src/styles';

const SignUp = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setIsLoading(true);
    const response = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    setIsLoading(false);

    if (response.error) {
      toast.error(response.error.message);
    } else {
      await handleSignIn();
    }
    setIsLoading(false);
  };

  const handleSignIn = async () => {
    const response = await auth.signInWithPassword(form.email, form.password);

    if (response.error) {
      toast.error(response.error.message);
    } else {
      navigate('/');
    }
  };

  const handleSignInWithGoogle = async () => {
    const { error } = await auth.signInWithGoogle();
    if (error) {
      toast.error(error.message);
    }
  };

  const goToSignIn = (e: any) => {
    e.preventDefault();
    navigate('/signin');
  };

  return (
    <G.Container>
      <G.LogoWrapper>
        <MdDashboard size={47} color={COLORS.PRIMARY} />
        <h1>FrontBuilder</h1>
      </G.LogoWrapper>
      <G.Wrapper>
        <h2 style={{ marginBottom: 20 }}>Create My Account</h2>
        <G.GoogleButton onClick={handleSignInWithGoogle}>
          <FaGoogle size={20} />
          Continue with Google
        </G.GoogleButton>
        <G.SubLabel>Or sign up with your email </G.SubLabel>
        <G.InputWrapper>
          <FaUserAlt size={20} color={COLORS.PRIMARY} />
          <G.Input
            type="text"
            placeholder="Full Name"
            autoComplete={'off'}
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </G.InputWrapper>
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
        <G.SubLabel>
          I agree to the terms of service and privacy policy.
        </G.SubLabel>
        <G.SignInButton onClick={handleSignUp} disabled={isLoading}>
          {isLoading && <Spinner size={20} />}
          {isLoading ? 'Signing up...' : 'Sign up'}
        </G.SignInButton>
        <G.SubLabel>
          Already have an account? <Link onClick={goToSignIn}>Sign in</Link>
        </G.SubLabel>
      </G.Wrapper>
    </G.Container>
  );
};

export default SignUp;
