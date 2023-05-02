import { schema } from "bootpress/helpers";

export const AddBookRequestDTO = schema({
    "name": "string",
    "year?": "integer"
});

export type AddBookRequest = typeof AddBookRequestDTO;