import Author from "../models/author.model.js";
import Book from "../models/book.model.js";
import { AppError } from "../utils/appError.js";
import mongoose from "mongoose";

export class AuthorService {
    static async createAuthor(data) {
        return await Author.create(data);
    }

    static async getAllAuthors() {
        return await Author.find().populate("books");
    }

    static async getAuthor(id) {
        const author = await Author.findById(id).populate("books");

        if(!author) {
            throw new AppError("Author not found", 404);
        }

        return author;
    }

    static async updateAuthor(id, data) {
        const author = await Author.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if(!author) {
            throw new AppError("Author not found", 404);
        }
        
        return author;
    }

    static async deleteAuthor(id) {
        const session = await mongoose.startSession();
        try {
            let deletedAuthor;
            
            await session.withTransaction(async () => {
                deletedAuthor = await Author.findByIdAndDelete(id).session(session);

                if(!deletedAuthor) {
                    throw new AppError("Author not found", 404);
                }

                await Author.deleteMany({
                    author: deletedAuthor._id
                }).session(session);
            });
            
            return deletedAuthor;
        } finally {
            session.endSession();
        }
    }
}