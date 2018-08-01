import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteBook } from "../../actions/bookActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class BookDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  deleteBook() {
    this.props.deleteBook({ id: this.props.book.id });

    this.toggle();
  }

  render() {
    return (
      <div>
        <Button
          className="btn btn-md btn-info mr-2 btn-danger"
          onClick={this.toggle}
        >
          {this.props.buttonLabel}Delete
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Delete Your Book</ModalHeader>
          <ModalBody>
            <div>
              <h6>
                You are going to delete the book: <br />{" "}
                <span className="del-book-title">
                  {" "}
                  {this.props.book.title}{" "}
                </span>{" "}
              </h6>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteBook.bind(this)}>
              Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteBook: data => dispatch(deleteBook(data))
});

export default connect(
  mapDispatchToProps,
  { deleteBook }
)(BookDelete);
