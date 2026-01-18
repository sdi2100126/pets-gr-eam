import "../styles/components.css";

export default function VetCard({ name, rating, location, description }) {
  return (
    <div className="vet-card">
      <h3 className="vet-name">{name}</h3>
      <p className="vet-location">{location}</p>
      <p className="vet-rating">Rating: {rating} ⭐</p>
      <p className="vet-description">{description}</p>
    </div>
  );
}
