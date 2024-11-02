import { HeaderCompanies } from "./components/HeaderPrediction";
import { BodyTraduccion } from "./components/bodyTraduccion/BodyTraduccion";

export default function page() {
  return (
    <div>
      <HeaderCompanies/>
      <p>Modulo de Traducción</p>
      <BodyTraduccion/>
    </div>

    
  )
}
