import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { OrderInfo } from "./../../types";
import axios from 'axios';

export const Order: FC = () => {
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { orderInfo } = useTypedSelector((state) => state.order);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!orderInfo) {
      navigate('/');
      return;
    }

    if (orderInfo && !order) {
      setIsLoading(true);
      axios.get(`http://localhost:80/api/orders/${orderInfo.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setOrder(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
          setError('Something went wrong!');
          setIsLoading(false); 
        });
    }
  }, [orderInfo, order, setOrder, navigate]);

  return (
    <Container maxWidth="md"> 
      {isLoading && <CircularProgress />} 
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      {order && (
        <div>
          <Typography
            sx={{
              p: 2,
            }}
            variant="h2"
          >
            Thank you for your order!
          </Typography>
          <Typography variant='h3' gutterBottom>Order Details</Typography>
          <Typography variant='h4' gutterBottom>Order №{order.id}</Typography>
          <Typography variant='h5' gutterBottom>Total: ${order.total}</Typography>
          <Typography variant='h5' gutterBottom>
            Created at: {new Date(order.created_at).toLocaleString()}
          </Typography>
          <Typography variant='h5' gutterBottom>Name: {order.user.name}</Typography>
          <Typography variant='h5' gutterBottom>Phone number: {order.user.phone_number}</Typography>
          <Typography variant='h5' gutterBottom>Shipping address: {order.user.shipping_address}</Typography>
          <Button
            variant='contained'
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Back to Shop
          </Button>
        </div>
      )}
    </Container>
  );
};
