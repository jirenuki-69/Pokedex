import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;

  width: 100%;
  margin: 0 auto;
  max-width: 1600px;
  height: 100%;
  padding: 25px 15px;

  div:last-child {
    margin-bottom: 0px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  strong {
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.text.black};
    width: 150px;
    text-align: center;
  }

  > span {
    font-size: 22px;
    line-height: 25px;
    color: ${({ theme }) => theme.colors.text.gray};
    width: 100px;
    text-align: center;
  }

  ${media.greaterThan('medium')`
    flex-direction: row;
    column-gap: 10px;
    margin-bottom: 25px;
  `}
`;

export const RowContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  align-items: center;
  column-gap: 10px;
`;

export const BarStatus = styled.div`
  flex: 1;
  width: 100%;
  height: 4px;
  border-radius: 2px;

  span {
    display: block;
    width: ${(props) => props.percentage}%;
    height: inherit;
    background: ${(props) => props.color};
  }
`;
