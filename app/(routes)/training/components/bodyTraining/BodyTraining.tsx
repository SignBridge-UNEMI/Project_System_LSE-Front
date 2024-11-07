"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useHolistic } from "./useHolistic";

export function BodyTraduccion() {
    const [isCapturing, setIsCapturing] = useState(false);
    const [openModalInfo, setOpenModalInfo] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [currentSampleId, setCurrentSampleId] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    const handlePrediction = (landmarks: any) => {
        const handsDetected = landmarks.some((landmark: any) => 
            landmark.type === 'leftHand' || landmark.type === 'rightHand'
        );

        if (handsDetected && !isRecording) {
            startRecording();
            setIsRecording(true);
        } else if (!handsDetected && isRecording) {
            stopRecording();
            setIsRecording(false);
        }

        if (isCapturing) {
            console.log("Landmarks capturados:", landmarks);
        }
    };

    // Asegúrate de que videoRef es del tipo correcto
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { canvasRef } = useHolistic(isCapturing, handlePrediction);

    useEffect(() => {
        const initCamera = async () => {
            try {
                if (videoRef.current) {
                    const stream = await navigator.mediaDevices.getUserMedia({ 
                        video: { width: 640, height: 480 }
                    });
                    videoRef.current.srcObject = stream; // Ahora TypeScript sabe que srcObject existe
                    
                    const recorder = new MediaRecorder(stream, { 
                        mimeType: 'video/webm; codecs="vp8"' 
                    });
                    
                    recorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            setRecordedChunks((prev) => [...prev, event.data]);
                        }
                    };
                    
                    setMediaRecorder(recorder);
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
                alert("Error al acceder a la cámara. Por favor, asegúrese de que tiene una cámara conectada y ha dado los permisos necesarios.");
            }
        };

        initCamera();

        return () => {
            if (mediaRecorder?.state !== 'inactive') {
                mediaRecorder?.stop();
            }
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [mediaRecorder]);

    const startRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'inactive') {
            setRecordedChunks([]);
            mediaRecorder.start(1000); // Capture chunks every second
            setIsCapturing(true);
            console.log("Grabación iniciada");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setIsCapturing(false);
            
            setTimeout(() => {
                const label = prompt("Ingrese el label para el video:");
                if (label) {
                    const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
                    sendVideoToBackend(videoBlob, label);
                }
            }, 100);

            console.log("Grabación detenida");
        }
    };

    const sendVideoToBackend = async (videoBlob: Blob, label: string) => {
        try {
            const formData = new FormData();
            formData.append("video", videoBlob, "captured_video.webm");
            formData.append("label", label);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/capture-samples/`, 
                {
                    method: "POST",
                    body: formData,
                }
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log("Upload successful:", result);
            setCurrentSampleId(result.sample_id);
            alert("Video subido exitosamente");
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Error al subir el video. Por favor intente nuevamente.");
        }
    };

    // Funciones para normalizar, generar keypoints y entrenar el modelo
    const normalizeSamples = async () => {
        if (!currentSampleId) {
            alert("No se ha capturado ninguna muestra todavía.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/normalize-samples/${currentSampleId}/`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Normalización completada:", result);
            alert("Normalización completada exitosamente");
        } catch (error) {
            console.error("Error en la normalización:", error);
            alert("Error durante la normalización. Por favor intente nuevamente.");
        }
    };

    const generateKeypoints = async () => {
        if (!currentSampleId) {
            alert("No se ha capturado ni normalizado ninguna muestra todavía.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/create-keypoints/${currentSampleId}/`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Keypoints generados exitosamente:", result);
            alert("Keypoints generados exitosamente");
        } catch (error) {
            console.error("Error al generar keypoints:", error);
            alert("Error al generar keypoints. Por favor intente nuevamente.");
        }
    };

    const trainModel = async () => {
        if (!currentSampleId) {
            alert("No se ha capturado, normalizado ni generado keypoints de ninguna muestra todavía.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/train-model/`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Modelo entrenado exitosamente:", result);
            alert("Modelo entrenado exitosamente");
        } catch (error) {
            console.error("Error al entrenar el modelo:", error);
            alert("Error al entrenar el modelo. Por favor intente nuevamente.");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            <div className="relative w-[640px] h-[480px]">
                <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    className="rounded-lg shadow-md w-full h-full object-cover"
                />
                <canvas 
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className="absolute top-0 left-0 rounded-lg"
                />
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-4">
                <Button
                    onClick={startRecording}
                    disabled={isRecording}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white"
                >
                    <Play className="w-4 h-4" />
                    <span>Empezar Captura</span>
                </Button>
                
                <Button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white"
                >
                    <Pause className="w-4 h-4" />
                    <span>Detener Captura</span>
                </Button>

                <Button
                    onClick={normalizeSamples}
                    disabled={!currentSampleId}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Normalizar
                </Button>

                <Button
                    onClick={generateKeypoints}
                    disabled={!currentSampleId}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                    Generar Keypoints
                </Button>

                <Button
                    onClick={trainModel}
                    disabled={!currentSampleId}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                    Entrenar Modelo
                </Button>
            </div>

            <Dialog open={openModalInfo} onOpenChange={setOpenModalInfo}>
                <DialogTrigger asChild>
                    <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                        Información de Uso
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Información de Seguridad</DialogTitle>
                        <DialogDescription>
                            Esta aplicación usa tu cámara para capturar imágenes y traducirlas a texto. 
                            No se guardarán fotos ni videos. Puedes iniciar o detener la cámara usando los botones de play o pause.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
