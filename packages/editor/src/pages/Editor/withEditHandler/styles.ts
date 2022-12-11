import styled from 'styled-components';
import { current } from '@src/common/current';
import { MEASUREMENT } from '@src/global/variables';

export const getStyledHandler = () => {
  return current.isEditMode ? HandlerOnEdit : HandlerOnPreview;
};

export const getStyledComponent = (Component: any) => styled(Component)`
  ${({ styles, mdStyles, smStyles }) =>
    stylesOnEdit(styles, mdStyles, smStyles)};
`;

const stylesOnEdit = (styles: any, mdStyles: any, smStyles: any) => {
  if (current.isTabletScreen) {
    return { ...styles, ...mdStyles };
  }
  if (current.isMobileScreen) {
    return { ...styles, ...mdStyles, ...smStyles };
  }

  return styles;
};

const HandlerOnEdit = styled.div<{
  styles?: any;
  mdStyles: any;
  smStyles: any;
}>`
  ${({ styles, mdStyles, smStyles }) => {
    if (current.isTabletScreen) {
      return mdStyles;
    }
    if (current.isMobileScreen) {
      return smStyles;
    }

    return styles;
  }};
`;

const HandlerOnPreview = styled.div<{
  styles?: any;
  mdStyles: any;
  smStyles: any;
}>`
  ${({ styles }) => styles || {}};

  @media (min-width: ${MEASUREMENT.TABLET_SCREEN}) {
    ${({ mdStyles }) => mdStyles};
  }

  @media (min-width: ${MEASUREMENT.MOBILE_SCREEN}) {
    ${({ smStyles }) => smStyles};
  }
`;
