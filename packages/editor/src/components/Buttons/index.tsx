import * as S from './styles';
import { Spinner } from '@components/Loading';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
  icon?: any;
};
const Button = ({
  label,
  isLoading,
  disabled = false,
  onClick,
  variant,
  icon,
}: ButtonProps) => {
  const handleOnClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };
  return (
    <S.Button onClick={handleOnClick} disabled={disabled} variant={variant}>
      {!isLoading && icon}
      {isLoading ? <Spinner size={16} /> : ''}
      {label}
    </S.Button>
  );
};

export default Button;
