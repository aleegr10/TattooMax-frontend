import Artista from "../../components/artista";
import Login from "../../components/login";
import Nav from "../../components/nav";
import Footer from "../../components/footer";

export default function LuciaRomero() {    
    return(
        <div>
            <div>
            <div>
                <Nav/>
            </div>
            <div>
                <Artista name={"Lucía Romero"} id={"62829efe6896306a2c172906"}/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
        </div>
    )
}