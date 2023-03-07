import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaGoogle, FaUserAlt } from 'react-icons/fa';

import { supabase } from '@src/api';
import auth from '@src/api/auth';

import { COLORS } from '@src/global/variables';
import * as G from '@src/styles';
import { Spinner } from '@components/Loading';
import { Link } from '@src/styles';
import PasswordInput from '@components/PasswordInput';
import {
  isValidEmail,
  isValidPassword,
  isValidText,
} from '@src/utils/helperFunctions';
import ErrorLabel from '@components/ErrorLabel';
import { Logo } from '@src/pages/Editor/shared';

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    confirmPassword: { value: '', error: '' },
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const response = await supabase.auth.signUp({
      email: form.email.value,
      password: form.password.value,
      options: {
        data: {
          full_name: form.fullName.value,
          email: form.email.value,
        },
      },
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
    const response = await auth.signInWithPassword(
      form.email.value,
      form.password.value
    );

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

  const validateFullName = () => {
    const fullNameError = isValidText(form.fullName.value, 'FullName');
    setForm({
      ...form,
      fullName: {
        value: form.fullName.value,
        error: fullNameError,
      },
    });
    return !fullNameError;
  };

  // validate email
  const validateEmail = () => {
    const emailError = isValidEmail(form.email.value);
    setForm({
      ...form,
      email: {
        value: form.email.value,
        error: emailError,
      },
    });
    return !emailError;
  };

  // validate password
  const validatePassword = () => {
    let passwordError = isValidPassword(form.password.value);
    if (form.password.value !== form.confirmPassword.value) {
      passwordError = 'Passwords do not match';
    }

    setForm({
      ...form,
      password: {
        value: form.password.value,
        error: passwordError,
      },
    });
    return !passwordError;
  };

  // validate confirm password
  const validateConfirmPassword = () => {
    let confirmPasswordError = isValidPassword(form.confirmPassword.value);
    if (String(form.password.value) !== String(form.confirmPassword.value)) {
      confirmPasswordError = 'Passwords do not match';
    }

    setForm({
      ...form,
      confirmPassword: {
        value: form.confirmPassword.value,
        error: confirmPasswordError,
      },
    });

    return !confirmPasswordError;
  };

  const validateForm = () => {
    if (
      validateFullName() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword()
    ) {
      return true;
    }
    return false;
  };

  const formIsValid =
    form.fullName.error.trim().length === 0 &&
    form.email.error.trim().length === 0 &&
    form.password.error.trim().length === 0 &&
    form.confirmPassword.error.trim().length === 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <G.Container>
      <G.LogoWrapper href="https://www.frontbuilder.net">
        <Logo
          src="/frontbuilder_logo_yellow.png"
          size="26px"
          padding="0"
          alt="fronbuilder logo"
        />
        <h2>Frontbuilder</h2>
      </G.LogoWrapper>
      <G.Wrapper>
        <G.InnerWrapper>
          <h1>Create My Account</h1>
          <G.GoogleButton onClick={handleSignInWithGoogle}>
            <FaGoogle size={20} />
            Continue with Google
          </G.GoogleButton>
          <G.SubLabel>Or sign up with your email </G.SubLabel>

          <G.FieldWrapper>
            <G.InputWrapper isError={!!form.fullName.error.trim()}>
              <FaUserAlt size={20} color={COLORS.PRIMARY} />
              <G.Input
                fontSize={'15px'}
                type="text"
                placeholder="Full Name"
                autoComplete={'off'}
                value={form.fullName.value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName: { value: e.target.value, error: '' },
                  })
                }
                onKeyDown={handleKeyDown}
                onBlur={validateFullName}
              />
            </G.InputWrapper>
            <ErrorLabel label={form.fullName.error} />
          </G.FieldWrapper>

          <G.FieldWrapper>
            <G.InputWrapper isError={!!form.email.error.trim()}>
              <MdEmail size={20} color={COLORS.PRIMARY} />
              <G.Input
                fontSize={'15px'}
                type="email"
                placeholder="Email"
                autoComplete={'off'}
                value={form.email.value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: { value: e.target.value, error: '' },
                  })
                }
                onBlur={validateEmail}
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
              onEnter={handleSignUp}
              onBlur={validatePassword}
            />
            <ErrorLabel label={form.password.error} />
          </G.FieldWrapper>

          <G.FieldWrapper>
            <PasswordInput
              isError={!!form.confirmPassword.error.trim()}
              value={form.confirmPassword.value}
              onChange={(e: any) =>
                setForm({
                  ...form,
                  confirmPassword: { value: e.target.value, error: '' },
                })
              }
              placeholder="Confirm Password"
              onEnter={handleSignUp}
              onBlur={validateConfirmPassword}
            />
            <ErrorLabel label={form.confirmPassword.error} />
          </G.FieldWrapper>

          <G.SubLabel>
            <input type="checkbox" /> I agree to the terms of service and
            privacy policy.
          </G.SubLabel>
          <G.SignButton
            onClick={handleSignUp}
            disabled={isLoading || !formIsValid}
          >
            {isLoading && <Spinner size={20} />}
            {isLoading ? 'Signing up...' : 'Sign up'}
          </G.SignButton>
          <G.SubLabel>
            Already have an account? <Link onClick={goToSignIn}>Sign in</Link>
          </G.SubLabel>
        </G.InnerWrapper>
      </G.Wrapper>
    </G.Container>
  );
};

export default SignUp;
