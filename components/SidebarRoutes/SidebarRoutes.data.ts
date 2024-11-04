import {
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    Languages,
    Book,
    Hand,
} from 'lucide-react'

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Languages,
        label: "Módulo de Traducción",
        href: "/prediction",
    },
    {
        icon: Hand,
        label: "Módulo de Registro de Seña",
        href: "/training",
    },
    {
        icon: Book,
        label: "Módulo de Aprendizaje",
        href: "/learning",
    }
];

export const dataSupportSidebar = [        
    {
        icon: Settings,
        label: "Settings",  
        href: "/setting",
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/security",
    }
];
