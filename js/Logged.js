function listarLibrosFavoritos(doc){     
  var threeDots = '...';
  var contenido="<div class='row'>"
  doc.forEach(rpta=>{      
    var favoriteBook=rpta.data();       
    contenido+="<div class='col s12 m12 l12'>"

    contenido+="<div class='container-image-favorite-book'>"
          contenido+="<img src='"+favoriteBook.photoURL+"' style='width:100%; height: 110px;'' class='image-favorite-card'>"
          contenido+="<div class='top-left'>"      
            contenido+="<div class='flex-favorite-card'>"
              contenido+="<div class=''>"
                contenido+="<a class='waves-effect waves-light circle-letter-favorite-book'><h4><b>"
                  contenido+="<p class='white-text letter-favorite-book' style='font-family: Georgia'>"
                    contenido+=""+favoriteBook.name.charAt(0)+"</p></b></h4></a>"
              contenido+="</div>"
              contenido+="<div class='name-letter-favorite-book'>"
                contenido+="<div class='left-align'>"
                  contenido+="<h5 class='white-text'>"+favoriteBook.name.substring(1, 20)+"</h5>"                      
                  contenido+="<p class='white-text'>"+favoriteBook.description.substring(0, 190)+threeDots+"</p>"                           
                contenido+="</div>"
              contenido+="</div>"
            contenido+="</div>"                
          contenido+="</div>"
          contenido+="<div class='top-right'>"
            contenido+="<div class='radius'>"
              contenido+="<i onclick='AddToFavorite(\""+rpta.id+"\")' class='material-icons white-text favorite-icon-index' title='Quitar de mi lista de favoritos'>favorite</i>"
            contenido+="</div>"          
          contenido+="</div>"      
        contenido+="</div>"              
    
     contenido+="</div>"                        
});    
contenido+="</div>"    

document.getElementById("divFavoriteBooks").innerHTML = contenido;  
  
}    


function AddToFavorite(id){
  
    uid = document.getElementById("uid").innerHTML;    
  
    firebase.firestore().collection(uid).doc(id).get()
    .then(doc => {    
         favoriteValue = doc.data().favorite;  
         
         if(favoriteValue == "No"){
          firebase.firestore().collection(uid).doc(id).update({
            favorite: "Si",
          })
          .then(res=>{              
            M.toast({html: 'Se ha agregado a tu lista de favoritos', classes: 'rounded'});    
          }).catch(err=>{         
            console.log(err);    
        })  
        }else{
          firebase.firestore().collection(uid).doc(id).update({
            favorite: "No",
          })
          .then(res=>{              
            M.toast({html: 'Se ha quitado de tu lista de favoritos', classes: 'rounded'});
          }).catch(err=>{         
            console.log(err);    
        })  
        }         
  
    })
    .catch(err => {
      console.log('hola, el error es', err);
    });
    
  }