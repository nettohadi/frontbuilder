import React, { useState } from 'react';
import * as G from '@src/styles';
import { RiLockPasswordFill } from 'react-icons/ri';
import { COLORS } from '@src/global/variables';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({
  value,
  onChange,
  onBlur,
  onEnter,
  placeholder,
  isError = false,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  placeholder?: string;
  isError?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && typeof onEnter === 'function') {
      onEnter?.();
    }
  };
  return (
    <G.InputWrapper isError={isError}>
      <RiLockPasswordFill size={20} color={COLORS.PRIMARY} />
      <G.Input
        fontSize={'15px'}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder || 'Password'}
        autoComplete={'off'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
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
  );
};

export default PasswordInput;
