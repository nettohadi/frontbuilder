import React, { useEffect } from 'react';
import { FaRegSquare } from 'react-icons/fa';

import { ControlProps, SpacingType } from '@src/types';
import * as G from '@src/components/PropsEditor/controls/shared';
import {
  convertToNumber,
  extractSpacing,
  assembleSpacing,
} from '@src/utils/helperFunctions';
import Tooltip from '@src/components/Tooltip';

const SpacingControl = ({ setProp, name, value, label }: ControlProps) => {
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

  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <G.SpacingContainer>
        <G.SpacingInput
          data-testid={`${name}-left`}
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.left)}
          onChange={(e: any) => handleSizeChange(e, 'left')}
        />
        <G.SpacingInput
          data-testid={`${name}-top`}
          borderPosition="top"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.top)}
          onChange={(e: any) => handleSizeChange(e, 'top')}
        />
        <G.SpacingInput
          data-testid={`${name}-right`}
          borderPosition="right"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.right)}
          onChange={(e: any) => handleSizeChange(e, 'right')}
        />
        <G.SpacingInput
          data-testid={`${name}-bottom`}
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
