import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  flex: 1;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;

  ${media.lessThan('huge')`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${media.lessThan('medium')`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 50px;
  `};
`;
