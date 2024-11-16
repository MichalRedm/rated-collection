import "./StarRating.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFull, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  if (rating > maxRating) {
    rating = maxRating;
  } else if (rating < 0) {
    rating = 0;
  }

  return (
    <div className="star-rating">
      {[
        ...Array(Math.floor(rating)).fill(<FontAwesomeIcon icon={faStarFull} />),
        ...(rating % 1 !== 0 ? [<FontAwesomeIcon icon={faStarHalfStroke} />] : []),
        ...Array(Math.floor(maxRating - rating)).fill(<FontAwesomeIcon icon={faStarEmpty} />)
      ]}
    </div>
  );
}

export default StarRating;
