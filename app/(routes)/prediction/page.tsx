import { HeaderCompanies } from "./components/HeaderPrediction";
import { BodyTraduccion } from "./components/bodyTraduccion/BodyTraduccion";

export default function page() {
  return (
    <div>
      <HeaderCompanies/>
      <p>Modulo de Traduccion</p>
      <BodyTraduccion/>
    </div>

    
  )
}
