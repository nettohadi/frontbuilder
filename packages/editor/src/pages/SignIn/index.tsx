import * as G from '@src/styles';
import { FaGoogle } from 'react-icons/fa';
import React, { useState } from 'react';
import auth from '@src/api/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { COLORS } from '@src/global/variables';
import { MdDashboard, MdEmail } from 'react-icons/md';
import { Spinner } from '@components/Loading';
import { Link } from '@src/styles';
import PasswordInput from '@components/PasswordInput';
import ErrorLabel from '@components/ErrorLabel';
import { isValidEmail, isValidPassword } from '@src/utils/helperFunctions';

const SignIn = () => {
  const [form, setForm] = useState({
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const response = await auth.signInWithPassword(
      form.email.value,
      form.password.value
    );

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

  const validateForm = () => {
    const emailError = isValidEmail(form.email.value);
    const passwordError = isValidPassword(form.password.value);

    if (emailError || passwordError) {
      setForm({
        ...form,
        email: {
          value: form.email.value,
          error: emailError,
        },
        password: {
          value: form.password.value,
          error: passwordError,
        },
      });
      return false;
    }
    return true;
  };

  const formIsValid =
    form.email.error.trim().length === 0 &&
    form.password.error.trim().length === 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <G.Container>
      <G.LogoWrapper href="https://www.frontbuilder.net">
        <MdDashboard size={38} color={COLORS.PRIMARY} />
        <h2>Frontbuilder</h2>
      </G.LogoWrapper>
      <G.Wrapper>
        <G.InnerWrapper>
          <h2>Welcome Back</h2>
          <G.GoogleButton onClick={handleSignInWithGoogle}>
            <FaGoogle size={16} />
            Continue with Google
          </G.GoogleButton>
          <G.SubLabel>Or with your email </G.SubLabel>
          <G.FieldWrapper>
            <G.InputWrapper isError={!!form.email.error.trim()}>
              <MdEmail size={20} color={COLORS.PRIMARY} />
              <G.Input
                fontSize={'15px'}
                type="email"
                placeholder="Email"
                autoComplete={'off'}
                value={form.email.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({
                    ...form,
                    email: {
                      value: e.target.value,
                      error: '',
                    },
                  })
                }
                onKeyDown={handleKeyDown}
              />
            </G.InputWrapper>
            <ErrorLabel label={form.email.error} />
          </G.FieldWrapper>
          <G.FieldWrapper>
            <PasswordInput
              isError={!!form.password.error.trim()}
              value={form.password.value}
              onChange={(e: any) =>
                setForm({
                  ...form,
                  password: { value: e.target.value, error: '' },
                })
              }
              placeholder="Password"
              onEnter={handleSignIn}
            />
            <ErrorLabel label={form.password.error} />
          </G.FieldWrapper>
          <G.SignButton
            onClick={handleSignIn}
            disabled={isLoading || !formIsValid}
          >
            {isLoading && <Spinner size={20} />}
            {isLoading ? 'Signing in...' : 'Sign in'}
          </G.SignButton>
          <G.SubLabel>
            Don't have an account yet? <Link onClick={goToSignUp}>Sign up</Link>
          </G.SubLabel>
        </G.InnerWrapper>
      </G.Wrapper>
    </G.Container>
  );
};

export default SignIn;
