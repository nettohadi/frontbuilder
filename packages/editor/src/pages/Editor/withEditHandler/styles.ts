import styled from 'styled-components';
import { current } from '@src/common/current';
import { MEASUREMENT } from '@src/global/variables';
import { removeInvalidStyles } from '@src/pages/Editor/withEditHandler/helpers';

export const getStyledHandler = () => {
  return current.isEditMode ? HandlerOnEdit : HandlerOnPreview;
};

export const getStyledComponent = (Component: any) => styled(Component)`
  ${({ styles, mdStyles, smStyles }) =>
    stylesOnEdit(styles, mdStyles, smStyles)};
`;

const stylesOnEdit = (styles: any, mdStyles: any, smStyles: any) => {
  const _styles = removeInvalidStyles(styles);
  const _mdStyles = removeInvalidStyles(mdStyles);
  const _smStyles = removeInvalidStyles(smStyles);

  if (current.isTabletScreen) {
    return { ..._styles, ..._mdStyles };
  }
  if (current.isMobileScreen) {
    return { ..._styles, ..._mdStyles, ..._smStyles };
  }

  return _styles;
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
