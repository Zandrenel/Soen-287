function verifyDelete(Tabname,HeaderName){
	let xhttp = new XMLHttpRequest();
		//let value = confirm("Are you sure that you wish to DELETE this item?");
		//if(this.readystate == 4 && this.status ==200){
			if(confirm("Are you sure that you wish to DELETE this item?")){
				let path = "/Lore/delete/"+Tabname+"/"+HeaderName;
				xhttp.open("POST",path,true);
				xhttp.send();
				setTimeout(function(){;window.location.reload(true); }, 2000);
			}
		//}

}
function verifyDeleteTab(Tabname){
	let xhttp = new XMLHttpRequest();		
		if(confirm("Are you sure that you wish to DELETE this item?")){
			let path = "/Lore/delete/"+Tabname;
			xhttp.open("POST",path,true);
			xhttp.send();
			setTimeout(function(){;window.location.reload(true); }, 2000);
		}
}

function replaceWithInput(tab){
	let _id='TabOf'+tab;
	document.getElementById(_id).innerHTML="<form action='Lore/edit/"+tab+"' method='POST'><input name='edit"+tab+"' value='"+tab+"'><button onclick='revert("+tab+")' type='submit'>Confirm</button></form>";

}
function revert(tab){
	let _id='TabOf'+tab;
	document.getElementById(_id).innerHTML="<a class='nav-link' data-toggle='pill' href='#"+tab+"' onclick=\"addContentAdmin({{Lore.Lore["+tab+"]}},'"+tab+"')\"><p>"+tab+"</p></a>"+
											"<p class=\"mod\" onclick=\"verifyDeleteTab('"+tab+"')\">Delete </p><p class=\"mod\" onclick=\"replaceWithInput('"+tab+"')\">Edit</p>";
}

function addTab(){
	document.getElementById("addTab").innerHTML="<form action='/Lore/addNewTab' method='POST'><input name='tabAdd'><button onclick='revertAddTab()' type='submit'>Add</button></form>";
}
function revertAddtab(){
	document.getElementById("addTab").innerHTML="<p class='mod' onclick='addTab()'>Add Tab</p>"
}

//----------------------------------------------------------------------------------------------
//New Lore Stuff
function tabEditForm(Tab){
	document.getElementById(Tab).innerHTML='<input type="text" name="editTab'+Tab+'" id="editTabInput" value=\''+Tab+'\'>';
	document.getElementById("editTabButton"+Tab).innerHTML='<button type="submit" onclick="sendData(\''+Tab+'\')">Submit</button>';
}
function sendData(Tab){
	let xhttp = new XMLHttpRequest();
	let path=document.getElementById("editTab"+Tab+"Form").action;
	xhttp.open("POST",path,true);
	xhttp.send();
	
	RevertTabEditForm(Tab);
}
function RevertTabEditForm(Tab){

	let nTab= document.getElementById("editTabInput").value
	document.getElementById(Tab).innerHTML=nTab;
	document.getElementById("editTabButton"+Tab).innerHTML='<button type="button" onclick="tabEditForm(\''+nTab+'\')">Edit</button>';
	document.getElementById(Tab).id=nTab;
	document.getElementById("editTabButton"+Tab).id="editTabButton"+nTab;
	document.getElementById("editTab"+Tab+"Form").action='/Lore/editTab/'+nTab;
	document.getElementById("editTab"+Tab+"Form").id='editTab'+nTab+'Form';
	
}

function changeTab(activeTab){
		
		
	if (window.XMLHttpRequest) {
	// code for modern browsers
		xmlhttp = new XMLHttpRequest();
 	}
 	else {
	// code for old IE browsers
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
		open(send(),'/LoreDataBaseTabs', false);
		LoreTabs = this.responseText();
		
		for(tab:LoreTabs){
			if(activeTab==tab){
				document.getElementById(tab).className="d-block";
				console.log(tab+" should be showing")
			}
			else{
				document.getElementById("MapMaker").className="d-none";
				console.log(tab+" should be hidden")
			}
		}

		
		
	}


