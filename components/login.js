import { useState, useEffect } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import style from '/styles/Login.module.css';

const Login = () => {
    const [isRegistred, setIsRegistred] = useState(true);
    const [isLog, setIsLog] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    let userLog = '';


    useEffect(() => {
        recibeIsLog();
    });

    const recibeIsLog = () => {
        const idUser = sessionStorage.getItem('token');

        if (idUser != null) {
            recibeUserLog(idUser);
            setIsLog(true);
        } else {
            setIsLog(false);
        }
    };

    async function recibeUserLog(idUser) {
        const datos = await fetch('https://tattoomaxbackend.onrender.com/users').then(res => res.json()).then(data => { userLog = data.find(user => user._id === idUser) });
        if (userLog.username === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    const removeToken = () => {
        sessionStorage.removeItem('token');
        localStorage.removeItem('userRole');
        recibeIsLog();
    };

    const handleInputChange = (event) => {
        const { id, value } = event.currentTarget;
    
        switch (id) {
            case 'userRegistro':
                setUsername(value);
                break;
            case 'userInicio':
                setUsername(value)
                break;
            case 'nameRegistro':
                setFullname(value);
                break;
            case 'passRegistro':
                setPass(value);
                break;
            case 'passInicio':
                setPass(value);
                break;
            case 'emailRegistro':
                setEmail(value);
                break;
            case 'telRegistro':
                setTelefono(value);
                break;
            default:
                break;
        }
    };

    const validateForm = () => {

        const errors = {};
    
        if (!username.trim()) {
            errors.userError = 'INGRESE UN NOMBRE DE USUARIO';
        } else {
            errors.userError = '';
        }
    
        if (!fullname.trim()) {
            errors.nameError = 'INGRESE SU NOMBRE';
        } else {
            errors.nameError = '';
        }
    
        if (!pass.trim()) {
            errors.passError = 'INGRESE UNA CONTRASEÑA';
        } else if (pass.trim().length < 4) {
            errors.passError = 'LA CONTRASEÑA NO PUEDE TENER MENOS DE 4 CARACTERES';
        } else {
            errors.passError = '';
        }
    
        if (!email.trim()) {
            errors.emailError = 'INGRESE UN CORREO ELECTRÓNICO';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.emailError = 'INGRESE UN CORREO ELECTRÓNICO VÁLIDO';
            } else {
                errors.emailError = '';
            }
        }
    
        for (const errorId in errors) {
            if (errors.hasOwnProperty(errorId)) {
                document.getElementById(errorId).innerHTML = errors[errorId];
                document.getElementById(errorId).style = 'font-size: 10px; color: red';
            }
        }
    
        const isValid = Object.keys(errors).every(key => errors[key] === '');
        return isValid;
    };
    
    const changeReg = () => {
        setIsRegistred(!isRegistred);
        return isRegistred;
    };
    
    const iniciarSesion = () => {
        const data = { username: username, password: pass };

        fetch('https://tattoomaxbackend.onrender.com/users/signin', { method: 'POST', cache: 'no-cache', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(response => {
                if (!response.ok) {
                    throw new Error('USUARIO O CONTRASEÑA INCORRECTOS');
                }
                return response.json();
            })
            .then(data => {
                sessionStorage.setItem('token', data._id);
                if (data.username === 'admin') {
                    localStorage.setItem('userRole', 'admin');
                } else {
                    localStorage.setItem('userRole', 'user');
                }
                recibeIsLog();
                window.location.href = '/';
            }).catch(error => {
                document.getElementById('iniSesionError').innerHTML = error.message;
                document.getElementById('iniSesionError').style = 'font-size: 10px; color: red';
            });
    };

    const registrarse = () => {
        if (validateForm()) {
            const datosRegistro = {
                username: username,
                fullname: fullname,
                password: pass,
                email: email,
                telefono: telefono
            };

            fetch('https://tattoomaxbackend.onrender.com/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosRegistro)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('USUARIO O EMAIL YA REGISTRADOS');
                    }
                    return response.json();
                })
                .then(data => {
                    const datosInicio = {
                        username: datosRegistro.username,
                        password: datosRegistro.password
                    };
                    sessionStorage.setItem('token', data._id);
                    return fetch('https://tattoomaxbackend.onrender.com/users/signin', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(datosInicio)
                    });
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al iniciar sesión');
                    }
                    return response.json();
                })
                .then(data => {
                    sessionStorage.setItem('token', data._id);
                    if (data.username === 'admin') {
                        localStorage.setItem('userRole', 'admin');
                    } else {
                        localStorage.setItem('userRole', 'user');
                    }
                    recibeIsLog();
                    window.location.href = '/';
                })
                .catch(error => {
                    document.getElementById('regSesionError').innerHTML = error.message;
                    document.getElementById('regSesionError').style = 'font-size: 10px; color: red';
                });
        }
    };

    return (
        <div>
            <div className={style.contenedor}>
                {!isLog &&
                    <Popup className={style.popup} trigger={<button className={style.popupButton}>LOGIN</button>} modal>
                        {close => (
                            <div className={style.popupContent}>
                                {!isRegistred &&
                                    <div className={style.modal}>
                                        <div className={style.modalContent}>
                                            <span className={style.close} onClick={close}><b>x</b></span>
                                            <div className={style.header}> REGISTRARSE </div>
                                            <div className={style.content}>
                                                <span id="regSesionError"></span>
                                                <span id="userError"></span><br />
                                                <input type="text" id="userRegistro" className={style.input} onChange={handleInputChange} placeholder="Usuario"/><br />
                                                <span id="nameError"></span><br />
                                                <input type="text" id="nameRegistro" className={style.input} onChange={handleInputChange} placeholder="Nombre"/><br />
                                                <span id="passError"></span><br />
                                                <input type="password" id="passRegistro" className={style.input} onChange={handleInputChange} placeholder="Contraseña"/><br />
                                                <span id="emailError"></span><br />
                                                <input type="email" id="emailRegistro" className={style.input} onChange={handleInputChange} placeholder="Email"/><br /><br />
                                                <input type="tel" id="telRegistro" className={style.input} onChange={handleInputChange} placeholder="Teléfono"/><br /><br />
                                                <button type="button" className={style.button} onClick={registrarse}>Registrarse</button>
                                                <button className={style.cambiaForm} onClick={changeReg}><b>{isRegistred ? 'Registrarse' : 'Iniciar sesión'}</b></button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {isRegistred &&
                                    <div className={style.modal}>
                                        <div className={style.modalContent}>
                                            <span className={style.close} onClick={close}><b>x</b></span>
                                            <div className={style.header}> INICIAR SESIÓN </div>
                                            <div className={style.content}>
                                                <span id="iniSesionError"></span><br />
                                                <input type="text" id="userInicio" className={style.input} onChange={handleInputChange} placeholder="Usuario"/><br />
                                                <input type="password" id="passInicio" className={style.input} onChange={handleInputChange} placeholder="Contraseña"/><br />
                                                <button type="button" className={style.button} onClick={iniciarSesion}>Iniciar sesión</button>
                                                <button className={style.cambiaForm} onClick={changeReg}><b>{isRegistred ? "Registrarse" : "Iniciar sesión"}</b></button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                        )}
                    </Popup>
                }
                {isLog &&
                    <div>
                        {!isAdmin &&
                            <Link href='/perfil'><button className={style.perfilButton}>PERFIL</button></Link>
                        }
                        {isAdmin &&
                            <Link href='/perfilAdmin'><button className={style.perfilButton}>PERFIL</button></Link>
                        }

                        <Popup trigger={<button className={style.popupButton}>CERRAR SESIÓN</button>} modal>
                            {close => (
                                <div className={style.popupContent}>
                                    <button className={style.close} onClick={close}>
                                        &times;
                                    </button>
                                    <p>¿Estás seguro de que quieres cerrar la sesión?</p>
                                    <Link href='/'><button onClick={removeToken} className={style.buttonRemoveToken}>SÍ</button></Link>
                                    <button className={style.buttonNoRemoveToken} onClick={close}>
                                        NO
                                    </button>
                                </div>
                            )}
                        </Popup>
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;
