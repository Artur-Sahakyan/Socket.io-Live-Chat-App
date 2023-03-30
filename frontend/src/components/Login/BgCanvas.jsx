import React, { useRef, useEffect } from "react";
import backgroundImage from 'assets/login/bg.jpg';
import image1 from "assets/login/image1.jpg";
import image2 from "assets/login/image2.jpg";

export const BgCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load background and moving images
    const backgroundImg = new Image();
    backgroundImg.src = backgroundImage;
    const movingImg1 = new Image();
    movingImg1.src = image1;
    const movingImg2 = new Image();
    movingImg2.src = image2;
    // Set initial positions of moving images
    let img1X = 0;
    let img1Y = 100;
    let img2X = canvas.width;
    let img2Y = 200;

    // Draw background and moving images on canvas
    const draw = () => {
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
      
      ctx.closePath();
    //   ctx.clip();
      ctx.drawImage(movingImg1, img1X, img1Y);

      ctx.drawImage(movingImg2, img2X, img2Y);
      img1X += 1;
      img2X -= 1;
      if (img1X > canvas.width) {
        img1X = -movingImg1.width;
      }
      if (img2X < -movingImg2.width) {
        img2X = canvas.width;
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
      <>
        <div style={{
            width:'100%',
            zIndex:'-998',
            height: '100vh',
            position:"absolute",
            background: 'rgb(0 0 0 / 55%)'
        }}/>
        <canvas
            ref={canvasRef}
            style={{
                position:"absolute",
                zIndex:'-999',
    
            }}
        />
    </>
  )
};