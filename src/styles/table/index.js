import styled from "styled-components";

export const Container = styled.div`
  overflow-x: auto;
  display: flex;
  justify-content: center;
  overflow-y: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

export const TableHead = styled.thead`
  tr {
    background: white;

    th {
      padding: 15px;
      background: white;
    }
  }
`;

export const TableHeader = styled.th`
  background-color: #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableRow = styled.tr`
  background-color: ${(({ color }) => color)};
  border-bottom: 1px solid white;
`;

export const TableCell = styled.td`
  padding: 8px;
  text-align: center;
`;

export const Image = styled.img`
  width: 100px;
`;

export const Label = styled.p`
  color: white;
  font-weight: bold;
  line-height: 2;
`;

export const PokemonType = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  align-self: center;
  margin: 0 auto 5px auto;

  padding: 8px;

  background: ${(props) => props.color};
  border-radius: 3px;

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

export const ShinyButton = styled.button`
  background: transparent;
  color: black !important;
  font-weight: bold !important;
  margin: 0px !important;
  width: 70px !important;
  color: #fff !important;
  font-size: 14px !important;
`;
