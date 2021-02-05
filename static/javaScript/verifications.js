	var pass =null;
	var user=null;
	
	function validate_UserName(){
		console.log("val_user");
		const user_val= /^([A-Za-z0-9]{6,18})$/;
		user= document.getElementById('userName');
		if(user.value==""){
			document.getElementById("userName").ClassList +="error";
			document.getElementById("error_user").innerHTML="<caption>You can not leave this field empty.</caption>";
			console.log("null");
			return false;
		}
		user.value=user.value.trim();
		if(user_val.test(user.value)){
			document.getElementById("userName").ClassName="";
			document.getElementById("error_user").innerHTML="<caption></caption>";
			console.log("user_true");
			return true;
		}
		else{
			document.getElementById("userName").ClassList +="error";
			document.getElementById("erro_user").innerHTML="<caption>You can only use letters and numbers.</caption>";
			console.log("user_false");
			return false;
		}
	}
	function validate_Pass(){
		console.log("val_pass");
		const pass_val=/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])/;
		pass = document.getElementById("password");
		if(pass.value==""){
			document.getElementById("password").ClassList +="error";
			document.getElementById("error_pass").innerHTML="<caption>You can not leave this field empty.</caption>";
			console.log("pass_null");
			return false;
		}
		pass.value=pass.value.trim();
		if(pass_val.test(pass.value)){
			document.getElementById("password").ClassName="";
			document.getElementById("error_pass").innerHTML="<caption></caption>";
			return true;
		}
		else{
			document.getElementById("password").ClassList +="error";
			document.getElementById("error_pass").innerHTML="<caption>You at least one uppercase, lowercase, a number, and special character.</caption>";
			console.log("pass wrong");
			return false;		
		}
		
	}
	function validate_Email(){
		const email_val= /((([A-Z0-9a-z]))+)[@](([A-Z0-9a-z])+)[\.]([A-Z0-9a-z])+/;
		const email=document.getElementById("Email");
		if(email.value==""){
			document.getElementById("Email").ClassName+="error";
			document.getElementById("error_email").innerHTML="<caption>You can not leave this field empty.</caption>";
			return false;
	}
		email.value=email.value.trim();
		if(email_val.test(email.value)){
			document.getElementById("Email").ClassName="";
			document.getElementById("error_email").innerHTML="<caption></caption>";
			return true;
		}
		else{
			document.getElementById("Email").ClassName+="error";
			document.getElementById("error_email").innerHTML="<caption>Invalid Email.</caption>";
			return false;
		}
	}
	function passMatch(){
		const pass2 = document.getElementById("PassAgain");
		if(pass2==""){
			document.getElementById("PassAgain").ClassName+="error";
			document.getElementById("error_pass2").innerHTML="<caption>43e</caption>";
			return false;
	}
		pass2.value=pass2.value.trim();
		if(pass.value==pass2.value){
			document.getElementById("PassAgain").ClassName="";
			document.getElementById("error_pass2").innerHTML="<caption></caption>";
			return true;
		}
		else{
			document.getElementById("PassAgain").ClassName+="error";
			document.getElementById("error_pass2").innerHTML="<caption>Passwords do NOT match.</caption>";
			return false;
		}
		

	}
	function verifyRegister(){
		let _valid = true;
		if(!validate_UserName()){
			if(user.value!="")
				document.getElementById("error_user").innerHTML="<caption>Users are between 6-18 numbers and/or letters.</caption>";
			_valid=false;
		}
		if(!validate_Pass()){
			_valid=false;
		}
		if(!validate_Email()){
			_valid=false;
		}
		if(!passMatch()){
			_valid=false;
		}
		if(!_valid){
			activateButtonRegister(false);
		}
		else{
			activateButtonRegister(true);
			//post info to Server.py, add to the sqlite Database if they don't already exist
			//otherwise post alert and
		}
	}
	function verifyLogIn(){
		let _valid = true;
		user= document.getElementById('userName');
		pass = document.getElementById("password");
		if(user.value==""){
			document.getElementById("userName").ClassList +="error";
			document.getElementById("error_user").innerHTML="<caption>You can not leave this field empty.</caption>";
			_valid=false;
		}
		else{
			document.getElementById("userName").ClassList +="error";
			document.getElementById("error_user").innerHTML="<caption></caption>";
		}
		if(pass.value==""){
			document.getElementById("password").ClassList +="error";
			document.getElementById("error_pass").innerHTML="<caption>You can not leave this field empty.</caption>";
			_valid=false;
		}
		else{
			document.getElementById("password").ClassList +="error";
			document.getElementById("error_pass").innerHTML="<caption></caption>";
		}
		if(!_valid){
			activateButton(false);
		}
		else{
			activateButton(true);
			//post info to Server.py, add to the sqlite Database if they don't already exist
			//otherwise post alert and
		}
	}
	function activateButton(value){
		if(value){
			document.getElementById("submitLogIn").innerHTML="<button class='btn-success' type='submit'>Log In</button>";
		}
		else{
			document.getElementById("submitLogIn").innerHTML="<button class='btn-danger' type='button'>Log In</button>";
		}
	}
	function activateButtonRegister(value){
		if(value){
			document.getElementById("submitRegister").innerHTML="<button class='btn-success' type='submit'>Register</button>";
		}
		else{
			document.getElementById("submitRegister").innerHTML="<button class='btn-danger' type='button'>Register</button>";
		}
	}
