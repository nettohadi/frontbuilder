import { CgSpinnerTwo } from 'react-icons/cg';
import * as S from './styles';

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
      {isLoading ? (
        <S.Spinner>
          <CgSpinnerTwo size={20} />
        </S.Spinner>
      ) : (
        ''
      )}
      {label}
    </S.Button>
  );
};

export default Button;
