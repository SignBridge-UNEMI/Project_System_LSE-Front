import { Logo } from '@/components/Logo'
import React from 'react'
import Image from 'next/image'

export default function LayoutAuth({children} : {children: React.ReactNode}) {
    return (
        <main className="min-h-screen bg-[#e6f0fd] grid grid-cols-1 lg:grid-cols-2">
            <div className='flex justify-center h-full items-center lg:ml-10' >
                {children}
            </div>
            <div>
                <div className='flex flex-col items-start'>
                <h1 className="text-[#4D4D4D] text-[35px]  font-semibold mt-10 leading-[76px] break-words">Traduccion a Texto y Voz</h1>
                    <h2 className="text-[#4D4D4D] text-[50px]  font-semibold leading-[56px] break-words">
                        TRADUCTOR DEL LENGUAJE DE SEÑAS ECUADOR
                    </h2>
                </div>
                <div className='flex items-center justify-center'>
                    <Image 
                        src="/concepto-ilustra.png" 
                        alt="concepto de personas sordas en comunidad de Ecuador" 
                        width={500} 
                        height={400} 
                        className="" 
                        style={{ marginRight:"150px"}}
                    />
                </div>
            </div>
        </main>

    
    )
}

