import { CgSpinnerTwo } from 'react-icons/cg';
import * as S from './styles';
import { Spinner } from '@components/Loading';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
};
const Button = ({
  label,
  isLoading,
  disabled = false,
  onClick,
  variant,
}: ButtonProps) => {
  const handleOnClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };
  return (
    <S.Button onClick={handleOnClick} disabled={disabled} variant={variant}>
      {isLoading ? <Spinner size={16} /> : ''}
      {label}
    </S.Button>
  );
};

export default Button;
