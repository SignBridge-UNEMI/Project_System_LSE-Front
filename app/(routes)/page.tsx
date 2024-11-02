import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { CardSummary } from "./components/CardSumary";
import { BookOpenCheck, List, UsersRound, Waypoints,Banknote } from "lucide-react";
import { LastCustomers } from "./components/LastCustomers";
import { SalesDistributors } from "./components/SalesDistributors";
import { TotalSuscribers } from "./components/TotalSuscribers";
import { ListIntegrations } from "./components/ListIntegrations";

export const dataCardsSummary = [
  {
    icon: UsersRound,
    total: "abrir",
    average: 15,
    title: "Traductor de lenguaje de señas",
    tooltipText: "Traduce el lenguaje de señas a texto",
  },
  {
    icon: Waypoints,
    total: "Tutoriales, enlaces a informacion sobre lenguaje de señas",
    average: 80,
    title: "Contenido Educativo",
    tooltipText: "Aprende más sobre la comunidad sorda del Ecuador",
  },
  {
    icon: Banknote,
    total: "Banco de palabras",
    average: 30,
    title: "Learning",
    tooltipText: "Aprende con nosotros.",
  },
]
export default function Home() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20 " >
        {dataCardsSummary.map(({icon, total, average, title, tooltipText}) => (
          <CardSummary
          key={title}
          icon={icon}
          total={total}
          average={average}
          title={title}
          tooltipText={tooltipText}
          />
        ))}
      </div>
      {/* Generar un nuevo componente */}
      
      

      
    </div>
  );
}
