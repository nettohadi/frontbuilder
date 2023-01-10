import styled from 'styled-components';
import { BsCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Spinner } from '@components/Loading';
import usePageDraft from '@src/hooks/usePageDraft';
import history from '@src/global/history';

const SavingStatus = () => {
  const { isLoading, isError } = usePageDraft();
  console.log({ isLoading, isError });
  const Status = () => {
    if (isError) {
      return (
        <>
          <AiFillCloseCircle color={'#e30d46'} size={17} />
          Failed to save
        </>
      );
    }

    if (isLoading) {
      return (
        <>
          <Spinner size={17} /> Saving
        </>
      );
    }

    if (!history.count || isLoading === null) {
      return null;
    }

    return (
      <>
        <BsCheckCircleFill color={'#60d917'} size={17} /> Saved
      </>
    );
  };
  return (
    <SavingStatusWrapper>
      <Status />
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
  width: auto;
  min-width: 100px;
`;
