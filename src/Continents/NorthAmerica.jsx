import { React } from 'react'
import '/src/css/AllContinents.css'
import { Link } from 'react-router-dom';


const NorthAmerica = () => {

 // Data on North America
 const northAmericaInfo = {
 Area: '24,709,000 square kilometers',
 Population: '592,296,233',
 Countries: '23',
 CapitalCities: 'New York, Los Angeles, Miami',
 Languages: 'English, Spanish, French, and more',
 Currency: 'US dollar, Canadian dollar, Mexican peso',
 };

 // Flight prices to major destinations
 const flightPrices = [
 { destination: 'New York', price: '3000-4600$', imageUrl: '/images/NY.jpg'},
 { destination: 'Los Angeles', price: '3600-4000$', imageUrl: '/images/La.jpg'},
 { destination: 'Miami', price: '4000-4300$', imageUrl: '/images/miami.jpeg'},
 { destination: 'Boston', price: '3600-4000$', imageUrl: '/images/boston.jpg'},
 { destination: 'Las Vegas', price: '2500-3600$', imageUrl: '/images/Las Vegas.jpg'},
 ];

 return (
<div className="continent-container">
 <br/> <br/><br/>
 <h1>North America</h1>
 <br/> <br/>

 <p>Area: {northAmericaInfo.Area}</p>
 <br/>

 <p>Population: {northAmericaInfo.Population}</p>
 <br/>

 <p>Countries: {northAmericaInfo.Countries}</p>
 <br/>

 <p>Capital Cities: {northAmericaInfo.CapitalCities}</p>
 <br/>

 <p>Official languages: {northAmericaInfo.Languages}</p>
 <br/>

 <p>Currency: {northAmericaInfo.Currency}</p>
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
export default NorthAmerica