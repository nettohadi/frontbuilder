import useWebsites from '@src/hooks/queries/useWebsites';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import * as S from '@src/pages/Editor/TopMenu/SiteMenu/styles';
import { current } from '@src/common/current';
import { BsCheck2 } from 'react-icons/bs';
import * as G from '@src/styles';
import { BiPlus } from 'react-icons/bi';
import Tooltip from '@components/Tooltip';

const SiteList = ({
  isVisible,
  onSelected = () => {},
  onCreateSite,
}: {
  isVisible: boolean;
  onSelected: () => void;
  onCreateSite: () => void;
}) => {
  const { isLoading, isFetching, refetch, data } = useWebsites();
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible && !data?.length) {
      refetch();
    }
  }, [isVisible, data, refetch]);

  const Websites = () => {
    if (isLoading || (isFetching && !data?.length)) {
      return (
        <S.MenuItem>
          <div>Loading...</div>
        </S.MenuItem>
      );
    }

    if (data?.length === 0) {
      return (
        <S.MenuItem>
          <div>No pages found</div>
        </S.MenuItem>
      );
    }

    const isActive = (websiteId: number) => {
      return current.website?.id === websiteId;
    };

    return (
      <>
        {data?.map((website) => {
          return (
            <S.MenuItem
              key={website.id}
              onClick={() => {
                navigate(`/${website.id}`);
                current.website = website;
                onSelected();
              }}
            >
              <div>{website.name}</div>
              {isActive(website.id || 0) && <BsCheck2 />}
            </S.MenuItem>
          );
        })}
      </>
    );
  };

  const isFreeUser = current.user?.subscription === 'free';
  return (
    <S.MenuWrapper>
      <Websites />
      <G.Divider />
      <Tooltip
        content="Upgrade to pro to add more sites"
        placement="bottom"
        visible={isFreeUser}
      >
        <S.MenuItem
          onClick={isFreeUser ? undefined : onCreateSite}
          aria-disabled={isFreeUser}
        >
          <div>
            <BiPlus /> Create a new site
          </div>
        </S.MenuItem>
      </Tooltip>
    </S.MenuWrapper>
  );
};

export default SiteList;
