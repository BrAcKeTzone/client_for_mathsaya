import React, { useState, useEffect } from "react";

const Eyeball = ({ agay, agaybah }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [irisPositionLeft, setIrisPositionLeft] = useState({ x: 0, y: 0 });
  const [irisPositionRight, setIrisPositionRight] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Calculate position relative to each eyeball
      const boundingBoxLeft = document
        .getElementById("eyeball-left")
        ?.getBoundingClientRect();
      const boundingBoxRight = document
        .getElementById("eyeball-right")
        ?.getBoundingClientRect();

      if (boundingBoxLeft && boundingBoxRight) {
        // Left eyeball iris position calculation
        const mouseXLeft = event.clientX - boundingBoxLeft.left;
        const mouseYLeft = event.clientY - boundingBoxLeft.top;
        const eyeballRadiusLeft = boundingBoxLeft.width / 2;
        const irisRadiusLeft = eyeballRadiusLeft * 0.5;
        const maxIrisOffsetLeft = eyeballRadiusLeft - irisRadiusLeft;
        const deltaXLeft = mouseXLeft - eyeballRadiusLeft;
        const deltaYLeft = mouseYLeft - eyeballRadiusLeft;
        const angleLeft = Math.atan2(deltaYLeft, deltaXLeft);
        const distanceLeft = Math.min(
          Math.sqrt(deltaXLeft ** 2 + deltaYLeft ** 2),
          maxIrisOffsetLeft
        );
        const irisXLeft =
          eyeballRadiusLeft + distanceLeft * Math.cos(angleLeft);
        const irisYLeft =
          eyeballRadiusLeft + distanceLeft * Math.sin(angleLeft);

        setIrisPositionLeft({ x: irisXLeft, y: irisYLeft });

        // Right eyeball iris position calculation
        const mouseXRight = event.clientX - boundingBoxRight.left;
        const mouseYRight = event.clientY - boundingBoxRight.top;
        const eyeballRadiusRight = boundingBoxRight.width / 2;
        const irisRadiusRight = eyeballRadiusRight * 0.5;
        const maxIrisOffsetRight = eyeballRadiusRight - irisRadiusRight;
        const deltaXRight = mouseXRight - eyeballRadiusRight;
        const deltaYRight = mouseYRight - eyeballRadiusRight;
        const angleRight = Math.atan2(deltaYRight, deltaXRight);
        const distanceRight = Math.min(
          Math.sqrt(deltaXRight ** 2 + deltaYRight ** 2),
          maxIrisOffsetRight
        );
        const irisXRight =
          eyeballRadiusRight + distanceRight * Math.cos(angleRight);
        const irisYRight =
          eyeballRadiusRight + distanceRight * Math.sin(angleRight);

        setIrisPositionRight({ x: irisXRight, y: irisYRight });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    if (clickCount === 0) {
      agay.play();
    } else {
      agaybah.play();
    }
    setIsVisible(false);
    setClickCount((prevCount) => prevCount + 1);
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  };

  return (
    <div className="relative flex justify-center">
      {/* Left eyeball */}
      {isVisible && (
        <>
          <div
            id="eyeball-left"
            className="relative w-20 h-20 rounded-full bg-white border-2 border-black overflow-hidden mr-2"
            onClick={handleClick}
          >
            <div
              style={{
                top: irisPositionLeft.y + "px",
                left: irisPositionLeft.x + "px",
              }}
              className="absolute w-4 h-4 bg-black rounded-full"
            />
          </div>

          {/* Right eyeball */}
          <div
            id="eyeball-right"
            className="relative w-20 h-20 rounded-full bg-white border-2 border-black overflow-hidden ml-2"
            onClick={handleClick}
          >
            <div
              style={{
                top: irisPositionRight.y + "px",
                left: irisPositionRight.x + "px",
              }}
              className="absolute w-4 h-4 bg-black rounded-full"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Eyeball;
