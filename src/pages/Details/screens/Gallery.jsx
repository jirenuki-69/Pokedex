import React, { useState } from 'react';
import { Container, SpriteImage } from '../../../styles/gallery';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  pokemonNextSprite,
  pokemonPreviousSprite
} from '../../../utils/pokemon';

const Gallery = ({ sprites }) => {
  const [currentSprite, setCurrentSprite] = useState(0);

  return (
    <Container>
      <FaChevronLeft
        size={16}
        onClick={() =>
          setCurrentSprite(pokemonPreviousSprite(currentSprite, sprites.length))
        }
      />
      <SpriteImage
        src={sprites[currentSprite]?.image}
        alt={currentSprite?.label}
      />
      <FaChevronRight
        size={16}
        onClick={() =>
          setCurrentSprite(pokemonNextSprite(currentSprite, sprites.length))
        }
      />
    </Container>
  );
};

export default Gallery;
