import {Form, Input, TextArea, Button, Image, Message, Header, Icon} from 'semantic-ui-react';
import React from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

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
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el)); // Object.values: es7
    setDisabled(!isProduct);
  }, [product])

  function handleChange(event){
    const {name, value, files} = event.target;
    if(name==='media'){
      setProduct(prevState => ({...prevState, media: files[0]}));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({...prevState, [name]: value})); // [name] computed property, updater pattern: prevState  
    }
  }

  async function handleImageUpload(){
    const data = new FormData(); // FormData constructor
    data.append('file', product.media);
    data.append('upload_preset', 'furneez');
    data.append('cloud_name', 'dwglildtm');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);       
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event){
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const {name, price, description} = product;
      const payload = {name, price, description, mediaUrl};
      await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch(error){
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header as='h2' block>
        <Icon name='add' color='orange' />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
      <Message 
          error
          header='Oops!'
          content={error}
        />
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
          disabled={disabled || loading}
          icon='pencil alternate'
          content='Submit'
          type='submit'
        />
      </Form>
    </>
  );
}

export default CreateProduct;
