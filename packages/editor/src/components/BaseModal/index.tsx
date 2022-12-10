import React, { ReactNode } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import * as S from './styles';

type ModalProps = {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};
const Modal = ({
  title = 'Title',
  children,
  isOpen = false,
  onClose = () => {},
}: ModalProps) => {
  if (!isOpen) return null;

  const handleClickedOutside = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.id === 'fr-modal-container') onClose?.();
  };
  return (
    <S.MainContainer onClick={handleClickedOutside} id="fr-modal-container">
      <S.Content>
        <S.Title>
          {title}{' '}
          <S.CloseButton>
            <IoCloseOutline
              size={22}
              cursor="pointer"
              onClick={() => onClose?.()}
            />
          </S.CloseButton>
        </S.Title>
        {children}
      </S.Content>
    </S.MainContainer>
  );
};

export default Modal;

export const ModalFooter = ({ children }: any) => {
  return <S.Footer>{children}</S.Footer>;
};
