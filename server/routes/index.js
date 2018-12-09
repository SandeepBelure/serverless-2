const { Router } = require('express');
const PostModel = require('../models/post');
const router = Router();

router.get('/posts', async (req, res) => {
  try {
    let { limit, skip } = req.query;
    let Post = new PostModel();
    let result = await Post.get({ limit, skip });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    let { id } = req.params;
    let Post = new PostModel();
    let result = await Post.getById(id);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.post('/post', async (req, res) => {
  try {
    let { body } = req;
    let Post = new PostModel();
    await Post.create(body);
    return res.send('sucessfully created');
  } catch (e) {
    console.log('error ', e);
    res.send(e);
  }
});

module.exports = router;
