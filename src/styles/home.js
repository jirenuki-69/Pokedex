import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 30px 80px;

  > h1 {
    font-weight: bold;
    font-size: 50px;

    color: ${({ theme }) => theme.colors.text.black};
  }

  > svg {
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;

    z-index: -1;
    height: 100vh;
    width: auto;

    path {
      fill: rgba(0, 0, 0, 0.03);
    }
  }

  button {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text.white};

    width: 50%;
    height: 50px;
    background: #5a92a5;
    margin: 30px auto 0;

    outline: 0;
    border: 0;
    border-radius: 4px;
    opacity: 0.8;

    transition: all linear 0.2s;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }

  ${media.lessThan('medium')`
    padding: 10px;

    > h1 {
      text-align: center;
    }
  `};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  row-gap: 15px;
  margin-bottom: ${({ mode }) => mode === 'grid' ? '60px' : '20px'};

  ${media.greaterThan('small')`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;
