export default function initStarfield() {
  const canvas = document.getElementById("bg-canvas");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  resize();
  window.addEventListener("resize", resize);

  // =========================
  // SHADERS
  // =========================

  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute float a_alpha;

    varying float v_alpha;

    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      gl_PointSize = 3.5;
      v_alpha = a_alpha;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;

    varying float v_alpha;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));

      float alpha = smoothstep(0.5, 0.0, dist) * v_alpha * 1.5;
      float glow  = smoothstep(0.5, 0.0, dist) * v_alpha * 0.4;

      gl_FragColor = vec4(1.0, 0.97, 0.9, alpha + glow);
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.useProgram(program);

  // =========================
  // ATTRIBUTES
  // =========================

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const alphaLocation = gl.getAttribLocation(program, "a_alpha");

  const positionBuffer = gl.createBuffer();
  const alphaBuffer = gl.createBuffer();

  // =========================
  // STARS
  // =========================

  const stars = [];

  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      alpha: 0.2 + Math.random() * 0.8,
    });
  }

  // =========================
  // SHOOTING STARS
  // =========================

  const shootingStars = [];

  function spawnShootingStar() {
    shootingStars.push({
      x: -0.8 + Math.random() * 0.5,
      y: 1.0 - Math.random() * 0.4,
      vx: 0.02,
      vy: -0.012,
      life: 0,
      maxLife: 80,
      trail: [],
    });

    setTimeout(
      spawnShootingStar,
      1500 + Math.random() * 2500
    );
  }

  spawnShootingStar();

  // =========================
  // RENDER LOOP
  // =========================

  function render() {
    gl.clearColor(0.04, 0.04, 0.06, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const positions = [];
    const alphas = [];

    // regular stars
    for (const star of stars) {
      positions.push(star.x, star.y);
      alphas.push(star.alpha);
    }

    // shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const star = shootingStars[i];

      star.x += star.vx;
      star.y += star.vy;
      star.life++;

      star.trail.unshift({
        x: star.x,
        y: star.y,
        alpha: 1,
      });

      if (star.trail.length > 40) {
        star.trail.pop();
      }

      for (let t = 0; t < star.trail.length; t++) {
        const trail = star.trail[t];

        positions.push(trail.x, trail.y);

        alphas.push(
          trail.alpha * (1 - t / star.trail.length)
        );
      }

      if (star.life > star.maxLife) {
        shootingStars.splice(i, 1);
      }
    }

    // positions
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(positions),
      gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(positionLocation);

    gl.vertexAttribPointer(
      positionLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    // alpha
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(alphas),
      gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(alphaLocation);

    gl.vertexAttribPointer(
      alphaLocation,
      1,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    gl.drawArrays(gl.POINTS, 0, alphas.length);

    requestAnimationFrame(render);
  }

  render();
}