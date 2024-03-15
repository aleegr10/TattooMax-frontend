import style from '/styles/Perfil.module.css'
import { useState } from 'react';

const EditaDatos = ({user, onClose }) => {
  const [username, setUsername] = useState(user.username);
  const [fullname, setFullname] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [telefono, setTelefono] = useState(user.telefono);

  const handleInputChange = (event) => {
    const { id, value } = event.currentTarget;

    switch (id) {
      case 'user':
        setUsername(value);
        break;
      case 'name':
        setFullname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'tel':
        setTelefono(value);
        break;
      default:
        break;
    }
  };
  

  const validateForm = () => {
    var errors = {};
  
    if(!username.trim()) {
        errors.userError = 'INGRESE UN NOMBRE DE USUARIO';
    }
    else{
        errors.userError = '';
    }
  
    if(!fullname.trim()) {
        errors.nameError = 'INGRESE SU NOMBRE';
    }
    else{
        errors.nameError = '';
    }
  
    if(!email.trim()) {
        errors.emailError = 'INGRESE UN CORREO ELECTRÓNICO';
    } else{
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            errors.emailError = 'INGRESE UN CORREO ELECTRÓNICO VÁLIDO';
        }
    else{
            errors.emailError = '';
        }
    }
  
    for (var errorId in errors) {
        if(errors.hasOwnProperty(errorId)) {
            document.getElementById(errorId).innerHTML = errors[errorId];
            document.getElementById(errorId).style = 'font-size: 10px; color: red';
        }
    }
  
    var isValid = Object.keys(errors).every(key => errors[key] === '');
    if(isValid) {
        return true; 
    }
  
    return isValid;
  }

  async function submit(){
    if(validateForm()){
      try {
        const response = await fetch('https://tattoomaxbackend.onrender.com/users/'+user._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, fullname, email, telefono }),
        });
  
        if (!response.ok) {
          throw new Error('ERROR AL ACTUALIZAR LOS DATOS');
        }
  
        user.username = username;
        user.fullname = fullname;
        user.email = email;
        user.telefono = telefono;
  
        var modalEditaDatosOk = document.getElementById('modalEditaDatosOk');

        modalEditaDatosOk.style.display = 'block';

        setTimeout(function(){
          var modalEditaDatosOk = document.getElementById('modalEditaDatosOk');

          modalEditaDatosOk.style.display = 'none';
          onClose();
        },2000);
      }catch(error) {
        document.getElementById('actError').innerHTML = error.message;
        document.getElementById('actError').style = 'font-size: 15px; color: red';
      }
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <span className={style.close} onClick={onClose}><b>x</b></span>
        <div>
          <span id="actError"></span>
          <h1 className={style.header}>DATOS PERSONALES</h1>
          <span id="userError"></span><br/>
          <input id="user" value={username} onChange={handleInputChange} placeholder="Usuario" required/><br/>
          <span id="nameError"></span><br/>
          <input id="name" value={fullname} onChange={handleInputChange} placeholder="Nombre" required/><br/>
          <span id="emailError"></span><br/>
          <input type="email" id="email" value={email} onChange={handleInputChange} placeholder="Email" required/><br/><br/>
          <input type="number" id="tel" value={telefono} onChange={handleInputChange} placeholder="Teléfono"/>
          <button className={style.button} onClick={submit}>Aceptar</button>
          <button className={style.button} onClick={onClose}>Cancelar</button>
        </div>
      </div>
      <div id="modalEditaDatosOk" className={style.modalContainerEdita}>
        <div className={style.modalContentEdita}>
            <p>SE HAN ACTUALIZADO LOS DATOS CORRECTAMENTE</p>
        </div>
      </div>
    </div>
  )
}

export default EditaDatos;
