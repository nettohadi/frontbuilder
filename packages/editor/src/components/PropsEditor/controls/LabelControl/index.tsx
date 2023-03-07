import React from 'react';
import * as G from '../shared';
import styled from 'styled-components';
import { MdContentCopy } from 'react-icons/md';
import toast from 'react-hot-toast';

const LabelControl = ({ setProp, name, value, label }: any) => {
  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <Row>
        <Label>{value}</Label>
        <CopyButton>
          <MdContentCopy
            cursor="pointer"
            size={'100%'}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(value);
                toast.success('Copied to clipboard');
              } catch (e) {
                toast.error('Failed to copy to clipboard');
              }
            }}
          />
        </CopyButton>
      </Row>
    </G.Container>
  );
};

export default LabelControl;

const Label = styled.div`
  font-size: 13px;
  font-weight: 500;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.8;
  border: 1px solid grey;
  padding: 3px;
  width: 80%;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const CopyButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  outline: none;
  height: 20px;
  color: white;
  width: 20%;
`;
