import React, { useEffect, useRef } from "react";
import { useExpressionStore } from "../../states/expressionStore";

const FaceDetector = () => {
  const videoRef = useRef(null);

  const { emotion, init, stop, loading, error } =
    useExpressionStore();

  useEffect(() => {
    init(videoRef);

    return () => stop();
  }, []);

  return (
    <div>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      <video ref={videoRef} autoPlay />

      <h2>{emotion}</h2>
    </div>
  );
};

export default FaceDetector;