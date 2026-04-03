import React, { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

const FaceEmotionDetector = () => {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");
  const faceLandmarkerRef = useRef(null);

  const analyzeEmotion = (lm) => {
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
  };

  useEffect(() => {
    let stream;

    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
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

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        videoRef.current.onloadeddata = () => {
          detect();
        };
      } catch (err) {
        console.error(err);
        setEmotion("❌ Camera not available");
      }
    };

    const detect = () => {
      if (!faceLandmarkerRef.current || !videoRef.current) return;

      const results =
        faceLandmarkerRef.current.detectForVideo(
          videoRef.current,
          Date.now()
        );

      if (results && results.faceLandmarks?.length > 0) {
        const landmarks = results.faceLandmarks[0];
        setEmotion(analyzeEmotion(landmarks));
      } else {
        setEmotion("No Face Detected");
      }

      requestAnimationFrame(detect);
    };

    init();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} width="400" height="300" />
      <h2>{emotion}</h2>
    </div>
  );
};

export default FaceEmotionDetector;