import { GET_BOOKS, ADD_BOOK, EDIT_BOOK, DELETE_BOOK } from "./types";
import data from "./books.json";

export const getBooks = () => {
  return {
    type: GET_BOOKS,
    payload: {
      data
    }
  };
};

export const addBook = v => {
  return {
    type: ADD_BOOK,
    payload: v
  };
};

export const editBook = v => {
  return {
    type: EDIT_BOOK,
    payload: v
  };
};

export const deleteBook = ({ id } = {}) => ({
  type: DELETE_BOOK,
  id
});
