import { Card } from "react-bootstrap";
import Faq from "react-faq-component";
import { Nav, Navbar } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const data = {
    rows: [
        {
            title: 
				<p className="text-center px-3">
					Can you find an expert for any essay subjects? 
					<hr/>
				</p>,
            content:
				<p className="text-center px-3">
					Of course! We worked very hard to find the best essay writers experienced in any subject, even the most complicated like Physics, Engineering or Informational Technologies.				<hr/>
				</p>
		},
		{
            title: 
				<p className="text-center px-3">
					Is your writing service legal?
					<hr/>
				</p>,
            content:
				<p className="text-center px-3">
					Our service is legal and is used by hundreds of students day-to- day basis. You can read reviews about our custom essay writing service online!
				</p>
        },
		{
            title: 
				<p className="text-center px-3">
					Is buying essays online safe?
					<hr/>
				</p>,
            content:
				<p className="text-center px-3">
					You should not worry about safety as all payments are protected. Nomeworkz essay service has no access to your personal data all while accepting MasterCard, Visa, American Express and Discovery card.
				</p>
        },
		{
            title: 
				<p className="text-center px-3">
					How fast can your service complete an essay?
					<hr/>
				</p>,
            content:
				<p className="text-center px-3">
				Your Nome will let you know what their turnaround time for your particular project is. If you need help with a more complicated lengthy paper, contact us beforehand. Your writing assistant will have more time for analysis and will produce an excellent piece.				
				</p>
        }

    ],
};
 
const styles = {
	bgColor: "#DBF9FF"
};

const config = {};

