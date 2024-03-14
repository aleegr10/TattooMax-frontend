import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddCita from '../components/addCita'
import Nav from '../components/nav';
import Footer from '../components/footer';
import Popup from 'reactjs-popup';
import style from '../styles/PerfilAdmin.module.css';

export default function PerfilAdmin() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [citas, setCitas] = useState([]);
  const [isCitaOpen, setIsCitaOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchCitas();
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
    } else {
      router.push('/pagError');
    }
    recibeId();
  }, []);

  const openAddCita = () => setIsCitaOpen(true);
  const closeAddCita = () => setIsCitaOpen(false);

  const recibeId = () => {
    const userId = sessionStorage.getItem('token');
    fetchUser(userId);
  };

  const fetchUser = async (userId) => {
    const response = await fetch('https://tattoomax-backend-9bd8.onrender.com/users');
    const data = await response.json();
    setUser(data.find((usuario) => usuario._id === userId));
  };

  const fetchUsers = async () => {
    const response = await fetch('https://tattoomax-backend-9bd8.onrender.com/users');
    const data = await response.json();
    setUsers(data);
  }

  const fetchCitas = async () => {
    const response = await fetch('https://tattoomax-backend-9bd8.onrender.com/citas');
    const data = await response.json();
    setCitas(data);
  }

  const removeUser = ({userId, onClose}) => {
    fetch('https://tattoomax-backend-9bd8.onrender.com/users/'+userId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    var modalRemoveUserOk = document.getElementById('modalRemoveUserOk');

    modalRemoveUserOk.style.display = 'block';

    setTimeout(function(){
      var modalRemoveUserOk = document.getElementById('modalRemoveUserOk');

      modalRemoveUserOk.style.display = 'none';
      onClose();
      window.location.href = '/perfilAdmin';
    },2000);
  }

  if (!isAdmin) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className={style.datosUser}>
        <div className={style.userAdmin}>
          <div className={style.img}>
            <img src={user.imagen} alt="userImage" width="150px" />
          </div>
          <div className={style.datos}>
            <p>User: <b>{user.username}</b></p>
            <p>Email: <b>{user.email}</b></p>
            <p>Teléfono: <b>{user.telefono}</b></p>
          </div>
        </div>
      </div>
      <div className={style.containerUsers}>
        <h2>Users</h2>
        <div className={style.users}>
          {users.length === 0 ? (
            <div>
              <h3>Aún no tienes ninguna cita con nosotros</h3>
              <p>Si quieres concretar una cita, rellena el formulario <a href="/local" style={{color: "blue"}}>aquí</a> y nos pondremos en contacto contigo</p>
            </div>
            
          ) : (
            users.map((user, index) => (
              <div key={index} className={style.user}>
                <div className={style.divUsers}><img src={user.imagen} alt="userImage" className={style.imgUsers}/><b className={style.nameUsers}>{user.username}</b></div>
                <div className={style.divUsers}>{user.fullname}</div>
                <div className={style.divUsers}>{user.email}</div>
                <div className={style.divUsers}>{user.tel}</div>
                <Popup trigger={<button className={style.popupButton}>ELIMINAR USUARIO</button>} modal>
                  {close => (
                      <div className={style.popupContent}>
                          <button className={style.close} onClick={close}>
                              &times;
                          </button>
                          <p>¿Estás seguro de que quieres eliminar este usuario?</p>
                          <button className={style.buttonSi} onClick={() => removeUser({ userId: user._id, onClose: close })}>SÍ</button>
                          <button className={style.buttonNo} onClick={close}>NO</button>
                          <div id="modalRemoveUserOk" className={style.modalContainerRemoveUser}>
                            <div className={style.modalContentRemoveUser}>
                                <p>SE HAN ACTUALIZADO LOS DATOS CORRECTAMENTE</p>
                            </div>
                          </div>
                      </div>
                      
                  )}
                </Popup>
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
              <h3>No hay citas previstas</h3>
            </div>
            
          ) : (
            citas.map((cita, index) => (
              <div key={index} className={style.cita}>
                <div className={style.divCita}><b className={style.ArtistCita}>{cita.user}</b></div>
                <div className={style.divCita}><b className={style.ArtistCita}>{cita.artist}</b></div>
                <div className={style.divCita}><b className={style.horarioCita}>{cita.cita}</b></div>
                <div className={style.divCita}><b className={style.descCita}>{cita.descripcion}</b></div>
              </div>
            ))
          )}
        </div>
        <div>
            <button onClick={openAddCita} className={style.openCita}>Añadir una cita</button>
            {isCitaOpen && <AddCita onClose={closeAddCita} />}
          </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
