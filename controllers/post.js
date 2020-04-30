const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).send(posts)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findOne({ where: {
        id: req.params.id}})
        if (!post) {
            res.status(404).send({ message: "Post has not been found!"})
        }
        res.status(200).send(post)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.createPost = async (req, res) => {
    try {
            await Post.create({ 
            content: req.body.content,
            userId: req.user.id,
            username: req.user.username
             })
            
        res.status(201).send({ message: 'Post has been created'})
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findOne({ where: {
            id: req.params.id
        }})
        if (post && post.userId !== req.user.id) {
            return res.sendStatus(401);
        }
        await post.update({
            ...req.body, id: req.params.id},
        )
        res.status(200).send({ message: 'Post has been updated'})
    } catch (err) {
        res.sendStatus(500)    
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({ where: {
            id: req.params.id
        }})
        if (post && post.userId !== req.user.id) {
            return res.sendStatus(401);
        }
        await post.destroy()
        res.status(200).send({ message: "Post has been deleted ! "})
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getAllUserPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ where: {
            userId: req.user.id
        }})
        res.status(200).send(posts)
    } catch (err) {
        res.sendStatus(500)
    }
}