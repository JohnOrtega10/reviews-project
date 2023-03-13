import React from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { ACTIONS } from '../reducers/filtersReducer';

const FilterAccordion = ({
  showOrder,
  authors,
  categories,
  filters,
  dispatch,
  handleClose
}) => {
  return (
    <Accordion
      defaultActiveKey={['0', '1']}
      alwaysOpen
      className="custom-accordion"
    >
      <Accordion.Item eventKey="0" className="border-0 p-0">
        <Accordion.Header className="border-top ">AUTOR</Accordion.Header>
        <Accordion.Body className="pt-0">
          {authors.map((author) => (
            <Form.Check
              key={author.id}
              type={'checkbox'}
              label={author.name}
              id={`${author.id}-${author.name}`}
              checked={filters.author.includes(author.id)}
              onChange={() => {
                dispatch({ type: ACTIONS.SET_AUTHOR, payload: author.id });
                handleClose();
              }}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="border-0 ">
        <Accordion.Header className="border-top ">CATEGORIA</Accordion.Header>
        <Accordion.Body className="pt-0">
          {categories.map((category) => (
            <Form.Check
              key={category.id}
              type={'checkbox'}
              label={category.name}
              id={`${category.id}-${category.name}`}
              checked={filters.category.includes(category.id)}
              onChange={() => {
                dispatch({ type: ACTIONS.SET_CATEGORY, payload: category.id });
                handleClose();
              }}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      {showOrder && (
        <Accordion.Item eventKey="1" className="border-0 ">
          <Accordion.Header className="border-top">ORDER</Accordion.Header>
          <Accordion.Body className="pt-0">
            <Form.Check
              type={'checkbox'}
              label="Más recientes"
              id={`1-MR`}
              checked={filters.order === 'MR'}
              onChange={() => {
                dispatch({ type: ACTIONS.SET_ORDER, payload: 'MR' });
                handleClose();
              }}
            />
            <Form.Check
              type={'checkbox'}
              label="Calificación mas alta"
              id={`2-DESC`}
              checked={filters.order === 'DESC'}
              onChange={() => {
                dispatch({ type: ACTIONS.SET_ORDER, payload: 'DESC' });
                handleClose();
              }}
            />
            <Form.Check
              type={'checkbox'}
              label="Calificación mas baja"
              id={`3-ASC`}
              checked={filters.order === 'ASC'}
              onChange={() => {
                dispatch({ type: ACTIONS.SET_ORDER, payload: 'ASC' });
                handleClose();
              }}
            />
          </Accordion.Body>
        </Accordion.Item>
      )}
    </Accordion>
  );
};

export default FilterAccordion;
