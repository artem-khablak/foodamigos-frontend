import { FC, useCallback, useState } from "react";
import { Typography, Toolbar, IconButton, AppBar, Badge} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useTypedSelector } from "./../../hooks/useTypedSelector";
import { Cart } from "./../Cart";

export const Header: FC = () => {
  const [showCart, setShowCart] = useState<boolean>(false);

  const cart = useTypedSelector((state) => state.cart);

  const handleCartClick = useCallback(() => {
    setShowCart(!showCart);
  }, [showCart]);

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Link
            to="/"
            style={{
              marginLeft: '50px',
              flexGrow: 1,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant='h4'>
                Shop
              </Typography>
          </Link>
          <IconButton
            aria-label='show cart items'
            color='inherit'
            sx={{ ml: 2 }}
            onClick={handleCartClick}
          >
            <Badge badgeContent={cart.length} color='error'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {showCart && <Cart setShowCart={setShowCart}/>}
    </>
  );
};
