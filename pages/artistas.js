import Nav from '../components/nav';
import Footer from '../components/footer';
import style from '../styles/Artistas.module.css';
import { useState, useEffect } from 'react';

export default function Artists() {
  let [artists, setArtists] = useState([]);
    useEffect(() => {
        fetch('https://tattoomax-backend-9bd8.onrender.com/artists').then(res => res.json()).then(data => {setArtists(data)});
    }, [])
    
    const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } 
    

    return (
      <div>
        <div>
          <Nav />
        </div>
        <div className={style.block}>
          <h1 className={style.h1}>ARTISTAS</h1>
          {artists.map(artista => {
            let artist = artista.name.replace(/\s+/g, '');
            artist = removeAccents(artist);
            return (
              <a key={artist} href={`../artists/${artist}`} className={style.container}>
                <div>
                  <img src={artista.imagen} className={style.img} width="100px" height="100px"/>
                  <h1 className={style.h1}>{artista.name}</h1><br/>
                  <p className={style.edad}>Edad: {artista.edad}</p>
                  <p className={style.email}>Email: {artista.email}</p>
                  <p className={style.descripcion}>{artista.descripcion}</p>
                </div>
              </a>
            );
          })}
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    )
  }