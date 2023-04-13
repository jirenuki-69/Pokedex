import styled from 'styled-components';
import media from 'styled-media-query';

export const SectionAbout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 25px 15px;

  h3,
  p {
    font-size: 28px;
    line-height: 31px;
  }

  ${media.lessThan('huge')`
    h3,
    p {
      font-size: 20px;
      line-height: 23px;
    }
  `};

  p {
    color: ${({ theme }) => theme.colors.text.gray};
    line-height: 2;
  }

  h3 {
    color: ${(props) => props.colorText};
  }
`;

export const SectionAboutContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > div {
    margin-bottom: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    ul {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      list-style: none;

      li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 15px;
        flex-wrap: wrap;

        strong {
          font-weight: 500;
          font-size: 22px;
          line-height: 24px;
          color: ${({ theme }) => theme.colors.text.black};

          width: 180px;
        }

        span {
          font-size: 24px;
          line-height: 21px;
          color: ${({ theme }) => theme.colors.text.gray};
        }

        p:last-child {
          margin-right: 0 !important
        }
      }
    }
  }

  ${media.lessThan('huge')`
    div ul li {
      margin-top: 20px;
      strong {
        font-size: 18px;
        line-height: 20px;
      }

      span {
        font-size: 20px;
      }
    }
  `};
`;

export const Weaknesses = styled.p`
  display: flex;
  background: ${(props) => props.color};
  border-radius: 6px;

  width: 34px;
  height: 34px;

  svg {
    margin: auto;
    width: 18px;
    height: 18px;

    path {
      fill: #fff;
    }
  }

  margin-right: 6px;
`;
