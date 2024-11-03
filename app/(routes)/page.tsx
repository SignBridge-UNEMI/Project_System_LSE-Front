import Link from "next/link";
import { CardSummary } from "./components/CardSumary";
import { UsersRound, Waypoints, Banknote } from "lucide-react";

const dataCardsSummary = [
  {
    icon: UsersRound,
    descip: "Accede al traductor de lenguaje de señas",
    title: "Traductor de lenguaje de señas",
    tooltipText: "Traduce el lenguaje de señas a texto en tiempo real",
    href: "/prediction",
  },
  {
    icon: Waypoints,
    descip: "Encuentra tutoriales y recursos educativos",
    title: "Contenido Educativo",
    tooltipText: "Aprende sobre la comunidad sorda del Ecuador y el lenguaje de señas",
    href: "/prediction/educational-content",
  },
  {
    icon: Banknote,
    descip: "Información detallada sobre el lenguaje de señas",
    title: "Infórmate",
    tooltipText: "Descubre y aclara tus dudas sobre el lenguaje de señas",
    href: "/prediction/learning",
  },
];

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {dataCardsSummary.map(({ icon, descip, title, tooltipText, href }) => (
          <Link key={title} href={href} passHref>
            <div className="cursor-pointer">
              <CardSummary
                icon={icon}
                descip={descip}
                title={title}
                tooltipText={tooltipText}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
