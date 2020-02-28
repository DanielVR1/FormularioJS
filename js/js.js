function AbrirPestañas(evt, nombre) {

    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(nombre).style.display = "block";
    evt.currentTarget.className += " active";
  }

//Registro
var comprob = false;
function inicializar(){
  var btn;
  btn = document.getElementById("botones");
  btn.addEventListener("click", validarRegistro);
  var btns;
  btns = document.getElementById("boton");
  btns.addEventListener("click", validarInicioSesion);
  if(getCookie("logeado") == "Logeado Correctamente"){
      PaginaWeb();
  }
}

function validarRegistro() {
  var nombre = document.getElementById('nombre').value;
  var apellidos = document.getElementById('apellidos').value;
  var usuario = document.getElementById('email').value;
  var contraseña = document.getElementById('contraseña').value;
  var Ccontraseña = document.getElementById('Ccontraseña').value;

  if(!nombre == '' && !apellidos == '' && !usuario == '' && !contraseña == '' && !Ccontraseña == ''){
      
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(usuario)){
          comprob = true;
      }else if (/[0-9]{9}/.test(usuario)){
          comprob = true;
      }else {
          alert("Error de formato.");
          comprob = flase;
      }
      
      if(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/.test(contraseña) && contraseña == Ccontraseña){
          comprob = true;
      }else if(Ccontraseña != contraseña){
          alert("Las contraseñas no coinciden: "+contraseña+" "+Ccontraseña);
          comprob = false;
      }else {
          alert("La contraseña no contiene los carecteres obligatorios.");
          console.log(contraseña);
          comprob = false;
      }
  }else{
      alert("Los campos: \nNombre\nApellidos\nCorreo - Telefono\nContraseña\nNo pueden dejarse vacios.");
      comprob = false;
  }

  if(comprob == true){
      pasarPag();
      var valor = document.getElementById('nombre').value;
      var tiempo = 1;
      setCookie("nombre",valor,tiempo);
      var valor = document.getElementById('email').value;
      var tiempo = 1;
      setCookie("email",valor,tiempo);
      var valor = document.getElementById('contraseña').value;
      var tiempo = 1;
      setCookie("contraseña",valor,tiempo);
  }
}

function pasarPag(){
  document.getElementById("pag").innerHTML = "<h4>¡¡Registro completado!!</h4>";
}

//COOKIES

function setCookie(nombre, valor, tiempo){
  var d = new Date();
  d.setTime(d.getTime()+tiempo*24*60*60*1000);
  var tiempo = "expires="+d.toUTCString();
  document.cookie = nombre + "=" + valor + ";" + tiempo + ";path=/"
}

function getCookie(nombre){
  var nom= nombre+"=";
  var array = document.cookie.split(";");
  for(var i=0;i<array.length;i++){
      var c = array[i];
      while(c.charAt(0)==" "){
          c = c.substring(1);
      }
      if(c.indexOf(nombre) == 0){
          return c.substring(nom.length, c.length);
      }
  }
  return "";
}

//Inicio de Sesion

var comprobar = false;
function validarInicioSesion() {
    var usuario = document.getElementById('Usuario').value;
    var contraseña = document.getElementById('password').value;
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(usuario)){
        comprobar = true;
    }else if (/[0-9]{9}/.test(usuario)){
        comprobar = true;
    }else {
        alert("Error de formato.");
        comprobar = false;
    }

    if(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/.test(contraseña)){    
        comprobar = true;
    }else{
        alert("Contraseña incorrecta.");
        comprobar = false;
    }
    comprarInicioSesion();
}

function mostrarContraseña(){
    var contraseña = document.getElementById("password");
    if(contraseña.type == "password"){
        contraseña.type = "text";
    }else{
        contraseña.type = "password";
    }
}

//COOKIES

function deleteCookie(nombre){
    setCookie(nombre,"",0);
}

function cerrarSesion(){
    deleteCookie("logeado");
    document.getElementById("ocultar").style.display = "block";
    document.getElementById("password").value = '';
    document.getElementById("pagina").style.display = "none";
}

function comprarInicioSesion(){
    location.reload();
    var usuario = document.getElementById('Usuario').value;
    var contraseña = document.getElementById('password').value;
    if(usuario == getCookie("email") && contraseña == getCookie("contraseña")){
        var x = "Logeado Correctamente";
        tiempo = 1;
        setCookie("logeado",x,tiempo);
        PaginaWeb();
    }
}

function PaginaWeb(){
    if(getCookie("logeado") == "Logeado Correctamente"){
        document.getElementById("pagina").innerHTML = "<h3>Estas correctamente registrado, "+getCookie("nombre") + "</h3><br> <button onclick='cerrarSesion()'>Cerrar Sesion</button>";
        document.getElementById("ocultar").style.display = "none";
    }
}