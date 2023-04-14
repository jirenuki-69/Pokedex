import styled from 'styled-components';
import media from 'styled-media-query';

export const ViewButton = styled.button`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0px !important;
  width: auto !important;
  height: auto !important;
  background-color: ${({ active }) =>
    active ? 'black' : 'transparent'} !important;
  border: 1px solid black !important;

  &:hover {
    background: ${({ active }) =>
      active
        ? 'linear-gradient(to bottom, #1F1F1F 5%, black 100%)'
        : 'linear-gradient(to bottom, #F6F6F6 5%, white 100%)'};
    background-color: ${({ active }) => (active ? '#1F1F1F' : '#F6F6F6')};
  }

  p {
    color: ${({ active }) => (active ? 'white' : 'black')};
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
  }
`;
