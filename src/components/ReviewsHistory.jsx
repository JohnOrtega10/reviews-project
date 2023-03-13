import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingContext } from '../LoadingProvider';
import RatingStartStatic from './RatingStartStatic';
import ReviewText from './Review';
import api from '../utils/axios';
import getConfig from '../utils/getConfig';

const ReviewsHistory = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [reloadReviews, setReloadReviews] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/users/profile/reviews', getConfig())
      .then((res) => setReviews(res.data.data.reviews))
      .catch((err) => console.log(err))
      .finally(setIsLoading(false));
  }, [reloadReviews, setIsLoading]);

  const reloadReviewsFn = () => {
    setReloadReviews(!reloadReviews);
  };

  return (
    <div>
      {reviews.length ? (
        <div>
          {reviews.map((review) => (
            <Card className="mb-4 border-0" key={review.id}>
              <Link to={`/books/${review.book?.id}`} className="link">
                <div className="d-flex align-items-center">
                  <div className="image-book me-3">
                    <img src={review.book?.coverImage} alt="" />
                  </div>
                  <div>
                    <h5>{review.book?.title}</h5>
                    <div className="d-flex">
                      <RatingStartStatic rating={review.book?.rating} />
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-md-5 pt-2">
                <ReviewText review={review} reloadReviewsFn={reloadReviewsFn} />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <p>No se ha registrado ninguna reseña en tu historial. </p>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => navigate('/books')}
          >
            Ver libros
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsHistory;
