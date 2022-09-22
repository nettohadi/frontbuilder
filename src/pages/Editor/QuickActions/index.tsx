import { FaTrash, FaCopy } from 'react-icons/fa';
import { current } from '@src/common/current';
import { useContext } from 'react';
import PageData from '@src/context';

const QuickActions = () => {
  const rerender = useContext(PageData);

  const handleDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('delete');
    const parent = current.getParent();
    const element = current.getElement();
    parent?.children.splice(parent.children.indexOf(element as any), 1);
    current.setElement(null);
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
