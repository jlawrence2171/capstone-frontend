import React, { Component } from "react";
import {
  Card,
  Container,
  CardGroup,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import CustomerDataService from "../../services/customer.data.service";
import AddressDataService from "../../services/address.data.service";
import CustomerViewCSS from "./CustomerView.module.css";
import { Redirect, Link } from "react-router-dom";

class CustomerView extends Component {
  state = {
    customer: { data: [{}], deleted: false },
    show: false,
    address: {},
  };

  setShow = () => {
    this.setState((currentState) => {
      return {
        show: !currentState.show,
      };
    });
  };
  handleClose = () => this.setShow();
  handleShow = () => this.setShow();

  handleShow = (id) => {
    this.setShow();
  };
  handleConfirm = (id) => {
    this.deleteCustomer(id);
    this.handleClose();
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    CustomerDataService.view(id)
      .then(({ data: customer }) => {
        this.setState({ customer: { id, ...customer.data[0] } });
      })
      .then(() => {
        this.getAddressInfo(this.state.customer.address_id);
      })
      .catch(console.error);
  }
  deleteCustomer(id) {
    CustomerDataService.delete(id).then((res) => {
      this.setState({ deleted: true });
    });
  }

  getAddressInfo = (id) => {
    AddressDataService.view(id).then(({ data }) => {
      this.setState({ address: data.data[0] });
    });
  };

  render() {
    const editButton = {
      backgroundColor: "#a8dadc",
      color: "#1d3557",
      margin: "2px",
      padding: "10px 20px",
      border: "none",
    };
    const deleteButton = {
      backgroundColor: "#e63946",
      color: "#f1faee",
      margin: "2px",
      padding: "10px 20px",
      border: "none",
    };
    const backBtn = {
      backgroundColor: "#1d3557",
      margin: "20px",
    };
    const custCard = {
      backgroundColor: "#1d3557",
      color: "#f1faee",
      margin: "50px",
      borderRadius: "7px",
      height: "500px",
      padding: "45px 45px 45px 45px",
      alignItems: "center",
    };
    const text = {
      font: "bold",
      color: "#f1faee",
    };
    const cardGroup = {
      justifyContent: "center",
    };
    const { customer, address } = this.state;
    if (this.state.deleted) {
      return <Redirect to={{ pathname: "/customers" }} />;
    }
    return (
      <div>
        <Container>
          <Link to={`/customers`}>
            {" "}
            <Button style={backBtn}>Back to Customer List</Button>
          </Link>
        </Container>
        <Container className={CustomerViewCSS.container}>
          <CardGroup style={cardGroup}>
            <Row>
              <Col>
                <Card style={custCard} variant={custCard}>
                  <Card.Text>
                    <h2 style={text} className={CustomerViewCSS.h2}>
                      Customer Details
                    </h2>
                    <div style={text}>First Name: {customer.first_name}</div>
                    <div className={CustomerViewCSS.s}>
                      Middle Name: {customer.middle_name}
                    </div>
                    <div className={CustomerViewCSS.s}>
                      Last Name: {customer.last_name}
                    </div>
                    <div className={CustomerViewCSS.s}>
                      Phone: {customer.phone}
                    </div>
                    <div className={CustomerViewCSS.s}>
                      Email: {customer.email}
                    </div>
                    <div className={CustomerViewCSS.s}>
                      Notes: {customer.notes}
                    </div>
                    <hr></hr>
                    <div className={CustomerViewCSS.s}>
                      Address: {customer.address_id}
                    </div>
                    <div>Address Line 1: {address.address_line_1}</div>
                    <div>Address Line 2: {address.address_line_2}</div>
                    <div>City: {address.city}</div>
                    <div>State: {address.state}</div>
                    <div>Zip: {address.zip}</div>
                  </Card.Text>

                  <div flex className={CustomerViewCSS.btndiv}>
                    <Button
                      style={editButton}
                      variant={editButton}
                      className={CustomerViewCSS.btn}
                    >
                      <Link to={`/customers/${customer.id}/edit`}>
                        Edit Customer
                      </Link>
                    </Button>
                    <Button
                      style={deleteButton}
                      variant={deleteButton}
                      onClick={() => this.handleShow(customer.id)}
                      className={CustomerViewCSS.deletebtn}
                    >
                      Delete Customer
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col>
                <Card style={custCard} variant={custCard}>
                  <Card.Text>
                    <h2 style={text} className={CustomerViewCSS.h2}>
                      Order History
                    </h2>
                  </Card.Text>
                </Card>
              </Col>
            </Row>
          </CardGroup>
        </Container>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Are you sure you want to delete your customer?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button type="radio" variant="danger" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              type="radio"
              variant="primary"
              onClick={() => this.handleConfirm(customer.data[0].id)}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default CustomerView;
