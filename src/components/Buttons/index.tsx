import { CgSpinnerTwo } from 'react-icons/cg';
import * as S from './styles';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant: 'primary' | 'secondary';
};
const Button = ({
  label,
  isLoading,
  isDisabled,
  onClick,
  variant,
}: ButtonProps) => {
  const handleOnClick = () => {
    if (!isDisabled) {
      onClick?.();
    }
  };
  return (
    <S.Button onClick={handleOnClick} disabled={isDisabled} variant={variant}>
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
