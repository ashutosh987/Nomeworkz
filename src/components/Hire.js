import { useState, useEffect } from "react"
import db from "./Database";
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";
import { Nav, Navbar,NavDropdown , Jumbotron,Container ,Form,Button,Col,Image,Row} from "react-bootstrap";
function Hire()
{
	var [nomesArray,setNomes] = useState([]);

	var temp = [];

	useEffect(()=>{
		db.collection("gnomz").get().then((querySnapshot)=>{
		 	querySnapshot.docs.map((doc) => {
		        temp.push({
		        	id:doc.id,
		        	name:doc.data().name,
		        	phone:doc.data().phone,
		        	rating:doc.data().rating,
		        	pic:doc.data()["gnomi_pic_url"],
		        	description : doc.data().info
		        });
		      });
		}).then(()=>{
			setNomes(temp);
		});
	},[]);
	const ratingChanged = (newRating) => {
		console.log(newRating);
	  };
	

	return(
		<>
		<div  >
			<h5>
            <Navbar className="w-100 pr-5 px-5 navigation shadow-lg" expand="lg" static>
              <Navbar.Brand className="ml-5 px-5 d-inline-block align-top"  href="/" ><img width="180" alt="logo" src="logo.webp"/></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav backcolor" />
              <Navbar.Collapse id="basic-navbar-nav backcolor">
                <Nav className="ml-auto backcolor">
                  {/* <Nav.Link className="px-5" href="/about" active>Home</Nav.Link> */}
                  <Nav.Link className="mx-4  align-self-center " href="/" active ><b >Home</b></Nav.Link>
                  <Nav.Link className="mx-4  align-self-center px-3" href="/#about" active ><b>About us</b></Nav.Link>
                  <Nav.Link className="mx-4  align-self-center px-3" href="/#services"  active><b>Services</b></Nav.Link>
                  <Nav.Link className="mx-4  align-self-center px-3" href="/#faq" active><b>FAQ's</b></Nav.Link>
                  <Nav.Link className="mx-4  align-self-center pr-5 mr-5" href="/#contact" active><b>Contact us</b></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
			</h5>
			</div>
		<Container>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			
		<Row >
		
			{ 
				nomesArray.map(nome => {
					return(	

					
								
						<Col xs={6} md={4} style={{
							width: "100px",
							height:"400px"
							
							
						  }} className="">
							<div class="card">
								<div className="w-25 mx-auto">
									<img class="card-img-top p-2" width = "80%" src={nome.pic} alt="Card cap"/>
								</div>
								<div class="card-body">
								<h5 class="card-title">{nome.name}</h5>
								<hr></hr>
								<p class="card-text text-align">
								<strong>Overall Rating:  </strong> 
									
							<i class="icofont-star" style={{color : '#ffd700'}} ></i>
							<i class="icofont-star"style={{color : '#ffd700'}}></i>
							<i class="icofont-star"style={{color : '#ffd700'}}></i>
							<i class="icofont-star"style={{color : '#ffd700'}}></i>
							<i class="icofont-star"style={{color : '#ffd700'}}></i>
									{/* {[...Array(nome.rating)].map((x, i) =>
										<i class="icofont-star"></i>
									)} */}
								</p>
								<hr></hr>
								<p class="card-text">{nome.description}</p>
								<hr></hr>
								<a href={"/form/"+nome.id+"/"+nome.name+"/"+nome.description+"/"+nome.rating+"/"+nome.pic} class="btn btn-primary">Hire</a>
								</div>
							</div>
						</Col>
							
					)					
				})
			}
			
		</Row>	
		</Container>
		
	
		</>
		);
}

export default Hire;