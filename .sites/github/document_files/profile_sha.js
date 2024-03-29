function verifyProfilePasswordSha(formname)
{
	
   var formObj=eval("document."+formname);
	if(formObj.profilePassword.value == "")
	{
		alert("Enter profile password");
		formObj.profilePassword.focus();
		return false;
	}
	//aruna	
	encryptSha2ProfilePassword(formname,"profilePassword", "shaProfilePasswd");
	encryptPassword(formname,"profilePassword");	
	formObj.mvkbLang.value = formObj.ppSelect.value;
	formObj.submit();
}

function profilePWDValidationSha(formname)
{
	
	var changeFromObj=eval("document."+formname);
	var newpass=eval("document."+formname+".newPassword.value");
	var profpassword =eval("document."+formname+".profpassword");
	profpassword.value = newpass;
	if(changeFromObj.oldProfilePassword.value == ""){
		alert("Enter old profile password");
		changeFromObj.oldProfilePassword.focus();
		return false;
	}		
	
	else if(changeFromObj.newPassword.value == ""){
		alert("Enter new profile Password");
		changeFromObj.newPassword.focus();
		return false;
	}
	else if(changeFromObj.confirmPassword.value == ""){
		alert ("Re-type the new profile Password");
		changeFromObj.confirmPassword.focus();
		return false;
	}else if(changeFromObj.newPassword.value == changeFromObj.oldProfilePassword.value){
		alert("Old profile password and new profile password cannot be the same");
		changeFromObj.newPassword.focus();
		return false;
	}		
	else if(changeFromObj.newPassword.value != changeFromObj.confirmPassword.value ){
		alert("New profile password and Re-type new profile password fields should match");
		changeFromObj.confirmPassword.focus();
		return false;
	}		
	else if(!passwordCheck(changeFromObj.newPassword.value)){
		changeFromObj.newPassword.focus();
		return false;	
	}
	else{
		encryptSha2ProfilePassword(formname,"newPassword", "shaProfilePasswd");
	   encryptPassword(formname,"newPassword");	   
	   var encConfirmPwd=eval("document."+formname+".newPassword.value");
	   var confirmpass=eval("document."+formname+".confirmPassword");
	   confirmpass.value=encConfirmPwd;
	   
	   changeFromObj.submit();	
	}
}	

function validateSetPasswordSha(formname){
   	var formObj=eval("document."+formname);
	var newpass=eval("document."+formname+".profilePassword.value");
	var profpassword =eval("document."+formname+".profpassword");
	profpassword.value = newpass;
	
	if(formObj.profilePassword.value == ""){
		alert("Enter profile password");
		formObj.profilePassword.focus();
		return false;
	}		
	else if(formObj.confirmprofilePassword.value == ""){
		alert("Enter confirm password");
		formObj.confirmprofilePassword.focus();
		return false;
	}else if(formObj.profilePassword.value != formObj.confirmprofilePassword.value){
		alert("Profile password and confirm password should be the same");
		formObj.profilePassword.focus();
		return false;
	}else if(!passwordCheck(formObj.profilePassword.value))
		return false;
	//if(document.getElementById("hintQuestion") != null){
		if(formObj.hintQuestion.value == ""){
			alert("Select hint question");
			formObj.hintQuestion.focus();
			return false;
		}else if(formObj.hintAnswer.value == ""){
			alert("Enter hint answer");
			formObj.hintAnswer.focus();
			return false;
		}else if(!checkanswer("setProfilePwd","hintAnswer","hint answer"))
			return false;
	//}
	
	if(!validateDOBPOB(formObj,'no'))
		return false;
		encryptSha2ProfilePassword(formname,"profilePassword", "shaprofpassword");
	   encryptPassword(formname,"profilePassword");
	   var encConfirmPwd=eval("document."+formname+".profilePassword.value");
	   var confirmpass=eval("document."+formname+".confirmprofilePassword");
	   confirmpass.value=encConfirmPwd;
	   formObj.submit();	
}

