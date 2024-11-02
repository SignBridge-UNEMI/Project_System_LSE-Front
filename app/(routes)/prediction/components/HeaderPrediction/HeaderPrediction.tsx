"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { CirclePlus } from "lucide-react"
import { useState } from "react"    

export  function HeaderCompanies() {
    const [openModalCreaate, setOpenModalCreate] = useState(false)

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">Modulo de Traduccion</h2>
            <Dialog open={openModalCreaate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button className="bg-black text-white">
                        Registra un Seña
                    </Button>            
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>  
                        <DialogTitle>Registra una nueva seña</DialogTitle>
                        <DialogDescription>
                            Ingresa o registra una nueva seña
                        </DialogDescription>
                    </DialogHeader>
                    {/* <FormCreateCustomer/> */}
                </DialogContent>
            </Dialog>
        </div>
    )
}
