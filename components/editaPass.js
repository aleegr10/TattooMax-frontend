import style from '/styles/Perfil.module.css';
import { useState } from 'react';

const EditaPass = ({ user, onClose }) => {
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [pass3, setPass3] = useState('');

    const handleInputChange = (event) => {
        const { id, value } = event.currentTarget;
        switch (id) {
            case 'pass1':
                setPass1(value);
                break;
            case 'pass2':
                setPass2(value);
                break;
            case 'pass3':
                setPass3(value);
                break;
            default:
                break;
        }
    }

    const validateForm = () => {
        let errors = {};

        if (!pass1.trim()) {
            errors.pass1Error = 'INGRESE UNA CONTRASEÑA';
        }else{
            errors.pass1Error = '';
        }

        if (!pass2.trim()) {
            errors.pass2Error = 'INGRESE UNA CONTRASEÑA';
        } else if (pass2.trim().length < 4) {
            errors.pass2Error = 'LA CONTRASEÑA NO PUEDE TENER MENOS DE 4 CARACTERES';
        }else{
            errors.pass2Error = '';
        }

        if (!pass3.trim()) {
            errors.pass3Error = 'INGRESE UNA CONTRASEÑA';
        } else if (pass3.trim().length < 4) {
            errors.pass3Error = 'LA CONTRASEÑA NO PUEDE TENER MENOS DE 4 CARACTERES';
        }else{
            errors.pass3Error = '';
        }

        for (let errorId in errors) {
            if (errors.hasOwnProperty(errorId)) {
                document.getElementById(errorId).innerHTML = errors[errorId];
                document.getElementById(errorId).style = 'font-size: 10px; color: red';
            }
        }

        let isValid = Object.keys(errors).every(key => errors[key] === '');
        return isValid;
    }

    const submit = async () => {
        if (validateForm()) {
            if (pass2 === pass3) {
                try {
                    const response = await fetch('https://tattoomaxbackend.onrender.com/users/signin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username: user.username, password: pass1 })
                    });

                    if (!response.ok) {
                        document.getElementById('pass1Error').innerHTML = 'CONTRASEÑA ACTUAL ERRÓNEA';
                        document.getElementById('pass1Error').style = 'font-size: 10px; color: red';
                        return;
                    }

                    const updateResponse = await fetch('https://tattoomaxbackend.onrender.com/users/' + user._id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ password: pass2 }),
                    });

                    if (!updateResponse.ok) {
                        document.getElementById('actError').innerHTML = 'ERROR AL ACTUALIZAR LA CONTRASEÑA';
                        document.getElementById('actError').style = 'font-size: 15px; color: red';
                        return;
                    }

                    var modalEditaPassOk = document.getElementById('modalEditaPassOk');
                    modalEditaPassOk.style.display = 'block';

                    setTimeout(function () {
                        var modalEditaPassOk = document.getElementById('modalEditaPassOk');
                        modalEditaPassOk.style.display = 'none';
                        onClose();
                    }, 2000);
                } catch (error) {
                    document.getElementById('actError').innerHTML = 'ERROR AL ACTUALIZAR LA CONTRASEÑA';
                    document.getElementById('actError').style = 'font-size: 15px; color: red';
                }
            } else {
                document.getElementById('newError').innerHTML = 'LAS CONTRASEÑAS NO COINCIDEN';
                document.getElementById('newError').style = 'font-size: 10px; color: red';
            }
        }
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <span className={style.close} onClick={onClose}><b>x</b></span>
                <div>
                    <span id="actError"></span>
                    <h1 className={style.header}>CAMBIAR CONTRASEÑA</h1>
                    <span id="pass1Error"></span><br/>
                    <input id="pass1" type="password" onChange={handleInputChange} placeholder="Contraseña actual" required/><br/>
                    <span id="pass2Error"></span><br/>
                    <input id="pass2" type="password" onChange={handleInputChange} placeholder="Nueva contraseña" required/><br/>
                    <span id="pass3Error"></span><br/>
                    <input id="pass3" type="password" onChange={handleInputChange} placeholder="Rpite la nueva contraseña" required/><br/>
                    <span id="newError"></span><br />
                    <button className={style.button} onClick={submit}>Aceptar</button>
                    <button className={style.button} onClick={onClose}>Cancelar</button>
                </div>
            </div>
            <div id="modalEditaPassOk" className={style.modalContainerEdita}>
                <div className={style.modalContentEdita}>
                    <p>SE HA ACTUALIZADO LA CONTRASEÑA CORRECTAMENTE</p>
                </div>
            </div>
        </div>
    );
}

export default EditaPass;
