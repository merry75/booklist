import React, { Component } from "react";
import { connect } from "react-redux";
import { addBook } from "../../actions/bookActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import uuidv4 from "uuid/v4";
import moment from "moment";
import { formatTitle } from "./FormatTitle";

class BookAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: "",
      title: "",
      author: "",
      date: moment().format("YYYY-MM-DD"),
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

  onAddValue(key, value) {
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
    this.setState({
      [key]: value,
      validateMessage
    });
  }

  onAdd() {
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

    this.props.addBook({
      ...this.props.book,
      id: uuidv4(),
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
          {this.props.buttonLabel}Add a Book
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add a Book</ModalHeader>
          <ModalBody>
            <div>
              <div>
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={title}
                  onChange={e => this.onAddValue("title", e.target.value)}
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
                  onChange={e => this.onAddValue("author", e.target.value)}
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
                  onChange={e => this.onAddValue("date", e.target.value)}
                />
                {validateMessage.date && (
                  <p style={{ color: "red" }}>{validateMessage.date}</p>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.onAdd()}
              onChange={e => this.onAddValue("title", e.target.value)}
            >
              Add
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
  { addBook }
)(BookAdd);
