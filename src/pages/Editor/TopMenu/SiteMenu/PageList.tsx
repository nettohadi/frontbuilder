import { useNavigate, useParams } from 'react-router-dom';
import usePages from '@src/hooks/queries/usePages';
import React, { useEffect } from 'react';
import * as S from '@src/pages/Editor/TopMenu/SiteMenu/styles';
import { current } from '@src/common/current';
import { BsCheck2 } from 'react-icons/bs';
import * as G from '@src/styles';
import { BiPlus } from 'react-icons/bi';

const PageList = ({
  isVisible,
  onSelected = () => {},
  onCreatePage = () => {},
}: {
  isVisible: boolean;
  onSelected: () => void;
  onCreatePage: () => void;
}) => {
  const params = useParams<{ websiteId: string; pageId: string }>();
  const { isLoading, isFetching, refetch, data } = usePages(
    Number(params.websiteId)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible && !data?.length) {
      refetch();
    }
  }, [isVisible, data, refetch]);

  const Pages = () => {
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

    return (
      <>
        {data?.map((page) => {
          return (
            <S.MenuItem
              key={page.id}
              onClick={() => {
                navigate(`/${current.website.id}/${page.id}`);
                current.page = page;
                onSelected();
              }}
            >
              <div>{page.name}</div>
              {page.id === current.page?.id && <BsCheck2 />}
            </S.MenuItem>
          );
        })}
      </>
    );
  };

  return (
    <S.MenuWrapper>
      <Pages />
      <G.Divider />
      <S.MenuItem onClick={onCreatePage}>
        <div>
          <BiPlus /> Create New Page
        </div>
      </S.MenuItem>
    </S.MenuWrapper>
  );
};

export default PageList;
