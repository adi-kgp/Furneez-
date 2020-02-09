import axios from 'axios';
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import baseUrl from '../utils/baseUrl';

function Product({product}) {
  return (
    <> 
      <ProductSummary {...product}/>
      <ProductAttributes {...product}/>  
    </>
  );
}
//getinitialprops defined in _app.js, ctx contains property query
Product.getInitialProps = async ({query:{_id}}) => { // query._id === query:{_id} destructuring
  const url = `${baseUrl}/api/product`;
  const payload = {params: {_id}};
  const response = await axios.get(url, payload);
  return {product: response.data};
};

export default Product;
