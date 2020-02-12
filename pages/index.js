import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import baseUrl from '../utils/baseUrl';
import ProductPagination from '../components/Index/ProductPagination';

function Home({products, totalPages}) {
  return (
    <>
    <ProductList products = {products} />
    <ProductPagination totalPages = {totalPages} />
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : "1" ; // console.log(ctx)
  const size = 9;
  // fetch data on server
  const payload = { params: {page, size}}
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url,payload);
  //return response data as an object
  // this object will be merged with existing props
  return response.data;
}

export default Home;
