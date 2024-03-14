import Artista from "../../components/artista";
import Login from "../../components/login";
import Nav from "../../components/nav";
import Footer from "../../components/footer";

export default function RobertoMartinez() {    
    return(
        <div>
            <div>
            <div>
                <Nav/>
            </div>
            <div>
                <Artista name={"Roberto Martínez"} id={"628293916896306a2c1728ff"}/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
        </div>
    )
}