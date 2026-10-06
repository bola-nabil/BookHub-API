import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, "Book rating is required"],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, "Book comment is required"],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    }
},{
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;