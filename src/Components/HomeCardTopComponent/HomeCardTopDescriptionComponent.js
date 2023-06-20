import "./HomeCardTopComponent.css";

export default function HomeCardTopDescriptionComponent(props) {
  return (
    <p style={{ marginTop: 0, marginBottom: 0 }} className="cardInfo">
      {props.value}
    </p>
  );
}
