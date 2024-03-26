import { FC } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useGetProductsQuery } from "./../../redux/store/products/products.api";
import { ProductCard } from "./../ProductCard";
import { Product } from "./../../types";

export const ProductsList: FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery(8);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          sx={{
            p: 2,
          }}
          variant='h4'
          component='h1'
          gutterBottom
        >
          Products
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {isLoading && (
          <Box
            sx={{
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh'
            }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
      {isError && (
        <Typography variant='h3' color='error'>
          Some Error!
        </Typography>
      )}

      {data && (
        <Grid container spacing={2}>
          {data.map((item: Product) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};