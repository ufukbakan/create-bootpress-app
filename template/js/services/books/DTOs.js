import { schema } from "bootpress/helpers/index.js";

export const AddBookRequestDTO = schema({
    "name": "string",
    "year?": "integer"
});
