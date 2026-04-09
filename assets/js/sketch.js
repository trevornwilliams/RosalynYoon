let theShader;
let trailBuffer; 
let interactionTime = 0;

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
uniform float u_time;
uniform sampler2D u_trailMap; 

// --- CHARCOAL & PAPER PALETTE ---
const vec3 paperColor = vec3(0.95, 0.94, 0.91); 
const vec3 charcoalDark = vec3(0.20, 0.20, 0.22); 
const vec3 charcoalLight = vec3(0.60, 0.60, 0.62); 

// Pseudo-random noise function for grain
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Organic smudge shapes for texture
float fbm(vec2 uv) {
  float v = 0.0;
  float a = 0.5;
  for(int i = 0; i < 4; i++) {
    v += a * hash(uv);
    uv *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vTexCoord;
  
  // Flip the Y axis to match p5.js texture coordinates
  vec2 texUV = vec2(uv.x, 1.0 - uv.y);
  
  // Read the hidden trail buffer
  float influence = texture2D(u_trailMap, texUV).r;
  
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 st = uv * aspect;
  
  // The warp is driven by the scattered dust
  float warpStrength = influence * 0.12; 
  vec2 warp = uv + vec2(
      fbm(st * 5.0 + u_time * 0.5) - 0.5,
      fbm(st * 5.0 - u_time * 0.5) - 0.5
  ) * warpStrength;
  
  float smudgePattern = fbm(warp * 8.0);
  
  // --- COLOR BLENDING ---
  // Base paper with a very faint, integrated static charcoal dust map
  vec3 baseColor = mix(paperColor, charcoalLight, smoothstep(0.4, 0.8, fbm(uv * 6.0)) * 0.15);
  
  // Apply the dark charcoal only within the dusty mask from the fading trail
  vec3 finalColor = mix(baseColor, charcoalDark, smoothstep(0.2, 0.9, smudgePattern) * (influence * 0.9));

  // --- PAPER GRAIN ---
  float grain = (hash(uv * 800.0) - 0.5) * 0.08;
  finalColor += grain;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function preload() {
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('sketch-container'); 
  noStroke();
  
  trailBuffer = createGraphics(windowWidth, windowHeight);
  trailBuffer.background(0); 
}

function draw() {
  background(0);
  
  // 1. FASTER FADE
  trailBuffer.noStroke();
  // Changed from 5 to 15. Higher number = erases faster.
  trailBuffer.fill(0, 15); 
  trailBuffer.rect(0, 0, width, height);
  
  // 2. DRAW THIN CORE + DUST PARTICLES
  let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  if (mouseSpeed > 0) {
    interactionTime += mouseSpeed * 0.003; 
    
    trailBuffer.noStroke();
    
    // Draw more steps for a smoother, denser core
    let steps = max(1, floor(mouseSpeed)); 
    
    for (let i = 0; i < steps; i++) {
      let t = i / steps;
      let x = lerp(pmouseX, mouseX, t);
      let y = lerp(pmouseY, mouseY, t);
      
      // -- A. The Thin Core Line --
      trailBuffer.fill(255, 180); 
      // Much smaller ellipse (random 1 to 3 pixels)
      let coreSize = random(1, 3); 
      trailBuffer.ellipse(x + random(-1, 1), y + random(-1, 1), coreSize, coreSize);

      // -- B. The Scattered Dust --
      // Generates 4 to 8 tiny dust particles per step
      let dustCount = floor(random(4, 8)); 
      for (let p = 0; p < dustCount; p++) {
        let angle = random(TWO_PI);
        // Spreads out between 2 and 15 pixels away from the core
        let spread = random(2, 15); 
        
        // Very faint dust (alpha 20 to 60)
        trailBuffer.fill(255, random(20, 60)); 
        let dustSize = random(1, 4);
        trailBuffer.ellipse(
          x + cos(angle) * spread, 
          y + sin(angle) * spread, 
          dustSize, dustSize
        );
      }
    }
  }
  
  // 3. Pass everything into the shader
  shader(theShader);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', interactionTime);
  theShader.setUniform('u_trailMap', trailBuffer); 
  
  beginShape();
  vertex(-1, -1, 0, 0, 0);
  vertex(1, -1, 0, 1, 0);
  vertex(1, 1, 0, 1, 1);
  vertex(-1, 1, 0, 0, 1);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  trailBuffer.resizeCanvas(windowWidth, windowHeight);
  trailBuffer.background(0); 
}