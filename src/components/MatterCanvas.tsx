"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function MatterCanvas({ words }: { words: string[] }) {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Create renderer
        const width = sceneRef.current.clientWidth;
        const height = 400; // Fixed height for area
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: "transparent",
                wireframes: false,
            }
        });

        // Create boundaries
        const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, { isStatic: true });
        const wallLeft = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
        const wallRight = Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });

        // Create text bodies (represented as rectangles)
        const textBodies = words.map((word, i) => {
            // Approximate width based on string length
            const rectWidth = word.length * 15 + 40;

            const body = Bodies.rectangle(
                Math.random() * width,
                -100 - (Math.random() * 500) - (i * 100), // Drop from top
                rectWidth,
                50,
                {
                    restitution: 0.6,
                    friction: 0.1,
                    render: {
                        fillStyle: "#ffffff",
                        strokeStyle: "#0a0a0a",
                        lineWidth: 2,
                    }
                }
            );
            return body;
        });

        Composite.add(engine.world, [ground, wallLeft, wallRight, ...textBodies]);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(engine.world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Custom render loop to draw text over rectangles
        const events = Matter.Events;
        events.on(render, 'afterRender', () => {
            const ctx = render.context;
            ctx.font = "bold 16px monospace";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            textBodies.forEach((body, i) => {
                const { x, y } = body.position;
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(body.angle);
                ctx.fillText(words[i], 0, 0);
                ctx.restore();
            });
        });

        // Run engine & renderer
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Resize handler
        const handleResize = () => {
            if (!sceneRef.current) return;
            const newWidth = sceneRef.current.clientWidth;
            render.canvas.width = newWidth;
            render.options.width = newWidth;
            Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 30 });
            Matter.Body.setPosition(wallRight, { x: newWidth + 30, y: height / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            Matter.World.clear(engine.world, false);
            Engine.clear(engine);
            if (render.canvas) render.canvas.remove();
            render.textures = {};
        };
    }, [words]);

    return (
        <div className="w-full relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800">
            <div
                ref={sceneRef}
                className="w-full h-[400px] cursor-grab active:cursor-grabbing"
            />
            <div className="absolute top-4 left-4 text-xs font-mono text-gray-500 pointer-events-none">
        // INTERACTIVE_MODE: DRAG_AND_DROP
            </div>
        </div>
    );
}
