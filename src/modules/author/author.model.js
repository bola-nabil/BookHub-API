import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author name is required"],
        trim: true
    },
    bio: {
        type: String,
        required: [true, "Author bio is required"],
        trim: true
    },
    nationality: {
        type: String,
        required: [true, "Author nationality is required"],
        trim: true
    },
    birthDate: {
        type: Date,
        required: [true, "Author birth date is required"]
    },
    image: {
        type: String,
        trim: true
    }
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

authorSchema.virtual("books", {
    ref: "Book",
    localField: "_id",
    foreignField: "author"
})

const Author = mongoose.model("Author", authorSchema);

export default Author;