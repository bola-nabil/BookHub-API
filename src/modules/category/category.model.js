import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Category description is required"],
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
});

categorySchema.virtual("books", {
    ref: "Book",
    localField: "_id",
    foreignField: "category"
});

const Category = mongoose.model("Category", categorySchema);

export default Category;