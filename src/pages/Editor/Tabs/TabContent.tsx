import Elements from '@src/pages/Editor/ElementContainer';
import Navigator from '@src/pages/Editor/Navigator';
import Pages from '@src/pages/Editor/Pages';
import Settings from '@src/pages/Editor/Settings';
import { ActiveTabType } from '@src/pages/Editor/Tabs/index';

const TabContent = ({ activeTab }: { activeTab: ActiveTabType }) => {
  const showNavigator = activeTab === 'navigator';
  const showImageGallery = activeTab === 'gallery';
  const showSettings = activeTab === 'settings';
  const showElements = activeTab === 'elements';

  return (
    <div
      style={{
        height: '100%',
        width: 'calc(100% - 43px)',
        backgroundColor: 'inherit',
      }}
    >
      {showElements && <Elements />}
      {showNavigator && <Navigator />}
      {showImageGallery && <Pages />}
      {showSettings && <Settings />}
    </div>
  );
};

export default TabContent;
