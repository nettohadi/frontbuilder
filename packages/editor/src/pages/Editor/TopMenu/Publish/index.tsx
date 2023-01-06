import { FaEye, FaRocket } from 'react-icons/fa';
import { GoLinkExternal } from 'react-icons/go';

import * as G from '@src/styles';
import * as S from './styles';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import React, { useEffect } from 'react';
import FloatingMenu from '@components/FloatingMenu';
import { current } from '@src/common/current';
import usePageMutation from '@src/hooks/mutations/usePageMutation';
import toast from 'react-hot-toast';

const Preview = () => {
  const [menuIsVisible, showMenu] = React.useState(false);
  return (
    <>
      <G.LinkButton
        href={`/preview/${current.website?.id}/${current.page?.id}`}
        target={'_blank'}
      >
        <S.PreviewButton>
          <FaEye />
          Preview
        </S.PreviewButton>
      </G.LinkButton>

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
  const { publishPage } = usePageMutation();

  useEffect(() => {
    if (publishPage.isLoading) {
      toast.loading('Publishing page...');
    }

    if (publishPage.isSuccess) {
      toast.dismiss();
      toast.success('The page is published');
      publishPage.reset();
    }
  });

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
      <G.MenuItem
        onClick={async () => {
          await publishPage.mutateAsync(current.page?.id || '');
          onSelected();
        }}
      >
        <div>Publish this page</div>
      </G.MenuItem>
      <G.LinkButton
        href={`https://${current.website?.slug || ''}.frontbuilder.site/${
          current.page?.slug || ''
        }`}
        target={'_blank'}
      >
        <G.MenuItem onClick={onSelected}>
          <div>
            <div>Open published page</div>
            <GoLinkExternal size={14} />
          </div>
        </G.MenuItem>
      </G.LinkButton>
    </S.MenuContainer>
  );
};
