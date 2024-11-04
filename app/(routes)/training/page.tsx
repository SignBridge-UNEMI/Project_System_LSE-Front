import { HeaderCompanies } from "./components/HeaderPrediction";
import { BodyTraduccion } from "./components/bodyTraduccion/BodyTraduccion";

export default function Page() {
  return (
    <div>
      <HeaderCompanies />
      <p>
        En este módulo, podrás capturar muestras, normalizarlas, generar keypoints y entrenar el modelo. Sigue los pasos para configurar y optimizar el modelo de predicción.
      </p>
      <BodyTraduccion />
    </div>
  );
}