function Home()
{
	if(localStorage.wallet)
	{
		return(
			<Redirect to="/dashboard-user"/>
		);
	}
	else if(localStorage.email)
	{
		return(
			<Redirect to="/dashboard-nomes"/>
		);
	}
	else
	{
		return(
			<>
			<div>
				<Navbar className="w-100 px-5 navigation shadow-lg" expand="lg" static>
				  <Navbar.Brand className="ml-5 px-5" href="/"><img width="180" alt="logo" src="logo.webp"/></Navbar.Brand>
				  <Navbar.Toggle aria-controls="basic-navbar-nav backcolor" />
				  <Navbar.Collapse id="basic-navbar-nav backcolor">
					<Nav className="ml-auto backcolor">
					  {/* <Nav.Link className="px-5" href="/about" active>Home</Nav.Link> */}
					  <Nav.Link className="mx-4 justify-content-center align-self-center px-3" href="#" active><b>Home</b></Nav.Link>
					  <Nav.Link className="mx-4 justify-content-center align-self-center px-3" href="#about" active><b>About us</b></Nav.Link>
					  <Nav.Link className="mx-4 justify-content-center align-self-center px-3" href="#services" active><b>Services</b></Nav.Link>
					  <Nav.Link className="mx-4 justify-content-center align-self-center px-3" href="#faq" active><b>FAQ's</b></Nav.Link>
					  <Nav.Link className="mx-4 justify-content-center align-self-center pr-5 mr-5" href="#contact" active><b>Contact us</b></Nav.Link>
					</Nav>
				  </Navbar.Collapse>
				</Navbar>
			</div>
			<div className="row row1">
				<div className="row back m-0 w-100" style={{backgroundImage : `url("back.webp")`}}>
					<div className="col-6 p-sm-5">
						<img className="image p-sm-5" src="main.webp" alt="main"/>
						<p className="pl-5 text-white"><b>Here goes the mission statement.</b></p>
					</div>
					<div className="col-6 d-flex align-self-center">
						<div className="w-100 text-center">
							<button className="btn-primary w-25 rounded" onClick={()=>{window.location.replace("/intermediate-signup")}}>Let's go</button>
						</div>
					</div>
				</div>
				<div className="row w-100">
					<div className="col-lg-2 col-md-1 col-sm-0"></div>
					<div className="col-lg-8 col-md-10 col-sm-12 text-center px-5">
						<div className = "py-4" id="about">
							<h1>The Essay Writing You Can Trust</h1>
							<br/>
							<p>
								We all know that life doesn't always go as planned and that at times, we've struggled to hit deadlines. Whether you are a student athlete, working to put yourself through college, have a presentation at your office, or are a parent that simply wants to give their child a little added support, we sometimes could use a little help. Nomeworkz online writing service was created as a tool to help students with their academic performance! We have some of the most skilled writers to assist in creating original, custom papers for any educational level.
							</p>
						</div>
						<div className = "py-4">
							<h1>What is NomeWorkz?</h1>
							<div className="videoDiv py-4">
								<video className="video" controls>
									<source src="https://video.wixstatic.com/video/c3a0d6_3432ad8f474e4909ba2b52dd4bb2072d/480p/mp4/file.mp4" type="video/mp4"/>
								</video>
							</div>
						</div>
						<div className = "py-4">
							<h1>How it Works?</h1>
							<div className="row mt-5">
								<div className="col-lg-3 col-md-6 col-sm-12 px-0">
									<Card className="Card bg-transparent">
										<Card.Img className="px-4" variant="top" src="https://static.wixstatic.com/media/c3a0d6_a676b1694cf14d8cb5b29318c62f2508~mv2.png/v1/fill/w_190,h_203,al_c,q_85,usm_0.66_1.00_0.01/Nome%20Vector.webp" />
										<Card.Body>
											<Card.Text>
												Browse through hundreds of Nomes
											</Card.Text>
										</Card.Body>
									</Card>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-12 px-0">
									<Card className="pt-5 Card bg-transparent">
										<Card.Img className="px-5" variant="top" src="https://static.wixstatic.com/media/c3a0d6_07eec9072880491fa44916f0efec7b97~mv2.png/v1/fill/w_150,h_150,al_c,q_85,usm_0.66_1.00_0.01/img_77504.webp" />
										<Card.Body>
											<Card.Text>
												Tell us about your essay: Instructions, requirements and deadline.
											</Card.Text>
										</Card.Body>
									</Card>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-12 px-0">
									<Card className="Card bg-transparent">
										<Card.Img className="px-4" variant="top" src="https://static.wixstatic.com/media/c3a0d6_3559127850c84b44af90f00271b799b8~mv2.png/v1/fill/w_165,h_165,al_c,q_85,usm_0.66_1.00_0.01/dollar%252Bfunds%252Bhand%252Bpayment%252Bicon%252.webp" />
										<Card.Body>
											<Card.Text>
												Make aPayment and your Nome will start working on your paper.
											</Card.Text>
										</Card.Body>
									</Card>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-12 px-0">
									<Card className="pt-5 Card bg-transparent">
										<Card.Img className="px-5" variant="top" src="https://static.wixstatic.com/media/c3a0d6_809b16b97eda4d90aa14a0e57b03922b~mv2.png/v1/fill/w_150,h_150,al_c,q_85,usm_0.66_1.00_0.01/12413502551547544983-512.webp" />
										<Card.Body>
											<Card.Text>
												Release money to the Nome ONLY if you’re satisfied with the outcome
											</Card.Text>
										</Card.Body>
									</Card>
								</div>
							</div>
						</div>
						<div id="services">
							<h1>Services</h1>
							<p>Our professional team of experts in various subjects can handle any academic essay including, but not limited to:</p>
						</div>
						<div id="faq">
							<h1>FAQs</h1>
							<div className="faq">
								<Faq data={data} styles={styles} config={config} />
							</div>
						</div>
						<div id="contact">
							<h1>Contact Us</h1>
							<div className="row">
								<div className="text-left col-6">
									<h3><b>NomeWorkz</b></h3>
									<p><b>Email</b> : NomeWorkz@gmail.com</p>
									<p className="text-left"><b>Phone</b> : 9988776655, 9988475757</p>
									<p className="ml-1">
										<a href="#">
											<i className="icofont-facebook p-1 icofont-2x" style={{color : "black"}}></i>
										</a>
										<a href="#">
											<i className="icofont-google-plus p-1 icofont-2x" style={{color : "black"}}></i>
										</a>
										<a href="#">
											<i className="icofont-instagram p-1 icofont-2x" style={{color : "black"}}></i>
										</a>
										<a href="#">
											<i className="icofont-whatsapp p-1 icofont-2x" style={{color : "black"}}></i>
										</a>
									</p>
								</div>
								<div className="col-6 text-left">
									<h3>Useful Links</h3>
									<i className="icofont-caret-right"></i><a href="#">Home</a>
									<br/>
									<i className="icofont-caret-right"></i><a href="#about">About Us</a>
									<br/>
									<i className="icofont-caret-right"></i><a href="#services">Services</a>
									<br/>
									<i className="icofont-caret-right"></i><a href="#faq">Nomes</a>
									<br/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-2 col-md-1 col-sm-0"></div>
				</div>
			</div>
			</>
			);
	}
}

export default Home;