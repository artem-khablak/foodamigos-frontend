import { FC, useEffect } from "react";
import { Order } from '../components/Order';

const OrderPage: FC = () => {
  useEffect(() => {
    document.title = 'My order';
  }, []);

  return (
    <Order />
  )
};

export default OrderPage;
