import { create } from "zustand";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export const useExpressionStore = create((set, get) => ({
  // ---------------- STATE ----------------
  emotion: "Initializing...",
  faceDetected: false,
  loading: true,
  error: null,

  faceLandmarker: null,
  stream: null,
  isRunning: false,

  // ---------------- EMOTION LOGIC ----------------
  analyzeEmotion: (lm) => {
    const mouthTop = lm[13];
    const mouthBottom = lm[14];
    const leftMouth = lm[61];
    const rightMouth = lm[291];
    const leftEye = lm[159];
    const rightEye = lm[386];
    const eyebrow = lm[70];

    const mouthOpen = Math.abs(mouthTop.y - mouthBottom.y);
    const smileWidth = Math.abs(leftMouth.x - rightMouth.x);
    const eyeOpen = Math.abs(leftEye.y - rightEye.y);

    if (mouthOpen > 0.06 && eyeOpen > 0.03) return "😲 Excited";
    if (smileWidth > 0.25 && mouthOpen > 0.02) return "😊 Happy";
    if (eyebrow.y < leftEye.y - 0.02) return "😠 Angry";
    if (mouthOpen < 0.01 && smileWidth < 0.2) return "😔 Sad";

    return "😐 Neutral";
  },

  // ---------------- INIT ----------------
  init: async (videoRef) => {
    try {
      set({ loading: true, error: null });

      // Load MediaPipe
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const faceLandmarker = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      set({ faceLandmarker });

      // Start Camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      set({ stream });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      videoRef.current.onloadeddata = () => {
        set({ loading: false, isRunning: true });
        get().detect(videoRef);
      };
    } catch (err) {
      console.error(err);
      set({
        error: "Camera not available",
        emotion: "❌ Camera error",
        loading: false,
      });
    }
  },

  // ---------------- DETECTION LOOP ----------------
  detect: (videoRef) => {
    const { faceLandmarker, analyzeEmotion, isRunning } = get();

    if (!faceLandmarker || !videoRef.current || !isRunning) return;

    // Ensure video is ready
    if (videoRef.current.readyState < 2) {
      requestAnimationFrame(() => get().detect(videoRef));
      return;
    }

    const results = faceLandmarker.detectForVideo(
      videoRef.current,
      Date.now()
    );

    if (results && results.faceLandmarks?.length > 0) {
      const landmarks = results.faceLandmarks[0];

      set({
        emotion: analyzeEmotion(landmarks),
        faceDetected: true,
      });
    } else {
      set({
        emotion: "No Face Detected",
        faceDetected: false,
      });
    }

    requestAnimationFrame(() => get().detect(videoRef));
  },

  // ---------------- STOP / CLEANUP ----------------
  stop: () => {
    const { stream } = get();

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    set({
      isRunning: false,
      faceDetected: false,
      emotion: "Stopped",
      stream: null,
    });
  },
}));