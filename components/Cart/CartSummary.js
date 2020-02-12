import {Button, Segment, Divider} from 'semantic-ui-react';
import React from 'react';
import calculateCartTotal from '../../utils/calculateCartTotal';
import StripeCheckout from 'react-stripe-checkout';

function CartSummary({products, handleCheckout, success}) {
  
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
      <StripeCheckout 
        name='FURNEEZ'
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency='INR'
        shippingAddress= {true}
        billingAddress={true}
        stripeKey='pk_test_dI1yWaTjCzzSs83fz2bgiSiK00PPBVwGml'
        token={handleCheckout}
        triggerEvent='onClick'
      >
        <Button 
          disabled = {disabled || success}
          icon='cart'
          color='teal'
          floated='right'
          content="Checkout"
        />
      </StripeCheckout>
    </Segment>
  </>;
}

export default CartSummary;
