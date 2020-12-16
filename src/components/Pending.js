import { Card } from "react-bootstrap";
import Faq from "react-faq-component";
import { Nav, Navbar,NavDropdown , Jumbotron,Container ,Row,Form,Button,Col,Image} from "react-bootstrap";
import {  Redirect } from "react-router-dom";
import Icofont from "react-icofont"
import { useState, useEffect } from "react"

function Pending(props){

    return (
        <>
                <div>   <Row>
                    <Col>Nome </Col>
                    <Col>Price</Col>
                    <Col>Homework Level</Col>
                    <Col>Status</Col>
                    
                         </Row>
                         <hr></hr>
                         <hr></hr>
                         </div> 
        {props.orderArray.map(val => (
                
               
                    <div>
                        <Row>
                    <Col>{val.gnomeNickName}</Col>
                    <Col>{"$"}{val.price}</Col>
                    <Col>{val.homeworkLevel}</Col>
                    <Col>Not completed</Col>
                         </Row>
                         <hr></hr>
                        </div>

                
                  

                    ))}
                     
        </>
    )
}
export default Pending ;