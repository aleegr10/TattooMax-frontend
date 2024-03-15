import style from '/styles/Artista.module.css';
import { useState } from 'react';

const AddOp = ({ user, artist, onClose }) => {
    const [titulo, setTitulo] = useState('');
    const [opinion, setOpinion] = useState('');

    const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } 

    const handleInputChange = (event) => {
        const { id, value } = event.currentTarget;
    
        switch (id) {
          case 'titulo':
            setTitulo(value);
            break;
          case 'opinion':
            setOpinion(value);
            break;
          default:
            break;
        }
      };

    const validateForm = () => {
        var errors = {};
    
        if (!titulo.trim()) {
            errors.tituloError = 'INGRESE UN TÍTULO';
        } else {
            errors.tituloError = '';
        }
    
        if (!opinion.trim()) {
            errors.opinionError = 'INGRESE UNA OPINIÓN';
        } else {
            errors.opinionError = '';
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
                const response = await fetch('https://tattoomaxbackend.onrender.com/opiniones/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({artist: artist.name, imgArtist: artist.imagen, user: user.username, imgUser: user.imagen,  titulo: titulo, opinion: opinion})
                });

                if (!response.ok) {
                    throw new Error('ERROR AL AÑADIR OPINIÓN');
                }

                var modalOpOk = document.getElementById('modalOpOk');

                modalOpOk.style.display = 'block';

                let artista = artist.name.replace(/\s+/g, '');
                artista = removeAccents(artista);

                setTimeout(function () {
                    var modalOpOk = document.getElementById('modalOpOk');

                    modalOpOk.style.display = 'none';
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
            <div className={style.modalContentOp}>
            <span className={style.close} onClick={onClose}><b>x</b></span>
            <div>
                <span id="addError"></span>
                <h1 className={style.header}>Añadir comentario</h1>
                <span id="tituloError"></span><br/>
                <input id="titulo" onChange={handleInputChange} placeholder="Título"/><br/>
                <span id="opinionError"></span><br/>
                <textarea id="opinion" onChange={handleInputChange} placeholder="Opinión"/><br/>
                <button className={style.button} onClick={submit}>Aceptar</button>
                <button className={style.button} onClick={onClose}>Cancelar</button>
            </div>
            </div>
            <div id="modalOpOk" className={style.modalContainerOk}>
                <div className={style.modalContentOk}>
                    <p>SE HA AÑADIDO LA OPINIÓN CORRECTAMENTE</p>
                </div>
            </div>
        </div>
    );
};

export default AddOp;
