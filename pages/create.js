import {Form, Input, TextArea, Button, Image, Message, Header, Icon} from 'semantic-ui-react';
import React from 'react';

const INITIAL_PRODUCT = {
  name: '',
  price:'',
  media: '',
  description: ''
}

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [success, setSuccess] = React.useState(false);
  const [mediaPreview, setMediaPreview] = React.useState('');

  function handleChange(event){
    const {name, value, files} = event.target;
    if(name==='media'){
      setProduct(prevState => ({...prevState, media: files[0]}));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({...prevState, [name]: value})); // [name] computed property, updater pattern: prevState  
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(product);
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  }

  return (
    <>
      <Header as='h2' block>
        <Icon name='add' color='orange' />
        Create New Product
      </Header>
      <Form success={true} onSubmit={handleSubmit}>
        <Message 
          success
          icon='check'
          header="Success!"
          content='Your product has been posted'
        />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name='name'
            label="Name"
            placeholder="Name"
            type='text'
            onChange={handleChange}
            value={product.name}
          />
          <Form.Field
            control={Input}
            name='price'
            label="Price"
            placeholder="Price"
            min='0'
            step='1'
            type='number'
            onChange={handleChange}
            value={product.price}
          />
          <Form.Field
            control={Input}
            name='media'
            label="Media"
            content="Select Image"
            accept='image/*'
            type='file'
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size='small'/>
        <Form.Field 
          control={TextArea}
          name='description'
          label='Description'
          placeholder='Description'
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field 
          control={Button}
          color='blue'
          icon='pencil alternate'
          content='Submit'
          type='submit'
        />
      </Form>
    </>
  );
}

export default CreateProduct;
