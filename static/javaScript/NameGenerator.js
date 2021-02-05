/*
step one, have a different method called per race of ethnicity of name made

then set up a series of rules with regex per race, then create random strings on a loop,
and do so printing the ones that follow the regex pattern until x of them are printed,
ignore the strings that don't fit.

ex:

funtion orc(){
const template=(orc regex);
let count=0;
do{
	let orc = random string of size;
	if(orc.test(template)){
		count++;
		print orc;

	}
}while(count<10)


}
*/


function orcNames(){
	console.log("Starting Orc");
	const templateOrc =/(([A-Z]?[a-z])(?=.*[aeiou]))/;
	var names=[];
	while(names.length<10){
	console.log(names.length);
		var tempName="";
		console.log("Forloop");
		let bounds = Math.floor(Math.random()*7)+2;
		for(let i = 0;i<bounds;i++){
			if(tempName.length==0)
				tempName+=String.fromCharCode((Math.floor(Math.random()*26))+65);
			else
				tempName+=String.fromCharCode((Math.floor(Math.random()*26))+97);
			console.log(tempName);
		}
		//tempName.charAt(0)=tempName[0].toUpperCase();
		console.log("ifValid check");
		if(templateOrc.test(tempName)){
			console.log("Valid! --- Added!");
			names.push(tempName);
		}
		else{
			console.log("Not Valid!");
		}
	}
	console.log(names);
	document.getElementById("output").innerHTML="";
	for(let i=0;i<10;i++){
	document.getElementById("output").innerHTML+=names[i]+"<br/>";	
	}
	
}

