import styled from 'styled-components';
import media from 'styled-media-query';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  position: relative;

  display: flex;
  height: auto;
  width: inherit;

  border-radius: 6px;
  background: ${(props) => props.color};
  box-shadow: 1px 3px 12px 0 rgba(0, 0, 0, 0.3);

  transition: all ease 0.5s;

  > img {
    position: absolute;
    right: 0px;
    top: -50px;
    z-index: 10;
    height: 210px;
    width: 210px;

    filter: grayscale(100%);
    -webkit-transition: -webkit-filter 400ms ease;
    transition: all ease 0.4s;
  }

  &:hover {
    cursor: pointer;
    border-radius: 15px;

    > img {
      filter: grayscale(0);
      top: -45px;
    }
  }

  ${media.lessThan('small')`
    height: 300px;
    
    > img {
      top: -60px;
      right: 15%;
    }

    &:hover {
      cursor: pointer;
      border-radius: 15px;
  
      > img {
        filter: grayscale(0);
        top: -65px;
      }
    }
  `}
`;

export const Pokemon = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  position: relative;
  padding: 15px;
  padding-left: 30px;

  > svg {
    position: absolute;
    right: 5px;
    top: 0;
    height: 180px;
    width: 180px;

    path {
      fill: rgba(255, 255, 255, 0.2);
    }
  }
  /* Sección de tipos de pokemon */
  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-top: 5px;
  }

  ${media.lessThan('small')`
    margin-top: 100px
  `}
`;

export const PokemonNumber = styled.span`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  /* El número 99 aplica una opacidad del 60 % al hexágono de color. */
  color: ${({ theme }) => theme.colors.text.number}99;
`;

export const PokemonName = styled.span`
  font-size: 40px;
  font-weight: bold;
  line-height: 45px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.text.white};
`;

export const PokemonType = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 8px;

  background: ${(props) => props.color};
  border-radius: 3px;

  & + div {
    margin-left: 10px;
  }

  svg {
    width: 18px;
    height: 18px;

    path {
      fill: ${({ theme }) => theme.colors.text.white};
    }
  }

  span {
    margin-left: 8px;

    color: ${({ theme }) => theme.colors.text.white};
    font-size: 18px;
    font-weight: 500;
    line-height: 14px;
    text-transform: capitalize;
  }
`;

export const PokemonAbilitiesContainer = styled.div`
  margin-top: 10px;
  div:last-child {
    margin-right: 0px;
  }
`;

export const PokemonAbility = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 45px;
  text-transform: capitalize;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.text.white};
`;
