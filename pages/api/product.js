import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';
import Cart from '../../models/Cart';
import Order from '../../models/Order';

connectDb(); 

export default async (req, res) => {
  switch(req.method){
    case 'GET': 
      await handleGetRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req,res); 
      break;
    case 'POST':
      await handlePostRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} is not allowed`);
      break;
  }
}

async function handleGetRequest(req,res){
  const {_id} = req.query;
  const product = await Product.findOne({_id}); // {_id:_id}
  res.status(200).json(product);  
}

async function handleDeleteRequest(req,res){
  const {_id} = req.query;
  // delete product by Id
  try{
    await Product.findOneAndDelete({_id}); // {_id:_id}
    // remove product from all carts, referenced as 'product' (cascade delete)
    await Cart.updateMany(
      {'products.product': _id},
      {$pull: {products:{product:_id}}}
    );
    // remove product from all orders, referenced as 'product' (cascade delete)
    await Order.updateMany(
      {'products.product': _id},
      {$pull: {products:{product:_id}}}
    );

    res.status(204).json({});  
  } catch(error){
    console.error(error);
    res.status(500).send('error deleting product');
  }
  
}

async function handlePostRequest(req,res){
  try {
    const {name, price, description, mediaUrl} = req.body;
    if (!name || !price || !description || !mediaUrl){
      return res.status(422).send("Product missing one or more fields");
    }
    const product = await new Product({
      name,
      price, 
      description,
      mediaUrl
    }).save();
    
    res.status(201).json(product);
    } catch (error){
      console.error(error);
      res.status(500).send("Server error in creating product");
    }
}

