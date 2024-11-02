import { useEffect, useRef } from "react";
import * as Holistic from "@mediapipe/holistic";
import * as CameraUtils from "@mediapipe/camera_utils";
import * as DrawingUtils from "@mediapipe/drawing_utils";

export function useHolistic(isCapturing, onPrediction) {
    const holisticRef = useRef(null);
    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && isCapturing) {
            const holistic = new Holistic.Holistic({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file.replace('_simd', '')}`
            });

            holistic.setOptions({
                modelComplexity: 1,
                smoothLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            });

            holistic.onResults((results) => {
                const canvasCtx = canvasRef.current?.getContext("2d");
                if (canvasCtx) {
                    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                    if (results.poseLandmarks) {
                        DrawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, Holistic.POSE_CONNECTIONS, { color: "#00FF00", lineWidth: 4 });
                        DrawingUtils.drawLandmarks(canvasCtx, results.poseLandmarks, { color: "#FF0000", lineWidth: 2 });
                    }
                    if (results.faceLandmarks) {
                        DrawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, Holistic.FACEMESH_TESSELATION, { color: "#C0C0C070", lineWidth: 1 });
                    }
                    if (results.leftHandLandmarks) {
                        DrawingUtils.drawConnectors(canvasCtx, results.leftHandLandmarks, Holistic.HAND_CONNECTIONS, { color: "#CC0000", lineWidth: 5 });
                        DrawingUtils.drawLandmarks(canvasCtx, results.leftHandLandmarks, { color: "#00FF00", lineWidth: 2 });
                    }
                    if (results.rightHandLandmarks) {
                        DrawingUtils.drawConnectors(canvasCtx, results.rightHandLandmarks, Holistic.HAND_CONNECTIONS, { color: "#00CC00", lineWidth: 5 });
                        DrawingUtils.drawLandmarks(canvasCtx, results.rightHandLandmarks, { color: "#FF0000", lineWidth: 2 });
                    }

                    const landmarks = [
                        ...(results.leftHandLandmarks || []),
                        ...(results.rightHandLandmarks || []),
                        ...(results.poseLandmarks || []),
                        ...(results.faceLandmarks || []),
                    ];

                    if (landmarks.length > 0) {
                        onPrediction(landmarks);
                    }
                }
            });

            const camera = new CameraUtils.Camera(videoRef.current, {
                onFrame: async () => {
                    if (holisticRef.current) {
                        await holisticRef.current.send({ image: videoRef.current });
                    }
                },
                width: 500,
                height: 550,
            });

            camera.start();
            holisticRef.current = holistic;
            cameraRef.current = camera;
        }

        return () => {
            if (cameraRef.current) {
                cameraRef.current.stop();
                cameraRef.current = null;
            }
            if (holisticRef.current) {
                holisticRef.current.close();
                holisticRef.current = null;
            }
        };
    }, [isCapturing, onPrediction]);

    return { canvasRef, videoRef };
}
