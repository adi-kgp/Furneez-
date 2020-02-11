import cookie from 'js-cookie';
import Router from 'next/router';

export function handleLogin(token){
  cookie.set('token', token);
  Router.push('/account');
}

export function redirectUser(ctx, location){
  if (ctx.req){    // redirect url on server
    ctx.res.writeHead(302, {Location: location});
    ctx.res.end();
  } else { // redirect on client
    Router.push(location);
  }
}