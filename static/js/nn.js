let nodes = [];
let connections = [];
let scaleFactor = 0.5; // Control the scaling

function setup() {
    let canvas = createCanvas(1200, 800); // Larger canvas
    canvas.parent('canvas-container');
    canvas.style('width', '100%'); // Responsive canvas container
    canvas.style('height', '100%'); // Responsive canvas container

    // Create layers of nodes
    let layerCounts = [3, 4, 10, 10, 4, 3]; // Nodes per layer
    let layerSpacing = width / (layerCounts.length + 1);

    for (let i = 0; i < layerCounts.length; i++) {
        let x = (i + 1) * layerSpacing;
        let ySpacing = height / (layerCounts[i] + 1);
        nodes.push([]);
        for (let j = 0; j < layerCounts[i]; j++) {
            let y = (j + 1) * ySpacing;
            nodes[i].push(new Node(x, y));
        }
    }

    // Create connections between layers
    for (let i = 0; i < nodes.length - 1; i++) {
        for (let a of nodes[i]) {
            for (let b of nodes[i + 1]) {
                connections.push(new Connection(a, b));
            }
        }
    }
}

function draw() {
    background(255);
    scale(scaleFactor); // Scale down the drawing

    // Draw connections
    for (let connection of connections) {
        connection.display();
    }

    // Draw nodes
    for (let layer of nodes) {
        for (let node of layer) {
            node.display();
            node.update();
        }
    }
}

class Node {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.radius = 10; // Base radius for nodes
        this.baseColor = color(50, 100, 255); // Blue color
        this.hoverColor = color(100, 255, 150); // Green color on hover
        this.color = this.baseColor;
        this.pulseSpeed = random(0.01, 0.03); // Random pulse speed
        this.pulseOffset = random(TWO_PI); // Random pulse offset
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }

    update() {
        // Pulsate
        this.radius = 10 + sin(frameCount * this.pulseSpeed + this.pulseOffset) * 2;

        // Change color on hover
        if (dist(mouseX / scaleFactor, mouseY / scaleFactor, this.position.x, this.position.y) < this.radius) {
            this.color = this.hoverColor; // Change color to green on hover
        } else {
            this.color = this.baseColor; // Reset to base color
        }
    }
}

class Connection {
    constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.baseColor = color(50, 50, 150); // Dark blue color for connections
        this.color = this.baseColor;
        this.weight = random(1, 3); // Random weight for connections
    }

    display() {
        stroke(this.color);
        strokeWeight(this.weight);
        line(this.nodeA.position.x, this.nodeA.position.y, this.nodeB.position.x, this.nodeB.position.y);
    }
}

function windowResized() {
    resizeCanvas(1200, 800); // Resize to the original large dimensions
}
