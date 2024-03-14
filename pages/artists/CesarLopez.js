import Artista from "../../components/artista";
import Login from "../../components/login";
import Nav from "../../components/nav";
import Footer from "../../components/footer";

export default function CesarLopez() {    
    return(
        <div>
            <div>
                <Nav/>
            </div>
            <div>
                <Artista name={"César López"} id={"62829e4e6896306a2c172903"}/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}