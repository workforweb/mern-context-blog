import { Router } from 'express';
import blogController from '../controllers/blog.controller';
import auth from '../middlewares/authMiddleware';

// initiate express router
const blogRouter = Router();

/*   
! mongoose is promise based so, always use Async-Await to avoid
! Error: Converting circular structure to JSON 
*/

// Find all posts
blogRouter.get('/', auth, blogController.getAllPosts);

// Create new post
blogRouter.post('/', auth, blogController.postSingle);

// Update new post
blogRouter.put('/:id', auth, blogController.putSingle);

// Delete post by id
blogRouter.delete('/:id', auth, blogController.deleteSingle);

export default blogRouter;
