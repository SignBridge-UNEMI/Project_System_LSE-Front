import { HeaderCompanies } from "./components/HeaderLearning";
import { ContentEdu } from "./components/bodyLearning/ContentEdu";

export default function Page() {
  return (
    <div>
      <HeaderCompanies />
      <p>
        En este módulo, tendrás acceso a una variedad de recursos educativos para aprender el lenguaje de señas. Podrás explorar tutoriales, videos y materiales informativos que te ayudarán a comprender y utilizar el lenguaje de señas de manera efectiva. Sigue los pasos y aprovecha los recursos disponibles para mejorar tus habilidades en el lenguaje de señas.
      </p>
      <ContentEdu />
    </div>
  );
}
