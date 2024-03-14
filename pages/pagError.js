import Nav from '../components/nav';
import Footer from '../components/footer';

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
        Vuelva a la página <a href="/" style={{color: "blue"}}>inicial</a> o a otra página distinta
      </h2><br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        <Footer/>
      </div>
    </div>
  )
}