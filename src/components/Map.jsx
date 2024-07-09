import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "./Form";
import styles from "./Map.module.css";

function Map() {
  const navigator = useNavigate();

  const [searchParam, setSearchparam] = useSearchParams();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigator("form")}>
      <h1>Map</h1>
      <h2>
        Position: lat={lat}, lng={lng}{" "}
      </h2>
      <button
        onClick={function handlesetPosition() {
          setSearchparam({ lat: 20, lng: 30 });
        }}
      >
        Set Position
      </button>
    </div>
  );
}

export default Map;
