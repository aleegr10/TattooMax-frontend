import style from '../styles/Perfil.module.css'
import { useState } from 'react';

const ChangeImg = ({user, onClose }) => {
  const [imagen, setImagen] = useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result)
        setImagen(reader.result);
      };
    }
  };

  async function submit(){
    if (imagen) {
        try {
            const response = await fetch('https://tattoomax-backend-9bd8.onrender.com/users/' + user._id, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imagen }),
            });

            if (!response.ok) {
            throw new Error('ERROR AL ACTUALIZAR LA IMAGEN');
            }
            
            const opinionesResponse = await fetch(`https://tattoomax-backend-9bd8.onrender.com/opiniones`);
            const opinionesData = await opinionesResponse.json();
            const filteredOpiniones = opinionesData.filter(opinion => opinion.user === user.username);

            await Promise.all(filteredOpiniones.map(async (opinionUser) => {
              try {
                const responseOp = await fetch('https://tattoomax-backend-9bd8.onrender.com/opiniones/' + opinionUser._id, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ imgUser: imagen }),
                });
            
                if (!responseOp.ok) {
                  throw new Error('ERROR AL ACTUALIZAR LA IMAGEN');
                }
              } catch (error) {
                console.error(error);
                throw new Error('ERROR AL ACTUALIZAR LA IMAGEN');
              }
            }));
    
            var modalEditaImgOk = document.getElementById('modalEditaImgOk');

            modalEditaImgOk.style.display = 'block';
        
            setTimeout(function(){
                var modalEditaImgOk = document.getElementById('modalEditaImgOk');
        
                modalEditaImgOk.style.display = 'none';
        
                setImagen('');
                onClose();
                window.location.href = '/perfil';
            },2000);
        } catch (error) {
            document.getElementById('actError').innerHTML = error.message;
            document.getElementById('actError').style = 'font-size: 15px; color: red';
        }
      } else {
        document.getElementById('actError').innerHTML = 'Debe seleccionar una imagen';
        document.getElementById('actError').style = 'font-size: 15px; color: red';
      }
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <span className={style.close} onClick={onClose}><b>x</b></span>
        <div>
          <span id="actError"></span>
          <h1 className={style.header}>CAMBIAR FOTO DE PERFIL</h1>
          <input type="file" accept="image/*" onChange={handleImageChange} /><br />
          {imagen && <img src={imagen} alt="Preview" style={{ maxWidth: "100px" }} />}
          <button className={style.button} onClick={submit}>Aceptar</button>
          <button className={style.button} onClick={onClose}>Cancelar</button>
        </div>
      </div>
      <div id="modalEditaImgOk" className={style.modalContainerEdita}>
        <div className={style.modalContentEdita}>
            <p>SE HA ACTUALIZADO LA IMAGEN CORRECTAMENTE</p>
        </div>
      </div>
    </div>
  )
}

export default ChangeImg;
