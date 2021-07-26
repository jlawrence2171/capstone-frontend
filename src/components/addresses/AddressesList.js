import React, { Component } from "react";
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import AddressDataService from "../../services/address.data.service";
import {Card, Button, Container, Row, Col } from "react-bootstrap";
import AddressesListCSS from "./AddressesList.module.css";

class AddressesList extends Component {
  state = {
    addresses: [],
  };

  componentDidMount() {
    AddressDataService.list()
      .then(({ data: addresses }) => this.setState({ addresses }))
      .catch(console.error);
  }
  render() {
    const cardStyles = {
      color: "#f1faee",
      fontFamily: "'Lato', sans-serif", 
      border: "4px solid #457b9d",
      backgroundColor: "#1d3557" ,
      textAlign: "center" ,
      fontWeight: "bold" ,
      width: '20rem' ,
      padding: "10px 0px" ,
    marginBottom: "auto",
    transition: "box-shadow .3s",
    
  }

    const { addresses } = this.state;
    const addressListItems = addresses.map((address, index) => (
      <ul key={`${address.zip}-${index}`}>
        <Card style= {cardStyles} >
          <Card.Title>
            <p><b>Address ID:</b> {address.id}</p>
          </Card.Title>
          <p>Address Line 1: {address.address_line_1}</p>
          <p>Address Line 2: {address.address_line_2}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <p>Zip: {address.zip}</p>
          <>
            <div className={AddressesListCSS.Btn}>
              <Button >Edit</Button>{' '}
              <Button >Delete</Button>{' '}
            </div>
          </>
        </Card>


      </ul>
    ));

    return (
      <section>
        <h1 className={AddressesListCSS.header}>All Addresses</h1>
        <container fluid="md">
          <row>
              <div className={AddressesListCSS.mainContainer}>
                {addressListItems}
              </div>
          </row>
        </container>
      </section>
    );
  }
}

export default AddressesList;