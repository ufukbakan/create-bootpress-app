import { schema } from "bootpress/helpers";

export type AddBookRequest = {
    name: string,
    year?: number
}

export const AddBookRequestDTO = schema({
    "name": "string",
    "year?": "number"
});
