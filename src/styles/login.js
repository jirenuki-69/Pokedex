import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 25px;
  width: 100%;
  height: 100vh;

  > h1 {
    font-weight: bold;
    font-size: 50px;

    color: ${({ theme }) => theme.colors.text.black};
  }

  img {
    display: flex;
    align-self: center;
  }

  button {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text.white};

    width: 50%;
    height: 50px;
    background: #5a92a5;
    margin: 30px auto 0;
    font-weight: bold;

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

  ${media.greaterThan('medium')`
    padding: 80px;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 100vh;
    width: 100%;
  `};
`;

export const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;

  > img {
    width: 100%;
    object-fit: contain;
    height: 250px;
  }

  ${media.greaterThan('medium')`
    flex: 3;
    align-items: center;
    justify-content: space-around;
    flexDirection: row;

    > img {
      height: auto;
    }
  `};
`;

export const FormContainer = styled.form`
  display: flex;
  flex: 2;
  flex-direction: column;
  width: 100%;
  align-items: center;
  transform: scale(0.85);

  > h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  > div {
    width: 90%;
    margin-bottom: 10px;
  }

  ${media.greaterThan('medium')`
    flex: 3;
  
    > div {
      width: 70%;
    }
  `};
`;

export const Divider = styled.div`
  display: flex;
  height: 70%;
  align-items: center;
  justify-content: center;
  border: 1px solid #606d78;
  -webkit-box-shadow: -5px 1px 10px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -5px 1px 10px 0px rgba(0, 0, 0, 0.3);
  -box-shadow: -5px 1px 10px 0px rgba(0, 0, 0, 0.3);

  ${media.lessThan('medium')`
    display: none;
  `};
`;
