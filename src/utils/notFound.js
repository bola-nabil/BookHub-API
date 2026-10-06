import { AppError } from "./appError.js"

/**
 * Handle not found status
 * @param {*} check 
 * @param {*} message 
 */
export const notFound = (check, message) => {
    if(!check) {
        throw new AppError(`${message} not found`, 404);
    }
}