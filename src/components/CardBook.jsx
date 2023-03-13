import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DelimitText from './DelimitText';
import RatingStartStatic from './RatingStartStatic';

const CardBook = ({ book }) => {
  return (
    <Card
      style={{ width: '18rem' }}
      as={Link}
      to={`/books/${book.id}`}
      className="h-100 link border-0 w-100"
    >
      <Card.Img
        variant="top"
        src={book.coverImage}
        style={{ maxHeight: '330px' }}
        className="img-card"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex flex-column upper-case">
          {book.title}
        </Card.Title>
        <div className="mt-auto">
          <RatingStartStatic rating={book.rating} />
          <DelimitText
            text={book.summary}
            maxLength={'203'}
            textStatic={true}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardBook;