function orcNamesTrue(){
	console.log("Funtion Orc Names called");
	const StartingLetter=/[ABDGKLMORSTUYZ]/;
	const HardSounds=/[GTKDgtkd]/;
	const Vowels=['a','e','i','o','u'];
	const hasVowel=/[AEIOUaeiou]/;
	const SoftSounds=/[LSZRLHlszrlh]/;
	let names=[];
	
	while(names.length<10){
		console.log("While loop of name "+names.length+" started");
		var tempName = "";
		let bounds = Math.floor(Math.random()*7)+2;
		let crashControl=0;
		while(tempName.length<bounds){
			console.log("Starting while loop on character "+tempName.length+" out of "+bounds+" of name number "+names.length+" of loop #"+crashControl);
			crashControl+=1;
			console.log("Crash control: "+crashControl);
			if(crashControl==10){
				console.log("error");
				break;
			}
			if(tempName.length > 0)
				console.log("Last character is "+tempName.charAt(tempName.length-1));
			let d5 = (Math.floor(Math.random()*5));
			if(tempName.length==0){
				console.log("Adding first character.");
				do{
					tempName=String.fromCharCode((Math.floor(Math.random()*26))+65);
					console.log(tempName);
				}while(!(StartingLetter.test(tempName)));
				console.log('hits a continue 1');
				continue;
			}//case if end: First letter of name
			if(bounds == 2){
				console.log('two letter word');
				if(hasVowel.test(tempName.charAt(tempName.length-1))){
					console.log("adding hard sounds");
					let tempLetter="";
					do{
						temp=String.fromCharCode((Math.floor(Math.random()*26))+97);
					}while(!(HardSounds.test(temp)));
					tempName+=temp;
					console.log('Hits continue');
					continue;
				}
				else{
					let d5 = (Math.floor(Math.random()*5));
					console.log("d5:"+d5);
					console.log("adding vowel");
					tempName+=Vowels[d5];
					console.log('Hits continue');
					continue;
				}		
				
			}
			if((tempName.charAt(tempName.length-1).toLowerCase()=='t')||(tempName.charAt(tempName.length-1).toLowerCase()=='s')){
			let d2 = (Math.floor(Math.random()*2));
			console.log("d2:"+d2);
				if(d2==0){
					console.log("adding vowel");
					tempName+=Vowels[d5];
				}
				else{
					console.log("adding h");
					tempName+='h';
				}
			if(tempName.length == crashControl){
					console.log('hits a continue 2');
					continue;
				}
			
			}//case if end: last letter was a t or s
			if(HardSounds.test(tempName.charAt(tempName.length-1))){
				let d2 = (Math.floor(Math.random()*2));
				if(hasVowel.test(tempName)){
					console.log("d2:"+d2)
					if(d2==0){
						let d5 = (Math.floor(Math.random()*5));
						console.log("Adding vowel");
						tempName+=Vowels[d5];
					}
					else{
						console.log("adding hard sounds");
						let tempLetter="";
						do{
							temp=String.fromCharCode((Math.floor(Math.random()*26))+97);
						}while(!(HardSounds.test(temp)));
						tempName+=temp;
					}
				}
				else{
					console.log("d2:"+d2)
					if(d2==0){
						let d5 = (Math.floor(Math.random()*5));
						console.log("Adding vowel");
						tempName+=Vowels[d5];
					}
					else{
						console.log("adding hard sounds");
						let tempLetter="";
						do{
							temp=String.fromCharCode((Math.floor(Math.random()*26))+97);
						}while(!(SoftSounds.test(temp)));
						tempName+=temp;
					}
				}
				console.log('hits a continue 3');
				continue;
			}//case if end: last letter was a hard consonent
			if(SoftSounds.test(tempName.charAt(tempName.length-1))||StartingLetter.test(tempName.charAt(tempName.length-1))){
				console.log('last letter was soft sound.');
					let d3 = (Math.floor(Math.random()*3));
					console.log("d3:"+d3)
					if(d3==0){
						console.log("Attempting to add a vowel.");
						if(hasVowel.test(tempName[tempName.length-1])){
							if(!(hasVowel.test(tempName[tempName.length-2]))){
								console.log("adding vowel");
								tempName+=Vowels[d5];
							}
						}
						else{
							console.log('will add a soft sound instead.');
							do{
								temp=String.fromCharCode((Math.floor(Math.random()*26))+97);
							}while(!(SoftSounds.test(temp)));
							tempName+=temp;
						}
					}
					if(d3==1){
						console.log("adding hard sounds");
						do{
							temp=String.fromCharCode((Math.floor(Math.random()*26))+97);
						}while(!(HardSounds.test(temp)));
						tempName+=temp;
					}
					if(d3==2){
						console.log("adding soft sounds");
						do{
							temp=String.fromCharCode((Math.floor(Math.random()*26))+97);
						}while(!(SoftSounds.test(temp)));
						tempName+=temp;
					}
				if(tempName.length == crashControl){
					console.log('hits a continue 4');
					continue;
				}
			}//case if end: last letter was a soft sound
			if(hasVowel.test(tempName.charAt(tempName.length-1))&&(tempName.length>1)){
			console.log('Has a vowel, will try to add another.');
				let d2 = (Math.floor(Math.random()*2));
				let d5 = (Math.floor(Math.random()*5));
				console.log("d2:"+d2)
				console.log("d5:"+d5)
				if(d2==0){
					console.log("will try to add vowel.");
					if(!(hasVowel.test(tempName[tempName.length-2]))){
						console.log("adding vowel");
						tempName+=Vowels[d5];
					}
					else{
						console.log("adding hard sounds instead");
						do{
							temp=String.fromCharCode((Math.floor(Math.random()*26))+97);
						}while(!(HardSounds.test(temp)));
						tempName+=temp;
					}
						
				}
				else{
					console.log("adding hard sounds");
					do{
						temp=String.fromCharCode((Math.floor(Math.random()*26))+97);
					}while(!(HardSounds.test(temp)));
					tempName+=temp;
				}
			console.log('hits a continue 5');
			continue;
			}//case if end: last letter was a vowel
		}//while end: string that creates name character at a time
		for(let i=0;i<tempName.length;i++){
			if(hasVowel.test(tempName.charAt(i))){
				break;
			}
			if(i=tempName.length){
				let d5 = (Math.floor(Math.random()*5));
				let dLength = (Math.floor(Math.random()*(tempName.length-1)+1));
				console.log(dLength);
				tempName= tempName.substring(0,dLength)+Vowels[d5]+tempName.substring(dLength+1,);
			}
		}
		names.push(tempName);
	}//while end: names.length<10
	console.log(names);
	document.getElementById("output").innerHTML="";
	for(let i=0;i<10;i++)
		document.getElementById("output").innerHTML+=names[i]+"<br/>";
	
}