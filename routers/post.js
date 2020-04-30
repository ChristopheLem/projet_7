const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const postController = require('../controllers/post')

router.get('/posts', auth, postController.getAllPosts)
router.get('/post/:id', auth, postController.getOnePost)
router.post('/post', auth, postController.createPost)
router.put('/post/:id', auth, postController.updatePost)
router.delete('/post/:id', auth, postController.deletePost)
// router.post('/post/:id/like', auth, postController.likeOrDislikePost)

module.exports = router;