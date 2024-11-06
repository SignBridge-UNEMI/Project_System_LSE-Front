import { HeaderCompanies } from "./components/HeaderPrediction";
import { BodyTraduccion } from "./components/bodyPrediction/BodyTraduccion";

export default function Page() {
  return (
    <div>
      <HeaderCompanies />
      <p>
        Este módulo está diseñado para realizar la traducción de lenguaje de señas a texto y voz. Aquí podrás iniciar la cámara para capturar los movimientos de las manos y el cuerpo, y el sistema procesará los datos en tiempo real para ofrecer traducciones precisas.
      </p>
      <BodyTraduccion />
    </div>
  );
}
