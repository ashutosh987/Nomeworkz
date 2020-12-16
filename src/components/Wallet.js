import StripeCheckout from "react-stripe-checkout";
import { useState } from "react"
import { Nav, Navbar ,NavDropdown,Image} from "react-bootstrap";
const stripe = require("stripe")("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");

async function handleToken(token,amount)
{
	console.log(token);
	let status;
	try{
		console.log(token.email,token.id);
		let customer = await stripe.customers.create({
			email: token.email,
			source: token.id
		});
		console.log("here1");
		const idempotency_key = 123;
		const charge = await stripe.charges.create(
			{
				amount: amount,
				currency: "usd",
				customer: customer.id,
				receipt_email: token.email,
				description: `Paid an amount of ${amount}.`,
			},
			{
				idempotency_key
			}
		);
		console.log("here2");
		status = "success";
		console.log(status);
	} 
	catch(error){
		console.log(`error : ${error}`);
		status = "failure";
	}
}


function Wallet()
{
	const [amount, setAmount] = useState(-1);
	const [error, setError] = useState(1);

	const submitHandler = (e) => {
		e.preventDefault();
		let tmp = e.target.amountAdded.value;
		tmp*=100;
		console.log(tmp);
		if(tmp>0){
			setAmount(tmp);
			setError(0);
		}
		else{
			setAmount(-1);
			setError(1);
		}
	}
	let payDiv = "";
	if(error===1){
		payDiv = <></>
	}
	else{
		payDiv = 
		<>
		  <div class="card-body">
		    <StripeCheckout 
		    	stripeKey="pk_live_XaGBwvF5ibvmEAEIuK4z7aKj0033HZWVB0"
		    	token={handleToken}
		    	email={localStorage.email}
		    	allowRememberMe={false}
		    	amount={amount}
		    />
		  </div>
		</>
	}
	return(
		<>
		<div  >
			<h5>
            <Navbar className="w-100 pr-5 px-5 navigation shadow-lg" expand="lg" static>
              <Navbar.Brand className="ml-5  d-inline-block align-top"  href="/" ><img width="180" alt="logo" src="logo.webp"/></Navbar.Brand>
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

		<div class="card p-5 m-5">
		  <div class="card-body">
		    <h5 class="card-title">Wallet</h5>
		    <p class="card-text">Here you can view your balance.</p>
		  </div>
		  <ul class="list-group list-group-flush">
		    <li class="list-group-item">Current Balance :- {"$"}{localStorage.wallet}</li>
		  </ul>
		  <div class="card-body">
		    <h5 class="card-title">Add amount</h5>
			<form onSubmit={(e) => submitHandler(e)}>
				<label for="amountAdded">Enter the amount to be added to wallet.</label>
				<input name="amountAdded" type="number" className="amountAdded mx-2" id="amountAdded"/>
				<button action = "submit" className="btn btn-primary">Proceed</button>
			</form>
		  </div>
		  {payDiv}
		</div>
		</>
		);
}

export default Wallet;