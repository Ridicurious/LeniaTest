// js/canvas-animation.js

(function() { // IIFE to avoid polluting global scope
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error("Canvas element with ID 'particle-canvas' not found.");
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Could not get 2D context from canvas.");
        return;
    }

    let nodes = [];
    let animationFrameId = null;
    const nodeCount = 100; // Adjust as needed
    const maxDistance = 120; // Increased slightly for visibility
    const pinkNodeCount = 20; // Number of pink nodes
    const defaultColor = '#00aaff'; // Default blue
    const highlightColor = "#e62a8e"; // Pink color

    // Define the Node class
    class Node {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.x = weightedRandom(this.canvasWidth); // Weighted start position
            this.y = Math.random() * this.canvasHeight;
            this.vx = (Math.random() - 0.5) * 0.75; // Reduced velocity slightly
            this.vy = (Math.random() - 0.5) * 0.75;
            this.radius = 1.5 + Math.random() * 1.5; // Smaller radius
            this.color = defaultColor; // Default color
        }

        update(canvasWidth, canvasHeight) {
            this.x += this.vx;
            this.y += this.vy;
            // Boundary checks
            if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
                this.vx *= -1;
                this.x = Math.max(this.radius, Math.min(this.x, canvasWidth - this.radius));
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
                this.vy *= -1;
                this.y = Math.max(this.radius, Math.min(this.y, canvasHeight - this.radius));
            }
        }

        draw(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = this.color;
            context.fill();
        }
    }

    // Weighted random function (simple weighting towards lower numbers/left side)
    function weightedRandom(max) {
        if (max <= 0) return 0;
        return Math.pow(Math.random(), 1.5) * max; // Adjusted power for less extreme weighting
    }

    // Function to draw lines between nearby nodes
    const drawLines = () => {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);

                    let gradient;
                    let useGlobalAlpha = false;

                    if (nodes[i].color !== nodes[j].color) {
                        gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                        gradient.addColorStop(0, nodes[i].color);
                        gradient.addColorStop(1, nodes[j].color);
                        useGlobalAlpha = true; // Need global alpha for gradient opacity
                    } else {
                        gradient = nodes[i].color; // Use the common color string
                    }

                    let opacity = 1 - dist / maxDistance;
                    opacity = Math.max(0, Math.min(1, opacity * 0.7)); // Reduce max opacity slightly

                    let strokeStyle;
                    let originalAlpha = ctx.globalAlpha;

                    if (useGlobalAlpha) {
                        ctx.globalAlpha = opacity;
                        strokeStyle = gradient;
                    } else {
                        // Convert hex color string to rgba for opacity
                        const r = parseInt(gradient.substring(1, 3), 16);
                        const g = parseInt(gradient.substring(3, 5), 16);
                        const b = parseInt(gradient.substring(5, 7), 16);
                        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                            strokeStyle = `rgba(${r},${g},${b},${opacity})`;
                        } else {
                            strokeStyle = `rgba(0, 170, 255, ${opacity})`; // Fallback
                        }
                    }

                    ctx.strokeStyle = strokeStyle;
                    ctx.lineWidth = 0.4; // Thinner lines
                    ctx.stroke();

                    if (useGlobalAlpha) {
                        ctx.globalAlpha = originalAlpha; // Restore original alpha
                    }
                }
            }
        }
    };

    // Animation loop
    const animate = () => {
        if (!ctx || !canvas) { // Check context and canvas validity each frame
             if (animationFrameId) cancelAnimationFrame(animationFrameId);
             animationFrameId = null;
             return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(node => {
            node.update(canvas.width, canvas.height);
            node.draw(ctx);
        });
        drawLines();
        animationFrameId = requestAnimationFrame(animate);
    };

    // Resize canvas and re-initialize nodes
    const resizeCanvas = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Optional: Re-initialize nodes on resize, or just let them adapt
        initNodes(); // Re-create nodes for the new size
    };

    // Initialize nodes
    const initNodes = () => {
         if (!canvas) return;
         nodes = []; // Clear existing nodes
         for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node(canvas.width, canvas.height));
         }
         // Assign pink color
         let assignedPink = 0;
         let attempts = 0; // Prevent infinite loop
         while (assignedPink < pinkNodeCount && attempts < nodeCount * 2) {
             const randomIndex = Math.floor(Math.random() * nodes.length);
             if (nodes[randomIndex].color !== highlightColor) {
                 nodes[randomIndex].color = highlightColor;
                 assignedPink++;
             }
             attempts++;
         }
    }

    // Initial setup
    const initAnimation = () => {
        if (!canvas || !ctx) return; // Ensure canvas and context are available
        initNodes(); // Create initial nodes
        resizeCanvas(); // Set initial size (also calls initNodes again, which is fine)

        // Start animation if not already running
        if (animationFrameId === null) {
            animate();
        }
        // Add resize listener
        window.addEventListener('resize', resizeCanvas);
    };

    // Start the animation once the DOM is ready
    if (document.readyState === 'loading') { // Handle cases where script runs before DOM is fully loaded
        document.addEventListener('DOMContentLoaded', initAnimation);
    } else {
        initAnimation(); // DOM is already ready
    }

    // Optional: Add cleanup if you ever dynamically remove the canvas/script
    // window.addEventListener('beforeunload', () => {
    //     if (animationFrameId) {
    //         cancelAnimationFrame(animationFrameId);
    //     }
    //     window.removeEventListener('resize', resizeCanvas);
    // });

})(); // End of IIFE