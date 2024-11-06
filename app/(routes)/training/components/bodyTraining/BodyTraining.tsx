"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play, Pause, Info, Eye, EyeOff, Volume2 } from "lucide-react";
import { useState } from "react";
import { useHolistic } from "./useHolistic";

export function BodyTraduccion() {
    const [isCapturing, setIsCapturing] = useState(false);
    const [openModalInfo, setOpenModalInfo] = useState(false);
    const [predictedText, setPredictedText] = useState("Esperando señal...");
    const [predictionCount, setPredictionCount] = useState(1);
    const [lastPrediction, setLastPrediction] = useState("");
    const [showKeypoints, setShowKeypoints] = useState(false);
    const [predictionsHistory, setPredictionsHistory] = useState<{ text: string; count: number }[]>([]); // Nuevo estado para almacenar las predicciones

    const handleStart = () => setIsCapturing(true);
    const handleStop = () => setIsCapturing(false);
    const handleInfo = () => setOpenModalInfo(true);
    const toggleKeypoints = () => setShowKeypoints((prev) => !prev);

    const handlePrediction = async (landmarks: []) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/predict-action/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ landmarks }),
            });

            const data = await response.json();
            if (response.ok) {
                if (data.predicted_word === lastPrediction) {
                    setPredictionCount(predictionCount + 1);
                } else {
                    setPredictionCount(1);
                }
                setLastPrediction(data.predicted_word);
                setPredictedText(data.predicted_word);

                // Agregar la predicción a la historia
                setPredictionsHistory(prev => [...prev, { text: data.predicted_word, count: predictionCount }]);
            } else {
                setPredictedText("Error en la predicción");
                setPredictionCount(1);
            }
        } catch (error) {
            console.error("Error en la predicción:", error);
            setPredictedText("Error de conexión");
            setPredictionCount(1);
        }
    };

    const { canvasRef, videoRef } = useHolistic(isCapturing, handlePrediction);

    return (
        <div className="flex justify-between items-start py-3">
            <div className="flex flex-col items-center">
                <div className="bg-gray-500 w-[500px] h-[550px] rounded shadow flex items-center justify-center relative">
                    {!isCapturing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-700 bg-opacity-70 text-white text-center rounded">
                            <p>Presiona el botón de <strong>play</strong> para iniciar la cámara</p>
                            <p>Usa el botón de <strong>pausa</strong> para detenerla y el botón de <strong>info</strong> para obtener información.</p>
                        </div>
                    )}
                    <video
                        ref={videoRef}
                        id="video"
                        autoPlay
                        playsInline
                        className={`absolute w-full h-full rounded object-cover ${!isCapturing ? 'hidden' : ''}`}
                    />
                    <canvas
                        ref={canvasRef}
                        id="canvas"
                        className={`absolute w-full h-full rounded object-cover ${!isCapturing || !showKeypoints ? 'hidden' : ''}`}
                    />
                </div>

                <div className="flex justify-between w-[200px] mt-4">
                    <Play className="cursor-pointer" onClick={handleStart} />
                    <Pause className="cursor-pointer" onClick={handleStop} />
                    <Info className="cursor-pointer" onClick={handleInfo} />
                    {showKeypoints ? (
                        <EyeOff className="cursor-pointer" onClick={toggleKeypoints} />
                    ) : (
                        <Eye className="cursor-pointer" onClick={toggleKeypoints} />
                    )}
                </div>
            </div>

            <Dialog open={openModalInfo} onOpenChange={setOpenModalInfo}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Seguridad de la cámara</DialogTitle>
                        <DialogDescription>
                            Para garantizar tu privacidad, no se guardará ninguna foto ni video del usuario.
                            Puedes iniciar o detener la cámara cuando lo desees con los botones de inicio y pausa.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className="flex flex-col items-center">
                <div className="relative bg-white w-[550px] h-auto rounded shadow p-2">
                    <div className="flex justify-between items-center border-b p-2">
                        <span className="text-gray-500">Traducción a Texto...</span>
                        <Volume2 className="cursor-pointer" />
                    </div>
                    <div className="overflow-y-auto max-h-[400px]">
                        {predictionsHistory.map((item, index) => (
                            <p key={index} className="text-black text-lg">
                                {item.text} {item.count > 1 && `x${item.count}`}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
