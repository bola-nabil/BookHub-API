export class HttpResponses {
    /**
     * Success response
     * @param {*} res 
     * @param {*} statusCode 
     * @param {*} key 
     * @param {*} value 
     */
    success(res, statusCode = 200, data) {
        res.status(statusCode).json(data);
    }


    /**
     * Failed response
     * @param {*} res 
     * @param {*} statusCode 
     * @param {*} key 
     * @param {*} value 
     */
    failed(res, statusCode, key, value) {
        res.status(statusCode).json({
            "success": false,
            [key]: value
        });
    }
}