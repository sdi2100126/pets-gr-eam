import "../styles/components.css";

export default function ReviewCard({ name, rating, review }) {
  return (
    <div className="review-card">
      <p className="review-text">"{review}"</p>
      <p className="review-author">{name} - {rating} ⭐</p>
    </div>
  );
}
