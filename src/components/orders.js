import { Card } from "react-bootstrap";
import Faq from "react-faq-component";
import { Nav, Navbar,NavDropdown , Jumbotron,Container ,Form,Button,Col,Image} from "react-bootstrap";
import {  Redirect } from "react-router-dom";
import Icofont from "react-icofont"
import { useState, useEffect } from "react"
import Pending from "./Pending"
import Completed from "./Completed"
import db from "./Database";

function signout()
{
	localStorage.removeItem("email");
	localStorage.removeItem("wallet");
	window.location.replace("/");
}



function Orders()
{
    var [orderArray,setorder] = useState([]);

    var [orderArray1,setorder1] = useState([]);
    
    var [check,setcheck] = useState(1);

    var temp = [];
    var temp1 = [];

	useEffect(()=>{
		db.collection("homeworks").get().then((querySnapshot)=>{
		 	querySnapshot.docs.map((doc) => {
                 if(localStorage.id===doc.data().gnomeid){ 

                    if(doc.data().completed===true){
                        temp.push({
                            completed:doc.data().completed,
                            uid:doc.data().uid,
                            username:doc.data().username,
                            price:doc.data().price,
                            description : doc.data().description,
                            date:doc.data().date,
                            homeworkLevel:doc.data().homeworkLevel
        
                        });
                    }
                    else{
                        temp1.push({
                            completed:doc.data().completed,
                            uid:doc.data().uid,
                            username:doc.data().username,
                            price:doc.data().price,
                            description : doc.data().description,
                            date:doc.data().date,
                            homeworkLevel:doc.data().homeworkLevel
        
                        });

                    }

		       
            
            }
		      });
		}).then(()=>{
            setorder(temp);
            setorder1(temp1);
		});
    },[]);
    
    
    return(
        <>


<div>
        <Navbar className="w-100 px-5 navigation shadow-lg" expand="lg" static>
          <Navbar.Brand className="ml-5" href="/"><img width="180" alt="logo" src="logo.webp"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <h5>
            <Nav className="ml-auto">
              {/* <Nav.Link className="px-5" href="/about" active>Home</Nav.Link> */}
              <Nav.Link className="mx-4 justify-content-center align-self-center" href="/" active><b>Home</b></Nav.Link>
              <Nav.Link className="mx-4 justify-content-center align-self-center" href="/" active><b>About us</b></Nav.Link>
              <Nav.Link className="mx-4 justify-content-center align-self-center" href="/" active><b>Services</b></Nav.Link>
              <Nav.Link className="mx-4 justify-content-center align-self-center" href="/" active><b>FAQ's</b></Nav.Link>
              <Nav.Link className="mx-4 justify-content-center align-self-center" href="/" active><b>Contact us</b></Nav.Link>
              <Nav.Link className="mx-4 justify-content-center align-self-center" href="/hire" active><b>Hire</b></Nav.Link>
              {/* <Nav.Link className="mx-4 justify-content-center align-self-center" href="/wallet" active><b>Wallet</b></Nav.Link> */}
              
              <NavDropdown title={ <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/512px-Circle-icons-profile.svg.png' lenght = {20}width = {40} roundedCircle />} id="basic-nav-dropdown">
                
                <NavDropdown.Item href="/Orders">Orders</NavDropdown.Item>
                <NavDropdown.Item href="/wallet">Wallet</NavDropdown.Item>
                
                <NavDropdown.Divider />
                <NavDropdown.Item  onClick={signout} href="#" >Signout</NavDropdown.Item>
            </NavDropdown>
              
            </Nav>
            </h5>
          </Navbar.Collapse>
        </Navbar>
    </div>
        <Container  >
            
            </Container>
            
            

            
            


        </>
        );

}

export default Orders;