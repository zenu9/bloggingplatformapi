const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Enter a blog title"]
        },
        body: {
            type: String,
            required: [true, "Enter a blog body"]
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog