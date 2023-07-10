import Post from '../models/post';

export default {
  getAllPosts: async (req, res) => {
    const post = await Post.find().populate('user', '-email');

    if (!post) res.status(400).json({ message: 'no post available' });

    res.status(200).send(post);
  },
  postSingle: async (req, res) => {
    const { user, title, body } = req.body;

    const post = new Post();

    post.user = user;
    post.title = title;
    post.body = body;

    const newPost = await post.save();

    res.status(201).send(newPost);
  },
  putSingle: async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    if (isNaN(Number(Object(id)[0]))) return res.status(500).end();
    const post = await Post.findById(id);

    if (!post) res.send(`no post found!`);

    const postUserId = post.user.toHexString();
    const reqUserId = req.user.id;

    if (postUserId !== reqUserId)
      return res.status(403).send('you can only update your post');

    post.title = title ? title : post.title;
    post.body = body ? body : post.body;

    const updatedPost = await post.save();

    res.status(200).send(updatedPost);
  },
  deleteSingle: async (req, res) => {
    const { id } = req.params;

    if (isNaN(Number(Object(id)[0]))) return res.status(500).end();

    const post = await Post.findById(id);

    const postUserId = post.user.toHexString();
    const reqUserId = req.user.id;

    if (postUserId !== reqUserId)
      return res.status(403).send('you can only update your post');

    await post.deleteOne();

    res.status(200).send('post deleted!');
  },
};
