import Nav from '/components/nav';
import Footer from '/components/footer';
import Link from 'next/link';

export default function PagError() {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <h1>
        HA HABIDO UN ERROR AL INTENTAR ACCEDER A LA PÁGINA
      </h1>
      <h2>
        Vuelva a la página <Link href="/"><a style={{color: "blue"}}>inicial</a></Link> o a otra página distinta</h2>
        <br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        <Footer/>
      </div>
    </div>
  )
}