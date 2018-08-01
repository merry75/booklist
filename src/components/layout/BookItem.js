import React, { Component } from "react";
import PropTypes from "prop-types";
import BookEdit from "../utils/BookEdit";
import BookDelete from "../utils/BookDelete";

class BookItem extends Component {
  render() {
    const { book } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-4">
            <img
              src={book.image}
              alt={`${book.title}`}
              className="img-thumbnail"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{book.title}</h3>
            <p>
              {book.author} - <span>{book.date}</span>
            </p>
            <div className="btn-group">
              <BookEdit book={book} />
              <BookDelete book={book} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookItem;
