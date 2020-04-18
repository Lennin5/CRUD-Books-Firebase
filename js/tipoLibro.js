//Funcion preview de imagen para agregar libro
function UploadImageFromAddBook(e){
  var file = e.files[0];
  var reader = new FileReader();

  reader.onloadend=function(){
    document.getElementById("imageBookPreviewAdd").src = reader.result;    
  }
  reader.readAsDataURL(file)
}
//Funcion No Imagen: pone vacío el SRC del preview de la imagen de libro y VALUE del input de imagen
function NotImage(){
  document.getElementById("imageBookPreviewAdd").src = "";       
  document.getElementById("imageBookAdd").value = "";       
}
//CREATE: Crear un registro
function AddBook(){  
  uid = document.getElementById("uid").innerHTML;
  name = document.getElementById("nameBookAdd").value;
  description = document.getElementById("descriptionBookAdd").value;
  descriptionHeight = document.getElementById("descriptionBookAdd").style.height;  
  imageBookPreviewAdd = document.getElementById("imageBookPreviewAdd").src;
  image = document.getElementById("imageBookAdd").files[0];     
  notImageURL = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/Users%2FJiJcUrMlJjYgJH7SN0sYdc2ByaP2%2FBookCovers%2FDefaultCover.jpg?alt=media&token=22df8873-ec96-40f7-993f-582e8818e45a";
  date = new Date();  

  DefaultCover0 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover0.jpg?alt=media&token=143dc0ef-d043-4167-a5eb-e6d412a2778c";
  DefaultCover1 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover1.jpg?alt=media&token=e859f7ee-5665-4481-a8ed-33a49c820534";
  DefaultCover2 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover02.jpg?alt=media&token=973b0cda-e80b-4dcd-85ee-81b783d247ea";
  DefaultCover3 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover3.jpg?alt=media&token=bf3ea453-0d5a-44dd-b7cb-3056ce67404b";
  DefaultCover4 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover4.jpg?alt=media&token=48b9886e-5ae4-4d75-84f1-a8da4b24d451";
  DefaultCover5 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover5.jpg?alt=media&token=451690f7-2fea-4470-ac8b-b9b5b809870b";
  DefaultCover6 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover6.jpg?alt=media&token=444b2af8-cbbb-42dc-a843-20ab53b13517";
  DefaultCover7 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover7.jpg?alt=media&token=199df651-58a4-4f7c-b706-0647a08c625e";
  DefaultCover8 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover08.jpg?alt=media&token=4e0759dc-1ab5-496e-a669-67f46d6450ad";
  DefaultCover9 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover9.jpg?alt=media&token=4dcd0e50-0431-4bac-9660-a8b428cdf429";
  DefaultCover10 = "https://firebasestorage.googleapis.com/v0/b/cld-beta.appspot.com/o/DefaultCovers%2FDefaultCover10.jpg?alt=media&token=fe7f4ce2-2dfa-4714-ba8f-70b6cd0d8d96";
    

  //Si el usuario no llena los campos necesarios
  if(name == ""){
    M.toast({html: 'Por favor, asigna un nombre al libro!', classes: 'rounded'});
  }else 
  if(description == ""){
    M.toast({html: 'Por favor, indica la descripción del libro!', classes: 'rounded'});
  }else 
  //Si el usuario no quiere poner una imagen
  if(imageBookPreviewAdd == "" || imageBookPreviewAdd == "file:///C:/xampp/htdocs/login-firebase/tipoLibro.html"){           
    num = Math.floor(Math.random() * 10)
    if (num == 0) {
      DefaultCover = DefaultCover0;
      }else
    if(num == 1){
        DefaultCover = DefaultCover1;
      }else
    if(num == 2){
        DefaultCover = DefaultCover2;
      }else
    if(num == 3){
        DefaultCover = DefaultCover3;
      }else
    if(num == 4){
        DefaultCover = DefaultCover4;
      }else
    if(num == 5){
        DefaultCover = DefaultCover5;
      }else
    if(num == 6){
        DefaultCover = DefaultCover6;
      }else
    if(num == 7){
        DefaultCover = DefaultCover7;
      }else
    if(num == 8){
        DefaultCover = DefaultCover8;
      }else
    if(num == 9){
        DefaultCover = DefaultCover9;
      }else
    if(num == 10){
        DefaultCover = DefaultCover10;
      }
    firebase.firestore().collection(uid).add({    
      name: name,
      description: description,     
      descriptionHeight: descriptionHeight,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(), 
      photoURL: DefaultCover,
      photoName: "DefaultCover"+num+".jpg"           
    })
    .then(res=>{      
      console.log("Se ha guardado el libro");
      }).catch(err=>{
          console.log(err);
      })     
      
      CardAddReset();
      
      M.toast({html: 'Se ha guardado el libro', classes: 'rounded'});         
  }else
  //Si el usuario pone una imagen
  if(imageBookPreviewAdd != ""){
  firebase.firestore().collection(uid).add({
    name: name,
    description: description,            
    descriptionHeight: descriptionHeight,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(res=>{
    var id = res.id;      
    uid = document.getElementById("uid").innerHTML;      

    var storageRef = firebase.storage().ref("Users/"+ uid +"/BookCovers/"+ date + image.name );
    var uploadImage = storageRef.put(image);

    uploadImage.on("state_changed", ()=>{}, (err)=>{console.log(err)}, ()=>{
        uploadImage.snapshot.ref.getDownloadURL().then(url=>{

        firebase.firestore().collection(uid).doc(id).update({
          photoURL: url,
          photoName: date + image.name
        }).then(res=>{
          console.log("Se ha guardado el libro");
        }).catch(err=>{
          console.log(err)
        })       

        }).catch(err=>{
          console.log(err)
        })
    });    
    
    }).catch(err=>{
        console.log(err);
    })       

    CardAddReset();

    M.toast({html: 'Se ha guardado el libro', classes: 'rounded'});   
  }  
}
function CardAddReset(){
  document.getElementById("CancelarAdd").click();    
  document.getElementById("nameBookAdd").value = "";   
  document.getElementById("descriptionBookAdd").value = "";   
  document.getElementById("descriptionBookAdd").style.height = "20px";

  document.getElementById("imageBookPreviewAdd").src = '';  
  document.getElementById("imageBookAdd").value = '';  

  document.getElementById('modalScrollAdd').scrollTop = 0;
  document.getElementById('tabActiveAdd').click();  
}


// FASE BETA DE UN BUSCADOR

// function BuscarRegistro(){
//   var palabra = document.getElementById("palabra").value;
//   firebase.firestore().collection("TipoLibro").orderBy('nombre').startAt(palabra).endAt(palabra+'\uf8ff')
//   .onSnapshot(res=>{
//     listarTipoLibros(res);
//   });

//   function listarTipoLibros(res){
//     var contenido = "<table>"
//             contenido+="<thead>"
//           contenido+="<tr>"
//               contenido+="<th>ID</th>"
//               contenido+="<th>Nombre</th>"
//               contenido+="<th>Descripcion</th>"
//               contenido+="<th>Acciones</th>"
//           contenido+="</tr>"
//         contenido+="</thead>"

//         contenido+="<tbody>"
//         res.forEach(rpta=>{
//           var fila=rpta.data();
//           contenido+="<tr>"
//             contenido+="<td>"+rpta.id+"</td>"
//             contenido+="<td>"+fila.nombre+"</td>"
//             contenido+="<td>"+fila.descripcion+"</td>"
//             contenido+="<td>"
//             contenido+="<a class='waves-effect waves-light btn grey darken-2 modal-trigger' href='#modalEdit' onclick='Edit(\""+rpta.id+"\")'>"
//             contenido+="<i class='material-icons'>border_color</i></a>"
//             contenido+="<a class='waves-effect waves-light btn grey darken-2 modal-trigger' href='#modalAntiDelete' onclick='AntiDelete(\""+rpta.id+"\")'>"
//             contenido+="<i class='material-icons'>delete</i></a>"
//             contenido+="</td>"
//           contenido+="</tr>"
//           contenido+="<tr>"         
//         });
//         contenido+="</tbody>"
//       contenido+="</table>"
    
//     document.getElementById("divTipoLibro").innerHTML = contenido;

//   }  
// }
// READ: Leer datos    Pd: order by desc, asc




//Funcion preview de imagen para editar libro
function UploadImageFromUpdateBook(e){
  var file = e.files[0];
  var reader = new FileReader();

  reader.onloadend=function(){
    document.getElementById("imageBookPreviewUpdate").src = reader.result;
    document.getElementById("URLActualBook").innerHTML = document.getElementById("imageBookPreviewUpdate").src;
  }
  reader.readAsDataURL(file)
}

  //UPDATE: Traer datos para actualizar mediante id
  function Edit(id){
    uid = document.getElementById("uid").innerHTML;
    firebase.firestore().collection(uid).doc(id).get()
    .then(res=>{
      DefaultCoverNative = "file:///C:/xampp/htdocs/login-firebase/tipoLibro.html";
      //Decision, si el usuario tiene imagen predeterminada que muestre la imagen GRIS y no de color
      //predenterminado que se le puso cuando se agrego en la portada aleatoria al agregar
      userEdit = res.data();
                if(userEdit.photoName == "DefaultCover0.jpg" ||
                   userEdit.photoName == "DefaultCover1.jpg" || 
                   userEdit.photoName == "DefaultCover2.jpg" || 
                   userEdit.photoName == "DefaultCover3.jpg" || 
                   userEdit.photoName == "DefaultCover4.jpg" || 
                   userEdit.photoName == "DefaultCover5.jpg" || 
                   userEdit.photoName == "DefaultCover6.jpg" || 
                   userEdit.photoName == "DefaultCover7.jpg" || 
                   userEdit.photoName == "DefaultCover8.jpg" || 
                   userEdit.photoName == "DefaultCover9.jpg" || 
                   userEdit.photoName == "DefaultCover10.jpg"){
        document.getElementById("idBookUpdate").value = id;
        document.getElementById("nameBookUpdate").value = userEdit.name;
        document.getElementById("descriptionBookUpdate").value = userEdit.description;
        document.getElementById("descriptionBookUpdate").style.height = userEdit.descriptionHeight;
        document.getElementById("imageBookPreviewUpdate").src = DefaultCoverNative;
  
        //Nombre de imagen para ver si se elimina o no
        document.getElementById("nameImageToDeleteBeforeUpdateBook").innerHTML = userEdit.photoName;    
        
        //URL's de comparación
        document.getElementById("URLFixedImageToCompareWithActualBook").innerHTML = userEdit.photoURL;
        document.getElementById("URLActualBook").innerHTML = userEdit.photoURL;                
        }else{
        document.getElementById("idBookUpdate").value = id;
        document.getElementById("nameBookUpdate").value = userEdit.name;
        document.getElementById("descriptionBookUpdate").value = userEdit.description;
        document.getElementById("descriptionBookUpdate").style.height = userEdit.descriptionHeight;
        document.getElementById("imageBookPreviewUpdate").src = userEdit.photoURL;
  
        //Nombre de imagen para ver si se elimina o no
        document.getElementById("nameImageToDeleteBeforeUpdateBook").innerHTML = userEdit.photoName;    
        
        //URL's de comparación
        document.getElementById("URLFixedImageToCompareWithActualBook").innerHTML = userEdit.photoURL;
        document.getElementById("URLActualBook").innerHTML = userEdit.photoURL;            
          }  
    }).catch(err=>{
        console.error("Error to get Data: ", error);
    })
  }
  //UPDATE - Editar registro de coleccion
  function UpdateBook(){
  
    uid = document.getElementById("uid").innerHTML;
    id = document.getElementById("idBookUpdate").value;  
    name = document.getElementById("nameBookUpdate").value;
    description = document.getElementById("descriptionBookUpdate").value;
  
    //Comparación de URL's para ver si el usuario cambió la imagen
    URLActualBook = document.getElementById("URLActualBook").innerHTML;  
    URLFixedImageToCompareWithActualBook = document.getElementById("URLFixedImageToCompareWithActualBook").innerHTML;
    
    image = document.getElementById("imageBookUpdate").files[0];  
    
    if (URLFixedImageToCompareWithActualBook == URLActualBook) { 
      firebase.firestore().collection(uid).doc(id).update({
        name: name,
        description: description
      })
      .then(res=>{
        document.getElementById("CancelarUpdate").click();
        document.getElementById("nameBookUpdate").value = "";   
        document.getElementById("descriptionBookUpdate").value = "";
        document.getElementById("imageBookUpdate").value = ""; 
        document.getElementById("nameImageToDeleteBeforeUpdateBook").innerHTML = "";      
          
        M.toast({html: 'Datos Actualizados Del Libro '+name, classes: 'rounded'});    
      }).catch(err=>{         
        console.log(err);    
    })  
    } else {
      DeleteImage();

      firebase.firestore().collection(uid).doc(id).update({
        name: name,
        description: description
      })
      .then(res=>{
        
        uid = document.getElementById("uid").innerHTML;
        id = document.getElementById("idBookUpdate").value;        
        image = document.getElementById("imageBookUpdate").files[0];   
        date = new Date();               
        
        var storageRef = firebase.storage().ref("Users/"+ uid +"/BookCovers/"+ date + image.name);
        var uploadImage = storageRef.put(image);
        
          uploadImage.on("state_changed", ()=>{}, (err)=>{console.log(err)}, ()=>{
          uploadImage.snapshot.ref.getDownloadURL().then(url=>{
        
          firebase.firestore().collection(uid).doc(id).update({
            photoURL: url,
            photoName: date + image.name
          }).then(res=>{
            console.log("Se ha actualizado el libro")
          }).catch(err=>{
            console.log(err)
          })       
        
          }).catch(err=>{
            console.log(err)
          })
        });
  
        document.getElementById("CancelarUpdate").click();
        document.getElementById("nameBookUpdate").value = "";   
        document.getElementById("descriptionBookUpdate").value = "";
        document.getElementById("imageBookUpdate").value = ""; 
        document.getElementById("nameImageToDeleteBeforeUpdateBook").innerHTML = "";      
          
        M.toast({html: 'Datos Actualizados Del Libro '+name, classes: 'rounded'});    
      }).catch(err=>{         
        console.log(err);    
    })  
    }
  }

//Función elimimnar image
function DeleteImage(){
  nameImageToDeleteBeforeUpdateBook = document.getElementById("nameImageToDeleteBeforeUpdateBook").innerHTML;

          if(nameImageToDeleteBeforeUpdateBook == "DefaultCover0.jpg" ||
             nameImageToDeleteBeforeUpdateBook == "DefaultCover1.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover2.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover3.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover4.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover5.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover6.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover7.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover8.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover9.jpg" || 
             nameImageToDeleteBeforeUpdateBook == "DefaultCover10.jpg"){
             //FUNCION VAC[IA]FUNCION VAC[IA]FUNCION VAC[IA]FUNCION VAC[IA]FUNCION VAC[IA]
          }else{
            // Create a reference to the file to delete
            var storageService = firebase.storage();          
            var storageRef = storageService.ref("/");
            var desertRef = storageRef.child('Users/'+uid+'/BookCovers/'+nameImageToDeleteBeforeUpdateBook);
      
            // Delete the file
            desertRef.delete().then(function() {
              
            }).catch(function(err) {
              console.log(err)
            });    
          }

}




//DELETE: Traer datos para eliminar mediante id
function AntiDelete(id){
  uid = document.getElementById("uid").innerHTML;
  firebase.firestore().collection(uid).doc(id).get()
  .then(res=>{
      userDelete = res.data();
      document.getElementById("idBookDelete").value = id;
      document.getElementById("nameImageToDeleteBook").innerHTML = userDelete.photoName;
  }).catch(err=>{
      console.error("Error to get Data: ", error);
  })
}
//DELETE - Eliminar registro de coleccion
function Delete(){
  uid = document.getElementById("uid").innerHTML;
  id = document.getElementById("idBookDelete").value;
  nameImageToDeleteBook = document.getElementById("nameImageToDeleteBook").innerHTML;
  //Eliminar datos del libro
  firebase.firestore().collection(uid).doc(id).delete()
  .then(res=>{
            if(nameImageToDeleteBook == "DefaultCover0.jpg" ||
               nameImageToDeleteBook == "DefaultCover1.jpg" ||
               nameImageToDeleteBook == "DefaultCover2.jpg" || 
               nameImageToDeleteBook == "DefaultCover3.jpg" || 
               nameImageToDeleteBook == "DefaultCover4.jpg" || 
               nameImageToDeleteBook == "DefaultCover5.jpg" || 
               nameImageToDeleteBook == "DefaultCover6.jpg" || 
               nameImageToDeleteBook == "DefaultCover7.jpg" || 
               nameImageToDeleteBook == "DefaultCover8.jpg" || 
               nameImageToDeleteBook == "DefaultCover9.jpg" || 
               nameImageToDeleteBook == "DefaultCover10.jpg"){
               //FUNCION VAC[IA]FUNCION VAC[IA]FUNCION VAC[IA]FUNCION VAC[IA]FUNCION VAC[IA]
            }else{
              // Eliminar foto del libro
              var storageService = firebase.storage();          
              var storageRef = storageService.ref("/");
              var desertRef = storageRef.child('Users/'+uid+'/BookCovers/'+nameImageToDeleteBook);
        
              // Delete the file
              desertRef.delete().then(function() {
                
              }).catch(function(error) {
                
              });
            }
      document.getElementById("CancelarDelete").click();
      console.log("Se ha eliminado el registro");      
      M.toast({html: 'El registro ha sido eliminado', classes: 'rounded'});      
  }).catch(err=>{
      console.log("Error, no  se pudo eliminar el documento");
  })  
}