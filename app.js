const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./model/blogModel')

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Blogging Platform CRUD API')
})

// Create a new blog post
app.post('/blogs', async(req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.status(200).json(blog)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

// Retrieve all blog posts
app.get('/blogs', async(req, res) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Retrieve a single blog post by ID
app.get('/blogs/:id', async(req, res) => {
  try {
    const {id} = req.params
    const blog = await Blog.findById(id)
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Update a blog post by ID
app.put('/blogs/:id', async(req, res) => {
  try {
    const {id} = req.params
    const blog = await Blog.findByIdAndUpdate(id, req.body)

    if(!blog) {
      return res.status(404).json({message: `Cannot find any blog with ID ${id}`})
    }

    const updatedBlog = await Blog.findById(id)
    res.status(200).json(updatedBlog)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Delete a blog post by ID
app.delete('/blogs/:id', async(req, res) => {
  try {
    const {id} = req.params
    const blog = await Blog.findByIdAndDelete(id)

    if(!blog) {
      return res.status(404).json({message: `Cannot find any blog with ID ${id}`})
    }
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

mongoose.connect('mongodb://localhost:27017/platform')
.then(() => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.log(error)
})
