let theShader;
let interactionTime = 0; // Tracks time based ONLY on mouse movement

const vert = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = positionVec4;
}
`;

const frag = `
precision mediump float;
varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Your new color palette normalized to 0.0 - 1.0
const vec3 paper = vec3(0.980, 0.969, 0.949); // FAF7F2 (Base Canvas)
const vec3 p1    = vec3(0.929, 0.867, 0.800); // EDDDCC
const vec3 p2    = vec3(0.867, 0.620, 0.580); // DD9E94
const vec3 p3    = vec3(0.871, 0.784, 0.725); // DEC8B9
const vec3 p4    = vec3(0.988, 0.886, 0.561); // FCE28F

// Pseudo-random noise function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Fractal Brownian Motion for organic watercolor bleeding
float fbm(vec2 uv) {
  float v = 0.0;
  float a = 0.5;
  for(int i = 0; i < 5; i++) {
    v += a * hash(uv);
    uv *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vTexCoord;
  
  // Fix aspect ratio so the cursor interaction remains perfectly circular
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 st = uv * aspect;
  vec2 mouseSt = u_mouse * aspect;
  
  // Calculate distance from current pixel to the cursor
  float dist = length(st - mouseSt);
  
  // Warp the coordinate space using noise and our drag-driven time
  vec2 warp = uv + vec2(
      fbm(st * 3.0 + u_time * 0.5) - 0.5,
      fbm(st * 3.0 - u_time * 0.5) - 0.5
  ) * 0.2;
  
  // Generate a noise map for the edges of the paint
  float noiseVal = fbm(warp * 5.0);
  
  // Create a soft brush radius around the mouse
  float influence = smoothstep(0.4, 0.0, dist + noiseVal * 0.25);
  
  // Map the palette colors organically across the warped space
  float colorIdx = fract(warp.x * 2.0 + warp.y * 2.0 + u_time * 0.2);
  vec3 paint;
  if (colorIdx < 0.25) paint = mix(p1, p2, smoothstep(0.0, 0.25, colorIdx));
  else if (colorIdx < 0.50) paint = mix(p2, p3, smoothstep(0.25, 0.50, colorIdx));
  else if (colorIdx < 0.75) paint = mix(p3, p4, smoothstep(0.50, 0.75, colorIdx));
  else paint = mix(p4, p1, smoothstep(0.75, 1.0, colorIdx));

  // Blend the paint into the paper based on the cursor influence
  // Also add a very slight static grain to simulate paper texture
  float grain = (hash(uv * 500.0) - 0.5) * 0.03;
  vec3 finalCol = mix(paper, paint, influence) + grain;

  gl_FragColor = vec4(finalCol, 1.0);
}
`;

function preload() {
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  canvas.parent('sketch-container'); 
}

function draw() {
  background(0);
  
  // Calculate how far the mouse has moved this frame
  let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  
  // Advance the fluid simulation ONLY if the mouse is moving
  interactionTime += mouseSpeed * 0.003; 
  
  shader(theShader);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', interactionTime);
  
  // THE FIX: Invert the Y-axis calculation so the shader matches the DOM's top-left origin
  theShader.setUniform('u_mouse', [mouseX / width, 1.0 - (mouseY / height)]);
  
  beginShape();
  vertex(-1, -1, 0, 0, 0);
  vertex(1, -1, 0, 1, 0);
  vertex(1, 1, 0, 1, 1);
  vertex(-1, 1, 0, 0, 1);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}