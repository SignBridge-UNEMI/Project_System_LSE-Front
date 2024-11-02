import {
    BarChart4,
    Building2,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Calendar,
    Circle,
    Languages, // Added for translation module
    Book, // Added for learning module
    icons
} from 'lucide-react'

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Languages, // Icon for Modulo de Traducción
        label: "Modulo de Traducción",
        href: "/prediction",
    },
    {
        icon: Book, // Icon for Modulo de Aprendizaje
        label: "Modulo de Aprendizaje",
        href: "/learning",
    }
];

export const dataToolsSidebar = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/faqs",
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: "/analytics",
    },
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