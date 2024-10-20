import React,  { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom';
import { getAllContinents, getContinentById } from '../services/continentsService'
import '/src/css/Continents.css'

const Continents = () => {

    const [continentList, setContinentList] = useState([]);
    const [continentId, setContinentId] = useState('');
    const [fetchedContinent, setFetchedContinent] = useState(null); // משתמש שאוחזר לפי ID או שם
    
    
    const fetchData = async () => {
        try {
          const continents =   await getAllContinents();
          setContinentList(continents)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchData()
    },[])


    const continentMapping = {
        'North America': 'North America',
        'South America': 'SouthAmerica',
        'Europe': 'Europe',
        'Africa': 'Africa',
        'Asia': 'Asia',
    };

  return (
    <div className='continents-form'>
    <div>Continents</div>
    <div className='continents-images'>
        {continentList.map(c => (
            <div key={c.continentId}>
                <h2>{c.continentName}</h2>
                <Link to={`/continents/${continentMapping[c.continentName] || c.continentName}`}>
                    <img
                        src={c.image}
                        alt={c.continentName}
                    />
                </Link>
            </div>
        ))}
    </div>
    {fetchedContinent && (
        <div>
            <h3>Fetched Continent:</h3>
            <p>ContinentId: {fetchedContinent.continentId}</p>
            <p>ContinentName: {fetchedContinent.continentName}</p>
            <p>ContinentImage: {fetchedContinent.image}</p>
        </div>
    )}
</div>

  )
}

export default Continents