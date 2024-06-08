import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
  };

  useEffect(() => {
    if (byDateDesc.length > 0) {
      const interval = setInterval(nextCard, 5000);
      return () => clearInterval(interval);
    }
  }, [byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc.length > 0 ? (
        byDateDesc.map((event, idx) => (
          <div key={event.id || idx}> {/* Utilisation de event.id ou idx comme clé unique */}
            <div
              className={`SlideCard SlideCard--${
                index === idx ? "display" : "hide"
              }`}
            >
              <img src={event.cover} alt={event.title} />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div>{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => (
                  <input
                    key={`${event.id || idx}-${radioIdx}`} // Combinaison de event.id ou idx et radioIdx comme clé unique
                    type="radio"
                    name={`radio-button-${idx}`} // Utilisation de idx pour les noms de boutons radio
                    checked={index === radioIdx}
                    readOnly
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default Slider;
