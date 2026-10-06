import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Book description is required"],
        trim: true
    },
    isbn: {
        type: String,
        trim: true
    },
    coverImage: {
        type: String,
        required: [true, "Book cover image is required"],
        trim: true
    },
    publishedAt: {
        type: Date,
        required: [true, "Book published date is requied"]
    },
    pages: {
        type: Number,
        required: [true, "Book pages is requied"],
        min: 1
    },
    language: {
        type: String,
        required: [true, "Book language is required"],
        trim: true
    },
    stock: {
        type: Number,
        min: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    ]
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
}
);

bookSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "book"
});

const Book = mongoose.model("Book", bookSchema);

export default Book;