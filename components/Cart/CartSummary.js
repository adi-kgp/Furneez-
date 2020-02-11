import {Button, Segment, Divider} from 'semantic-ui-react';
import React from 'react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({products}) {
  
  const [disabled, setDisabled] = React.useState(false);
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);

  React.useEffect(() => {
    const {cartTotal, stripeTotal} = calculateCartTotal(products);
    setDisabled(products.length === 0);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
  }, [products]);

  return <>
    <Divider/>
    <Segment clearing size='large'>
      <strong>Sub Total:</strong> ₹{cartAmount}
      <Button 
        disabled = {disabled}
        icon='cart'
        color='teal'
        floated='right'
        content="Checkout"
      />
    </Segment>
  </>;
}

export default CartSummary;
