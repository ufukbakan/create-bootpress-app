import { schema } from "bootpress/helpers";

export const AddBookRequestDTO = schema({
    "name": "string",
    "year?": "number"
});
