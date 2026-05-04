"use client";
import { useEffect, useRef } from "react";

export default function CanvasCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let trails = [];

    const config = {
      trails: 20,
      size: 50,
      friction: 0.5,
      tension: 0.98,
      dampening: 0.25
    };

    function Node() {
      this.x = mouse.x;
      this.y = mouse.y;
      this.vx = 0;
      this.vy = 0;
    }

    function Line(spring) {
      this.spring = spring;
      this.nodes = [];

      for (let i = 0; i < config.size; i++) {
        this.nodes.push(new Node());
      }
    }

    Line.prototype.update = function () {
      let spring = this.spring;
      let node = this.nodes[0];

      node.vx += (mouse.x - node.x) * spring;
      node.vy += (mouse.y - node.y) * spring;

      for (let i = 0; i < this.nodes.length; i++) {
        node = this.nodes[i];

        if (i > 0) {
          const prev = this.nodes[i - 1];

          node.vx += (prev.x - node.x) * spring;
          node.vy += (prev.y - node.y) * spring;

          node.vx += prev.vx * config.dampening;
          node.vy += prev.vy * config.dampening;
        }

        node.vx *= config.friction;
        node.vy *= config.friction;

        node.x += node.vx;
        node.y += node.vy;

        spring *= config.tension;
      }
    };

    Line.prototype.draw = function () {
      ctx.beginPath();
      ctx.moveTo(this.nodes[0].x, this.nodes[0].y);

      for (let i = 1; i < this.nodes.length - 2; i++) {
        const a = this.nodes[i];
        const b = this.nodes[i + 1];
        const x = 0.5 * (a.x + b.x);
        const y = 0.5 * (a.y + b.y);

        ctx.quadraticCurveTo(a.x, a.y, x, y);
      }

      const last = this.nodes[this.nodes.length - 1];
      ctx.lineTo(last.x, last.y);

      ctx.stroke();
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const mouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();

    for (let i = 0; i < config.trails; i++) {
      trails.push(new Line(0.4 + (i / config.trails) * 0.025));
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "rgba(18, 78, 134, 0.907)";
      ctx.lineWidth = 1;

      trails.forEach((line) => {
        line.update();
        line.draw();
      });

      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", resize);

    render();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      
      }}
    />
  );
}