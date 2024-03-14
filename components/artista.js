import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import style from '../styles/Artista.module.css';
import AddCom from './addOp';

const Artista = ({ name, id }) => {
    const [artista, setArtista] = useState({});
    const [horario, setHorario] = useState({});
    const [opiniones, setOpiniones] = useState([]);
    const [userLog, setUserLog] = useState(null);
    const [isComOpen, setIsComOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        recibeUserLog();    
        fetchOpiniones();
        fetchHorario();
        fetchArtist();
    }, []);
    

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const fetchHorario = async () => {
        const data = await fetch('https://tattoomaxbackend.onrender.com/horarios')
            .then(res => res.json());
        setHorario(data.find(horario => horario.artist === name));
    };

    const fetchOpiniones = async () => {
        try {
            const opinionesResponse = await fetch('https://tattoomaxbackend.onrender.com/opiniones');
            const opinionesData = await opinionesResponse.json();
            const filteredOpiniones = opinionesData.filter(opinion => opinion.artist === name);
            setOpiniones(filteredOpiniones);
          } catch (error) {
            console.error('Error fetching opiniones:', error);
          }
    };

    const fetchArtist = async () => {
        const data = await fetch('https://tattoomaxbackend.onrender.com/artists')
            .then(res => res.json());
        setArtista(data.find(artist => artist.name === name));
        console.log('artista')
        console.log(artista)
        setIsLoading(false)
    };

    const recibeUserLog = async () => {
        const userId = sessionStorage.getItem('token');
        const data = await fetch('https://tattoomaxbackend.onrender.com/users')
            .then(res => res.json());
        setUserLog(data.find(user => user._id === userId));
    };

    const openCom = () => {
        recibeUserLog()
        if (userLog !== undefined) {
            setIsComOpen(true);
        } else {
            var modal = document.getElementById('myModal');
                modal.style.display = 'block';
                setTimeout(() => {
                    var modal = document.getElementById('myModal');
                    modal.style.display = 'none';
                }, 2000);
        }
    }
    
    const closeCom = () => setIsComOpen(false);

    return (
        <div className={style.container}>
            {/* Mostrar un mensaje de carga mientras se cargan los datos */}
            {isLoading && 
                <div className={style.loadingContainer}>
                    <div className={style.loading}></div>
                    <p>Cargando...</p>
                </div>
            }
            {/* Mostrar los datos del artista una vez que se han recibido */}
            {!isLoading && (
                <>
                    <div>
                        <Image src={artista.imagen} alt='artistImage' className={style.img} width="100px" height="100px" />
                        <h1>{artista.name}</h1>
                        <p>Edad: {artista.edad}</p>
                        <p>Email: {artista.email}</p>
                        <p>{artista.descripcion}</p>
                    </div>
                    <div>
                    <h2 className={style.h2}>Horario</h2>
                    {horario && horario.horas && (
                        <table className={style.tabla}>
                            <tbody>
                                {dias.map((dia, index) => (
                                    <tr key={dia}>
                                        <th className={style.dias}>{dia}</th>
                                        {horario.horas[index][dia].map((hora, i) => (
                                            <Fragment key={i}>
                                                <td className={style.horas}>{hora}</td>
                                            </Fragment>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
    
                <div className={style.container}>
                    <div className={style.containerOp}>
                        <h2>Opiniones</h2>
                        <div className={style.opiniones}>
                        {opiniones.length === 0 ? (
                            <div>
                            <h3>No se ha realizado ninguna opinión a este artistas</h3>
                            </div>
                        ) : (
                            opiniones.map((opinion, index) => (
                            <div key={index} className={style.opinion}>
                                <div className={style.divOp}>
                                    <Image src={opinion.imgUser} className={style.imgUserOp} width="20px" height="20px"/>
                                    <b className={style.UserOp}>{opinion.user}</b>
                                </div>
                                <div className={style.divOp}><b className={style.TituloOp}>{opinion.titulo}</b></div>
                                <div className={style.divOp}><b className={style.opinionOp}>{opinion.opinion}</b></div>
                            </div>
                            ))
                        )}
                        </div>
                    </div>
    
                    <div>
                        <button onClick={openCom} className={style.button}>Escribir un comentario</button>
                        {isComOpen && <AddCom user={userLog} artist={artista} onClose={closeCom} />}
                        <div id="myModal" className={style.modalContainer}>
                            <div id="modalContent" className={style.modalContent}>
                                <p>PARA PODER AÑADIR UN COMENTARIO DEBES ESTAR LOGUEADO</p>
                            </div>
                        </div>
                    </div>
                </div>
    
                </>
            )}
        </div>
    );
    
};

export default Artista;
