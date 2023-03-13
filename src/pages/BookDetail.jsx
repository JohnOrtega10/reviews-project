import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Tab,
  Table,
  Tabs
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { LoadingContext } from '../LoadingProvider';
import ReviewText from '../components/Review';
import CardBook from '../components/CardBook';
import ReviewForm from '../components/ReviewForm';
import getConfig from '../utils/getConfig';
import api from '../utils/axios';

const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setIsLoading } = useContext(LoadingContext);

  const [book, setBook] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const [relatedBooks, setRelatedBooks] = useState([]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reloadReviews, setReloadReviews] = useState(false);
  const [orderFilter, setOrderFilter] = useState('MR');

  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/books/${id}`)
      .then((res) => setBook(res.data.data.book))
      .finally(() => setIsLoading(false));
  }, [reloadReviews, id, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/books/reviews/${id}/?order=${orderFilter}`)
      .then((res) => setReviews(res.data.data.reviews))
      .finally(() => setIsLoading(false));
  }, [reloadReviews, orderFilter, id, setIsLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    api
      .get(`/books/related/${id}`)
      .then((res) => setRelatedBooks(res.data.data.books))
      .finally(() => setIsLoading(false));
  }, [id, setIsLoading]);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      api
        .get('/users/profile', getConfig())
        .then((res) => setCurrentUser(res.data.data.user))
        .finally(() => setIsLoading(false));
    }
  }, [id, token, setIsLoading]);

  const handleShowReview = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    setShowReviewForm(!showReviewForm);
  };

  const changeOrderFilter = (e) => {
    setOrderFilter(e.target.value);
  };

  const reloadReviewsFn = () => {
    setReloadReviews(!reloadReviews);
  };

  return (
    <Container className="py-5 min-vh-100">
      <h6 className="mb-0 d-flex align-items-center mb-5 me-auto">
        <Link to="/">Inicio</Link>
        <FontAwesomeIcon
          icon={faCircle}
          style={{ fontSize: '0.4rem', color: '#6a6f73' }}
          className="mx-2"
        />
        Book
      </h6>
      <Row>
        <Col lg={9}>
          <h3 className="upper-case mb-3">{book.title}</h3>
          <div className="img-detail d-flex justify-content-center m-3">
            <img src={book.coverImage} alt="" />
          </div>
          <Tabs defaultActiveKey="summary" className="mb-3" justify>
            <Tab eventKey="summary" title="RESUMEN">
              <p className="justify">{book.summary}</p>
            </Tab>
            <Tab eventKey="details" title="DETALLES">
              <Table striped>
                <tbody>
                  <tr>
                    <td>Fecha de publicación</td>
                    <td>{book.publicationDate}</td>
                  </tr>
                  <tr>
                    <td>Autor</td>
                    <td>{book.author?.name}</td>
                  </tr>
                  <tr>
                    <td>Categoria</td>
                    <td>{book.category?.name}</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>

          <h4 className="mt-5 upper-case">Reseñas</h4>
          <div className="mb-4 d-flex flex-column flex-sm-row align-sm-items-center ">
            <h5 className="mb-0 d-flex align-items-center">
              <FontAwesomeIcon icon={faStar} />
              <span className="ms-2">
                {book.rating?.toFixed(1)} valoración del libro
              </span>
              <FontAwesomeIcon
                icon={faCircle}
                style={{ fontSize: '0.4rem', color: '#6a6f73' }}
                className="mx-2"
              />
              <span>{reviews.length} reseñas</span>
            </h5>
            <Button
              variant="primary"
              className="ms-auto mt-3 mt-sm-0 mb-3"
              onClick={handleShowReview}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <span className="ms-2">Escribe una reseña</span>
            </Button>
          </div>
          <ReviewForm
            showReviewForm={showReviewForm}
            handleShowReview={handleShowReview}
            reloadReviewsFn={reloadReviewsFn}
            bookId={book.id}
          />
          {reviews.length ? (
            <div className="d-flex mb-3">
              <FloatingLabel
                controlId="floatingSelect"
                label="Ordenar por:"
                className="ms-auto form"
                size="sm"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  className="border-0 form"
                  onChange={changeOrderFilter}
                >
                  <option value="MR">Más recientes</option>
                  <option value="DESC">Calificación mas alta</option>
                  <option value="ASC">Calificación mas Baja</option>
                </Form.Select>
              </FloatingLabel>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                className="mb-3"
                onClick={handleShowReview}
              >
                <span className="ms-2">
                  Sé el primero en escribir una reseña
                </span>
              </Button>
            </div>
          )}
          {reviews.map((review) => (
            <ReviewText
              key={review.id}
              review={review}
              reloadReviewsFn={reloadReviewsFn}
              showOptions={review.userId === currentUser.id}
            />
          ))}
        </Col>
        <Col>
          <h5 className="mt-5 mt-lg-0">LIBROS RELACIONADOS</h5>
          {relatedBooks.map((book) => (
            <Row key={book.id}>
              <CardBook book={book} />
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetail;
