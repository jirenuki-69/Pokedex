import React from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import {
  ButtonsContainer,
  CircleButton,
  Container
} from '../../styles/table/footer';
import { getPaginationRange } from '../../utils/pagination';

const TableFooter = ({ currentPage, count, onPageChange }) => {
  const limit = Number(import.meta.env.VITE_POKEMON_MAX_NUMBER);
  const totalPage = Math.ceil(count / limit);

  const pages = getPaginationRange(totalPage, currentPage, limit, 1);

  return (
    <Container>
      <FaArrowLeft size={24} onClick={() => onPageChange('&laquo;')} />
      <FaChevronLeft size={18} onClick={() => onPageChange('&lsaquo;')} />
      <ButtonsContainer>
        {pages.map((page, index) => {
          if (isNaN(page) && typeof page === 'number') {
            return null;
          }

          return (
            <CircleButton
              active={currentPage === page}
              key={index}
              onClick={() => onPageChange(page)}
            >
              {page}
            </CircleButton>
          );
        })}
      </ButtonsContainer>
      <FaChevronRight size={18} onClick={() => onPageChange('&rsaquo;')} />
      <FaArrowRight size={24} onClick={() => onPageChange('&raquo;')} />
    </Container>
  );
};

export default TableFooter;
