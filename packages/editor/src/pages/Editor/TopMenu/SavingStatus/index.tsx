import styled from 'styled-components';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Spinner } from '@components/Loading';

const SavingStatus = () => {
  const isLoading = false;
  return (
    <SavingStatusWrapper>
      {isLoading ? (
        <>
          <Spinner size={17} /> Saving
        </>
      ) : (
        <>
          <BsCheckCircleFill color={'green'} size={17} /> Saved
        </>
      )}
    </SavingStatusWrapper>
  );
};

export default SavingStatus;

const SavingStatusWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: rgba(255, 255, 255, 0.82);
  gap: 5px;
  font-size: 14px;
  width: 100px;
`;
