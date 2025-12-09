import "./Stars.css";

const Stars = ({ rating }) => {
  const number = Math.round(rating);
  return <p>{`⭐️`.repeat(number / 2)}</p>;
};

export default Stars;
