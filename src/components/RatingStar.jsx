import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

export const RatingStar = ({ rating, handleRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarHover = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <FontAwesomeIcon
          key={i}
          icon={i <= rating || i <= hoverRating ? solidStar : emptyStar}
          onClick={() => handleRating(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleMouseLeave}
          className="fa-lg"
        />
      ))}
    </div>
  );
};
