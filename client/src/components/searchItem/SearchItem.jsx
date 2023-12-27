import "./searchItem.css";
import { Link } from 'react-router-dom';

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m</span>
        <span className="siTaxiOp">Besplatan taxi na aerodromu</span>
        <span className="siSubtitle">
          Studio apartman sa klimom i grijanjem
        </span>
        <span className="siFeatures">
          {item.desc}
        </span>
        <span className="siCancelOp">Besplatno otkazivanje </span>
        <span className="siCancelOpSubtitle">
          Napravite Vašu rezervaciju danas po povoljnoj cijeni!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice} KM</span>
          <span className="siTaxOp">Uključen PDV</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Pogledajte dostupnost</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
