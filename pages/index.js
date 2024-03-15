import Image from 'next/image'
import style from '/styles/Home.module.css'
import Nav from '/components/nav'
import Footer from '/components/footer'
import { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import Link from 'next/link';
import 'react-slideshow-image/dist/styles.css';

import imgLocal1 from '/public/slider/local1.png';
import imgTatu1 from '/public/slider/tatu1.png';
import imgLocal2 from '/public/slider/local2.png';
import imgTatu2 from '/public/slider/tatu2.png';
import imgLocal3 from '/public/slider/local3.png';
import imgTatu3 from '/public/slider/tatu3.png';
import oferta from '/public/ofertas/OFERTA.png';
import oferta1 from '/public/ofertas/oferta1.png';
import oferta2 from '/public/ofertas/oferta2.png';
import oferta3 from '/public/ofertas/oferta3.png';


export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const slideImages = [
    {url: imgLocal1, caption:'Slide1'},
    {url: imgTatu1, caption:'Slide2'},
    {url: imgLocal2, caption:'Slide3'},
    {url: imgTatu2, caption:'Slide4'},
    {url: imgLocal3, caption:'Slide5'},
    {url: imgTatu3, caption:'Slide6'},
  ]

  const imagenesOferta = [
    { frente: oferta, detras: oferta1 },
    { frente: oferta, detras: oferta2 },
    { frente: oferta, detras: oferta3 },
  ];
  
  const handleHover = (index) => {
      setHoveredIndex(index);
    };


  return (
    <div>
      <div>
        <Nav/>
      </div>
      <div>
        <div className={style.cabeceraContainer}>
            <h1 className={style.cabecerah1}>BIENVENIDOS A LA WEB DEL ESTUDIO TATTOOMAX</h1>
            <h3 className={style.cabecerah3}>DONDE LA TINTA ES LO MAX...</h3>
        </div><br/><br/>
        <h1 className={style.h1}>GALERÍA DE IMÁGENES</h1>
        <div className={style.sliderContainer}>
          <Slide className={style.img}>
            {slideImages.map((slideImage, index)=> (
              <div key={index}>
                <div>
                  <Image src={slideImage.url} alt={slideImage.caption} width="700px" height="400px"/>
                </div>
              </div>
            ))} 
          </Slide>
        </div>
        <div className={style.ofertaContainer}>
          {imagenesOferta.map((imagen, index) => (
            <div
              key={index}
              className={`${style.oferta} ${hoveredIndex === index ? style.voltear : ''}`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            >
              <div>
                <div className={style.carta}>
                  <div className={`${style.cara} ${hoveredIndex === index ? style.caraVisible : ''}`}>
                    {/* Aquí colocamos la imagen frontal */}
                    <Image src={imagen.frente.src} alt={`oferta${index + 1}`} width="400px" height="400px" />
                  </div>
                  <div className={`${style.caraDetras} ${hoveredIndex !== null && hoveredIndex !== index ? style.caraVisible : ''}`}>
                    {/* Aquí colocamos la imagen trasera */}
                    <Image src={imagen.detras.src} alt={`oferta${index + 1}Detras`} width="400px" height="400px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={style.informacion}>
          <h3>Vistita los distintos sitios de esta página para ver toda la información acerca de nuestro estudio</h3>
            <div>Visita nuestra página de <p className={style.link}><Link href="/blog">información</Link></p> para saber acerca de recomendaciones e información sobre tatuajes</div>
            <div>Visita nuestra página <p className={style.link}><Link href="/local">local</Link></p> para ver horario y ubicacion de nuestro local</div>
            <div>Visita nuestra página <p className={style.link}><Link href="/artistas">artistas</Link></p> para ver toda la información de nuestros artistas, sus tatuajes realizados y sus horarios de trabajo</div>
        </div>
      </div><br/><br/>
      <div>
        <Footer/>
      </div>
    </div>
  )
}
