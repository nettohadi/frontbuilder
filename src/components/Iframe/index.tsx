import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import * as S from './styles';

const IFrame = ({ children, ...props }: any) => {
  const [contentRef, setContentRef] = useState<any>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <S.Iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </S.Iframe>
  );
};

export default IFrame;