function submitLoginSha(md5KeyValue)
{   	
	//added for CR 5034 - begin.
	var username ="";
	//var errorCode = document.quickLookForm.errorCode.value;
	var errorCode = null;
	if (errorCode!=null && errorCode == 'K001'){
		username = document.quickLookForm.kModeUserName.value;// user name from tmpl_style
	}
	else{
		username = document.quickLookForm.userName.value;		
	}
	//added for CR 5034 - end.
	var password= document.quickLookForm.password.value;
	var regexp = new RegExp("\\d{19}");
	if(username==""){
		alert("Enter username");
		document.quickLookForm.userName.focus();
		var password ="";
		return false;
	}
	else if(password=="")
	{
		alert("Enter password");
		document.quickLookForm.password.focus();
		return false;
	}  
	else{
		if( password.length>20){
			alert("Password length should not be more than 20 characters");
			document.quickLookForm.password.value="";
			document.quickLookForm.password.focus();
			var password ="";
			return false;
		}

        document.getElementById("btnLogIn").disabled=true;
        var md5keystring = md5KeyValue;//document.quickLookForm.md5key.value ;
       // var md5keystring = document.quickLookForm.md5key.value ;
		var encSaltPass=encryptLoginPassword(md5keystring,username,password);
		var encSaltSHAPass=encryptSha2LoginPassword(md5keystring,username,password);
		document.quickLookForm.password.value=encSaltPass; //changed
		document.quickLookForm.shapassword.value=encSaltSHAPass; //changed
		//document.quickLookForm.action="loginsubmit.htm"
		
		document.quickLookForm.submit();
		
	}
	var password ="";
	return true;
}

function encryptSha2ProfilePassword(formname,strpwd,inpfld){
	try{
		var username=eval("document."+formname+".username.value");
		var profPass=eval("document."+formname+"."+strpwd+".value");
		var shaHash =username+"|"+profPass;
		var encString = CryptoJS.SHA512(shaHash); 
		//aruna
		var ppf=eval("document."+formname+"."+inpfld);
		ppf.value=encString;
		}catch(error){
			
		}
		
	}
//Added by lenin for CR 256 profile pwd salt impl
function verifyProfilePasswordShaSalt(formname,proPwdkey)
{
	
   var formObj=eval("document."+formname);
	if(formObj.profilePassword.value == "")
	{
		alert("Enter profile password");
		formObj.profilePassword.focus();
		return false;
	}	
	encryptSha2ProfilePasswordVerify(formname,"profilePassword", proPwdkey);
	encryptProfilePassword(formname,"profilePassword", proPwdkey);
	formObj.mvkbLang.value = formObj.ppSelect.value;
	formObj.submit();
}
function encryptSha2ProfilePasswordVerify(formname,strpwd,proPwdkey){
	try{		
		var username=eval("document."+formname+".username.value");
		var profPass=eval("document."+formname+"."+strpwd+".value");
		var shaHash =CryptoJS.SHA512(username+"|"+profPass);
		var encString = CryptoJS.SHA512(shaHash+"|"+proPwdkey);		
		//aruna
		var ppf=eval("document."+formname+".shaProfilePasswd");
		ppf.value=encString;
		}catch(error){
			
		}
		
	}
	
function profilePWDValidationShaRetail(formname)
{
	var changeFromObj=eval("document."+formname);
	var oldpass=eval("document."+formname+".oldProfilePassword.value");
	var newpass=eval("document."+formname+".newPassword.value");
	var confirmpass=eval("document."+formname+".confirmPassword.value");
	
	if(oldpass == ""){
		alert("Enter old profile password");
		changeFromObj.oldProfilePassword.focus();
		return false;
	}		

	else if(changeFromObj.newPassword.value == ""){
		alert("Enter new profile Password");
		changeFromObj.newPassword.focus();
		return false;
	}
	else if(changeFromObj.confirmPassword.value == ""){
		alert ("Re-type the new profile Password");
		changeFromObj.confirmPassword.focus();
		return false;
	}else if(changeFromObj.newPassword.value == oldpass){
		alert("Old profile password and new profile password cannot be the same");
		changeFromObj.newPassword.focus();
		return false;
	}		
	else if(changeFromObj.newPassword.value != changeFromObj.confirmPassword.value ){
		alert("New profile password and Re-type new profile password fields should match");
		changeFromObj.confirmPassword.focus();
		return false;
	}		

	else if(!passwordCheck(changeFromObj.newPassword.value)){
		changeFromObj.newPassword.focus();
		return false;	
	}
	else{
		encr(keyString,newpass,"changeProfilePwd");
		encr(keyString,oldpass,"changeOldPwd");
		encr(keyString,confirmpass,"changeConfirmPwd");
		encryptSha2ProfilePassword(formname,"newPassword", "shaProfilePasswd");
	   var encConfirmPwd=eval("document."+formname+".newPassword.value");
	   var confirmpass=eval("document."+formname+".confirmPassword");
	   confirmpass.value=encConfirmPwd;
	   changeFromObj.newPassword.value="";
	   changeFromObj.oldProfilePassword.value="";
	   changeFromObj.confirmPassword.value="";
	   changeFromObj.submit();
	}
}	
