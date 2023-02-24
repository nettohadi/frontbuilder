import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

const ErrorLabel = ({ label = '' }: { label?: string }) => {
  return label.trim() ? <Label>{label}</Label> : null;
};

const Label = styled.label`
  font-size: 13px;
  font-weight: normal;
  color: ${COLORS.ERROR};
`;

export default ErrorLabel;
