"use client"
import { useState } from "react"    

export  function HeaderCompanies() {
    const [openModalCreaate, setOpenModalCreate] = useState(false)

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">Modulo de Entrenamiento</h2>
        </div>
    )
}
