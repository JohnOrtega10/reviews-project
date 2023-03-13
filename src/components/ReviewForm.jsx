import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { RatingStar } from './RatingStar';
import { LoadingContext } from '../LoadingProvider';
import api from '../utils/axios';
import getConfig from '../utils/getConfig';

const ReviewForm = ({
  showReviewForm,
  handleShowReview,
  bookId,
  reloadReviewsFn
}) => {
  const refReview = useRef(null);
  const { setIsLoading } = useContext(LoadingContext);

  const [heightReviewForm, setHeightReviewForm] = useState(0);

  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setHeightReviewForm(refReview.current.clientHeight);
  }, []);

  useEffect(() => {
    const effect = () => {
      if (showReviewForm) {
        refReview.current.style.height = `${heightReviewForm}px`;
      } else {
        refReview.current.style.height = 0;
      }
    };

    effect();
  }, [showReviewForm, heightReviewForm]);

  const handleRating = (value) => {
    setRating(value);
  };

  const createReview = () => {
    setIsLoading(true);
    const data = { rating, text, bookId };
    api
      .post('/reviews', data, getConfig())
      .then(() => {
        setRating(0);
        setText('');
        handleShowReview();
        reloadReviewsFn();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setShowError(true);
        } else {
          console.log(err.response.data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column mb-4 review" ref={refReview}>
        <h4 className="mb-3">ESCRIBE TU RESEÑA</h4>
        <div className="mb-3">
          <h6>Calificación:</h6>
          <RatingStar rating={rating} handleRating={handleRating} />
        </div>
        <div className="mb-3">
          <h6>Reseña:</h6>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
        </div>
        {showError && (
          <Alert variant="danger" className="py-2">
            Ya has creado una reseña anteriormente.
          </Alert>
        )}
        <div className="ms-auto">
          <Button
            variant="primary"
            className="me-2"
            style={{ width: '100px' }}
            onClick={handleShowReview}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            className="px-4"
            style={{ width: '100px' }}
            onClick={createReview}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
