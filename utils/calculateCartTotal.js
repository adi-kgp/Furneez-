function calculateCartTotal(products){
  const total = products.reduce((acc, el) => {
    acc += el.product.price * el.quantity;
    return acc;
  }, 0);
  const cartTotal = total;
  const stripeTotal = total;
  return {cartTotal, stripeTotal};
}

export default calculateCartTotal;