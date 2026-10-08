import Book from "../models/book.model.js";
import Category from "../models/category.model.js";
import Author from "../models/author.model.js";
import Review from "../models/review.model.js";
import { AppError } from "../utils/appError.js";
import { notFound } from "../utils/notFound.js";
import { HttpResponses } from "../utils/httpResponses.js";
import mongoose from "mongoose";

const response = new HttpResponses();

export class BookController {
    /**
     * Get all books
     * @GET Method
     */
    static async getAllBooks(req, res, next) {
    }

    /**
     * Get one book by id
     * @GET Method
     */
    static async getBook(req, res, next) {
        
    }

    /**
     * Create Book
     * @POST Method
     */
    static async createBook(req, res, next) {

    }

    /**
     * Update book by id
     * @PATCH Method
     */
    static async updateBook(req, res, next) {

    }

    /**
     * Delete book by id
     * @DELEtE Method
     */
    static async deleteBook(req, res, next) {
        
    }
}