import style from '/styles/PerfilAdmin.module.css';
import { useState } from 'react';

const AddOp = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [artist, setArtist] = useState('');
    const [cita, setCita] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } 

    const handleInputChange = (event) => {
        const { id, value } = event.currentTarget;
    
        switch (id) {
            case 'username':
                setUsername(value);
                break;
            case 'artist':
                setArtist(value);
                break;
            case 'cita':
                setCita(value);
                break;
            case 'descripcion':
                setDescripcion(value);
                break;
            default:
                break;
        }
      };

    const validateForm = () => {
        var errors = {};
    
        if (!username.trim()) {
            errors.userError = 'INGRESE UN USUARIO';
        } else {
            errors.userError = '';
        }
    
        if (!artist.trim()) {
            errors.artistError = 'INGRESE UN ARTISTA';
        } else {
            errors.artistError = '';
        }
        
        if (!cita.trim()) {
            errors.citaError = 'INGRESE UNA CITA';
        } else {
            errors.citaError = '';
        }
        
        if (!descripcion.trim()) {
            errors.descripcionError = 'INGRESE UNA DESCRIPCION';
        } else {
            errors.descripcionError = '';
        }
    
        for (var errorId in errors) {
            if (errors.hasOwnProperty(errorId)) {
                document.getElementById(errorId).innerHTML = errors[errorId];
                document.getElementById(errorId).style = 'font-size: 10px; color: red';
            }
        }
    
        var isValid = Object.keys(errors).every(key => errors[key] === '');
        return isValid;
    }

    async function submit() {
        if (validateForm()) {
            try {
                
                const response = await fetch('http://localhost:5000/citas/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({username: username, artist: artist, cita: cita, descripcion: descripcion})
                });

                if (!response.ok) {
                    throw new Error('ERROR AL AÑADIR CITA');
                }

                var modalCitaOk = document.getElementById('modalCitaOk');

                modalCitaOk.style.display = 'block';

                let artista = artist.replace(/\s+/g, '');
                artista = removeAccents(artista);

                setTimeout(function () {
                    var modalCitaOk = document.getElementById('modalCitaOk');

                    modalCitaOk.style.display = 'none';
                    onClose();
                    window.location.href = '/artists/'+artista;
                }, 2000);
            } catch (error) {
                document.getElementById('addError').innerHTML = error.message;
                document.getElementById('addError').style = 'font-size: 15px; color: red';
            }
        };
    }

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
            <span className={style.close} onClick={onClose}><b>x</b></span>
            <div>
                <span id="addError"></span>
                <h1 className={style.header}>Añadir comentario</h1>
                <span id="userError"></span><br/>
                <input id="username" onChange={handleInputChange} placeholder="User"/><br/>
                <span id="artistError"></span><br/>
                <input id="artist" onChange={handleInputChange} placeholder="Artista"/><br/>
                <span id="citaError"></span><br/>
                <input id="cita" onChange={handleInputChange} placeholder="Cita (Fecha y hora)"/><br/> 
                <span id="descripcionError"></span><br/>
                <textarea id="descripcion" onChange={handleInputChange} placeholder="Descripción de la cita"/><br/>
                <button className={style.button} onClick={submit}>Aceptar</button>
                <button className={style.button} onClick={onClose}>Cancelar</button>
            </div>
            </div>
            <div id="modalCitaOk" className={style.modalContainerOk}>
                <div className={style.modalContentOk}>
                    <p>SE HA AÑADIDO LA CITA CORRECTAMENTE</p>
                </div>
            </div>
        </div>
    );
};

export default AddOp;
