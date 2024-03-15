import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Nav from '/components/nav';
import Footer from '/components/footer';
import HorarioLocal from '/components/horarioLocal';
import flecha from '/public/iconos/flecha.png';
import style from '/styles/Local.module.css';

export default function Local() {
    const [userLog, setUserLog] = useState();
    const [isLoading, setIsLoading] = useState(true);
    let userId = '';

    useEffect(() => {
        recibeUserLog();
    });

    async function recibeUserLog() {
        userId = sessionStorage.getItem('token');
        const data = await fetch('https://tattoomaxbackend.onrender.com/users')
            .then(res => res.json())
            .then(data => setUserLog(data.find(user => user._id === userId)));
        setIsLoading(false)
        return data;
    }

    const addConsulta = () => {
        var datos = {
            name: document.getElementById('nombre').value,
            user: userLog._id,
            telefono: document.getElementById('tel').value,
            email: document.getElementById('email').value,
            consulta: document.getElementById('consulta').value
        };

        fetch('https://tattoomaxbackend.onrender.com/consultas/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        document.getElementById('nombre').value = '';
        document.getElementById('tel').value = '';
        document.getElementById('email').value = '';
        document.getElementById('consulta').value = '';

        var modalConsulta = document.getElementById('modalConsulta');
        modalConsulta.style.display = 'block';

        setTimeout(function () {
            modalConsulta.style.display = 'none';
        }, 2000);
    };

    const comprobarLog = () => {
        setUserLog(sessionStorage.getItem('token'));
        if (userLog === undefined) {
            var modal = document.getElementById('myModal');
            modal.style.display = 'block';

            document.getElementById('nombre').value = '';
            document.getElementById('tel').value = '';
            document.getElementById('email').value = '';
            document.getElementById('consulta').value = '';

            setTimeout(function () {
                modal.style.display = 'none';
            }, 2000);
        } else if (userLog !== undefined) {
            addConsulta();
        }
    };

    return (
        <div>
            <div>
                <Nav />
            </div>
            {/* Mostrar un mensaje de carga mientras se cargan los datos */}
            {isLoading && 
                <>
                    <div className={style.loadingContainer}>
                        <div className={style.loading}></div>
                        <p>Cargando...</p>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </>
            }
            {/* Mostrar los datos del artista una vez que se han recibido */}
            {!isLoading && (
                <>
                    <div>
                        <div>
                            <p className={style.p}>TattooMax es un estudio fundado en 1994 en Jerez (Cádiz).

                            TattooMax es un espacio abierto al arte, al buen gusto y a la interpertación de ideas. Además de nuestro equipo fijo, disfrutamos de una variedad de tatuadores de estilos bien diferenciados que periodicamente vienen a deleitarnos con su trabajo.
                            Situado en una de las avenidas principales de Jerez, disponemos de un local de más de cien metros cuadrados donde prima la comodidad de nuestros clientes y tatuadores, y dondes nuestro lema es:<br/> <b>&lt;&lt;La calidad antes que la cantidad&gt;&gt;</b><br/> Seáis todos bienvenidos.</p>
                        </div><br/>
                        <div className={style.horariosContainer}>
                                <h2 className={style.h2}>Horarios</h2>
                                <div className={style.horariosTable}>
                                    <HorarioLocal />
                                </div>
                            </div><br/><br/><br/>
                        <div className={style.contenedor}>
                            <div className={style.containerMapa}>
                                <h1 className={style.h1}>Localización</h1>
                                <div>
                                    <div>
                                        <iframe className={style.mapa} id="gmap_canvas" src="https://maps.google.com/maps?q=Avenida%20Amsterdam,%20C.%20Estocolmo,%2011405%20Jerez%20de%20la%20Frontera,%20C%C3%A1diz&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                                    </div>
                                </div>
                            </div>

                            <div className={style.containeraddConsulta}>
                                <h3 className={style.h3}>Para pedir cita o hacer cualquier consulta</h3>
                                    <Image src={flecha} className={style.img} alt='flecha' width="20px" height="20px"/>
                                <div className={style.addConsulta}>
                                    <div> 
                                        <div className={style.form}>
                                            
                                            <input type="text" id="nombre" name="nombre" className={style.input} placeholder="Nombre"/><br/><br/>
                                            
                                            <input type="number" id="tel" name="tel" className={style.input} placeholder="Teléfono"/><br/><br/>
                                            
                                            <input type="email" id="email" name="email" className={style.input} placeholder="Email"/><br/><br/>
                                            
                                            <textarea id="consulta" name="consulta" rows="3" className={style.textarea} placeholder="Escribe aquí tu consulta"/><br/><br/>
                                            <button type="button" className={style.button} onClick={comprobarLog}>Enviar</button>
                                        </div>
                                    </div>

                                    <div id="modalConsulta" className={style.modalContainer}>
                                        <div id="modalContentConsulta" className={style.modalContent}>
                                            <p>SE HA REALIZADO TU CONSULTA CORRECTAMENTE, ESPERE A SER LOCALIZADO POR EMAIL O TELEFONO POR ALGUNO DE NUESTROS RECEPCIONISTAS. GRACIAS.</p>
                                        </div>
                                    </div>

                                    <div id="myModal" className={style.modalContainer}>
                                        <div id="modalContent" className={style.modalContent}>
                                            <p>PARA PODER HACER UNA CONSULTA DEBES ESTAR LOGUEADO</p>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div>
                <Footer/>
            </div>
        </div>
    );
}
