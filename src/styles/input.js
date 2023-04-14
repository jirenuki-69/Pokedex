import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 10px;
  padding: 0 20px;
  height: 60px;

  background: ${({ theme }) => theme.colors.background.input};
  border-radius: 10px;
  border: 2px solid
    ${({ isFocused, theme }) =>
      isFocused ? theme.colors.background.pressedInput : 'transparent'};

  svg {
    width: 20px;
    height: 20px;
    margin-right: 25px;
    color: ${({ theme }) => theme.colors.text.gray};

    opacity: ${({ isFocused }) => (isFocused ? 1 : 0.8)};
  }

  input {
    flex: 1;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text.gray};
    border: none;
    background: transparent;
    text-align: left;
  }

  ${media.lessThan('medium')`
    padding: 10px 22px;
    svg {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    input {
      font-size: 16px;
    }
  `};
`;
