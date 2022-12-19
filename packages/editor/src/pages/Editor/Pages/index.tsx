import React from 'react';
import { useParams } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { SlHome } from 'react-icons/sl';

import usePages from '@src/hooks/queries/usePages';
import * as G from '@src/styles';
import * as S from './styles';
import { HeadingContainer } from '@src/pages/Editor/shared';

const Pages = () => {
  const params = useParams<{ websiteId: string; pageId: string }>();
  const { isLoading, data } = usePages(Number(params.websiteId));
  return (
    <div>
      <HeadingContainer>Pages</HeadingContainer>
      <G.Divider color={'dark'} />
      <S.PagesContainer>
        {!isLoading &&
          data?.map((page) => (
            <>
              <S.PageItem>
                <div className="check-mark">
                  {page.isDefault && <SlHome size={13} />}
                </div>
                <div>{page.name}</div>
                <FiMoreVertical size="14px" cursor="pointer" />
              </S.PageItem>
              <G.Divider color={'light'} />
            </>
          ))}
      </S.PagesContainer>
    </div>
  );
};

export default Pages;
