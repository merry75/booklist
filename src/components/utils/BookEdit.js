import React, { Component } from "react";
import { connect } from "react-redux";
import { editBook } from "../../actions/bookActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import { formatTitle } from "./FormatTitle";

class BookEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: props.book.title,
      author: props.book.author,
      date: moment(props.book.date).format("YYYY-MM-DD"),
      validateMessage: {}
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
      id: "",
      title: "",
      author: "",
      date: moment().format("YYYY-MM-DD"),
      validateMessage: {}
    });
  }

  onChangeValue(key, value) {
    const validateMessage = {
      ...this.state.validateMessage,
      [key]: ""
    };
    if (!value) {
      validateMessage[key] = "This field is required";
    }
    if (key === "title") {
      if (this.props.books.find(b => b.title === value)) {
        validateMessage[key] = "Already exist";
      }
    }
    if (key === "date" && !moment(value).isValid()) {
      validateMessage[key] = "Invalid Date";
    }
    this.setState({
      [key]: value,
      validateMessage
    });
  }

  onEdit() {
    if (
      this.props.books.filter(v => v.title === this.state.title).length !== 0 &&
      !this.state.author
    ) {
      return this.setState({
        validateMessage: {
          title: "Already exist",
          author: "This field is required"
        }
      });
    }

    if (
      this.props.books.filter(v => v.title === this.state.title).length !== 0 &&
      this.state.author
    ) {
      return this.setState({
        validateMessage: {
          title: "Already exist"
        }
      });
    }

    if (!this.state.author && !this.state.title) {
      return this.setState({
        validateMessage: {
          author: "This field is required",
          title: "This field is required"
        }
      });
    }

    if (!this.state.author) {
      return this.setState({
        validateMessage: {
          author: "This field is required"
        }
      });
    }

    if (!this.state.title) {
      return this.setState({
        validateMessage: {
          title: "This field is required"
        }
      });
    }

    this.props.editBook({
      ...this.props.book,
      title: formatTitle(this.state.title),
      author: this.state.author,
      date: this.state.date
    });
    this.toggle();
  }

  render() {
    const { title, author, date, validateMessage } = this.state;
    return (
      <div>
        <Button className="btn btn-md btn-info mr-2" onClick={this.toggle}>
          {this.props.buttonLabel}Edit
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit Your Book</ModalHeader>
          <ModalBody>
            <div>
              <div>
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={title}
                  onChange={e => this.onChangeValue("title", e.target.value)}
                />
                {validateMessage.title && (
                  <p style={{ color: "red" }}>{validateMessage.title}</p>
                )}
              </div>
              <div>
                <label>Author</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={author}
                  onChange={e => this.onChangeValue("author", e.target.value)}
                />
                {validateMessage.author && (
                  <p style={{ color: "red" }}>{validateMessage.author}</p>
                )}
              </div>
              <div>
                <label>Date</label>
                <input
                  className="form-control"
                  type="date"
                  value={date}
                  onChange={e => this.onChangeValue("date", e.target.value)}
                />
                {validateMessage.date && (
                  <p style={{ color: "red" }}>{validateMessage.date}</p>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onEdit()} type="submit">
              Edit
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

const mapStateToProps = state => ({
  books: state.book.books
});

export default connect(
  mapStateToProps,
  { editBook }
)(BookEdit);
