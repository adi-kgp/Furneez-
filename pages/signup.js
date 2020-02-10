import {Segment, Button, Message, Form, Icon} from 'semantic-ui-react';
import Link from 'next/link';
import React from 'react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';

const INITIAL_USER = {
  name:'',
  email:'',
  password:''
};

function Signup() {

  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(()=> {
    const isUser = Object.values(user).every(el => Boolean(el));
    setDisabled(!isUser);
  }, [user]);

  function handleChange(event){
    const {name, value} = event.target;
    setUser(prevState => ({...prevState, [name]: value}));
  }

  async function handleSubmit(event){
    try{
      event.preventDefault();
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/login`;
      const payload = {...user};
      await axios.post(url, payload)
    } catch(error){
        catchErrors(error, setError);
    } finally {
        setLoading(false);  
    }
  }

  return <>
    <Message 
      attached
      icon='settings'
      header='Get Started!'
      content='Create a new account'
      color='teal'
    />
    <Form loading={loading} error= {Boolean(error)} onSubmit={handleSubmit}>
      <Message 
        error
        header='Oops!'
        content={error}
      />
      <Segment>
        <Form.Input 
          fluid
          icon='user'
          iconPosition='left'
          label='Name'
          placeholder='Name'
          name='name'
          onChange={handleChange}
          value={user.name}
        />
        <Form.Input 
          fluid
          icon='envelope'
          iconPosition='left'
          label='Email'
          placeholder='Email'
          type='email'
          name='email'
          onChange={handleChange}
          value={user.email}
        />
        <Form.Input 
          fluid
          icon='lock'
          iconPosition='left'
          label='Password'
          placeholder='Password'
          type='password'
          name='password'
          onChange={handleChange}
          value={user.password}
        />
        <Button 
          icon='signup'
          type='submit'
          color='orange'
          content='Signup'
          disabled={disabled || loading}
        />
      </Segment>
    </Form>
    <Message attached='bottom' warning>
      <Icon name='help'/>
      Existing User? {' '}
      <Link href='/login'>
        <a>Log In here</a>
      </Link>
      {' '}instead.
    </Message>
  </>;
}

export default Signup;
