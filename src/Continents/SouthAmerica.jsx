import { React } from 'react'
import '/src/css/AllContinents.css'
import { Link } from 'react-router-dom';


const SouthAmerica = () => {

       
        // Flight prices to major destinations
    const southAmericaInfo = {
        Area: '17,840,000 square kilometers',
        Population: '422,500,000',
        Countries: '12',
        CapitalCities: 'Mexico City, Buenos Aires, Sao Paulo',
        Languages: 'Spanish, Portuguese, and more',
        Currency: 'Peso, Real, and more',
    };

    const flightPrices = [
        { destination: 'Mexico', price: '3200-3600₪', imageUrl: '/images/mexico.jpg' },
        { destination: 'Argentina', price: '3600-4000₪', imageUrl: '/images/argentina.jpg' },
        { destination: 'Colombia', price: '2500-3000₪', imageUrl: '/images/colombia.jpeg' },
        { destination: 'Brazil', price: '3000-3200₪', imageUrl: '/images/Brazil.jpeg' },
    ];

    return (
        <div className="continent-container">
            <h1>South America</h1>
            <p>Area: {southAmericaInfo.Area}</p>
            <br/>
            <p>Population: {southAmericaInfo.Population}</p>
            <br/>
            <p>Countries: {southAmericaInfo.Countries}</p>
            <br/>
            <p>Capital Cities: {southAmericaInfo.CapitalCities}</p>
            <br/>
            <p>Official languages: {southAmericaInfo.Languages}</p>
            <br/>
            <p>Currency: {southAmericaInfo.Currency}</p>
            <br/><br/>
            <h2>Flight prices to major destinations</h2>
            <div className="images-container">
            {flightPrices.map((flight, index) => (
    <div key={index} className="image-wrapper">
    <img src={flight.imageUrl} alt={`image ${index + 1} of ${flight.destination}`} />
    <span className="image-caption">{flight.destination}</span>
    <span className="flight-price">{flight.price}</span>
    <Link to="/continents">Back to All Continents</Link>
    </div>
    ))}
            </div>
        </div>
 );
};

export default SouthAmerica

