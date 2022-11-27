import useWebsites from '@src/hooks/useWebsites';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import * as S from '@src/pages/Editor/TopMenu/SiteMenu/styles';
import { current } from '@src/common/current';
import { FiGlobe } from 'react-icons/fi';
import { BsCheck2 } from 'react-icons/bs';
import * as G from '@src/styles';
import { BiPlus } from 'react-icons/bi';

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
    if (isLoading || isFetching) {
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
              <div>
                <FiGlobe size={15} />
                {website.name}
              </div>
              {isActive(website.id) && <BsCheck2 />}
            </S.MenuItem>
          );
        })}
      </>
    );
  };

  return (
    <S.MenuWrapper>
      <Websites />
      <G.Divider />
      <S.MenuItem onClick={onCreateSite}>
        <div>
          <BiPlus /> Create New Site
        </div>
      </S.MenuItem>
    </S.MenuWrapper>
  );
};

export default SiteList;
