import Artista from "../../components/artista";
import Login from "../../components/login";
import Nav from "../../components/nav";
import Footer from "../../components/footer";

export default function AfricaPerez() {    
    return(
        <div>
            <div>
                <Nav/>
            </div>
            <div>
                <Artista name={"África Pérez"} id={"628294a96896306a2c172901"}/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}