import React, { useEffect, useRef } from 'react';
import { FaRegSquare } from 'react-icons/fa';

import { ControlProps, SpacingType } from '@src/types';
import * as G from '@components/PropsEditor/controls/shared';
import { current } from '@src/common/current';
import {
  convertToNumber,
  extractSpacing,
  assembleSpacing,
} from '@src/utils/helperFunctions';
import Tooltip from '@components/Tooltip';

const SpacingControl = ({ setProp, name, value, label }: ControlProps) => {
  const onFocus = useRef(false);
  const [size, setSize] = React.useState<SpacingType>(extractSpacing(value));
  const [isEqual, setIsEqual] = React.useState<boolean>(false);

  useEffect(() => {
    setSize(extractSpacing(value));
  }, [value, setProp]);

  useEffect(() => {
    const { top, right, bottom, left } = size;
    const isTheSame = top === right && right === bottom && bottom === left;
    setIsEqual(isTheSame);
  }, [size]);

  const handleSizeChange = (e: any, propName: string) => {
    const newSize: SpacingType = isEqual
      ? {
          top: e.target.value,
          right: e.target.value,
          bottom: e.target.value,
          left: e.target.value,
          unit: size.unit,
        }
      : {
          ...size,
          [propName]: convertToNumber(e.target.value),
        };
    setSize(newSize);
    setProp({ [name]: `${assembleSpacing(newSize)}` });
  };

  const showSpacing = () => {
    const spacingName = name.toLowerCase();
    if (spacingName !== 'margin' && spacingName !== 'padding') return;

    if (spacingName === 'padding') {
      current.setHighlightPadding(true);
    } else {
      current.setHighlightMargin(true);
    }
    setProp();
  };

  const hideSpacing = () => {
    const spacingName = name.toLowerCase();
    if (
      (spacingName !== 'margin' && spacingName !== 'padding') ||
      onFocus.current
    ) {
      return;
    }

    if (spacingName === 'padding') {
      current.setHighlightPadding(false);
    } else {
      current.setHighlightMargin(false);
    }

    setProp();
  };

  const handleFocus = () => {
    onFocus.current = true;
    showSpacing();
  };

  const handleBlur = () => {
    onFocus.current = false;
    hideSpacing();
  };

  return (
    <G.Container
      onMouseEnter={showSpacing}
      onMouseLeave={hideSpacing}
      onClick={showSpacing}
    >
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <G.SpacingContainer>
        <G.SpacingInput
          data-testid={`${name}-left`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.left)}
          onChange={(e: any) => handleSizeChange(e, 'left')}
        />
        <G.SpacingInput
          data-testid={`${name}-top`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderPosition="top"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.top)}
          onChange={(e: any) => handleSizeChange(e, 'top')}
        />
        <G.SpacingInput
          data-testid={`${name}-right`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderPosition="right"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.right)}
          onChange={(e: any) => handleSizeChange(e, 'right')}
        />
        <G.SpacingInput
          data-testid={`${name}-bottom`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderPosition="bottom"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.bottom)}
          onChange={(e: any) => handleSizeChange(e, 'bottom')}
        />
        <span className="spacing-unit">PX</span>
        <Tooltip content="Make all values equal">
          <G.EqualSizeButton
            data-testid={`${name}-${!isEqual ? 'not-' : ''}equal`}
            isActive={isEqual}
            onClick={() => setIsEqual((s) => !s)}
          >
            <FaRegSquare />
          </G.EqualSizeButton>
        </Tooltip>
      </G.SpacingContainer>
    </G.Container>
  );
};

export default SpacingControl;
