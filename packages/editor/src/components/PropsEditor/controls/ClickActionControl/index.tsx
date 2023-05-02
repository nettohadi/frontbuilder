import React, { useEffect } from 'react';

import * as G from '@components/PropsEditor/controls/shared';
import { ControlComponentType } from '@src/types';
import FloatingDropDownControlFactory from '@components/PropsEditor/controls/base/FloatingDropDownControl';
import styled from 'styled-components';
import { current } from '@src/common/current';
import usePages from '@src/hooks/queries/usePages';

const ClickActionControl: ControlComponentType = ({
  setProp,
  name,
  value: initialValue,
  label,
}) => {
  const [action, setAction] = React.useState(initialValue);
  const { data: pages } = usePages(Number(current.website.id));

  useEffect(() => {
    setAction(initialValue);
  }, [initialValue]);

  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <div>
        <Row>
          <label>Type</label>
          <ActionType
            setProp={(newProp: any) => {
              const newAction = { ...action, ...newProp };
              setAction(newAction);
              setProp({ [name]: newAction });
            }}
            name={'type'}
            value={action?.type}
          />
        </Row>
        <ValueControl
          type={action?.type}
          value={action?.value?.pageSlug || action?.value}
          onChange={(e: any) => {
            let textValue = e.target.value;
            let value: any = textValue;

            if (action?.type.toLowerCase() === 'goToElement'.toLowerCase()) {
              textValue = `#${textValue.replaceAll('#', '')}`;
            }

            if (action?.type.toLowerCase() === 'goToPage'.toLowerCase()) {
              value = {
                pageSlug: textValue,
                websiteId: current.website.id,
                pageId: pages?.find((p) => p.slug === textValue)?.id || '',
              };
            } else {
              value = textValue;
            }

            const newAction = {
              ...action,
              value,
            };
            setAction(newAction);
          }}
          afterChange={() => {
            setProp({ [name]: action });
          }}
        />
        <Row>
          <label>Open new tab</label>
          <OpenInNewTab
            setProp={(newProp: any) => {
              const newAction = { ...action, ...newProp };
              setAction(newAction);
              setProp({ [name]: newAction });
            }}
            name={'openInNewTab'}
            value={action?.openInNewTab}
          />
        </Row>
      </div>
    </G.Container>
  );
};

export default ClickActionControl;

const ActionTypeFactory = () => {
  return FloatingDropDownControlFactory(
    [
      { value: 'goToPage', label: 'Go to Page' },
      { value: 'goToUrl', label: 'Go to Url' },
      { value: 'goToElement', label: 'Go to Element' },
    ],
    '150px'
  );
};

const ActionType = ActionTypeFactory();

const OpenInNewTabFactory = () => {
  return FloatingDropDownControlFactory(
    [
      { value: false, label: 'No' },
      { value: true, label: 'Yes' },
    ],
    '100%'
  );
};

const OpenInNewTab = OpenInNewTabFactory();

const ValueControl = ({ type, onChange, afterChange, value }: any) => {
  let label = 'ID';
  let placeholder = 'Element Id';

  switch (String(type).toLowerCase()) {
    case 'goToPage'.toLowerCase():
      label = 'Page';
      placeholder = 'page slug';
      break;
    case 'goToUrl'.toLowerCase():
      label = 'Url';
      placeholder = 'https://';
      break;

    default:
      break;
  }

  return (
    <Row>
      <label>{label}</label>
      <InputCol>
        <G.Input
          data-testid={``}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          width="150px"
          onBlur={afterChange}
        />
      </InputCol>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  width: 100%;

  > label {
    min-width: 30px;
    color: rgba(234, 234, 234, 0.93);
    font-size: 11px;
    padding-bottom: 7px;
  }
`;

const InputCol = styled.div`
  margin-bottom: 5px;
`;
