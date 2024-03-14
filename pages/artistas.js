import { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '../components/nav';
import Footer from '../components/footer';
import style from '../styles/Artistas.module.css';
import Link from 'next/link';

export default function Artists() {
  let [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      fetch('https://tattoomaxbackend.onrender.com/artists').then(res => res.json()).then(data => {setArtists(data)});
  })
  
  const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } 
  

  return (
    <div>
      <div>
        <Nav />
      </div>
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
          <div className={style.block}>
            <h1 className={style.h1}>ARTISTAS</h1>
            {artists.map(artista => {
              let artist = artista.name.replace(/\s+/g, '');
              artist = removeAccents(artist);
              return (
                <Link key={artist} href={`../artists/${artist}`}>
                  <a className={style.container}>
                    <Image src={artista.imagen} alt='imgArtist' className={style.img} width="100px" height="100px"/>
                    <h1 className={style.h1}>{artista.name}</h1><br/>
                    <p className={style.edad}>Edad: {artista.edad}</p>
                    <p className={style.email}>Email: {artista.email}</p>
                    <p className={style.descripcion}>{artista.descripcion}</p>
                  </a>
                </Link>
              );
            })}
          </div>
        </>
      )}
      <div>
        <Footer/>
      </div>
    </div>
  )
}