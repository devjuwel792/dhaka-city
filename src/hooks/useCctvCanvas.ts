import { useEffect, type RefObject } from "react";

/**
 * Draws an animated "CCTV" traffic scene onto a canvas (pure 2D simulation).
 * Preserves the original dashboard effect: moving cars, lane lines, scanlines,
 * overlay text and a flashing REC dot.
 */
export function useCctvCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  active = true,
): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const cars = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: 40 + Math.random() * (canvas.height - 80),
      speed: 1 + Math.random() * 2,
      color: ["#ef4444", "#3b82f6", "#eab308", "#10b981", "#ffffff"][
        Math.floor(Math.random() * 5)
      ],
      size: 14 + Math.random() * 6,
    }));

    const animate = () => {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 4;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      ctx.strokeStyle = "#e2e8f0";
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      cars.forEach((car) => {
        ctx.fillStyle = car.color;
        ctx.beginPath();
        ctx.roundRect(car.x, car.y, car.size, car.size / 1.6, 3);
        ctx.fill();

        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.arc(car.x + car.size, car.y + 2, 2, 0, Math.PI * 2);
        ctx.arc(car.x + car.size, car.y + (car.size / 1.6) - 2, 2, 0, Math.PI * 2);
        ctx.fill();

        car.x += car.speed;
        if (car.x > canvas.width) {
          car.x = -car.size;
          car.y = 40 + Math.random() * (canvas.height - 80);
        }
      });

      ctx.fillStyle = "rgba(16, 185, 129, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.fillRect(0, i, canvas.width, 1);
      }

      const camId = canvas.dataset.camid?.toUpperCase() ?? "";
      ctx.fillStyle = "#ffffff";
      ctx.font = "10px monospace";
      ctx.fillText(`CAM-${camId} 1080p`, 15, 20);
      ctx.fillText(`FPS: 30.00`, 15, canvas.height - 15);
      ctx.fillText(new Date().toLocaleTimeString(), canvas.width - 90, 20);

      if (Math.floor(frame / 15) % 2 === 0) {
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(canvas.width - 15, canvas.height - 18, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      frame++;
    };

    const interval = setInterval(animate, 33);
    return () => clearInterval(interval);
  }, [canvasRef, active]);
}