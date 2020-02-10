import {Segment, Button, Message, Form, Icon} from 'semantic-ui-react';
import Link from 'next/link';
import React from 'react';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';

const INITIAL_USER = {
  email:'',
  password:''
};

function Login() {

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
    event.preventDefault();
    try{
      setLoading(true);
      setError('');
      console.log(user);
      // const url = `${baseUrl}/api/login`;
      // const payload = {...user};
      // await axios.post(url, payload)
    } catch(error){
        catchErrors(error, setError);
    } finally {
        setLoading(false);  
    }
  }

  return <>
    <Message 
      attached
      icon='privacy'
      header='Welcome Back!'
      content='Login with account details'
      color='blue'
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
          icon='sign in'
          type='submit'
          color='orange'
          content='Login'
          disabled={disabled || loading}
        />
      </Segment>
    </Form>

    <Message attached='bottom' warning>
      <Icon name='help'/>
      New User? {' '}
      <Link href='/signup'>
        <a>Sign up here</a>
      </Link>
      {' '}instead.
    </Message>
  </>;
}

export default Login;
