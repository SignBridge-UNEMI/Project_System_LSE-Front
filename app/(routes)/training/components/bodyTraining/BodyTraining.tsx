"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play, Pause, Info } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useHolistic } from "./useHolistic";

export function BodyTraining() {
    const [isCapturing, setIsCapturing] = useState(false);
    const [openModalInfo, setOpenModalInfo] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [currentSampleId, setCurrentSampleId] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const { canvasRef } = useHolistic(isCapturing, handlePrediction);

    function handlePrediction(landmarks: any) {
        const handsDetected = landmarks.some((landmark: { type: string }) => landmark.type === 'leftHand' || landmark.type === 'rightHand');
        if (handsDetected && !isRecording) startRecording();
        else if (!handsDetected && isRecording) stopRecording();
        isCapturing && console.log("Landmarks capturados:", landmarks);
    }

    useEffect(() => {
        const initCamera = async () => {
            try {
                if (!videoRef.current) return;

                const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
                videoRef.current.srcObject = stream;

                if (typeof MediaRecorder === "undefined") {
                    alert("MediaRecorder no está soportado en este navegador.");
                    return;
                }

                const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });
                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) setRecordedChunks((prev) => [...prev, event.data]);
                };
                setMediaRecorder(recorder);
            } catch (error) {
                console.error("Error accessing camera:", error);
                alert("Error al acceder a la cámara.");
            }
        };

        initCamera();

        return () => {
            if (mediaRecorder?.state === 'recording') mediaRecorder.stop();
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track: MediaStreamTrack) => track.stop());
            }
        };
    }, []);

    const startRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'inactive') {
            setRecordedChunks([]);
            mediaRecorder.start(1000);
            setIsRecording(true);
            console.log("Grabación iniciada");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setIsRecording(false);
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/capture-samples/`, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            console.log("Upload successful:", result);
            setCurrentSampleId(result.sample_id);
            alert("Video subido exitosamente");
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Error al subir el video.");
        }
    };

    const processSampleAction = async (endpoint: string, successMessage: string, errorMessage: string) => {
        try {
            if (!currentSampleId) return alert("No se ha capturado ninguna muestra todavía.");
            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}${endpoint}`, {
                method: "POST",
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            console.log(successMessage);
            alert(successMessage);
        } catch (error) {
            console.error(errorMessage, error);
            alert(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            <div className="relative w-[640px] h-[480px]">
                <video ref={videoRef} autoPlay playsInline className="rounded-lg shadow-md w-full h-full object-cover" />
                <canvas ref={canvasRef} width={640} height={480} className="absolute top-0 left-0 rounded-lg" />
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
                <Button onClick={startRecording} disabled={isRecording} className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white">
                    <Play className="w-4 h-4" />
                    <span>Empezar Captura</span>
                </Button>
                <Button onClick={stopRecording} disabled={!isRecording} className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white">
                    <Pause className="w-4 h-4" />
                    <span>Detener Captura</span>
                </Button>
                <Button onClick={() => processSampleAction(`/api/normalize-samples/${currentSampleId}/`, "Normalización completada exitosamente", "Error durante la normalización")} disabled={!currentSampleId} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Normalizar
                </Button>
                <Button onClick={() => processSampleAction(`/api/create-keypoints/${currentSampleId}/`, "Keypoints generados exitosamente", "Error al generar keypoints")} disabled={!currentSampleId} className="bg-purple-500 hover:bg-purple-600 text-white">
                    Generar Keypoints
                </Button>
                <Button onClick={() => processSampleAction("/api/train-model/", "Modelo entrenado exitosamente", "Error al entrenar el modelo")} disabled={!currentSampleId} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    Entrenar Modelo
                </Button>
            </div>
            <Dialog open={openModalInfo} onOpenChange={setOpenModalInfo}>
                <DialogTrigger asChild>
                    <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                        <Info className="w-4 h-4" />
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
