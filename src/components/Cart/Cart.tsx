import { Dispatch, SetStateAction, FC, useEffect } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";
import { useActions } from "./../../hooks/useActions";
import { useTypedSelector } from "./../../hooks/useTypedSelector";
import { OrderProduct } from "./../../types";

import axios from "axios";

interface CartProps {
  setShowCart: Dispatch<SetStateAction<boolean>>,
}

export const Cart: FC<CartProps> = ({ setShowCart }) => {
  const navigate = useNavigate();
  const { setOrderInfo } = useActions();
  const { addItem, removeItem, removeAllItems, clearCart } = useActions();

  const cart = useTypedSelector(state => state.cart);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('access_token');
    if (!isAuthenticated) {
      setShowCart(false); 
      navigate("/register");
    }
  }, [navigate, setShowCart]);

  const getItemCount = (id: number) => {
    return cart.filter(item => item.id === id).length;
  };

  const getUniqueIds = () => {
    return Array.from(new Set(cart.map(item => item.id)));
  };

  const handleAddItem = (id: number) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      addItem(item);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeItem({ id });
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleConfirmOrder = async () => {
    const productObject: Record<number, OrderProduct> = {};

    cart.forEach(product => {
      if (productObject[product.id]) {
        productObject[product.id].quantity += product.quantity;
      } else {
        productObject[product.id] = {
          id: product.id,
          quantity: product.quantity
        };
      }
    });

    const productTest = {
      products: Object.values(productObject).map(entry => entry),
    }

    try {
      const response = await axios.post('http://localhost:80/api/orders', productTest, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      setOrderInfo(response.data);
      setShowCart(false);
      clearCart();
      navigate('/order');
    } catch (error) {
      console.error('Request error:', error);
    }
  };

  return (
    <>
      <div
        onClick={handleCloseCart}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9998,
        }}
      ></div>
      <Box
        id='cart-container'
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', 
          maxHeight: '80vh',
          overflowY: 'auto',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 9999,
        }}
      >
        <Typography variant='h2' gutterBottom>
          Your Cart
        </Typography>
        <Tooltip title='Close cart' arrow>
          <IconButton
            aria-label='close'
            onClick={handleCloseCart}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: 'red',
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
        {cart.length === 0 ? (
          <Typography variant='body1'>Your cart is empty.</Typography>
        ) : (
          <>
            {getUniqueIds().map((id: number) => {
              const item = cart.find(item => item.id === id);
              if (!item) return null;
              return (
                <Box
                  key={id}
                  border='1px solid #ccc'
                  borderRadius={4} p={2} mb={2}
                  position='relative'
                >
                  <Typography variant='h4' gutterBottom>
                    {item.name}
                  </Typography>

                  <Typography variant='h6' gutterBottom>
                    Price for item: ${item.price.toFixed(2)}
                  </Typography>

                  <Typography variant='h5' gutterBottom>
                    Quantity:
                  </Typography>

                  <Button onClick={() => handleRemoveItem(item.id)}>-</Button>

                    {getItemCount(id)}

                  <Button onClick={() => handleAddItem(item.id)}>+</Button>

                  <Tooltip title='Remove all' arrow>
                    <IconButton
                      aria-label='remove all'
                      onClick={() => removeAllItems({ id: item.id })}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: 'red',
                      }}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            })}
            <Box mt={2}>
              <Typography variant='h4'>
                Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </Typography>
            </Box>
            {cart.length > 0 && (
              <Box mt={2}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleConfirmOrder}
                >
                  confirm order
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};
