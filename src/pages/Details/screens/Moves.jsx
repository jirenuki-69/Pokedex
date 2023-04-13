import React from 'react';
import { Container, DetailsContainer, MoveContainer, SectionDetails } from "../../../styles/moves";

const Moves = ({ moves }) => {
  return (
    <Container>
      {moves.map(({ name, power, accuracy, type, color }) => (
        <MoveContainer key={name} color={color}>
          <strong>{name}</strong>
          <DetailsContainer>
            <SectionDetails>
              <p>Poder</p>
              <p>{power}</p>
            </SectionDetails>
            <SectionDetails>
              <p>Precisión</p>
              <p>{accuracy}</p>
            </SectionDetails>
            <SectionDetails>
              <p>Tipo</p>
              <p>{type}</p>
            </SectionDetails>
          </DetailsContainer>
        </MoveContainer>
      ))}
    </Container>
  );
};

export default Moves;
