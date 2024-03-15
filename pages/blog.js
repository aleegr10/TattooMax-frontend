import style from '/styles/Blog.module.css';
import Nav from '/components/nav';
import Footer from '/components/footer';
import Image from 'next/image';
import imagenEspalda from '/public/blog/imagenEspalda.png';
import imagenBrazo from '/public/blog/imagenBrazo.png';

export default function Blog() {
  return (
    <div className={style.body}>
      <div>
        <Nav />
      </div>
      <div className={style.container}>
        <div>
          <h1 className={style.h1}>Trucos para aprender cómo cuidar tu tattoo adecuadamente</h1>
          <p className={style.p}>Siempre has querido hacerte un tatuaje. Cuando llega el día y logras tenerlo, no todo ha terminado. Es necesario aprender cómo cuidar tu tattoo adecuadamente. Recuerda que desde ese instante necesitas un proceso delicado, higiénico y muy preciso sobre la piel.</p>
          
          <h2 className={style.h2}>Consejos de cómo cuidar tu tattoo en casa</h2>
          <p className={style.p}>Cuando nos hacemos un tatuaje hay varios aspectos a considerar. Uno de ellos, y el más importante es ¡No tocarlo! Esto porque podría contaminar la zona provocando infecciones.</p>
          <p className={style.p}>La otra es tratar de evitar que aparezcan costras. Esta es una función natural del cuerpo humano que trata de activar una vez detecta que la piel está sangrando. Sin embargo, si esto ocurre los pigmentos de color irán desapareciendo ya que están contenidos en las células.</p>
          <p className={style.p}>Para minimizar ambos eventos, lo ideal es usar algunas cremas. estos productos se venden especialmente para cuidar tu tattoo. Sirven para prevenir costras e incrementan el cuidado de la piel. Para mejorar esta situación les dejamos unos pasos de cómo cuidar tu tattoo adecuadamente en casa:</p>
          <h4 className={style.h2}>Pasos para un cuidado adecuado de un tatuaje</h4>
          <ol className={style.lista}>
              <li>Hay que remover la venda o el plástico que recubre la zona tatuada. Esto se debe hacer una vez hayan transcurrido un máximo de cinco horas. Al hacerlo, vierta un poco de agua tibia con jabón de glicerina. Esto permite retirar los trozos de sangre que aún existen y evitar la cicatrización.</li>
              <li>Este proceso se debe hacer con mucho cuidado. Evitando por completo tocar el tatuaje con las manos. Si se va a limpiar, es mejor desinfectar por completo las manos.</li>
              <li>Es mejor no mojar mucho el tatuaje, al menos en los primeros días. Al bañarnos coloca vaselina sobre el tattoo para que el agua escurra.</li>
              <li>Luego de esto, debemos aplicar cremas con propiedades cicatrizantes. Este proceso se debe hacer durante dos semanas y 5 veces por día. Al aplicarlo con las manos, estas deben estar perfectamente lavadas.</li>
              <li>Por nada del mundo salga a la calle y exponga el tatuaje al sol. Tampoco lo rasque, no vaya playa ni a la piscina. Esto al menos en las dos primeras semanas de haberlo hecho.</li>
              <li>Si pica mucho puede usar agua fría y luego untar crema cicatrizante.</li>
              <li>Si el tatuaje está en una zona donde hay mucho roce, es mejor usar ropa holgada. Esto minimiza su contacto y evita costras o infecciones</li>
          </ol>

          <h2 className={style.h2}>¿Qué cremas son mejores para cuidar tu tattoo?</h2>
          <p className={style.p}>Las cremas cicatrizantes son perfectas para agilizar este proceso. Si te has hecho un tatuaje y quieres que dure intacto hasta su recuperación, estas son algunas cremas que puedes utilizar:</p>
          <ul  className={style.lista}>
              <li><b>Bepanthol</b>: es una sustancia lipídica emoliente que genera una súper capa. La cual protege la piel de sustancias que la puedan afectar. Además, es cicatrizante y evita que el agua se pierda manteniendo 100 % hidratada la zona. </li>
              <li><b>Echysee</b>: se diseñó para cuidar la piel cuando nos hacemos un piercing. Sin embargo, tiene una versión la cual protege la piel ante un tatuaje. Es cicatrizante y no tiene efectos secundarios.</li>
              <li><b>Bacitracina</b>: a pesar de que son usadas para mejorar moretones, en tatuajes es ideal. Esto porque cuando nos hacemos un tattoo pueden aparecer estos morados. Alivia la piel, minimiza el dolor y previene inflamaciones.</li>
          </ul>

          <h2 className={style.h2}>Conclusión</h2>
          <p className={style.p}>La mejor manera en cómo cuidar tu Tattoo es siendo precavido. Tener siempre las manos aseadas y manipular lo menos posible la zona tatuada. Usar cremas hidratantes y cicatrizantes, que aceleren el proceso.</p>
        </div>
        <div>
          <Image src={imagenEspalda} alt="TatuajeEspalda" className={style.imagen} width="600px" height="350px" />
          
          <h1 className={style.h1}>Según estudio tener tatuajes es bueno para la salud</h1>
          <p className={style.p}>¿Sabías que tener tatuajes es bueno para la salud? Actualmente existen estudios que confirman este posible beneficio a la salud, que hoy compartiremos contigo. 
            
          El análisis lo ha realizado la Universidad de Alabama, en donde explican que, hacerse un tatuaje mejora tu sistema inmune. El estudio se ha publicado en el American Journal of Human Biology. Para conocer más sobre este proyecto de investigación, te dejamos con todos los detalles que sustentaron el trabajo.</p>

          <h2 className={style.h2}>Tener tatuajes fortalece tu sistema inmune</h2>
          <p className={style.p}>Para muchos tener tatuajes es una forma de expresar rebeldía, un mensaje personal, recordar una fecha memorable o algún familiar. Sin embargo, detrás de esta cultura de hacerse tatuajes existen algunos mitos como – por ejemplo - que es dañino para salud.
            
          A pesar de esto, la Universidad de Alabama emprendió un estudio el cual se publicó en el American Journal of Human Biology, una respetada revista científica de los Estados Unidos. 
          
          Muy concretamente, el estudio, revela que hacerse tatuajes en reiteradas oportunidades ayuda a fortalecer el sistema inmunológico. Esto porque al instante en que la tinta ingresa al cuerpo, el organismo fortalece su lucha al tratar de combatir estos agentes extraños que se van introduciendo.
          
          En cada envió de señales para combatir estos agentes extraños, el sistema inmune se va fortaleciendo. Esto hace que una gripe común, un resfriado o incluso la fiebre, se pueda controlar fácilmente.</p>

          <h2 className={style.h2}>¿Cómo se desarrolló el estudio?</h2>
          <p className={style.p}>El estudio se realizó a 24 mujeres y 5 hombres 829 en total, cuyas edades rondaban los 18 a 47 años de edad. Estos han sido voluntarios conformados por personas que se iban a tatuar por primera vez. También participaron personas con experiencia en tener tatuajes en el cuerpo. 
            
          Al iniciar el estudio, a cada participante se lo tomó pruebas de saliva antes y después de realizarse el tatuaje. El objetivo era medir los niveles de inmunoglobulina A.
          
          Este es un anticuerpo que sirve como arma de defensa ante virus y bacterias que entran al organismo. También se midieron los niveles de cortisol, la hormona que se libera como respuesta ante situaciones de estrés que vive el organismo.</p>

          <h2 className={style.h2}>¿Cuáles fueron los resultados del estudio?</h2>
          <p className={style.p}>El estudio arrojó que la cantidad de inmunoglobulina A descendió a mayor escala en personas que se tatuaban por primera vez. Esto, comparado con los participantes cuyo proceso de tatuarse es recurrente.
            
          La explicación es que el organismo de los participantes ya tatuados y con experiencia, estaba más entrenado. Es decir, ya sabía que se venía y podía controlarlo con facilidad. Esto sin debilitar el sistema inmune y dejarlo vulnerable a los agentes externos.</p>

          <h2 className={style.h2}>Consideraciones a tener en cuenta</h2>
          <p className={style.p}>Para el doctor Christopher Lynn, autor principal de la investigación. Además, es profesor asociado de Antropología en la Universidad de Alabama explica que: “solo es posible fortalecer el sistema inmune con tatuajes, si se han colocados en varias oportunidades”.
            
          No es simplemente tener tatuajes en el cuerpo, sino que deben ser recurrentes al colocarlos. El doctor Lynn asemeja esta situación a un primer día de ejercicios intensos. Cuando se tiene tiempo si ejercitar el cuerpo, los músculos se sienten adoloridos. 
          
          Sin embargo, al incrementar y hacer recurrente los ejercicios, el dolor e incomodidad muscular desaparecen. Por eso si quieres ir a un estudio de tatuajes y empezar con esta forma de entrenar el sistema inmune, recuerda que debe ser recurrente.</p>

          <h2 className={style.h2}>¿Cuáles son los detractores del estudio?</h2>
          <p className={style.p}>Al ser un tema tan delicado y polémico el de hacerse tatuajes, rápidamente este estudio cuenta con detractores. Una de ellas es la doctora Sylvie Stacy, especializada en Medicina Preventiva.
            
          Esta profesional de la medicina ha explicado que la muestra utilizada de 29 voluntarios es pequeña para arrojar resultados tan positivos. Además, aclara que en el estudio solo se utilizaron algunas sustancias que generan respuestas de defensa por parte del sistema inmune.</p>
        </div>
        <div>
          <Image src={imagenBrazo} alt="TatuajeBrazo" className={style.imagen} width="600px" height="350px" />
          
          <h1 className={style.h1}>Historia de los tatuajes / Conoce de dónde vienen</h1>
          <p className={style.p}>Los tatuajes parecen algo moderno, pero en realidad la historia de los tatuajes se remonta siglas atrás. En un estudio de tatuajes, la vibra que se respira es de creatividad, arte y mucha tinta.
            
          Pero, en realidad, en sus inicios eran sin color, simbolizaba otras artes y era aplicado en algunas personas. Conozcamos todo acerca de esta milenaria técnica de pintar sobre la piel.</p>

          <h2 className={style.h2}>Historia de los tatuajes</h2>
          <p className={style.p}>La época neolítica, es el momento en donde los hallazgos más significativos y notorios se han hecho de los tatuajes. Se trata de una momia de un glaciar, ubicado en los Alpes entre Austria e Italia. Este cuerpo tenía pintura en su espalda y rodillas. Todo indicaba claramente que eran tatuajes.
            
          Pero si no había estudios de tatuajes para la época, ¿Cómo se lo hizo? En los pueblos polinesios la tradición de tatuarse era muy común. Incluso, la propia palabra se originó del tátau; el idioma nativo de Polinesia. La costumbre de tatuar a sus pobladores se hace desde que son pequeños.
          
          Al pasar los años estos pequeños crecían y se iban tatuando en diferentes partes del cuerpo. Esto, hasta abarcar la mayor cantidad y no dejar un espacio sin tinta. El motivo por el cual usaban estos tatuajes, era para intimidar a sus enemigos. 
          
          También sobresale en la historia de los tatuajes el antiguo Egipto; donde el hábito de tatuarse predominaba entre las mujeres. Japón, adoptó esta tradición en el siglo V antes de cristo. Simbolizaba en la persona que se trataba que era alguien de clase social alta. Sus cuerpos eran decorados con pequeñas obras. 
          
          Por otra parte, el tatuaje ha significado, para culturas más recónditas, una ofrenda a sus dioses. En el caso de los marineros que llegaban a la Polinesia, adoptaron esta cultura y la trasladaron a otros territorios en donde desembarcaron. Haciendo extensivo el tatuarse.</p>

          <h2 className={style.h2}>¿Qué significa un tatuaje?</h2>
          <p className={style.p}>Un tatuaje simboliza la modificación temporal o permanente, del color de la piel. Allí se sustituye el tono natural por un dibujo, figura o texto que es pintado sobre el cuerpo. Para ello, se emplean agujas que entran y salen muy rápidamente, esparciendo la tinta por debajo de la epidermis. 
            
          El significado puede variar drásticamente. En una reciente encuesta de una revista de Donosti se buscaron contactos con chicas y chicos con tatuajes y se les preguntó el significado del suyo. Muchos conmemoran familiares fallecidos, fechas importantes en sus vidas, temores o alegrías, triunfos y fracasos. En sí, no hay límite en el simbolismo de un tatuaje.
          
          Incluso, si vas a un estudio de tatuajes podrás ver un mismo dibujo plasmado en diferentes personas y distintas partes del cuerpo. Si preguntamos qué significa a cada uno de ellos, recibirás tantas respuestas diferentes que variarán de acuerdo a las personas abordadas.</p>

          <h2 className={style.h2}>¿Por qué es importante contar con un buen estudio de tatuajes?</h2>
          <p className={style.p}>La cultura de hacerse un tatuaje, es más buscada por los jóvenes. Ellos pueden tener diferentes motivos para pintar su cuerpo, pero sin importar cuál sea, lo fundamental es contar con un buen profesional que lo haga.
            
          Pero antes, hay que estar 100 % decidido y convencido de hacerlo. Luego puedes dar marcha atrás, pero a un costo muy alto. Como no es algo habitual, lo mejor es ir con certeza de lo que quieres tatuarte y dónde quieres plasmarlo.
          
          Solo en un buen estudio de tatuajes profesional, cuenta con los niveles de seguridad para tatuarte cómodamente. Ofrecen consejos, recomendaciones, equipos nuevos y esterilizados, tintas de calidad y un servicio calificado.</p>

          <h2 className={style.h2}>Conclusión</h2>
          <p className={style.p}>La historia de los tatuajes nos enseña que, las personas que se tatúan buscan plasmar algo en su cuerpo. Algo que los represente o los identifique. Si este es tu caso y quieres marcar algo en ti de gran relevancia, debes acudir con expertos. En especial, si será un tatuaje grande y en un área visible.</p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
