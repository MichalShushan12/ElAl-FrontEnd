import React, { useState, useEffect } from 'react';
import '/src/css/Payment.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartProvider';
import { useSelector, useDispatch } from 'react-redux';
import { addToOrder } from '../../states/orderSlice';
import { selectUserId } from '../../states/userSlice';
import { getNewOrder } from '../services/ordersService';
import {Typography,} from '@mui/material';


const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { clearCart } = useCart();
    const userId = useSelector(selectUserId);
    const cart = useSelector((state) => state.cart);
    const [cardNumber, setCardNumber] = useState('');
    const [creditOwnerName, setCreditOwnerName] = useState('');
    const [creditOwnerId, setCreditOwnerId] = useState('');
    const [creditCvv, setCreditCvv] = useState('');
    const [cardType, setCardType] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [installments, setInstallments] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const calculatedTotal = calculateTotal();
        setTotalAmount(calculatedTotal);
    }, [cart]);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    };

    const detectCardType = (number) => {
        const firstDigit = number.charAt(0);
        if (firstDigit === '4') return 'Visa';
        if (firstDigit === '5') return 'MasterCard';
        if (firstDigit === '3') return 'American Express';
        return 'Unknown';
    };

    const getCardImage = (cardType) => {
        switch (cardType) {
            case 'Visa':
                return '/images/ויזה.png';
            case 'MasterCard':
                return '/images/מסטרדקארד.png';
            case 'American Express':
                return '/images/אמריקן.png';
            default:
                return null;
        }
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits

        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(formattedValue);
        setCardType(detectCardType(formattedValue));
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits (MMYY)

        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setExpiryDate(value);
    };

    const validateExpiryDate = (date) => {
        const [month, year] = date.split('/');
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        if (monthNum < 1 || monthNum > 12) return false;
        if (yearNum < 25) return false;
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            cardNumber.replace(/\s/g, '').length !== 16 ||
            !validateExpiryDate(expiryDate) ||
            creditOwnerId.length !== 9 ||
            creditCvv.length !== 3
        ) {
            setError('Please ensure all fields are correctly filled before submitting the payment.');
            return;
        }

        if (totalAmount <= 0) {
            setError('Payment cannot be processed with an amount of 0.');
            return;
        }

        if (!userId) {
            setError('The user has not been found, please login');
            return;
        }

        setError('');
        setFinalAmount(totalAmount);
        setPaymentComplete(true);

        try {
            const isPaymentSuccessful = Math.random() > 0.1;

            setPaymentReceived(isPaymentSuccessful);

            if (isPaymentSuccessful) {
                const paymentStatus = installments > 1 ? 'half paid' : 'paid';
                const orderRequest = {
                    UserId: userId,
                    TotalAmount: totalAmount,
                    PaymentStatus: paymentStatus,
                    OrderDate: new Date().toISOString(),
                };

                const newOrder = await getNewOrder(orderRequest);
                dispatch(addToOrder(newOrder));
                clearCart();
            } else {
                setError('Payment failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while processing your payment. Please try again.');
        }
    };

    useEffect(() => {
        if (paymentComplete && paymentReceived) {
            const timer = setTimeout(() => navigate('/'), 3000);
            return () => clearTimeout(timer);
        }
    }, [paymentComplete, paymentReceived, navigate]);

    const handleInstallmentsChange = (e) => {
        setInstallments(parseInt(e.target.value));
    };

    return (
        <div className='payment-containers'>
            <div className="payment-container">
                <br />
                <h2>Payment Details</h2>
                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="form-group">
                        <div className="card-input-wrapper" style={{ position: 'relative' }}>
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                required
                                maxLength="19"
                            />
                            {cardType && (
                                <img
                                    src={getCardImage(cardType)}
                                    alt={cardType}
                                    style={{
                                        position: 'absolute',
                                        paddingLeft: '450px',
                                        top: '53px',
                                        transform: 'translateY(-50%)',
                                        width: '45px',
                                        height: '30px',
                                    }}
                                />
                            )}
                        </div>
                        {cardType && (
                            <div className="card-type-name">
                                {cardType}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="ownername">Card's Owner Name:</label>
                        <input
                            type="text"
                            id="ownername"
                            name="ownername"
                            value={creditOwnerName}
                            onChange={(e) => setCreditOwnerName(e.target.value)}
                            placeholder=" "
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ownerid">Id: </label>
                        <input
                            type="text"
                            id="ownerid"
                            name='ownerid'
                            value={creditOwnerId}
                            onChange={(e) => setCreditOwnerId(e.target.value)}
                            placeholder=""
                            required
                            maxLength="9"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date:</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name='expiryDate'
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            required
                            maxLength="5"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="text"
                            id="cvv"
                            name='cvv'
                            value={creditCvv}
                            onChange={(e) => setCreditCvv(e.target.value)}
                            placeholder="123"
                            required
                            maxLength="3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="installments">Number of Installments:</label>
                        <select
                            id="installments"
                            name='installments'
                            value={installments}
                            onChange={handleInstallmentsChange}
                        >
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br/>
                    <Typography variant="h5" sx={{ mb: 2 }}>
          Total Amount: {totalAmount}$
        </Typography>
        
                    <button type="submit" className="submit-button">
                        Confirm Payment
                    </button>
                </form>

     

                {paymentComplete && (
                    <div className={`payment-status ${paymentReceived ? 'success' : 'failed'}`}>
                        {paymentReceived ? (
                            <div>
                                Payment successful! Total amount paid: {finalAmount}₪
                                <br />
                                You will be redirected to the home page shortly.
                            </div>
                        ) : (
                            <div>
                                Payment failed. Please try again.
                            </div>
                        )}
                    </div>
                )}

                {error && <div className="payment-error">{error}</div>}
            </div>
        </div>
    );
};

export default Payment;
