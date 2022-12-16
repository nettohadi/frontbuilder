import { FaEye, FaRocket } from 'react-icons/fa';
import { GoLinkExternal } from 'react-icons/go';

import * as G from '@src/styles';
import * as S from './styles';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import React from 'react';
import FloatingMenu from '@components/FloatingMenu';
import { current } from '@src/common/current';

const Preview = () => {
  const [menuIsVisible, showMenu] = React.useState(false);
  return (
    <>
      <S.PreviewButton>
        <FaEye />
        <G.LinkButton
          href={`/preview/${current.website?.id}/${current.page?.id}`}
          target={'_blank'}
        >
          Preview
        </G.LinkButton>
      </S.PreviewButton>
      <FloatingMenu
        content={<PublishMenu onSelected={() => showMenu(false)} />}
        visible={menuIsVisible}
        onClickOutside={() => showMenu(false)}
        placement={'bottom-start'}
      >
        <div>
          <S.PublishButton onClick={() => showMenu(true)}>
            <FaRocket />
            Publish
            <MdOutlineKeyboardArrowDown size={18} cursor={'pointer'} />
          </S.PublishButton>
        </div>
      </FloatingMenu>
    </>
  );
};

export default Preview;

const PublishMenu = ({ onSelected }: any) => {
  return (
    <S.MenuContainer>
      <S.SubdomainInfo>
        <div>
          <S.SubLabel>The site will be published on </S.SubLabel>
          <S.Subdomain>
            {`https://${current.website?.slug || ''}.frontbuilder.site`}
          </S.Subdomain>
        </div>
      </S.SubdomainInfo>
      <G.Divider marginY="6px" />
      <G.MenuItem onClick={onSelected}>
        <div>Publish this page</div>
      </G.MenuItem>
      <G.MenuItem onClick={onSelected}>
        <div>
          <G.LinkButton
            href={`https://${current.website?.slug || ''}.frontbuilder.site/${
              current.page?.slug || ''
            }`}
            target={'_blank'}
          >
            Open published page
          </G.LinkButton>
          <GoLinkExternal size={14} />
        </div>
      </G.MenuItem>
    </S.MenuContainer>
  );
};
