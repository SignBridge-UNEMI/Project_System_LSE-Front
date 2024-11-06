import { HeaderCompanies } from "./components/HeaderLearning";
import { ContentEdu } from "./components/bodyLearning/ContentEdu";

export default function Page() {
  return (
    <div>
      <HeaderCompanies />
      <p>
        En este módulo, podrás capturar muestras, normalizarlas, generar keypoints y entrenar el modelo. Sigue los pasos para configurar y optimizar el modelo de predicción.
      </p>
      <ContentEdu />
    </div>
  );
}
