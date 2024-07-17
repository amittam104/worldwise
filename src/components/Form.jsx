// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigator = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geolocationError, setGeolocationError] = useState("");

  useEffect(
    function () {
      async function getClickedPosition() {
        try {
          setIsLoadingGeolocation(true);
          setGeolocationError("");
          const res = await fetch(
            `${BASE_URl}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "This does not seem to be any city. Please click somewhere else. 😅"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setGeolocationError(error.message);
        } finally {
          setIsLoadingGeolocation(false);
        }
      }

      getClickedPosition();
    },
    [lat, lng]
  );

  if (geolocationError) return <Message message={geolocationError} />;

  if (isLoadingGeolocation) return <Spinner />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigator(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
