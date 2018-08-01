import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBooks } from "../../actions/bookActions";
import BookItem from "./BookItem";
import BookAdd from "../utils/BookAdd";

class Library extends Component {
  componentDidMount() {
    this.props.getBooks(this.props.books);
  }

  render() {
    const { books } = this.props;
    let bookItem;
    if (books.length > 0) {
      bookItem = books.map(book => <BookItem key={book.id} book={book} />);
    }
    return (
      <div className="books">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Book Library</h1>
              <div className="lead text-cent">
                <BookAdd />
              </div>
              {bookItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Library.propTypes = {
  getBooks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  books: state.book.books
});

export default connect(
  mapStateToProps,
  { getBooks }
)(Library);
