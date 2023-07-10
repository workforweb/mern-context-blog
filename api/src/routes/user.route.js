import { Router } from 'express';
import userController from '../controllers/user.controller';
import { generateJwtSecret } from '../utils/generateCryptoKey';
import auth from '../middlewares/authMiddleware';

// initiate express router
const userRouter = Router();

/*   
! mongoose is promise based so, always use Async-Await to avoid
! Error: Converting circular structure to JSON 
*/

// Generate jwt secret
userRouter.get('/secret', async (req, res, next) => {
  const secret = generateJwtSecret(46);
  console.log('secret :>> ', secret);
  return res.status(201).json({ message: 'Secret created successfully!' });
});

// Register user
userRouter.post('/signup', userController.signup);

// Login user
userRouter.post('/login', userController.login);

// Logout user
userRouter.get('/logout', auth, userController.logout);

export default userRouter;
