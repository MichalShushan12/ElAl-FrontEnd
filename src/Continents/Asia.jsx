import { React } from 'react'
import '/src/css/AllContinents.css'
import { Link } from 'react-router-dom';


const Asia = () => {

  // Data about Asia
  
  const asiaInfo = {
    Area: '44,579,000 square kilometers',
    Population: '4.6 billion (as of 2021)',
    Countries: '49',
    CapitalCities: 'Beijing, Tokyo, New Delhi, and more',
    Languages: 'Mandarin, Hindi, Japanese, and more',
    Currency: 'Yuan, Yen, Rupee, and more',
};
   
    // Flight prices to major destinations
    const flightPrices = [
    { destination: 'China', price: '4500-5000₪', imageUrl: '/images/china.jpeg' },
    { destination: 'Japan', price: '4800-5250₪', imageUrl: '/images/japan.jpeg'},
    { destination: 'Thailand', price: '4500-5500₪', imageUrl: '/images/thailand.jpeg'},
    ];
   
    return (
    <div className="continent-container">    
    <br/> <br/><br/>
    <h1>Asia</h1>
    <br/> <br/>
    <p>Area: {asiaInfo.Area}</p>
    <br/>
    <p>Population: {asiaInfo.Population}</p>
    <br/>
    <p>Countries: {asiaInfo.Countries}</p>
    <br/>
    <p>Capital cities: {asiaInfo.CapitalCities}</p>
    <br/>
    <p>Official languages: {asiaInfo.Languages}</p>
    <br/>
    <p>Currency: {asiaInfo.Currency}</p>
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


export default Asia