import { FaTrash, FaCopy } from 'react-icons/fa';
import { current } from '@src/common/current';
import { useContext } from 'react';
import PageData from '@src/context';
import { removeElement } from '@src/global/element';

const QuickActions = () => {
  const rerender = useContext(PageData);

  const handleDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const element = current.getElement();
    const parent = current.getParent();
    removeElement(parent, element);
    rerender();
  };
  return (
    <div className="quick-actions">
      <div>
        <FaCopy />
      </div>
      <div onClick={handleDelete}>
        <FaTrash />
      </div>
    </div>
  );
};

export default QuickActions;
