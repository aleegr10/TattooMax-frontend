import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ChangeImg from '../components/changeImg'
import EditaDatos from '../components/editaDatos';
import EditaPass from '../components/editaPass';
import style from '../styles/Perfil.module.css';

export default function Perfil() {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState([]);
  const [citas, setCitas] = useState([]);
  const [opiniones, setOpiniones] = useState([]);
  // const [artists, setArtists] = useState([]);
  const [isChangeImgOpen, setIsChangeImgOpen] = useState(false);
  const [isEditaDatosOpen, setIsEditaDatosOpen] = useState(false);
  const [isEditaPassOpen, setIsEditaPassOpen] = useState(false);

  useEffect(() => {
    recibeId();
    fetchCitas();
    fetchOpiniones();
    // fetchArtists();
    
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'user') {
      setIsUser(true);
    } else {
      router.push('/pagError');
    }
  }, []);

  const recibeId = () => {
    const userId = sessionStorage.getItem('token');
    fetchUser(userId);
    
  };

  const fetchUser = async (userId) => {
    const response = await fetch('https://tattoomaxbackend.onrender.com/users');
    const data = await response.json();
    setUser(data.find((usuario) => usuario._id === userId));
  };

  const fetchCitas = async () => {
    try {
      const userId = sessionStorage.getItem('token');
      const userResponse = await fetch('https://tattoomaxbackend.onrender.com/users');
      const userData = await userResponse.json();
      const user = userData.find(usuario => usuario._id === userId);
      const response = await fetch('https://tattoomaxbackend.onrender.com/citas');
      const data = await response.json();
      const userCitas = data.filter((cita) => cita.user === user.username);
      setCitas(userCitas);
    } catch (error) {
      console.error('Error fetching opiniones:', error);
    }
  };

  const fetchOpiniones = async () => {
    try {
      const userId = sessionStorage.getItem('token');
      const userResponse = await fetch('https://tattoomaxbackend.onrender.com/users');
      const userData = await userResponse.json();
      const user = userData.find(usuario => usuario._id === userId);
      const opinionesResponse = await fetch('https://tattoomaxbackend.onrender.com/opiniones');
      const opinionesData = await opinionesResponse.json();
      const filteredOpiniones = opinionesData.filter(opinion => opinion.user === user.username);
      setOpiniones(filteredOpiniones);
    } catch (error) {
      console.error('Error fetching opiniones:', error);
    }
  };

  const openChangeImg = () => {
    setIsChangeImgOpen(true);
  };

  const openEditaDatos = () => {
    setIsEditaDatosOpen(true);
  };

  const openEditaPass = () => {
    setIsEditaPassOpen(true);
  };

  const closeChangeImg = () => {
    setIsChangeImgOpen(false);
  };

  const closeEditaDatos = () => {
    setIsEditaDatosOpen(false);
  };

  const closeEditaPass = () => {
    setIsEditaPassOpen(false);
  };

  if (!isUser) {
    return <div style={{ textAlign: 'center' }}>Cargando...</div>;
  }

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className={style.datosUser}>
        <div className={style.user}>
          <div className={style.img}>
            <img src={user.imagen} alt="userImage" className={style.buttonImg} onClick={openChangeImg} width="150px" height="150px"/>
            {isChangeImgOpen && <ChangeImg user={user} onClose={closeChangeImg} />}
          </div>
          <div className={style.datos}>
            <p>User: <b>{user.username}</b></p>
            <p>Email: <b>{user.email}</b></p>
            <p>Teléfono: <b>{user.telefono}</b></p>
          </div>
        </div>
        <div>
          <button className={style.openModal} onClick={openEditaDatos}>Editar información</button>
          <button className={style.openModal} onClick={openEditaPass}>Editar contraseña</button>

          {isEditaDatosOpen && <EditaDatos user={user} onClose={closeEditaDatos} />}
          {isEditaPassOpen && <EditaPass user={user} onClose={closeEditaPass} />}

          
          
        </div>
      </div>
      <div className={style.containerOp}>
        <h2>Opiniones realizadas a nuestros artistas</h2>
        <div className={style.opiniones}>
          {opiniones.length === 0 ? (
            <div>
              <h3>No has realizado ninguna opinión a nuestros artistas</h3>
              <p>Si quieres añadir una opinión, elige un artista <a href="/artists" style={{color: "blue"}}>aquí</a> y nos pondremos en contacto contigo</p>
            </div>
          ) : (
            opiniones.map((opinion, index) => (
              <div key={index} className={style.opinion}>
                <div className={style.divOp}>
                  <img src={opinion.imgArtist} className={style.imgArtistOp} width="30px" />
                  <b className={style.ArtistOp}>{opinion.artist}</b>
                </div>
                <div className={style.divOp}><b className={style.TituloOp}>{opinion.titulo}</b></div>
                <div className={style.divOp}><b className={style.opinionOp}>{opinion.opinion}</b></div>
              </div>
            ))
          )}
        </div>
      </div>

      <br/><br/>


      <div className={style.containerCitas}>
        <h2>Citas</h2>
        <div className={style.citas}>
          {citas.length === 0 ? (
            <div>
              <h3>Aún no tienes ninguna cita con nosotros</h3>
              <p>Si quieres concretar una cita, rellena el formulario <a href="/local" style={{color: "blue"}}>aquí</a> y nos pondremos en contacto contigo</p>
            </div>
            
          ) : (
            citas.map((cita, index) => (
              <div key={index} className={style.cita}>
                <div className={style.divCita}><b className={style.ArtistCita}>{cita.artist}</b></div>
                <div className={style.divCita}><b className={style.horarioCita}>{cita.cita}</b></div>
                <div className={style.divCita}><b className={style.descCita}>{cita.descripcion}</b></div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
