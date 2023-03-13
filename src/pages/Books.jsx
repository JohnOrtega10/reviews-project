import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Offcanvas,
  Row
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookAtlas,
  faFilter,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { LoadingContext } from '../LoadingProvider';
import FilterAccordion from '../components/FilterAccordion';
import CardBook from '../components/CardBook';
import api from '../utils/axios';
import {
  ACTIONS,
  filtersInitialState,
  filtersReducer
} from '../reducers/filtersReducer';

const Home = () => {
  const [filters, dispatch] = useReducer(filtersReducer, filtersInitialState);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { setIsLoading } = useContext(LoadingContext);

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api
      .post('books/filtered', filters)
      .then((res) => setBooks(res.data.data.books))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [filters, setIsLoading]);

  useEffect(() => {
    api
      .get('/books/authors')
      .then((res) => setAuthors(res.data.data.authors))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  useEffect(() => {
    api
      .get('/books/categories')
      .then((res) => setCategories(res.data.data.categories))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <Container className="py-5 min-vh-100">
      <Row>
        <Col lg={3}>
          <Card className="border-0 d-none d-lg-block">
            <Card.Body>
              <Card.Title className="upper-case mb-3">Filtros</Card.Title>
              <FilterAccordion
                showOrder={false}
                authors={authors}
                categories={categories}
                filters={filters}
                dispatch={dispatch}
                handleClose={handleClose}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4 ">
            <p>{books.length} Libros econtrados</p>
            <FloatingLabel
              controlId="floatingSelect"
              label="Ordenar por: "
              className="d-none d-lg-block"
            >
              <Form.Select
                aria-label="Floating label select example"
                className="border-0 "
                value={filters.order}
                onChange={(e) =>
                  dispatch({ type: ACTIONS.SET_ORDER, payload: e.target.value })
                }
              >
                <option value="MR">Más recientes</option>
                <option value="DESC">Calificación más alta</option>
                <option value="ASC">Calificación más baja</option>
              </Form.Select>
            </FloatingLabel>
          </div>

          <InputGroup className="mb-3 mb-lg-5">
            <Form.Control
              placeholder="¿Qué libro estas buscando?"
              value={filters.query}
              onChange={(e) =>
                dispatch({ type: ACTIONS.SET_QUERY, payload: e.target.value })
              }
            />
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </InputGroup>

          <div className="d-flex justify-content-end">
            <Button className="bg-transparent border-0  d-lg-none mb-3">
              <FontAwesomeIcon
                icon={faFilter}
                onClick={handleShow}
                className="text-muted"
              />
            </Button>
            <Offcanvas
              show={show}
              onHide={handleClose}
              placement={'end'}
              name={'end'}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>FILTROS</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <FilterAccordion
                  showOrder={true}
                  authors={authors}
                  categories={categories}
                  filters={filters}
                  dispatch={dispatch}
                  handleClose={handleClose}
                />
              </Offcanvas.Body>
            </Offcanvas>
          </div>

          {books.length ? (
            <Row xs={1} md={2} lg={3}>
              {books.map((book) => (
                <Col key={book.id} className="mb-3">
                  <CardBook book={book} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <FontAwesomeIcon icon={faBookAtlas} className="fa-5x mb-2" />
              <h3>Lo sentimos, no encontramos ningún resultado.</h3>
              <p>Verifica los filtros de busqueda</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
