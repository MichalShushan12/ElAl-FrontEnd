import { React } from 'react'
import '/src/css/AllContinents.css'
import { Link } from 'react-router-dom';

const Africa = () => {

// Data on Africa
const africaInfo = {
    Area: '30,370,000 square kilometers',
    Population: '1.3 billion',
    Countries: '54',
    CapitalCities: 'Lagos, Kinshasa, Cairo, Abigail, Nairobi',
    Languages: 'Arabic, English, French, and more',
    Currency: 'new shekels, US dollar, euro, and more',
    };
   
    // Flight prices to major destinations in Africa
    const flightPrices = [
    { destination: 'South Africa', price: '3800-5080₪', imageUrl: '/images/south africa.jpg'},
    { destination: 'Ethiopia', price: '3000-5050₪', imageUrl: '/images/ethiopia.jpeg'},
    { destination: 'Nigeria', price: '4000-5060₪', imageUrl: '/images/nigeria.jpeg'},
    ];
   
    return (
        <div className="continent-container">
    <br/> <br/><br/> 
   <h1>Africa</h1>
   <br/> <br/>
   
   <p>Area: {africaInfo.Area}</p>
   <br/>
   
   <p>Population: {africaInfo.Population}</p>
   <br/>
   
   <p>Countries: {africaInfo.Countries}</p>
   <br/>
   
   <p>Capital cities: {africaInfo.CapitalCities}</p>
   <br/>
   
   <p>Official languages: {africaInfo.Languages}</p>
   <br/>
   
   <p>Currency: {africaInfo.Currency}</p>
   <br/> <br/>
   
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
   
   export default Africa