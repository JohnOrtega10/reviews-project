import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const RatingStartStatic = ({ rating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : emptyStar}
          className="fa-sm"
        />
      ))}
    </div>
  );
};

export default RatingStartStatic;
