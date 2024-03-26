import { FC, useEffect } from "react";
import { ProductsList } from "./../components/ProductsList";

const Home: FC = () => {
  useEffect(() => {
    document.title = 'Products';
  }, []);

  return (
    <ProductsList />
  );
};

export default Home;
