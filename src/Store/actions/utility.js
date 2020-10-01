import order from "../../components/Order/Order";

export const addOrder = (id, orderData) => {
  const newOrder = {
    ...orderData,
    id: id,
  };
  return newOrder;
};
