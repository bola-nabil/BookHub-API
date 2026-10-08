export const sortData = (req) => {
    let sort = {};

    if (req.query.sort) {
        const sortField = req.query.sort;

        if (sortField.startsWith("-")) {
            sort = {
                [sortField.substring(1)]: -1
            };
        } else {
            sort = {
                [sortField]: 1
            };
        }
    }

    return sort;
}