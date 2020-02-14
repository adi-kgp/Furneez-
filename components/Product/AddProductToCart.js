import React from 'react';
import {Input} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import catchErrors from '../../utils/catchErrors';

function AddProductToCart({user, productId}) {
  
  const [quantity, setQuantity] = React.useState(1);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    let timeout;
    if (success){
      timeout = setTimeout(() => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout); 
    }
  }, [success]);

  async function handleAddProductToCart(){
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = {quantity, productId};
      const token = cookie.get('token');
      const headers = {headers: {authorization: token}};
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch(error) {
        catchErrors(error, window.alert);
    } finally {
        setLoading(false);
    }
  }

  return <Input 
    type='number'
    min='1'
    value={quantity}
    onChange = {event => setQuantity(Number(event.target.value))}
    placeholder='Quantity'
    action={
      user && success ? {
        color: 'blue',
        content: 'Item Added',
        icon: 'plus cart',
        disabled: true
      } : 
      user ? ({
      color: 'orange',
      content: 'Add To Cart',
      loading,
      disabled: loading,
      icon: 'plus cart',
      onClick: handleAddProductToCart
    }) : ({
      color: 'blue',
      content: 'Sign Up To Purchase',
      icon: 'signup',
      onClick: () => router.push('/signup') 
    })}
  />;
}

export default AddProductToCart;
