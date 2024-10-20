import React, { useState, useEffect } from 'react';
import { getDestinations } from '../services/destinationsService';
import { useCart } from '../pages/CartProvider';
import DateTimePicker from 'react-datetime-picker';
import '/src/css/Destinations.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

const Destinations = () => {

    const [value, onChange] = useState(new Date());
    const [selectedDestinationId, setSelectedDestinationId] = useState('');
    const [destinationList, setDestinationList] = useState([]);
    const [fetchedDestination, setFetchedDestination] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null); // Changed to null
    const { addToCart, removeFromCart } = useCart();
    const [quantities, setQuantities] = useState({});

    
        const fetchData = async () => {
            try {
                const destinations = await getDestinations();
                setDestinationList(destinations);
                const initialQuantities = destinations.reduce((acc, d) => {
                    acc[d.destinationId] = 0;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            } catch (error) {
                console.log(error);
            }
        };

    useEffect(() => {

        fetchData();
    }, []);

    const handleDestinationChange = (e) => {
        setSelectedDestinationId(e.target.value);
    };


    const handleFindTicket = () => {
        const destination = destinationList.find(d => d.destinationId === selectedDestinationId);
        setSelectedDestination(destination);
    };

    const handleAddToCart = (destination) => {
        addToCart(destination);
        setQuantities(prev => ({
            ...prev,
            [destination.destinationId]: prev[destination.destinationId] + 1
        }));
    };
    
    const handleRemoveFromCart = (destination) => {
        removeFromCart(destination);
        setQuantities(prev => ({
            ...prev,
            [destination.destinationId]: Math.max(0, prev[destination.destinationId] - 1)
        }));
    };

    return (
        <>
            <div className='destinations-form'>
                <div className='schedule-section'>
                    <h3>Schedule Your Flight</h3>

                    <DateTimePicker 
                        onChange={onChange}
                        value={value}
                        showTimeSelect
                        className='date-time-picker'
                    />

                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <select
                        value={selectedDestinationId}
                        onChange={handleDestinationChange}
                        className='destination-select'
                    >
                        <option value="">Select a destination</option>
                        {destinationList.map((d) => (
                            <option key={d.destinationId} value={d.destinationId}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleFindTicket}>Find Ticket</button>
                </div>

                {selectedDestination && (
                    <div className='destination-item'>
                        <img src={selectedDestination.img} alt={selectedDestination.name} />
                        <div className='destination-info'>
                            <h4>{selectedDestination.name}</h4>
                            <p>{selectedDestination.departureAirport} to {selectedDestination.returnAirport}</p>
                            <p>{selectedDestination.price} {selectedDestination.currencyPayment}</p>
                        </div>
                        <div className='quantity-controls'>
                            <button onClick={() => handleRemoveFromCart(selectedDestination)}>-</button>
                            <span>{quantities[selectedDestination.destinationId]}</span>
                            <button onClick={() => handleAddToCart(selectedDestination)}>+</button>
                        </div>
                    </div>
                )}


            {fetchedDestination && (
                <div>
                    <h3>Fetched Destination:</h3>
                    <p>Id: {fetchedDestination .destinationId}</p>
                    <p>Name: {fetchedDestination .name}</p>
                    <p>DepartureAirport: {fetchedDestination .departureAirport}</p>
                    <p>ReturnAirport: {fetchedDestination .returnAirport}</p>
                    <p>Price: {fetchedDestination .price}</p>
                    <p>CurrencyPayment: {fetchedDestination .currencyPayment}</p>
                </div>
            )}
            </div>
        </>
    );
}

export default Destinations;