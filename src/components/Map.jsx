import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParam, setSearchparam] = useSearchParams();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div className={styles.mapContainer}>
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
