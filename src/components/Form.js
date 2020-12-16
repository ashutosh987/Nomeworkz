import { useState } from "react"
import { useParams } from "react-router-dom"
import db from "./Database";
import { v1 } from "uuid";

function Form()
{
	const [amount, setAmount] = useState(-1);
	const [error, setError] = useState("Please select the specification to get estimated price.");

	const imgStyle = {
		borderRadius : "50%"
	}

	let params = useParams();
	var pages;
	var type;
	var dl;
	var description;
	var spnotes;

	let booker = ()=>{
		let info = {
			completed:false,
			confiirmed : 0,
			date : new Date(),
			description : description,
			gnomeNickName:params.name,
			gnomeid:params.id,
			homeworkLevel: type,
			imageUrls :[],
			numberOfPages : pages,
			price : amount,
			service : 1,
			specialNote : spnotes,
			subService : null,
			uid : localStorage.id,
			username: localStorage.name
		}
		console.log(info);
		if(localStorage.wallet - amount >= 0)
		{
			db.collection("users").doc(localStorage.id).update(
	        {
	        	wallet : (localStorage.wallet-amount).toFixed(2),
	        }
	        ).then((data)=>{
	          db.collection("homeworks").doc(v1()).set(
	          	info
		        ).then((inf)=>{
		        	alert("Homework created");
		        	localStorage.setItem("wallet",(localStorage.wallet-amount).toFixed(2));
		        })
		        .catch((error) => {
		          var errorCode = error.code;
		          var errorMessage = error.message;
		          console.log(error);
		          alert(errorMessage)
		        });
	        })
	        .catch((error) => {
	          var errorCode = error.code;
	          var errorMessage = error.message;
	          console.log(error);
	          alert(errorMessage)
	        });
		}
		else
		{
			alert("Wallet amount not enough");
		}
	}

	const submitHandler = (e) =>{
		e.preventDefault();
		pages = e.target.pages.value;
		type = e.target.type.value;
		dl = e.target.date.value;
		description = e.target.description.value;
		spnotes = e.target.spnotes.value;
		
		var todayDateString = new Date().toISOString().slice(0,10);
		let todayDate = new Date(todayDateString);
		let dlDate = new Date(dl);
		const diffTime = (dlDate - todayDate);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		let error = 0;
		let arr = [
			[17.95, 20.95, 23.95, 28.95],
			[12.95, 15.95, 18.95, 23.95],
			[10.95, 13.95, 16.95, 21.95],
			[8.95, 11.95, 14.95, 19.95]
		];

		let typeKey;
		switch(type){
			case ("High School"):{
				typeKey = 0;
				break;
			}
			case ("Undergraduate"):{
				typeKey = 1;
				break;
			}
			case ("Graduate"):{
				typeKey = 2;
				break;
			}
			case ("Ph.D."):{
				typeKey = 3;
				break;
			}
		}
		let dateKey;
		if(diffDays<=0 || dl===""){
			dateKey = -1;
		}
		else if(diffDays==1){
			dateKey = 0;
		}
		else if(diffDays==2){
			dateKey = 1;
		}
		else if(diffDays<=6){
			dateKey = 2;
		}
		else{
			dateKey = 3;
		}

		if(dateKey===-1){
			setError("Please select a day in future");
			setAmount(-1);
		}
		else{
			let temp = arr[dateKey][typeKey];
			setAmount(temp);
			setError("");
		}
	}

	let bookNow;
	if(amount==-1){
		bookNow = <p>{error}</p>
	}
	else{
		bookNow = 
		<>
			<p>Estimated Price is : {amount}</p>
			<button className="btn btn-primary" onClick={booker}>Book Now</button>
		</>
	}

	return(
		<>
		<div className="container-fluid">
				<div className="row">
					<div className="col-lg-2 col-md-0 col-sm-0"></div>
					<div className="col-lg-8 col-md-12 col-sm-12">
						<div className="card card-inverse p-3">
							<div className="card-block">
								<div className="row p-3">
									<div className="col-md-8 col-sm-8">
										<h2 className="card-title">Name: {params.name}</h2>
										<p className="card-text"><strong>Overall Rating: </strong>
										<i class="icofont-star" style={{color : '#ffd700'}} ></i>
							<i class="icofont-star"style={{color : '#ffd700'}}></i>
							<i class="icofont-star"style={{color : '#ffd700'}}></i>
							<i class="icofont-star"style={{color : '#ffd700'}}></i>
							<i class="icofont-star"style={{color : '#ffd700'}}></i>
										</p>
										<p><strong>Service Offered: </strong>
											<span className="badge bg-primary mx-1">Paper</span> 
											<span className="badge bg-info mx-1">PPT</span>
											<span className="badge bg-warning mx-1">Resume</span>
										</p>
										<p><strong>Info: </strong>
											{params.description}
										</p>
										<hr/>
									</div>
									<div className="col-md-4 col-sm-4 text-center">
										<img className="btn-md" src={params.pic} alt="" style={imgStyle}/>
									</div>

									<form className="ml-3" onSubmit={(e) => submitHandler(e)}>
										<div className="form-group">
											<label for="exampleFormControlFile1">Upload Image and Reference Files (10mb Max)</label>
											<input type="file" className="form-control-file" id="exampleFormControlFile1" />
											<p>If you have larger files then upload files on google drive and share the link in description.</p>
										</div>
										<hr/>
										<div className="form-group">
											<label for="exampleFormControlSelect1">Homework Level</label>
											<select name = "type" className="form-control" id="exampleFormControlSelect1">
											<option>High School</option>
											<option>Undergraduate</option>
											<option>Graduate</option>
											<option>Ph.D.</option>
											</select>
										</div>
										<div className="form-group">
											<label for="exampleFormControlSelect1">Number of Pages (One page will have 500 words approx.)</label>
											<input type="Number" name = "pages" className="form-control" id="exampleFormControlSelect1" />
											
										</div>
										<hr/>
										<div className="form-group">
											<label for="exampleFormControlTextarea1">Description about Homework</label>
											<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="description"></textarea>
										</div>
												<div className="form-group">
											<label for="exampleFormControlTextarea1">Special Notes</label>
											<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="spnotes"></textarea>
										</div>
										<hr/>
										<div className="form-group">
											<label for="example-date-input">Choose Date</label>
											<div className="col-10">
												<input name = "date" className="form-control" type="date" id="example-date-input"/>
											</div>
										</div>
										<input type="submit" className="btn btn-primary" value="Calculate Price"/>
									</form>
								</div>
								<div className="text-center">
									{bookNow}
								</div>
							</div>
						</div>
					</div>
				</div> 
			</div>
		</>
	);
}

export default Form;