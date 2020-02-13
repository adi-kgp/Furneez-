import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  
  const {email, password} = req.body;

  try {
    // does user exist in database
    const user = await User.findOne({email}).select('+password');
    // --if not, return error
    if (!user){
      return res.status(404).send('no user exist with that email');
    }
    // checking user password matching with db password
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // --if so, generate a token
    if (passwordsMatch){
      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    // send that token to client
    res.status(200).json(token);
    } else {
      res.status(401).send('Passwords incorrect');
    }
  } catch(error){
    console.error(error);
    res.status(500).send('Error logging in user');
  }
}