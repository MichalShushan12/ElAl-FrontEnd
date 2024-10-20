import { React } from 'react'
import '/src/css/AllContinents.css'
import { Link } from 'react-router-dom';


const Europe = () => {

    // Data about Europe
    const europeInfo = {
    Area: '10,180,000 square kilometers',
    Population: '748,546,000 (as of July 2022)',
    Countries: '50',
    CapitalCities: 'London, Paris, Rome, and more',
    Languages: 'English, French, German, and more',
    Currency: 'Euro, Pound Sterling, and more',
    };
   
    // Flight prices to major destinations
    const flightPrices = [
    { destination: 'Spain', price: '1050-2000₪', imageUrl: '/images/spain.jpeg' },
    { destination: 'Italy', price: '900-2000₪', imageUrl: '/images/italy.jpeg'},
    { destination: 'UK', price: '2500-3500₪', imageUrl:'/images/UK.jpg' },
    { destination: 'Germany', price: '2000-3000₪', imageUrl: '/images/germany.jpeg' },
    { destination: 'France', price: '4550-5000₪', imageUrl: '/images/france.jpeg' },
    ];
   
    return (
    <div className="continent-container">
    <br/> <br/><br/> 
    <h1>Europe</h1>
    <br/> <br/>
   
    <p>Area: {europeInfo.Area}</p>
    <br/>
   
    <p>Population: {europeInfo.Population}</p>
    <br/>
   
    <p>Countries: {europeInfo.Countries}</p>
    <br/>
   
    <p>Capital cities: {europeInfo.CapitalCities}</p>
    <br/>
   
    <p>Official languages: {europeInfo.Languages}</p>
    <br/>
   
    <p>Currency: {europeInfo.Currency}</p>
   
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
   
   export default Europe