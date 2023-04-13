import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 25px 15px;
`;

export const MoveContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 15px;

  strong {
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    color: ${({ color }) => color};
    width: 150px;
    text-transform: capitalize;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SectionDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }

  p:last-child {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
  }

  ${media.greaterThan('medium')`
    align-items: flex-start;
  `}
`;
