import { HeadingContainer } from '@src/pages/Editor/shared';
import * as G from '@src/styles';
import * as S from './styles';
import { BiPlus } from 'react-icons/bi';
import { FiMoreVertical } from 'react-icons/fi';
import React from 'react';
import { BsCheck2 } from 'react-icons/bs';

const ImageGallery = () => {
  return (
    <div>
      <HeadingContainer>Pages</HeadingContainer>
      <G.Divider color={'dark'} />
      <S.PagesContainer>
        <S.PageItem>
          <div>
            <S.IconBox>
              <BsCheck2 />
            </S.IconBox>
            Home
          </div>
          <FiMoreVertical size="14px" cursor="pointer" />
        </S.PageItem>
        <G.Divider color={'light'} />
        <S.PageItem>
          <div>
            <S.IconBox />
            About
          </div>
          <FiMoreVertical size="14px" cursor="pointer" />
        </S.PageItem>
        <G.Divider color={'light'} />
        <S.PageItem>
          <div>
            <S.IconBox />
            F.A.Q
          </div>
          <FiMoreVertical size="14px" cursor="pointer" />
        </S.PageItem>
        <G.Divider color={'light'} />
        <S.PageItem>
          <div>
            <BiPlus /> Create New Page
          </div>
        </S.PageItem>
      </S.PagesContainer>
    </div>
  );
};

export default ImageGallery;
