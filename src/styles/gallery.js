import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  padding: 25px 15px;
  justify-content: space-between;
  align-items: center;

  ${media.greaterThan('small')`
    width: 30%;
  `}
`;

export const SpriteImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;
