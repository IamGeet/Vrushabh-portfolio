"use client";
import React, { useEffect, useRef } from "react";

export default function NetBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    const POINTS = 48;
    const DIST = 140;
    const SPEED = 0.4;
    const nodes = Array.from({ length: POINTS }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < POINTS; i++) {
        for (let j = i + 1; j < POINTS; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < DIST) {
            ctx.save();
            ctx.globalAlpha = 1 - dist / DIST;
            ctx.strokeStyle = "#00eaff";
            ctx.shadowColor = "#00eaff";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      for (let i = 0; i < POINTS; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00eaff";
        ctx.shadowColor = "#00eaff";
        ctx.shadowBlur = 16;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.restore();
      }
    }

    function animate() {
      for (let i = 0; i < POINTS; i++) {
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1;
      }
      draw();
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}