import React, { useState, useEffect } from 'react';
import {getOrdersByUserId, deleteOrder, updateOrder } from '../services/ordersService';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId, selectCurrentUser, setUser} from '../../states/userSlice';
import { selectUserOrders, removeFromOrder, addToOrder, updateTheOrder } from '../../states/orderSlice';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Chip,
    IconButton,
    Avatar,
    Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 9,
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
}));

const StyledChip = styled(Chip)(({ theme, status }) => ({
    backgroundColor: status === 'paid' ? theme.palette.success.main : theme.palette.warning.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
}));
const Orders = () => {
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loggedInUser = useSelector(selectCurrentUser);
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const orders = useSelector((state) => selectUserOrders(state));

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) return;
            setIsLoading(true);
            setError(null);
            try {
                const userDataOrders = await getOrdersByUserId(userId);
                if (Array.isArray(userDataOrders)) {
                    userDataOrders.forEach(order => {
                      dispatch(addToOrder(order));
                    });
                  } else {
                    console.error('Unexpected response format:', userOrdersData);
                    setError('Unexpected data format received from the server.');
                  }
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [userId, dispatch, orders]);


    useEffect(() => {
        filterOrders(selectedStatus);
    }, [orders, selectedStatus]);

    const filterOrders = (status) => {
        if (status === '') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.paymentStatus === status));
        }
        setSelectedStatus(status);
    };


    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);
            dispatch(removeFromOrder(orderId));
        } catch (err) {
            console.error('Failed to delete order:', err);
        }
    };

    const handleUpdateOrder = async (order) => {
        if (order.paymentStatus !== 'half paid') {
            console.error('Only half paid orders can be updated to paid');
            return;
        }
        try {
            const updatedOrder = { ...order, paymentStatus: 'paid' };
            await updateOrder(updatedOrder);
            dispatch(updateTheOrder(updatedOrder));
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    
    if (!loggedInUser) {
        return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>Please log in to view your orders.</Typography>;
    }

    

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); 
        if (!loggedInUser && storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [loggedInUser, dispatch]);

    
    


    if (!loggedInUser) {
        return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>Please log in to view your orders.</Typography>;
    }
    

    return (
        <Box sx={{ flexGrow: 1, padding: 3, background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#333', textAlign: 'center', marginBottom: 4 }}>
            Welcome {loggedInUser.userName}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 9 , width: '100vh'}}>
                        <br/>
                        <InputLabel id="filter-status-label">Choose Payment Status</InputLabel>

                        <Select
                            labelId="filter-status-label"
                            value={selectedStatus}
                            onChange={(e) => filterOrders(e.target.value)}
                            label="Choose Payment Status"
                        >
                            <MenuItem value="">All Orders</MenuItem>
                            <MenuItem value="paid">Paid Tickets</MenuItem>
                            <MenuItem value="half paid">Half Paid Tickets</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <Grid item xs={12} sm={6} md={4} key={order.orderId}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2 }}>
                                            <FlightTakeoffIcon />
                                        </Avatar>
                                        <Typography variant="h6" component="div">
                                            Order #{order.orderId.slice(-4)}
                                        </Typography>
                                    </Box>
                                    <Typography color="textSecondary" gutterBottom>
                                        Date: {new Date(order.orderDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        ₪{order.totalAmount.toFixed(2)}
                                    </Typography>
                                    <StyledChip
                                        label={order.paymentStatus}
                                        status={order.paymentStatus}
                                        sx={{ marginTop: 1 }}
                                    />
                                </CardContent>
                                <Divider sx={{ margin: '0 16px' }} />
                                <CardActions>
                                    <Button
                                        size="small"
                                        startIcon={<UpdateIcon />}
                                        onClick={() => handleUpdateOrder(order)}
                                        disabled={order.paymentStatus === 'paid'}
                                    >
                                        Update
                                    </Button>
                                    {order.paymentStatus === 'paid' && (
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeleteOrder(order.orderId)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </CardActions>
                            </StyledCard>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ textAlign: 'center', color: '#666' }}>
                            No orders found.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Orders;