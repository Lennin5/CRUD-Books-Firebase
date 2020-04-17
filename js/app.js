function Login(){

    var emailA=document.getElementById('emailLogin').value;
    var passA=document.getElementById('passLogin').value;
 
         firebase.auth().signInWithEmailAndPassword(emailA, passA)
         .then(res=>{
           window.location.href="./index.html";
         })
         .catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
             alert(errorMessage);
             //Aquí aplicaría los errores de contraseña incorrecta, el usuario no existe, etc.
         });
    }
 
   function LogOut(){
   firebase.auth().signOut()
   .then(function(){
     window.location='../login-firebase/index.html';    
   })
   .catch(function(error){
     console.log(error)
   })
 }
 
 
    function Register(){
 
   userName = document.getElementById("userNameRegister").value;
   email = document.getElementById("emailRegister").value;
   pass = document.getElementById("passRegister").value;
 
   firebase.auth().createUserWithEmailAndPassword(email, pass)
   .then(res=>{                           
       firebase.firestore().collection(res.user.uid).doc("UserData").set({
         uid: res.user.uid,
         displayName: userName,
         email: email,
         photoURL: "https://www.stickpng.com/assets/images/585e4beacb11b227491c3399.png"
       }).then(res=>{
         console.log("se guardaron los datos en la BD");
           document.getElementById("Cancelar").click();
           firebase.auth().signOut()
           window.location.href="./index.html"
       }).catch(err=>{
         console.log("No se guardaron los datos en la BD");
       })                                                                    
     }).catch(err=>{
   console.log(err)
   console.log("Error, Usuario No Registrado"); 
  });              
           
 }
 
 
 
 
 
   //  function Register(){
 
   // email = document.getElementById("emailRegister").value;
   // pass = document.getElementById("passRegister").value;
 
   //       firebase.auth().createUserWithEmailAndPassword(email, pass)
   //       .then(res=>{   
   //               console.log("Usuario Registrado");  
                                 
                 //This code is for SignOut because in Firebase when we register our user,
                 //the app make automatically login :)
 
                 //The register is saved successfully but don't show in the console,
                 // check the Auth Users in firebase to verify the user.
 
                 // firebase.auth().signOut()
                 // .then(function(){
                 //   M.toast({html: 'Usuario Registrado', classes: 'rounded'});    
                 //   document.getElementById("Cancelar").click();
                 //   window.location='../login-firebase/index.html';    
                 // })
 //                 .catch(function(error){
 //                   console.log(error)
 //                 })                
           
 //         }).catch(err=>{ 
 //           console.log("Error, Usuario No Registrado");     
 //           //Aquí aqplicaría los errores IF de contraseña corta, correo no valido, etc.
 //         });
 // }