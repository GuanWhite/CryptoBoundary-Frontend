import "./Card.less";

function Card(props) {
  return (
    <div className="card">
      <img className="card-img" src={props.image} alt={props.title} />
      <h2 className="card-title">{props.title}</h2>
      <p className="card-text">{props.description}</p>
    </div>
  );
}

export default Card;