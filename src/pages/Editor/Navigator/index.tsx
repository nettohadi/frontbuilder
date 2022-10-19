import { HeadingContainer } from '@src/pages/Editor/shared';
import * as S from './styles';
import data from '@src/data';
import { ElementType } from '@src/types';
import { getAllRegisteredElements } from '@src/utils';
import { RiArrowDownSFill, RiArrowRightSFill } from 'react-icons/ri';
import { current } from '@src/common/current';

const Navigator = () => {
  const elementTree = data.get();
  return (
    <div>
      <HeadingContainer>Navigator</HeadingContainer>
      <S.NavigationContainer>
        <ElementsTree element={elementTree as ElementType} />
      </S.NavigationContainer>
    </div>
  );
};

export default Navigator;

const ElementsTree = ({ element }: { element: ElementType }) => {
  const handleClick = () => {
    element['select']();
  };

  if (!element) return <></>;
  return (
    <S.TreeContainer>
      <S.Tree
        isSelected={element === current.getElement()}
        onClick={handleClick}
      >
        <RiArrowDownSFill size={14} />
        {IconForType({ type: element.type })()}
        {element.props?.name || 'Root'}
      </S.Tree>
      <S.TreeChildContainer>
        {element.children?.map((child, index) => (
          <ElementsTree element={child as ElementType} key={index} />
        ))}
      </S.TreeChildContainer>
    </S.TreeContainer>
  );
};

const allElements = getAllRegisteredElements();
const IconForType = ({ type }: { type: string }) => {
  return allElements[type].icon || <div></div>;
};

const selectElement = () => {};
