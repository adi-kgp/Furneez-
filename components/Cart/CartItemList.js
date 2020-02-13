import {Header, Segment, Button, Icon, Item, Message} from 'semantic-ui-react';
import {useRouter} from 'next/router';

function CartItemList({products, user, handleRemoveFromCart, success}) {
  
  const router = useRouter();
  
  function mapCartProductsToItems(products){
    
    return products.map(pro => ({
      childKey: pro.product._id,
      header: (
        <Item.Header as='a' onClick= {() => router.push(`/product?_id=${pro.product._id}`)}>
          {pro.product.name}
        </Item.Header>
      ),
      image: pro.product.mediaUrl,
      meta: `${pro.quantity} x ₹${pro.product.price}`,
      fluid:'true',
      extra: (
        <Button 
          basic
          icon='remove'
          floated='right'
          onClick={() => handleRemoveFromCart(pro.product._id)}
        />
      )
    }));
  }

  if (success){
    return (
      <Message 
        success
        header="Success!"
        content="Your order is received!"
        icon='star outline'
      />
    );
  }

  if (products.length ===0){
    return (
      <Segment secondary color='teal' inverted textAlign='center' placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No product in your cart. Add some!
        </Header>
        <div>
          {user ? (
            <Button color='orange' onClick={() => router.push('/')}>
              View Products
            </Button>
          ) : 
          (
            <Button color='facebook' onClick={() => router.push('/login')}>
              Login to add products
            </Button>
          )}
        </div>
      </Segment>
    );
  } 

  return (
    <Item.Group divided items={mapCartProductsToItems(products)} />
  );
}

export default CartItemList;
