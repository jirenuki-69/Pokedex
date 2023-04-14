import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  overflow-x: auto;
`;

export const CircleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 20px;
  border: 1px solid ${(({ active }) => active ? 'white' : 'black')};
  width: 20px;
  height: 20px;
  border-radius: 60px;
  font-weight: bold;
  background-color: ${(({ active }) => active ? 'rgb(88, 171, 246)' : 'transparent')};
  color: ${(({ active }) => active ? 'white' : 'black')};
`;
