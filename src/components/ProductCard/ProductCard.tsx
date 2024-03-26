import { FC } from "react";
import { Card, CardActionArea, CardContent, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Product } from "./../../types";
import { useActions } from "./../../hooks/useActions";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price } = product;

  const { addItem } = useActions();

  return (
    <Card
      sx={{
        width: 300,
        height: 300,
        padding: 2
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant='h6'
            component='div'
            sx={{
              mb: 2,
              height: 110,
              lineHeight: 1.3
            }}
          >
            {name}
          </Typography>
          <Typography
            variant='h5'
            color='text.primary'
            sx={{
              mb: 3,
            }}
          >
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        startIcon={<AddShoppingCartIcon />}
        sx={{ borderRadius: 0 }}
        onClick={() => addItem(product)}
      >
        Add to Cart
      </Button>
    </Card>
  );
};
