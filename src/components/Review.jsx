import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { LoadingContext } from '../LoadingProvider';
import { RatingStar } from './RatingStar';
import { formatterDate } from '../utils/formatterDate';
import DelimitText from './DelimitText';
import RatingStartStatic from './RatingStartStatic';
import getConfig from '../utils/getConfig';
import api from '../utils/axios';

const Review = ({ review, reloadReviewsFn, showOptions = true }) => {
  const { setIsLoading } = useContext(LoadingContext);

  const [showEditReview, setShowEditReview] = useState(false);
  const [text, setText] = useState(review.text);
  const [rating, setRating] = useState(review.rating);

  const handleShowEditReview = () => {
    setShowEditReview(!showEditReview);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const updateReview = () => {
    const data = { newRating: rating, newText: text };
    setIsLoading(true);
    api
      .put(`/reviews/${review.id}`, data, getConfig())
      .then(() => {
        setShowEditReview(false);
        reloadReviewsFn();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const deleteReview = () => {
    setIsLoading(true);
    api
      .delete(`/reviews/${review.id}`, getConfig())
      .then(() => reloadReviewsFn())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {!showEditReview ? (
        <Card className="border-0 border-top mb-2">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-4">
                <div className="image-review">
                  <img src={review.user?.profilePicture} alt="foto de perfil" />
                </div>
                <div>
                  <h6 className="mb-0">
                    {review.user?.firstName} {review.user?.lastName}
                  </h6>
                  <div className="d-flex flex-column flex-md-row">
                    <RatingStartStatic rating={review.rating} />
                    <span className="text-muted ms-md-2">
                      {formatterDate(review.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
              {showOptions && (
                <DropdownButton
                  id="dropdown-basic-button"
                  variant=""
                  title="opciones"
                >
                  <Dropdown.Item onClick={handleShowEditReview}>
                    <FontAwesomeIcon icon={faPen} className="me-2" />
                    <span>Modificar</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={deleteReview}>
                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                    <span>Eliminar</span>
                  </Dropdown.Item>
                </DropdownButton>
              )}
            </div>
            <div className="mt-2">
              <DelimitText text={review.text} maxLength={'500'} />
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 border-top">
          <Card.Body>
            <div className="d-flex flex-column mb-5 review">
              <div className="mb-3">
                <h6>Calificación:</h6>
                <RatingStar rating={rating} handleRating={handleRating} />
              </div>
              <div className="mb-3">
                <h6>Reseña:</h6>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="ms-auto ">
                <Button
                  variant="primary"
                  className=" me-2 px-4"
                  onClick={handleShowEditReview}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  className="ms-auto px-4"
                  onClick={updateReview}
                >
                  Guardar
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Review;
