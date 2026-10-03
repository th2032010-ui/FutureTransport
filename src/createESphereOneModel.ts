import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * E-Sphere One — Autonomous Streamliner Mobility Concept
 *
 * Technical Specifications (Refined to match original concept poster & executive streamliners):
 *  1. Aspect Ratio Shift: Length increased by 20% (4.10m -> 4.92m, Z = -2.46m to +2.46m).
 *  2. Height Profile: Height reduced by 10% (1.68m -> 1.512m apex, beltline at 0.74m).
 *     Resulting Length-to-Height ratio: 4.92 / 1.512 = 3.25 (sleek streamliner, zero toy/egg proportions).
 *  3. Wheel Sizing: Wheel diameter reduced by 15% (R = 0.404m, Diameter 0.808m, axle Y = 0.404m).
 *     Snug concept arch clearance with flush aerodynamic disc faces. Wheelbase = 2.93m (Z = +/-1.465m).
 *  4. Single Seamless Panoramic Glass Canopy: Continuous teardrop crystal glass canopy from front cowl to rear deck.
 *     Ultra-high transmission (0.985), near-zero roughness (0.002) for clear view of luxury interior.
 *  5. Bodywork: Ceramic Pearl White paint (#F8FAFD) with high-gloss liquid clearcoat and pearl sheen shimmer.
 *  6. Royal Blue Accents Only: Pure Royal Blue (#2563EB) accents on aero trims, rims, badges, and interior seat piping.
 *  7. Continuous Cyan LED Strips: Neon Cyan (#00E5FF) uninterrupted LED light ribbons along waistlines,
 *     continuous lower rocker sills (matching poster), 4 curved wheel arch runners, front horizon ribbon, and rear trailing blade.
 *  8. Luxury Autonomous Interior: 2 rotating executive captain seats with Royal Blue piping, central crystal
 *     workspace desk, 3D holographic wireframe telemetry globe, panoramic OLED HUD, NO steering wheel.
 */

export interface ESphereOneOptions {
  scale?: number;
  shadows?: boolean;
}

// ---------------------------------------------------------------------------
// Automotive Palette (Pearl Metallic Silver Body, Dark Titanium Gray Wheels, Neon Cyan LED)
// ---------------------------------------------------------------------------
const PEARL_SILVER    = 0xd2d9e1; // Radiant Pearl Metallic Silver (#D2D9E1) - luminous, high-purity metallic base
const DARK_TITANIUM   = 0x242f3d; // Dark Titanium Gray (#242F3D) - high-tech brushed aerospace alloy
const CYAN_LED        = 0x00e5ff; // Continuous Neon Cyan (#00E5FF) LED light strips
const CYAN_CORE       = 0xbdf7ff; // Super-bright luminous core emitter highlight (#BDF7FF)
const CYAN_SUBTLE     = 0x00d0ff; // Secondary ambient fiber-optic glow
const OBSIDIAN_TRIM   = 0x07090e; // Deep obsidian piano black aero composite
const GLASS_TINT      = 0xfcfdff; // Ultra-clear optical crystal physical glass (#FCFDFF)
const LEATHER_WHITE   = 0xf8fafc; // Warm porcelain white semi-aniline nappa leather (#F8FAFC)
const LEATHER_ROYAL   = 0x1d4ed8; // Accent seam piping (royal blue #1D4ED8)
const SATIN_ALUM      = 0xe2e8f0; // Anodized aerospace satin aluminum
const TIRE_RUBBER     = 0x121419; // Performance matte tire rubber
const SENSOR_OPTIC    = 0x040810; // Deep optical LiDAR sapphire glass
const HOLO_CYAN       = 0x00e5ff; // Hologram display emission (#00E5FF)

// ---------------------------------------------------------------------------
// Procedural Canvas Textures (Branding, Futuristic Hologram OLED, Tire Tread)
// ---------------------------------------------------------------------------
function newCanvas(w: number, h = w): { cv: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  return { cv, ctx: cv.getContext('2d')! };
}

function makeSideBrandingTexture(): THREE.CanvasTexture {
  const W = 1024;
  const H = 256;
  const { cv, ctx } = newCanvas(W, H);
  ctx.clearRect(0, 0, W, H);

  // Minimalist Insignia (Dark Titanium #2C3E50 + Neon Cyan #00E5FF)
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(80, 128, 44, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(80, 128, 36, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(0, 229, 255, 0.40)';
  ctx.beginPath();
  ctx.ellipse(80, 128, 44, 14, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  // Typography - High-contrast crisp lettering on Metallic Silver Gray body
  ctx.font = '700 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#1E293B';
  ctx.textBaseline = 'middle';
  ctx.fillText('E - S P H E R E   O N E', 160, 115);

  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#00E5FF';
  ctx.fillText('AUTONOMOUS CONCEPT  //  LEVEL 5', 162, 165);

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeHologramHudTexture(): THREE.CanvasTexture {
  const W = 1024;
  const H = 384;
  const { cv, ctx } = newCanvas(W, H);
  ctx.clearRect(0, 0, W, H);

  // Hologram grid with dual-tone glow
  ctx.strokeStyle = 'rgba(37, 99, 235, 0.20)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Speedometer with Royal Blue & Cyan arc
  ctx.strokeStyle = '#2563EB';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(200, 190, 95, Math.PI * 0.8, Math.PI * 2.2);
  ctx.stroke();

  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(200, 190, 85, Math.PI * 0.8, Math.PI * 1.9);
  ctx.stroke();

  ctx.font = '700 80px -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('120', 200, 195);

  ctx.font = '600 20px -apple-system, sans-serif';
  ctx.fillStyle = '#00E5FF';
  ctx.fillText('KM/H  •  CRUISE AI', 200, 245);

  // Center: 3D Autonomous Navigation Tunnel in Cyan & Royal Blue
  ctx.strokeStyle = '#2563EB';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(420, 310);
  ctx.lineTo(512, 130);
  ctx.lineTo(604, 310);
  ctx.stroke();

  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(450, 310);
  ctx.lineTo(512, 160);
  ctx.lineTo(574, 310);
  ctx.closePath();
  ctx.fill();

  ctx.font = '600 24px -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('FULL AUTONOMOUS ACTIVE', 512, 85);

  ctx.font = '18px -apple-system, sans-serif';
  ctx.fillStyle = '#00E5FF';
  ctx.fillText('LIDAR 360° MAPPING  •  ALL CLEAR', 512, 115);

  // Right HUD
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 32px -apple-system, sans-serif';
  ctx.fillText('EXECUTIVE LOUNGE', 720, 140);

  ctx.font = '20px -apple-system, sans-serif';
  ctx.fillStyle = '#2563EB';
  ctx.fillText('WORKSPACE MODE ACTIVE', 720, 175);

  ctx.font = '18px -apple-system, sans-serif';
  ctx.fillStyle = '#00E5FF';
  ctx.fillText('DEST: SKY TOWER AEROPORT', 720, 205);

  ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
  ctx.fillRect(720, 235, 240, 12);
  ctx.fillStyle = '#00E5FF';
  ctx.fillRect(720, 235, 210, 12);

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeAeroTreadTexture(): THREE.CanvasTexture {
  const W = 256;
  const H = 64;
  const { cv, ctx } = newCanvas(W, H);
  ctx.fillStyle = '#14161b';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#262932';
  for (let i = 0; i < 16; i++) {
    const x = (i / 16) * W;
    ctx.fillRect(x + 2, 4, 7, 26);
    ctx.fillRect(x + 6, 34, 7, 26);
  }
  ctx.fillStyle = '#0d0f12';
  ctx.fillRect(0, 30, W, 4);

  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(16, 1);
  return tex;
}

function makeSoftCyanUnderglowTexture(): THREE.CanvasTexture {
  const W = 512;
  const H = 512;
  const { cv, ctx } = newCanvas(W, H);
  ctx.clearRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;
  const rx = W * 0.44;
  const ry = H * 0.46;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
  grad.addColorStop(0.00, 'rgba(0, 229, 255, 0.95)');
  grad.addColorStop(0.25, 'rgba(0, 215, 255, 0.70)');
  grad.addColorStop(0.55, 'rgba(37, 99, 235, 0.35)');
  grad.addColorStop(0.80, 'rgba(29, 78, 216, 0.12)');
  grad.addColorStop(1.00, 'rgba(15, 23, 42, 0.00)');

  ctx.save();
  ctx.scale(1.0, ry / rx);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy * (rx / ry), rx, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makePerforatedLeatherBumpTexture(): THREE.CanvasTexture {
  const W = 256;
  const H = 256;
  const { cv, ctx } = newCanvas(W, H);
  ctx.fillStyle = '#808080'; // Neutral 50% bump height
  ctx.fillRect(0, 0, W, H);

  // Micro-leather organic grain noise for authentic natural tactile depth
  for (let i = 0; i < 2200; i++) {
    const gx = Math.random() * W;
    const gy = Math.random() * H;
    const gr = Math.random() * 1.6 + 0.4;
    ctx.fillStyle = Math.random() > 0.5 ? '#8a8a8a' : '#757575';
    ctx.beginPath();
    ctx.arc(gx, gy, gr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Micro-perforated climate dot matrix for luxury nappa leather
  ctx.fillStyle = '#3a3a3a';
  for (let y = 4; y < H; y += 8) {
    const xOffset = ((y / 8) % 2 === 0) ? 0 : 4;
    for (let x = 4; x < W; x += 8) {
      ctx.beginPath();
      ctx.arc(x + xOffset, y, 1.25, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function makeWirelessChargingTexture(): THREE.CanvasTexture {
  const W = 512;
  const H = 256;
  const { cv, ctx } = newCanvas(W, H);
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(0, 0, W, H);

  // Dual Inductive Charging bays (Left & Right)
  const centers = [140, 372];
  for (const cx of centers) {
    // Outer subtle cyan boundary
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.40)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(cx - 95, 24, 190, 185, 14);
    ctx.stroke();

    // Concentric induction rings
    ctx.strokeStyle = '#00E5FF';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, 116, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, 116, 35, 0, Math.PI * 2);
    ctx.stroke();

    // Center Lightning Bolt / Power Symbol
    ctx.fillStyle = '#00E5FF';
    ctx.beginPath();
    ctx.moveTo(cx + 3, 92);
    ctx.lineTo(cx - 9, 116);
    ctx.lineTo(cx + 1, 116);
    ctx.lineTo(cx - 4, 140);
    ctx.lineTo(cx + 10, 110);
    ctx.lineTo(cx, 110);
    ctx.closePath();
    ctx.fill();

    // Corner alignment guides
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    const pad = 12;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(cx - 78, 42 + pad);
    ctx.lineTo(cx - 78, 42);
    ctx.lineTo(cx - 78 + pad, 42);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(cx + 78 - pad, 42);
    ctx.lineTo(cx + 78, 42);
    ctx.lineTo(cx + 78, 42 + pad);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(cx - 78, 190 - pad);
    ctx.lineTo(cx - 78, 190);
    ctx.lineTo(cx - 78 + pad, 190);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(cx + 78 - pad, 190);
    ctx.lineTo(cx + 78, 190);
    ctx.lineTo(cx + 78, 190 - pad);
    ctx.stroke();
  }

  // Label
  ctx.font = '600 15px -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.textAlign = 'center';
  ctx.fillText('FAST WIRELESS INDUCTION  •  50W QI 2.0 DUAL DOCK', W / 2, 236);

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeFloatingWorkspaceWidgetTexture(): THREE.CanvasTexture {
  const W = 512;
  const H = 256;
  const { cv, ctx } = newCanvas(W, H);
  ctx.clearRect(0, 0, W, H);

  // Hologram Glass Background with thin neon cyan border
  ctx.fillStyle = 'rgba(7, 15, 30, 0.45)';
  ctx.beginPath();
  ctx.roundRect(10, 10, W - 20, H - 20, 20);
  ctx.fill();

  ctx.strokeStyle = 'rgba(0, 229, 255, 0.70)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Top header: AI Assistant Status & Time
  ctx.font = '700 22px -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('E-SPHERE AI ASSISTANT', 32, 46);

  ctx.font = '600 16px -apple-system, sans-serif';
  ctx.fillStyle = '#00E5FF';
  ctx.textAlign = 'right';
  ctx.fillText('VOICE RECOGNITION ACTIVE', W - 32, 46);

  // Audio wave visualizer bars
  ctx.textAlign = 'left';
  const barHeights = [18, 32, 48, 64, 85, 96, 74, 52, 68, 82, 44, 26, 38, 55, 70, 40, 22];
  for (let i = 0; i < barHeights.length; i++) {
    const x = 32 + i * 26;
    const h = barHeights[i] * 0.7;
    const y = 135 - h / 2;
    ctx.fillStyle = i % 2 === 0 ? '#00E5FF' : '#2563EB';
    ctx.beginPath();
    ctx.roundRect(x, y, 16, h, 6);
    ctx.fill();
  }

  // Bottom info cards: Destination & Climate
  ctx.font = '600 18px -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('DEST: SKY TOWER AEROPORT  •  ETA 14 MIN', 32, 195);

  ctx.font = '500 15px -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('CABIN CLIMATE: 21.5°C  •  SMART AIR PURIFIER ACTIVE', 32, 225);

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------------------------------------------------------------------------
// 0. Longitudinal Canopy Centerline Apex Profile Calculator
// Ensures the glass canopy, interior spine, starlight matrix, and sensor plinth
// share a single continuous mathematical curvature with zero gaps or steps.
// ---------------------------------------------------------------------------
function getCanopyCenterApex(z: number): number {
  const zFront = 1.10;
  const zRear  = -1.10;
  const u = (zFront - z) / (zFront - zRear);
  const clampedU = Math.max(0, Math.min(1, u));
  const sinU = Math.sin(clampedU * Math.PI);
  const profile = Math.pow(sinU, 0.68);
  const yCowlFront = 0.81;
  const yDeckRear  = 0.81;
  const yRoofApex  = 1.512;
  const yBase = yCowlFront + (yDeckRear - yCowlFront) * clampedU;
  return yBase + (yRoofApex - yBase) * profile;
}

// ---------------------------------------------------------------------------
// 1. Procedural Panoramic Glass Canopy (Seamless Fully-Closed Aerodynamic Teardrop)
// Slopes down smoothly forward to meet front cowl at Z = +1.10m (y = 0.81m)
// and rearward to meet rear fastback deck at Z = -1.10m (y = 0.81m)
// ---------------------------------------------------------------------------
function createSmoothCapsuleCanopy(lengthSegs = 64, radialSegs = 44): THREE.BufferGeometry {
  const verts: number[] = [];
  const uvs: number[] = [];
  const idxs: number[] = [];

  const zFront = 1.10;   // Seamlessly interfaces with front cowl
  const zRear  = -1.10;  // Seamlessly interfaces with rear deck
  const yBelt  = 0.74;   // Beltline base height

  for (let i = 0; i <= lengthSegs; i++) {
    const u = i / lengthSegs; // 0 = front (windshield base), 1 = rear (fastback base)
    const z = zFront + (zRear - zFront) * u;

    // Streamliner width profile:
    const sinU = Math.sin(u * Math.PI);
    const halfWidth = 0.920 + 0.035 * Math.pow(sinU, 0.6);

    // Height of the centerline canopy apex at this Z station
    const yApex = getCanopyCenterApex(z);

    // Beltline height at this Z station
    const yBeltAtZ = yBelt + 0.005 * sinU;

    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;

      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidth;
      // Elliptic arch from beltline up to yApex:
      const y = yBeltAtZ + (yApex - yBeltAtZ) * Math.pow(sinP, 0.92);

      verts.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < lengthSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * (radialSegs + 1) + j;
      const b = (i + 1) * (radialSegs + 1) + j;
      const c = (i + 1) * (radialSegs + 1) + (j + 1);
      const d = i * (radialSegs + 1) + (j + 1);

      idxs.push(a, b, d);
      idxs.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(idxs);
  geom.computeVertexNormals();
  return geom;
}

// ---------------------------------------------------------------------------
// 1b. Procedural Front Aerodynamic Transition Fairing (Cowl & Windshield Base Blend)
// Seamlessly merges front hood (Z = 1.021m) into the windshield base (Z = 1.10m)
// Completely seals all gaps between front body and glass cabin with zero visible holes
// ---------------------------------------------------------------------------
function createFrontTransitionPanel(lengthSegs = 20, radialSegs = 40): THREE.BufferGeometry {
  const verts: number[] = [];
  const uvs: number[] = [];
  const idxs: number[] = [];

  const zStart = 0.98; // Inside cabin forward bulkhead
  const zEnd   = 1.16; // Overlapping front hood
  const yBelt  = 0.74;
  const halfWidthBase = 0.955;

  for (let i = 0; i <= lengthSegs; i++) {
    const t = i / lengthSegs; // 0 at cabin side, 1 at hood side
    const z = zStart + (zEnd - zStart) * t;

    const halfWidth = halfWidthBase;
    const yCowlTop = 0.810 + 0.015 * t;
    const yEdge = yBelt;

    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;

      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidth;
      const y = yEdge + (yCowlTop - yEdge) * Math.pow(sinP, 0.88);

      verts.push(x, y, z);
      uvs.push(t, v);
    }
  }

  for (let i = 0; i < lengthSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * (radialSegs + 1) + j;
      const b = (i + 1) * (radialSegs + 1) + j;
      const c = (i + 1) * (radialSegs + 1) + (j + 1);
      const d = i * (radialSegs + 1) + (j + 1);

      idxs.push(a, b, d);
      idxs.push(b, c, d);
    }
  }

  // Transverse acoustic firewall / cabin closure bulkhead at zStart (z = 0.98)
  const wallStartIdx = verts.length / 3;
  const wallYSegs = 8;
  for (let iy = 0; iy <= wallYSegs; iy++) {
    const ty = iy / wallYSegs;

    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidthBase;
      const yTopLocal = yBelt + (0.810 - yBelt) * Math.pow(sinP, 0.88);
      const y = 0.34 + (yTopLocal - 0.34) * ty;

      verts.push(x, y, zStart);
      uvs.push(v, ty);
    }
  }

  for (let iy = 0; iy < wallYSegs; iy++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = wallStartIdx + iy * (radialSegs + 1) + j;
      const b = wallStartIdx + (iy + 1) * (radialSegs + 1) + j;
      const c = wallStartIdx + (iy + 1) * (radialSegs + 1) + (j + 1);
      const d = wallStartIdx + iy * (radialSegs + 1) + (j + 1);

      idxs.push(a, b, d);
      idxs.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(idxs);
  geom.computeVertexNormals();
  return geom;
}

// ---------------------------------------------------------------------------
// 1c. Procedural Rear Aerodynamic Transition Fairing (Fastback Deck & Rear Glass Base Blend)
// Seamlessly merges rear deck (Z = -1.021m) into the rear glass base (Z = -1.10m)
// Completely seals all gaps between rear body and glass cabin with zero visible holes
// ---------------------------------------------------------------------------
function createRearTransitionPanel(lengthSegs = 20, radialSegs = 40): THREE.BufferGeometry {
  const verts: number[] = [];
  const uvs: number[] = [];
  const idxs: number[] = [];

  const zStart = -0.98; // Inside cabin rear bulkhead
  const zEnd   = -1.16; // Overlapping rear deck
  const yBelt  = 0.74;
  const halfWidthBase = 0.955;

  for (let i = 0; i <= lengthSegs; i++) {
    const t = i / lengthSegs;
    const z = zStart + (zEnd - zStart) * t;

    const halfWidth = halfWidthBase;
    const yDeckTop = 0.810 + 0.015 * t;
    const yEdge = yBelt;

    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;

      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidth;
      const y = yEdge + (yDeckTop - yEdge) * Math.pow(sinP, 0.88);

      verts.push(x, y, z);
      uvs.push(t, v);
    }
  }

  for (let i = 0; i < lengthSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * (radialSegs + 1) + j;
      const b = (i + 1) * (radialSegs + 1) + j;
      const c = (i + 1) * (radialSegs + 1) + (j + 1);
      const d = i * (radialSegs + 1) + (j + 1);

      idxs.push(a, d, b);
      idxs.push(b, d, c);
    }
  }

  // Transverse acoustic bulkhead / rear luggage closure bulkhead at zStart (z = -0.98)
  const wallStartIdx = verts.length / 3;
  const wallYSegs = 8;
  for (let iy = 0; iy <= wallYSegs; iy++) {
    const ty = iy / wallYSegs;

    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidthBase;
      const yTopLocal = yBelt + (0.810 - yBelt) * Math.pow(sinP, 0.88);
      const y = 0.34 + (yTopLocal - 0.34) * ty;

      verts.push(x, y, zStart);
      uvs.push(v, ty);
    }
  }

  for (let iy = 0; iy < wallYSegs; iy++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = wallStartIdx + iy * (radialSegs + 1) + j;
      const b = wallStartIdx + (iy + 1) * (radialSegs + 1) + j;
      const c = wallStartIdx + (iy + 1) * (radialSegs + 1) + (j + 1);
      const d = wallStartIdx + iy * (radialSegs + 1) + (j + 1);

      idxs.push(a, b, d);
      idxs.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(idxs);
  geom.computeVertexNormals();
  return geom;
}

// ---------------------------------------------------------------------------
// 2. Procedural Cabin Lower Monocoque Hull (Doors & Rockers: Z = -1.021m to +1.021m)
// ---------------------------------------------------------------------------
function createSmoothCabinLowerHull(lengthSegs = 48, radialSegs = 36): THREE.BufferGeometry {
  const verts: number[] = [];
  const uvs: number[] = [];
  const idxs: number[] = [];

  const zFront = 1.021; // Exactly meets front wheel arch start
  const zRear  = -1.021; // Exactly meets rear wheel arch start
  const yBelt  = 0.74;
  const yFloor = 0.34;
  const halfWidth = 0.955;

  for (let i = 0; i <= lengthSegs; i++) {
    const u = i / lengthSegs;
    const z = zFront + (zRear - zFront) * u;

    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;

      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidth;
      const y = yFloor + (yBelt - yFloor) * (1.0 - sinP);

      verts.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < lengthSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * (radialSegs + 1) + j;
      const b = (i + 1) * (radialSegs + 1) + j;
      const c = (i + 1) * (radialSegs + 1) + (j + 1);
      const d = i * (radialSegs + 1) + (j + 1);

      idxs.push(a, b, d);
      idxs.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(idxs);
  geom.computeVertexNormals();
  return geom;
}

// ---------------------------------------------------------------------------
// 3. Procedural Front Streamliner Body (Nose & Fenders: Z = 1.021m to 2.46m, 15% Rounded Nose)
// ---------------------------------------------------------------------------
function createRoundedFrontCapsuleBody(lengthSegs = 56, radialSegs = 40): THREE.BufferGeometry {
  const verts: number[] = [];
  const uvs: number[] = [];
  const idxs: number[] = [];

  const zBase = 1.021; // Seamless interface with cabin hull at arch boundary
  const zArchEnd = 1.909; // Arch front boundary (1.465 + 0.444)
  const zApex = 2.460; // Total vehicle length 4.92m
  const zWheel = 1.465; // Wheelbase 2.93m
  const yAxle = 0.404; // Axle height
  const rArch = 0.444; // Arch clearance
  const halfWidthBase = 0.955;

  const archSegs = Math.floor(lengthSegs * 0.50);
  const noseSegs = lengthSegs - archSegs;

  // 1. Upper shell: from zBase (1.021) to zApex (2.460) with 15% round nose & zero sharp tapering
  for (let i = 0; i <= lengthSegs; i++) {
    let z: number;
    let halfWidth: number;
    let yEdge: number;
    let yTop: number;

    if (i <= archSegs) {
      const tArch = i / archSegs;
      z = zBase + (zArchEnd - zBase) * tArch;
      halfWidth = halfWidthBase;
      const d = z - zWheel;
      const hArch = Math.sqrt(Math.max(0, rArch * rArch - d * d));
      const edgeBlend = Math.min(1.0, Math.max(0, (rArch - Math.abs(d)) * 6.0));
      yEdge = 0.34 + (yAxle + hArch - 0.34) * edgeBlend;
      yTop = 0.825 - (0.825 - 0.78) * tArch + 0.02 * Math.sin(tArch * Math.PI);
    } else {
      // 15% Rounded front nose: dz/dX = 0 at apex, zero sharp tapering
      const s = (i - archSegs) / noseSegs;
      const theta = s * (Math.PI / 2);
      const sinT = Math.sin(theta);
      z = zArchEnd + (zApex - zArchEnd) * sinT;
      halfWidth = halfWidthBase * Math.sqrt(Math.max(0, 1.0 - Math.pow(sinT, 2.2)));
      yEdge = 0.34 + (0.52 - 0.34) * Math.pow(sinT, 1.2);
      yTop = 0.78 - (0.78 - 0.54) * Math.pow(sinT, 1.6);
    }

    const tNorm = i / lengthSegs;
    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidth;
      const y = yEdge + (yTop - yEdge) * sinP;

      verts.push(x, y, z);
      uvs.push(tNorm, v);
    }
  }

  for (let i = 0; i < lengthSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * (radialSegs + 1) + j;
      const b = (i + 1) * (radialSegs + 1) + j;
      const c = (i + 1) * (radialSegs + 1) + (j + 1);
      const d = i * (radialSegs + 1) + (j + 1);

      idxs.push(a, b, d);
      idxs.push(b, c, d);
    }
  }

  // 2. Lower chin: from zArchEnd (1.909) to zApex (2.460) with matching 15% rounding
  const chinSegs = 28;
  const chinStartIdx = verts.length / 3;

  for (let i = 0; i <= chinSegs; i++) {
    const s = i / chinSegs;
    const theta = s * (Math.PI / 2);
    const sinT = Math.sin(theta);
    const z = zArchEnd + (zApex - zArchEnd) * sinT;
    const halfWidth = halfWidthBase * Math.sqrt(Math.max(0, 1.0 - Math.pow(sinT, 2.2)));
    const yEdge = 0.34 + (0.52 - 0.34) * Math.pow(sinT, 1.2);
    const yBot = 0.34 + (0.50 - 0.34) * Math.pow(sinT, 1.6);

    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidth;
      const y = yEdge - (yEdge - yBot) * sinP;

      verts.push(x, y, z);
      uvs.push(s, v);
    }
  }

  for (let i = 0; i < chinSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = chinStartIdx + i * (radialSegs + 1) + j;
      const b = chinStartIdx + (i + 1) * (radialSegs + 1) + j;
      const c = chinStartIdx + (i + 1) * (radialSegs + 1) + (j + 1);
      const d = chinStartIdx + i * (radialSegs + 1) + (j + 1);

      idxs.push(a, d, b);
      idxs.push(b, d, c);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(idxs);
  geom.computeVertexNormals();
  return geom;
}

// ---------------------------------------------------------------------------
// 4. Procedural Rear Streamliner Body (Deck & Tail: Z = -1.021m to -2.46m, 15% Rounded Rear)
// ---------------------------------------------------------------------------
function createRoundedRearCapsuleBody(lengthSegs = 56, radialSegs = 40): THREE.BufferGeometry {
  const verts: number[] = [];
  const uvs: number[] = [];
  const idxs: number[] = [];

  const zBase = -1.021; // Seamless interface with cabin hull at arch boundary
  const zArchEnd = -1.909; // Arch rear boundary (-1.465 - 0.444)
  const zApex = -2.460; // Total vehicle length 4.92m
  const zWheel = -1.465; // Wheelbase 2.93m
  const yAxle = 0.404;
  const rArch = 0.444;
  const halfWidthBase = 0.955;

  const archSegs = Math.floor(lengthSegs * 0.50);
  const tailSegs = lengthSegs - archSegs;

  // 1. Upper shell: from zBase (-1.021) to zApex (-2.460) with 15% round rear & zero sharp tapering
  for (let i = 0; i <= lengthSegs; i++) {
    let z: number;
    let halfWidth: number;
    let yEdge: number;
    let yTop: number;

    if (i <= archSegs) {
      const tArch = i / archSegs;
      z = zBase + (zArchEnd - zBase) * tArch;
      halfWidth = halfWidthBase;
      const d = z - zWheel;
      const hArch = Math.sqrt(Math.max(0, rArch * rArch - d * d));
      const edgeBlend = Math.min(1.0, Math.max(0, (rArch - Math.abs(d)) * 6.0));
      yEdge = 0.34 + (yAxle + hArch - 0.34) * edgeBlend;
      yTop = 0.825 - (0.825 - 0.78) * tArch + 0.02 * Math.sin(tArch * Math.PI);
    } else {
      // 15% Rounded rear tail: dz/dX = 0 at rear apex, zero sharp tapering
      const s = (i - archSegs) / tailSegs;
      const theta = s * (Math.PI / 2);
      const sinT = Math.sin(theta);
      z = zArchEnd - (Math.abs(zApex) - Math.abs(zArchEnd)) * sinT;
      halfWidth = halfWidthBase * Math.sqrt(Math.max(0, 1.0 - Math.pow(sinT, 2.2)));
      yEdge = 0.34 + (0.52 - 0.34) * Math.pow(sinT, 1.2);
      yTop = 0.78 - (0.78 - 0.54) * Math.pow(sinT, 1.6);
    }

    const tNorm = i / lengthSegs;
    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidth;
      const y = yEdge + (yTop - yEdge) * sinP;

      verts.push(x, y, z);
      uvs.push(tNorm, v);
    }
  }

  for (let i = 0; i < lengthSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * (radialSegs + 1) + j;
      const b = (i + 1) * (radialSegs + 1) + j;
      const c = (i + 1) * (radialSegs + 1) + (j + 1);
      const d = i * (radialSegs + 1) + (j + 1);

      idxs.push(a, d, b);
      idxs.push(b, d, c);
    }
  }

  // 2. Lower rear aerodynamic diffuser: from zArchEnd (-1.909) to zApex (-2.460) with matching 15% rounding
  const diffSegs = 28;
  const diffStartIdx = verts.length / 3;

  for (let i = 0; i <= diffSegs; i++) {
    const s = i / diffSegs;
    const theta = s * (Math.PI / 2);
    const sinT = Math.sin(theta);
    const z = zArchEnd - (Math.abs(zApex) - Math.abs(zArchEnd)) * sinT;
    const halfWidth = halfWidthBase * Math.sqrt(Math.max(0, 1.0 - Math.pow(sinT, 2.2)));
    const yEdge = 0.34 + (0.52 - 0.34) * Math.pow(sinT, 1.2);
    const yBot = 0.34 + (0.50 - 0.34) * Math.pow(sinT, 1.6);

    for (let j = 0; j <= radialSegs; j++) {
      const v = j / radialSegs;
      const phi = v * Math.PI;
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const x = -cosP * halfWidth;
      const y = yEdge - (yEdge - yBot) * sinP;

      verts.push(x, y, z);
      uvs.push(s, v);
    }
  }

  for (let i = 0; i < diffSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = diffStartIdx + i * (radialSegs + 1) + j;
      const b = diffStartIdx + (i + 1) * (radialSegs + 1) + j;
      const c = diffStartIdx + (i + 1) * (radialSegs + 1) + (j + 1);
      const d = diffStartIdx + i * (radialSegs + 1) + (j + 1);

      idxs.push(a, b, d);
      idxs.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(idxs);
  geom.computeVertexNormals();
  return geom;
}

// ---------------------------------------------------------------------------
// 5. Procedural Protective Inner Wheel Well Tub (Seals Arch to Chassis)
// ---------------------------------------------------------------------------
function createWheelTubGeometry(isRight: boolean, segs = 28): THREE.BufferGeometry {
  const r = 0.444; // Sized precisely to R = 0.444m arch
  const sideSign = isRight ? 1 : -1;
  const xInner = sideSign * 0.70;
  const xOuter = sideSign * 0.955;
  const verts: number[] = [];
  const idxs: number[] = [];

  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI;
    const y = r * Math.sin(a);
    const z = -r * Math.cos(a);
    verts.push(xInner, y, z);
    verts.push(xOuter, y, z);
  }

  for (let i = 0; i < segs; i++) {
    const a = i * 2, b = a + 1, c = a + 3, d = a + 2;
    if (isRight) {
      idxs.push(a, b, d);
      idxs.push(b, c, d);
    } else {
      idxs.push(a, d, b);
      idxs.push(b, c, d);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  g.setIndex(idxs);
  g.computeVertexNormals();
  return g;
}

// ---------------------------------------------------------------------------
// Main Factory Function
// ---------------------------------------------------------------------------
export function createESphereOneModel(options: ESphereOneOptions = {}): THREE.Group {
  const root = new THREE.Group();
  root.name = 'e-sphere-one';

  const scale = options.scale ?? 1.0;
  root.scale.setScalar(scale);

  // -------------------------------------------------------------------------
  // Automotive PBR Materials (MeshPhysicalMaterial with Pearl Flake & Clearcoat)
  // -------------------------------------------------------------------------
  // 1. Pearl Metallic Silver Paint (#D2D9E1) - High-gloss automotive finish with pearl iridescence reflections
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(PEARL_SILVER),     // Radiant Pearl Metallic Silver (#D2D9E1)
    roughness: 0.08,                          // Mirror-smooth automotive basecoat
    metalness: 0.80,                          // Crisp, deep metallic luster
    clearcoat: 1.0,                           // Thick liquid polyurethane clearcoat lacquer
    clearcoatRoughness: 0.015,                // Ultra-crisp specular highlights
    reflectivity: 1.0,                        // Full automotive specular reflectivity
    ior: 1.62,                                // Automotive lacquer refractive index
    sheen: 1.0,                               // Pearl metallic luster shimmer
    sheenColor: new THREE.Color(0xe2f0ff),    // Pearl crystalline shimmer reflection
    sheenRoughness: 0.18,
    iridescence: 0.28,                        // Thin-film optical pearl iridescence interference
    iridescenceIOR: 1.38,
    iridescenceThicknessRange: [120, 320],
    specularIntensity: 1.0,                   // Brilliant specular highlights
    specularColor: new THREE.Color(0xffffff), // Crisp white edge highlights
    side: THREE.DoubleSide,
  });

  // 2. Dark Titanium Gray (#242F3D) - Wheels and precision aerodynamic accents
  const darkTitaniumMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(DARK_TITANIUM),    // Dark Titanium Gray (#242F3D)
    roughness: 0.10,                          // Satin-metallic brushed titanium finish
    metalness: 0.92,                          // Deep metallic alloy
    clearcoat: 0.90,                          // High-gloss wheel clearcoat
    clearcoatRoughness: 0.02,
    reflectivity: 1.0,
    sheen: 0.40,
    sheenColor: new THREE.Color(0x64748b),
    specularIntensity: 1.0,
    specularColor: new THREE.Color(0xffffff),
    side: THREE.DoubleSide,
  });

  // 3. Deep Obsidian Piano Black Aero Trim (Underbody tray & chassis accents)
  const aeroTrimMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(OBSIDIAN_TRIM),
    roughness: 0.05,
    metalness: 0.90,
    clearcoat: 1.0,
    clearcoatRoughness: 0.015,
    reflectivity: 1.0,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
  });

  // 4. Ultra-Clear Panoramic Glass Canopy
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(GLASS_TINT),         // Optically pure crystal glass (#FCFDFF)
    transmission: 0.998,                      // 99.8% optical transmission (interior 100% visible)
    opacity: 1.0,
    transparent: true,
    roughness: 0.0005,                        // Flawlessly polished optical crystal
    ior: 1.52,                                // Laminated automotive safety glass
    thickness: 0.035,                         // Ultrathin glass shell, zero ray distortion
    attenuationColor: new THREE.Color(0xf0f7ff), // Ultra-light crystal air dispersion
    attenuationDistance: 50.0,                // Crystal clear through entire cabin
    specularIntensity: 1.0,                   // Strong realistic Fresnel reflections
    specularColor: new THREE.Color(0xffffff), // Crisp white reflections
    clearcoat: 1.0,                           // Exterior protective clearcoat
    clearcoatRoughness: 0.001,                // Mirror-smooth reflections
    reflectivity: 0.98,
    depthWrite: false,
    side: THREE.FrontSide,
  });

  // 5. Continuous Neon Cyan (#00E5FF) LED Light Strip Materials
  const cyanLedMaterial = new THREE.MeshBasicMaterial({
    color: CYAN_LED,
    toneMapped: false,
  });

  const cyanCoreMaterial = new THREE.MeshBasicMaterial({
    color: CYAN_CORE,
    toneMapped: false,
  });

  const cyanSubtleMaterial = new THREE.MeshBasicMaterial({
    color: CYAN_SUBTLE,
    toneMapped: false,
  });

  // Dedicated Full-Width Front LED Light Bar Dynamic Materials (Subtle Animated Glow)
  const frontLightbarCyanMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_LED),
    toneMapped: false,
  });

  const frontLightbarCoreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_CORE),
    toneMapped: false,
  });

  // High-clarity aerodynamic polycarbonate diffuser lens blade
  const lightbarLensMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xdbeafe),
    transmission: 0.88,
    opacity: 0.82,
    transparent: true,
    roughness: 0.05,
    ior: 1.52,
    thickness: 0.025,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    reflectivity: 0.95,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  // 6. Performance Rubber Tire (Subtle clearcoat on sidewalls)
  const tireMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(TIRE_RUBBER),
    roughness: 0.80,
    metalness: 0.08,
    clearcoat: 0.15,
    clearcoatRoughness: 0.35,
    bumpMap: makeAeroTreadTexture(),
    bumpScale: 0.035,
  });

  // 7. Optical Sensor Glass
  const sensorMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(SENSOR_OPTIC),
    roughness: 0.02,
    metalness: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    reflectivity: 1.0,
  });

  // 8. Aerospace Anodized Satin Aluminum
  const satinAlumMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(SATIN_ALUM),
    roughness: 0.14,
    metalness: 0.94,
    clearcoat: 0.7,
    clearcoatRoughness: 0.06,
    reflectivity: 0.96,
  });

  const animatedWheels: THREE.Group[] = [];
  let frontLightbarCenterGlow: THREE.PointLight;
  let frontLightbarLeftGlow: THREE.PointLight;
  let frontLightbarRightGlow: THREE.PointLight;
  let frontBeam: THREE.SpotLight;
  let frontLogoLight: THREE.PointLight;
  let rearLightbarCyanMat: THREE.MeshBasicMaterial;
  let rearLightbarCoreMat: THREE.MeshBasicMaterial;
  const rearBladeMaterials: THREE.MeshBasicMaterial[] = [];
  let rearLightbarCenterGlow: THREE.PointLight;
  let rearLightbarLeftGlow: THREE.PointLight;
  let rearLightbarRightGlow: THREE.PointLight;
  let rearTailLight: THREE.PointLight;
  let rearLogoHaloMat: THREE.MeshBasicMaterial;
  let rearLogoCoreMat: THREE.MeshBasicMaterial;
  let rearLogoLight: THREE.PointLight;
  let aiOrbGroup: THREE.Group;
  let aiOrbInner: THREE.Mesh;
  let aiOrbOuter: THREE.Group;
  let aiOrbLight: THREE.PointLight;
  let floatingHud: THREE.Group;
  let rotatingSeatLeft: THREE.Group;
  let rotatingSeatRight: THREE.Group;
  let roofSensorHaloLight: THREE.PointLight;
  let roofSensorRingMat: THREE.MeshBasicMaterial;
  let sideBeltlineLedMat: THREE.MeshBasicMaterial;
  let lowerSillLedMat: THREE.MeshBasicMaterial;
  let archLipLedMat: THREE.MeshBasicMaterial;
  let wheelHaloMat: THREE.MeshBasicMaterial;
  let aiOrbCoreMat: THREE.MeshBasicMaterial;
  let underglowMat: THREE.MeshBasicMaterial;
  let frontUnderLight: THREE.PointLight;
  let rearUnderLight: THREE.PointLight;

  // =========================================================================
  // 1. BODY MESH GROUP (Seamless Streamliner Monocoque // Pearl White Paint)
  // =========================================================================
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'body';

  // 1.1 Front Streamliner Body (Smooth Hood, Arches & 15% Rounded Nose: Z = 1.021m to 2.46m)
  const frontBodyGeom = createRoundedFrontCapsuleBody(56, 40);
  const frontBody = new THREE.Mesh(frontBodyGeom, bodyMaterial);
  frontBody.castShadow = true;
  frontBody.receiveShadow = true;
  bodyGroup.add(frontBody);

  // 1.2 Rear Streamliner Body (Smooth Fastback Deck & 15% Rounded Tail: Z = -1.021m to -2.46m)
  const rearBodyGeom = createRoundedRearCapsuleBody(56, 40);
  const rearBody = new THREE.Mesh(rearBodyGeom, bodyMaterial);
  rearBody.castShadow = true;
  rearBody.receiveShadow = true;
  bodyGroup.add(rearBody);

  // 1.3 Cabin Lower Monocoque Hull (Doors & Rockers: Z = -1.021m to +1.021m, 100% Seamless)
  const cabinHullGeom = createSmoothCabinLowerHull(48, 36);
  const cabinHull = new THREE.Mesh(cabinHullGeom, bodyMaterial);
  cabinHull.castShadow = true;
  cabinHull.receiveShadow = true;
  bodyGroup.add(cabinHull);

  // 1.3b Front Aerodynamic Transition Fairing (Cowl & Windshield Base Seamless Blend)
  const frontTransitionGeom = createFrontTransitionPanel(24, 44);
  const frontTransition = new THREE.Mesh(frontTransitionGeom, bodyMaterial);
  frontTransition.castShadow = true;
  frontTransition.receiveShadow = true;
  bodyGroup.add(frontTransition);

  // 1.3c Rear Aerodynamic Transition Fairing (Fastback Deck & Rear Window Seamless Blend)
  const rearTransitionGeom = createRearTransitionPanel(24, 44);
  const rearTransition = new THREE.Mesh(rearTransitionGeom, bodyMaterial);
  rearTransition.castShadow = true;
  rearTransition.receiveShadow = true;
  bodyGroup.add(rearTransition);

  // 1.3d Front Obsidian Cowl Wiper Tray & Aero Intake Groove
  const frontCowlAeroGeom = new RoundedBoxGeometry(1.44, 0.024, 0.08, 6, 0.008);
  const frontCowlAero = new THREE.Mesh(frontCowlAeroGeom, aeroTrimMaterial);
  frontCowlAero.position.set(0, 0.804, 1.115);
  bodyGroup.add(frontCowlAero);

  // 1.3e Rear Obsidian Fastback Air Extractor Tray & Aero Diffuser Lip
  const rearDeckAeroGeom = new RoundedBoxGeometry(1.44, 0.024, 0.08, 6, 0.008);
  const rearDeckAero = new THREE.Mesh(rearDeckAeroGeom, aeroTrimMaterial);
  rearDeckAero.position.set(0, 0.804, -1.115);
  bodyGroup.add(rearDeckAero);

  // 1.3f Aerodynamic Pillar Root Fairings (Seals wheel arch top corners into beltline)
  for (const side of [-1, 1]) {
    for (const isFront of [true, false]) {
      const zPos = isFront ? 1.021 : -1.021;
      const filletGeom = new RoundedBoxGeometry(0.045, 0.12, 0.09, 4, 0.015);
      const filletMesh = new THREE.Mesh(filletGeom, bodyMaterial);
      filletMesh.position.set(side * 0.950, 0.74, zPos);
      bodyGroup.add(filletMesh);
    }
  }

  // 1.4 Flush 3D Cabin Perimeter Glass Trim / Seal Ribbon in Dark Titanium Gray
  const cabinBezelCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.814, 1.10),
    new THREE.Vector3(-0.46, 0.785, 1.10),
    new THREE.Vector3(-0.925, 0.744, 1.08),
    new THREE.Vector3(-0.955, 0.742, 0.55),
    new THREE.Vector3(-0.955, 0.742, 0.00),
    new THREE.Vector3(-0.955, 0.742, -0.55),
    new THREE.Vector3(-0.925, 0.744, -1.08),
    new THREE.Vector3(-0.46, 0.785, -1.10),
    new THREE.Vector3(0, 0.814, -1.10),
    new THREE.Vector3(0.46, 0.785, -1.10),
    new THREE.Vector3(0.925, 0.744, -1.08),
    new THREE.Vector3(0.955, 0.742, -0.55),
    new THREE.Vector3(0.955, 0.742, 0.00),
    new THREE.Vector3(0.955, 0.742, 0.55),
    new THREE.Vector3(0.925, 0.744, 1.08),
    new THREE.Vector3(0.46, 0.785, 1.10),
  ], true);
  const cabinBezelGeom = new THREE.TubeGeometry(cabinBezelCurve, 80, 0.010, 8, true);
  const cabinBezel = new THREE.Mesh(cabinBezelGeom, darkTitaniumMaterial);
  bodyGroup.add(cabinBezel);

  // 1.5 Integrated Rounded Wheel Arches & Protective Inner Wheel Tubs
  const wheelBaseZ = 1.465;   // Wheelbase 2.93m (+20% length)
  const wheelCenterY = 0.404; // Axle height for R = 0.404m (-15% wheel size)
  const archRadius = 0.444;   // Snug concept arch clearance

  for (const side of [-1, 1]) {
    const isRight = side > 0;
    for (const zPos of [wheelBaseZ, -wheelBaseZ]) {
      // 1.5a Concentric Rounded Arch Opening Trim Lip in Dark Titanium Gray (#2C3E50)
      const lipGeom = new THREE.TorusGeometry(archRadius, 0.016, 16, 36, Math.PI);
      const archLip = new THREE.Mesh(lipGeom, darkTitaniumMaterial);
      archLip.position.set(side * 0.958, wheelCenterY, zPos);
      archLip.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
      archLip.castShadow = true;
      bodyGroup.add(archLip);

      // 1.5b Clean Inner Curved Wheel Well Protective Tub (Seals inner chassis)
      const tubGeom = createWheelTubGeometry(isRight, 28);
      const tubMesh = new THREE.Mesh(tubGeom, aeroTrimMaterial);
      tubMesh.position.set(0, wheelCenterY, zPos);
      bodyGroup.add(tubMesh);
    }

    // 1.6 Side Streamliner Branding Decal (Titanium & Cyan lettering on Silver Gray)
    const decalGeom = new THREE.PlaneGeometry(1.05, 0.24);
    const decalMat = new THREE.MeshBasicMaterial({
      map: makeSideBrandingTexture(),
      transparent: true,
      depthWrite: false,
    });
    const decal = new THREE.Mesh(decalGeom, decalMat);
    decal.position.set(side * 0.958, 0.48, 0);
    decal.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
    bodyGroup.add(decal);

    // 1.7 Dark Titanium Aero Rocker Strakes (Subtle aerodynamic lower blade)
    const strakeGeom = new RoundedBoxGeometry(0.015, 0.035, 1.80, 4, 0.008);
    const strake = new THREE.Mesh(strakeGeom, darkTitaniumMaterial);
    strake.position.set(side * 0.952, 0.33, 0);
    bodyGroup.add(strake);

    // 1.8 Pearl White Panoramic Roof Arch Rails (Iconic concept structural pillars matching poster)
    const archCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.935, 0.74, 1.10),
      new THREE.Vector3(side * 0.920, 1.18, 0.60),
      new THREE.Vector3(side * 0.895, 1.49, 0.00),
      new THREE.Vector3(side * 0.920, 1.18, -0.60),
      new THREE.Vector3(side * 0.935, 0.74, -1.10),
    ]);
    const archGeom = new THREE.TubeGeometry(archCurve, 36, 0.022, 12, false);
    const archMesh = new THREE.Mesh(archGeom, bodyMaterial);
    archMesh.castShadow = true;
    bodyGroup.add(archMesh);
  }

  // 1.9 Flat Aerodynamic Underbody Belly Tray (Seals undertray floor between wheel wells)
  const underbodyGeom = new THREE.PlaneGeometry(1.40, 4.20);
  const underbodyMesh = new THREE.Mesh(underbodyGeom, aeroTrimMaterial);
  underbodyMesh.rotation.x = Math.PI / 2;
  underbodyMesh.position.set(0, 0.34, 0);
  bodyGroup.add(underbodyMesh);

  root.add(bodyGroup);

  // =========================================================================
  // 2. GLASS MESH GROUP (Single Seamless Panoramic Glass Canopy)
  // =========================================================================
  const glassGroup = new THREE.Group();
  glassGroup.name = 'glass';

  // 2.1 Single Continuous Seamless Panoramic Canopy Mesh (Z = -1.15m to +1.15m)
  const teardropCanopyGeom = createSmoothCapsuleCanopy(56, 40);
  const canopyMesh = new THREE.Mesh(teardropCanopyGeom, glassMaterial);
  canopyMesh.castShadow = false;
  canopyMesh.receiveShadow = true;
  glassGroup.add(canopyMesh);

  root.add(glassGroup);

  // =========================================================================
  // 3. WHEELS MESH GROUP (-15% Reduced Wheel Size: R = 0.404m // Royal Blue & Cyan)
  // =========================================================================
  const wheelsGroup = new THREE.Group();
  wheelsGroup.name = 'wheels';

  // Dynamic Material for Pulsing Wheel LED Halos
  wheelHaloMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_LED),
    toneMapped: false,
  });

  // Wheel positions: wheelbase = 2.93m (Z = +/-1.465m), axle Y = 0.404m
  const wheelPositions: [number, number, number][] = [
    [-0.78, wheelCenterY,  wheelBaseZ], // Front Left
    [ 0.78, wheelCenterY,  wheelBaseZ], // Front Right
    [-0.78, wheelCenterY, -wheelBaseZ], // Rear Left
    [ 0.78, wheelCenterY, -wheelBaseZ], // Rear Right
  ];

  function createStreamlinerWheel(isRightSide: boolean): THREE.Group {
    const wheelAssembly = new THREE.Group();

    // Rotator group (rotates smoothly forward with motion)
    const rotator = new THREE.Group();
    rotator.name = 'wheel-rotator';

    // R = 0.404m (-15% reduced from 0.475m, Diameter: 0.808m)
    const radius = 0.404;
    const width = 0.20;

    // 3.1 Low-Profile Performance Rubber Tire
    const tireGeom = new THREE.CylinderGeometry(radius, radius, width, 48, 1);
    const tire = new THREE.Mesh(tireGeom, tireMaterial);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    rotator.add(tire);

    // 3.2 Anodized Dark Outer Flange Shoulder
    const flangeGeom = new THREE.TorusGeometry(radius * 0.93, 0.014, 16, 48);
    const flange = new THREE.Mesh(flangeGeom, darkTitaniumMaterial);
    flange.position.set(isRightSide ? width * 0.48 : -width * 0.48, 0, 0);
    flange.rotation.y = Math.PI / 2;
    rotator.add(flange);

    // 3.3 Dark Titanium Outer Wheel Rim Lip Halo Ring (#2C3E50)
    const glowingRimGeom = new THREE.TorusGeometry(radius * 0.89, 0.012, 16, 48);
    const glowingRim = new THREE.Mesh(glowingRimGeom, darkTitaniumMaterial);
    glowingRim.position.set(isRightSide ? width * 0.49 : -width * 0.49, 0, 0);
    glowingRim.rotation.y = Math.PI / 2;
    rotator.add(glowingRim);

    // 3.4 Concentric Glowing Neon Cyan LED Inner Halo Ring (#00E5FF)
    const haloGeom = new THREE.TorusGeometry(radius * 0.68, 0.014, 16, 48);
    const halo = new THREE.Mesh(haloGeom, wheelHaloMat);
    halo.position.set(isRightSide ? width * 0.50 : -width * 0.50, 0, 0);
    halo.rotation.y = Math.PI / 2;
    rotator.add(halo);

    // 3.5 Flush Dark Titanium Aero Turbine Disc Face (#2C3E50)
    const aeroDiscGeom = new THREE.CylinderGeometry(radius * 0.58, radius * 0.58, 0.030, 36);
    const aeroDisc = new THREE.Mesh(aeroDiscGeom, darkTitaniumMaterial);
    aeroDisc.position.set(isRightSide ? width * 0.46 : -width * 0.46, 0, 0);
    aeroDisc.rotation.z = Math.PI / 2;
    rotator.add(aeroDisc);

    // 3.6 Central Concentric Glowing Cyan Core Emblem (#00E5FF)
    const centerRingGeom = new THREE.TorusGeometry(0.070, 0.010, 12, 24);
    const centerRing = new THREE.Mesh(centerRingGeom, wheelHaloMat);
    centerRing.position.set(isRightSide ? width * 0.49 : -width * 0.49, 0, 0);
    centerRing.rotation.y = Math.PI / 2;
    rotator.add(centerRing);

    // 3.7 Central Dark Titanium Hub Cap (#2C3E50)
    const coreHubGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.035, 24);
    const coreHub = new THREE.Mesh(coreHubGeom, darkTitaniumMaterial);
    coreHub.position.set(isRightSide ? width * 0.48 : -width * 0.48, 0, 0);
    coreHub.rotation.z = Math.PI / 2;
    rotator.add(coreHub);

    wheelAssembly.add(rotator);
    animatedWheels.push(rotator);

    return wheelAssembly;
  }

  wheelPositions.forEach((pos, idx) => {
    const isRight = pos[0] > 0;
    const wheel = createStreamlinerWheel(isRight);
    wheel.name = `wheel_${idx}`;
    wheel.position.set(...pos);
    wheelsGroup.add(wheel);
  });

  root.add(wheelsGroup);

  // =========================================================================
  // 4. LIGHTS MESH GROUP (Continuous Cyan LED Strips & Royal Blue Emblems)
  // =========================================================================
  const lightsGroup = new THREE.Group();
  lightsGroup.name = 'lights';

  // =========================================================================
  // 4.1 FULL-WIDTH FRONT LED LIGHT BAR & ILLUMINATED LOGO (Continuous Coast-to-Coast Strip)
  // =========================================================================
  const frontLightbarGroup = new THREE.Group();
  frontLightbarGroup.name = 'front-full-width-lightbar-system';

  // Full-Width Front Light Bar Spline Points (Spans X = -0.925m to +0.925m across 1.85m span)
  const frontHousingPts: THREE.Vector3[] = [];
  const frontLensPts: THREE.Vector3[] = [];
  const frontBarPts: THREE.Vector3[] = [];
  const frontCorePts: THREE.Vector3[] = [];

  const nFrontPts = 33;
  const sMin = 0.12;
  const basePts: { x: number; y: number; z: number }[] = [];

  for (let i = 0; i < nFrontPts; i++) {
    const normU = -1.0 + (2.0 * i) / (nFrontPts - 1);
    const u = Math.abs(normU);
    const s = 1.0 - u * (1.0 - sMin);
    const theta = s * (Math.PI / 2);
    const sinT = Math.sin(theta);
    const z = 1.909 + 0.551 * sinT;
    const halfW = 0.955 * Math.sqrt(Math.max(0, 1.0 - Math.pow(sinT, 2.2)));
    const yEdge = 0.34 + 0.18 * Math.pow(sinT, 1.2);
    const yTop = 0.78 - 0.24 * Math.pow(sinT, 1.6);
    const yTarg = 0.530 - 0.012 * u * u;
    const sinPhi = Math.min(0.98, Math.max(0.05, (yTarg - yEdge) / (yTop - yEdge)));
    const phi = Math.asin(sinPhi);
    const cosPhi = Math.cos(phi);
    const x = Math.sign(normU) * halfW * cosPhi;
    const y = yEdge + (yTop - yEdge) * sinPhi;
    basePts.push({ x, y, z });
  }

  for (let i = 0; i < nFrontPts; i++) {
    const cur = basePts[i];
    let dx: number;
    let dz: number;
    if (i === 0) {
      dx = basePts[1].x - cur.x;
      dz = basePts[1].z - cur.z;
    } else if (i === nFrontPts - 1) {
      dx = cur.x - basePts[nFrontPts - 2].x;
      dz = cur.z - basePts[nFrontPts - 2].z;
    } else {
      dx = basePts[i + 1].x - basePts[i - 1].x;
      dz = basePts[i + 1].z - basePts[i - 1].z;
    }

    // Outward forward normal vector in horizontal plane
    let nx = -dz;
    let nz = dx;
    const hLen = Math.sqrt(nx * nx + nz * nz);
    if (hLen > 0) {
      nx /= hLen;
      nz /= hLen;
    }
    // Upward tilt for nose slope
    const ny = 0.15;
    const totLen = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx /= totLen;
    const nyNorm = ny / totLen;
    nz /= totLen;

    frontHousingPts.push(new THREE.Vector3(cur.x + nx * 0.005, cur.y + nyNorm * 0.005, cur.z + nz * 0.005));
    frontLensPts.push(new THREE.Vector3(cur.x + nx * 0.011, cur.y + nyNorm * 0.011, cur.z + nz * 0.011));
    frontBarPts.push(new THREE.Vector3(cur.x + nx * 0.013, cur.y + nyNorm * 0.013, cur.z + nz * 0.013));
    frontCorePts.push(new THREE.Vector3(cur.x + nx * 0.016, cur.y + nyNorm * 0.016, cur.z + nz * 0.016));
  }

  const frontHousingCurve = new THREE.CatmullRomCurve3(frontHousingPts);
  const frontLensCurve = new THREE.CatmullRomCurve3(frontLensPts);
  const frontBarCurve = new THREE.CatmullRomCurve3(frontBarPts);
  const frontCoreCurve = new THREE.CatmullRomCurve3(frontCorePts);

  // 1. Sleek Obsidian Aerodynamic Recessed Housing Channel
  const frontHousingGeom = new THREE.TubeGeometry(frontHousingCurve, 64, 0.015, 12, false);
  const frontHousing = new THREE.Mesh(frontHousingGeom, aeroTrimMaterial);
  frontLightbarGroup.add(frontHousing);

  // 2. High-Clarity Polycarbonate Diffuser Lens Blade
  const frontLensGeom = new THREE.TubeGeometry(frontLensCurve, 64, 0.012, 12, false);
  const frontLens = new THREE.Mesh(frontLensGeom, lightbarLensMaterial);
  frontLightbarGroup.add(frontLens);

  // 3. Continuous Full-Width Neon Cyan Outer Light Ribbon (#00E5FF)
  const frontCyanGeom = new THREE.TubeGeometry(frontBarCurve, 64, 0.010, 12, false);
  const frontCyanLightbar = new THREE.Mesh(frontCyanGeom, frontLightbarCyanMat);
  frontLightbarGroup.add(frontCyanLightbar);

  // 4. High-Intensity Glowing Core Laser Ribbon (#B3F5FF)
  const frontCoreGeom = new THREE.TubeGeometry(frontCoreCurve, 64, 0.005, 12, false);
  const frontCoreLightbar = new THREE.Mesh(frontCoreGeom, frontLightbarCoreMat);
  frontLightbarGroup.add(frontCoreLightbar);

  // 5. Wrap-Around Aerodynamic Corner Endcap Blades (Flush with Left & Right Fenders)
  for (const side of [-1, 1]) {
    const endPt = side === 1 ? basePts[nFrontPts - 1] : basePts[0];

    // Sculpted aerodynamic endcap bezel sitting flush on fender
    const endcapGeom = new RoundedBoxGeometry(0.014, 0.032, 0.038, 4, 0.004);
    const endcapMesh = new THREE.Mesh(endcapGeom, darkTitaniumMaterial);
    endcapMesh.position.set(endPt.x, endPt.y, endPt.z);
    endcapMesh.rotation.y = side * 0.65;
    frontLightbarGroup.add(endcapMesh);

    // Glowing cyan aerodynamic wingtip accent fin
    const tipFinGeom = new THREE.BoxGeometry(0.005, 0.020, 0.024);
    const tipFinMesh = new THREE.Mesh(tipFinGeom, frontLightbarCyanMat);
    tipFinMesh.position.set(endPt.x + side * 0.006, endPt.y, endPt.z + 0.003);
    tipFinMesh.rotation.y = side * 0.65;
    frontLightbarGroup.add(tipFinMesh);
  }

  // 6. Integrated Jeweled Matrix Laser Projectors (6 micro-projectors each side)
  for (const side of [-1, 1]) {
    for (let k = 0; k < 6; k++) {
      const uK = 0.25 + k * 0.12;
      const s = 1.0 - uK * (1.0 - sMin);
      const theta = s * (Math.PI / 2);
      const sinT = Math.sin(theta);
      const zBase = 1.909 + 0.551 * sinT;
      const halfW = 0.955 * Math.sqrt(Math.max(0, 1.0 - Math.pow(sinT, 2.2)));
      const yEdge = 0.34 + 0.18 * Math.pow(sinT, 1.2);
      const yTop = 0.78 - 0.24 * Math.pow(sinT, 1.6);
      const yTarg = 0.530 - 0.012 * uK * uK;
      const sinPhi = Math.min(0.98, Math.max(0.05, (yTarg - yEdge) / (yTop - yEdge)));
      const cosPhi = Math.cos(Math.asin(sinPhi));
      const xOffset = side * halfW * cosPhi;
      const yOffset = yEdge + (yTop - yEdge) * sinPhi;

      // Projector Barrel in Dark Titanium
      const diodeGeom = new THREE.CylinderGeometry(0.007, 0.009, 0.012, 16);
      const diodeMesh = new THREE.Mesh(diodeGeom, darkTitaniumMaterial);
      diodeMesh.position.set(xOffset, yOffset, zBase + 0.012);
      diodeMesh.rotation.x = Math.PI / 2;
      diodeMesh.rotation.y = side * (0.20 + k * 0.07);
      frontLightbarGroup.add(diodeMesh);

      // Glowing Jewel Diode Core
      const diodeCoreGeom = new THREE.SphereGeometry(0.0045, 12, 12);
      const diodeCore = new THREE.Mesh(diodeCoreGeom, frontLightbarCoreMat);
      diodeCore.position.set(xOffset, yOffset, zBase + 0.016);
      frontLightbarGroup.add(diodeCore);
    }
  }

  // 7. Front Illuminated E-Sphere Logo (Integrated directly above light bar horizon at X = 0, Y = 0.582m, Z = 2.463m)
  const frontLogoGroup = new THREE.Group();
  frontLogoGroup.name = 'front-illuminated-logo';
  frontLogoGroup.position.set(0, 0.582, 2.463);
  frontLogoGroup.rotation.x = 0.22;

  // Outer Dark Titanium Metallic Bezel Ring (#2C3E50)
  const frontLogoRingGeom = new THREE.TorusGeometry(0.046, 0.006, 16, 36);
  const frontLogoRing = new THREE.Mesh(frontLogoRingGeom, darkTitaniumMaterial);
  frontLogoGroup.add(frontLogoRing);

  // Concentric Glowing Neon Cyan Halo (#00E5FF)
  const frontLogoHaloGeom = new THREE.TorusGeometry(0.036, 0.005, 16, 36);
  const frontLogoHalo = new THREE.Mesh(frontLogoHaloGeom, cyanLedMaterial);
  frontLogoGroup.add(frontLogoHalo);

  // Dark Obsidian Glass Medallion Backing
  const frontLogoBackingGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.006, 32);
  const frontLogoBacking = new THREE.Mesh(frontLogoBackingGeom, aeroTrimMaterial);
  frontLogoBacking.rotation.x = Math.PI / 2;
  frontLogoGroup.add(frontLogoBacking);

  // Illuminated Stylized "E" / Orbital Core Insignia
  const frontLogoCoreArc = new THREE.TorusGeometry(0.022, 0.004, 12, 28, Math.PI * 1.5);
  const frontLogoArcMesh = new THREE.Mesh(frontLogoCoreArc, cyanCoreMaterial);
  frontLogoArcMesh.rotation.z = Math.PI * 0.25;
  frontLogoGroup.add(frontLogoArcMesh);

  const frontLogoCenterBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.024, 0.004, 0.006),
    cyanCoreMaterial
  );
  frontLogoGroup.add(frontLogoCenterBar);

  // Dedicated Soft Cyan Emblem Aura PointLight
  frontLogoLight = new THREE.PointLight(CYAN_LED, 1.2, 1.2, 1.5);
  frontLogoLight.position.set(0, 0, 0.06);
  frontLogoGroup.add(frontLogoLight);

  frontLightbarGroup.add(frontLogoGroup);

  // Dedicated Atmospheric Cyan Glow Lights for Full-Width Front Light Bar
  frontLightbarCenterGlow = new THREE.PointLight(CYAN_LED, 3.6, 4.2, 1.3);
  frontLightbarCenterGlow.position.set(0, 0.52, 2.50);
  frontLightbarGroup.add(frontLightbarCenterGlow);

  frontLightbarLeftGlow = new THREE.PointLight(CYAN_LED, 2.2, 3.2, 1.3);
  frontLightbarLeftGlow.position.set(-0.75, 0.54, 2.22);
  frontLightbarGroup.add(frontLightbarLeftGlow);

  frontLightbarRightGlow = new THREE.PointLight(CYAN_LED, 2.2, 3.2, 1.3);
  frontLightbarRightGlow.position.set(0.75, 0.54, 2.22);
  frontLightbarGroup.add(frontLightbarRightGlow);

  // Forward Physical Road Illumination Beam
  frontBeam = new THREE.SpotLight(0x00e5ff, 6.5, 12.0, Math.PI / 4, 0.45, 1.2);
  frontBeam.position.set(0, 0.54, 2.44);
  frontBeam.target.position.set(0, 0, 6.0);
  lightsGroup.add(frontBeam);
  lightsGroup.add(frontBeam.target);

  lightsGroup.add(frontLightbarGroup);

  // =========================================================================
  // 4.2 FULL-WIDTH REAR LED LIGHT BAR & REAR ILLUMINATED LOGO (Continuous Coast-to-Coast Strip & Animated Welcome Sequence)
  // =========================================================================
  const rearLightbarGroup = new THREE.Group();
  rearLightbarGroup.name = 'rear-full-width-lightbar-system';

  // Dedicated Dynamic Materials for Full-Width Rear Light Bar
  rearLightbarCyanMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_LED),
    toneMapped: false,
  });

  rearLightbarCoreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_CORE),
    toneMapped: false,
  });

  rearLogoHaloMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_LED),
    toneMapped: false,
  });

  rearLogoCoreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_CORE),
    toneMapped: false,
  });

  // Full-Width Rear Light Bar Spline Points (Spans X = -0.870m to +0.870m across 1.74m span)
  const rearHousingPts: THREE.Vector3[] = [];
  const rearLensPts: THREE.Vector3[] = [];
  const rearBarPts: THREE.Vector3[] = [];
  const rearCorePts: THREE.Vector3[] = [];

  const nRearPts = 33;
  const rearBasePts: { x: number; y: number; z: number }[] = [];

  for (let i = 0; i < nRearPts; i++) {
    const normU = -1.0 + (2.0 * i) / (nRearPts - 1);
    const u = Math.abs(normU);
    const s = 1.0 - u * (1.0 - sMin);
    const theta = s * (Math.PI / 2);
    const sinT = Math.sin(theta);
    const z = -1.909 - 0.551 * sinT;
    const halfW = 0.955 * Math.sqrt(Math.max(0, 1.0 - Math.pow(sinT, 2.2)));
    const yEdge = 0.34 + 0.18 * Math.pow(sinT, 1.2);
    const yTop = 0.78 - 0.24 * Math.pow(sinT, 1.6);
    const yTarg = 0.530 - 0.012 * u * u;
    const sinPhi = Math.min(0.98, Math.max(0.05, (yTarg - yEdge) / (yTop - yEdge)));
    const phi = Math.asin(sinPhi);
    const cosPhi = Math.cos(phi);
    const x = Math.sign(normU) * halfW * cosPhi;
    const y = yEdge + (yTop - yEdge) * sinPhi;
    rearBasePts.push({ x, y, z });
  }

  for (let i = 0; i < nRearPts; i++) {
    const cur = rearBasePts[i];
    let dx: number;
    let dz: number;
    if (i === 0) {
      dx = rearBasePts[1].x - cur.x;
      dz = rearBasePts[1].z - cur.z;
    } else if (i === nRearPts - 1) {
      dx = cur.x - rearBasePts[nRearPts - 2].x;
      dz = cur.z - rearBasePts[nRearPts - 2].z;
    } else {
      dx = rearBasePts[i + 1].x - rearBasePts[i - 1].x;
      dz = rearBasePts[i + 1].z - rearBasePts[i - 1].z;
    }

    // Outward backward normal vector in horizontal plane
    let nx = dz;
    let nz = -dx;
    const hLen = Math.sqrt(nx * nx + nz * nz);
    if (hLen > 0) {
      nx /= hLen;
      nz /= hLen;
    }
    // Upward tilt for rear deck slope
    const ny = 0.15;
    const totLen = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx /= totLen;
    const nyNorm = ny / totLen;
    nz /= totLen;

    rearHousingPts.push(new THREE.Vector3(cur.x + nx * 0.005, cur.y + nyNorm * 0.005, cur.z + nz * 0.005));
    rearLensPts.push(new THREE.Vector3(cur.x + nx * 0.011, cur.y + nyNorm * 0.011, cur.z + nz * 0.011));
    rearBarPts.push(new THREE.Vector3(cur.x + nx * 0.013, cur.y + nyNorm * 0.013, cur.z + nz * 0.013));
    rearCorePts.push(new THREE.Vector3(cur.x + nx * 0.016, cur.y + nyNorm * 0.016, cur.z + nz * 0.016));
  }

  const rearHousingCurve = new THREE.CatmullRomCurve3(rearHousingPts);
  const rearLensCurve = new THREE.CatmullRomCurve3(rearLensPts);
  const rearBarCurve = new THREE.CatmullRomCurve3(rearBarPts);
  const rearCoreCurve = new THREE.CatmullRomCurve3(rearCorePts);

  // 1. Sleek Obsidian Aerodynamic Recessed Housing Channel
  const rearHousingGeom = new THREE.TubeGeometry(rearHousingCurve, 64, 0.015, 12, false);
  const rearHousing = new THREE.Mesh(rearHousingGeom, aeroTrimMaterial);
  rearLightbarGroup.add(rearHousing);

  // 2. High-Clarity Polycarbonate Diffuser Lens Blade
  const rearLensGeom = new THREE.TubeGeometry(rearLensCurve, 64, 0.012, 12, false);
  const rearLens = new THREE.Mesh(rearLensGeom, lightbarLensMaterial);
  rearLightbarGroup.add(rearLens);

  // 3. Continuous Full-Width Neon Cyan Outer Light Ribbon (#00E5FF)
  const rearCyanGeom = new THREE.TubeGeometry(rearBarCurve, 64, 0.010, 12, false);
  const rearCyanLightbar = new THREE.Mesh(rearCyanGeom, rearLightbarCyanMat);
  rearLightbarGroup.add(rearCyanLightbar);

  // 4. High-Intensity Glowing Core Laser Ribbon (#B3F5FF)
  const rearCoreGeom = new THREE.TubeGeometry(rearCoreCurve, 64, 0.005, 12, false);
  const rearCoreLightbar = new THREE.Mesh(rearCoreGeom, rearLightbarCoreMat);
  rearLightbarGroup.add(rearCoreLightbar);

  // 5. Wrap-Around Aerodynamic Corner Endcap Blades (Flush with Left & Right Rear Fenders)
  for (const side of [-1, 1]) {
    const endPt = side === 1 ? rearBasePts[nRearPts - 1] : rearBasePts[0];

    // Sculpted aerodynamic endcap bezel sitting flush on rear fender
    const endcapGeom = new RoundedBoxGeometry(0.014, 0.032, 0.038, 4, 0.004);
    const endcapMesh = new THREE.Mesh(endcapGeom, darkTitaniumMaterial);
    endcapMesh.position.set(endPt.x, endPt.y, endPt.z);
    endcapMesh.rotation.y = side * -0.65;
    rearLightbarGroup.add(endcapMesh);

    // Glowing cyan aerodynamic wingtip accent fin
    const tipFinGeom = new THREE.BoxGeometry(0.005, 0.020, 0.024);
    const tipFinMesh = new THREE.Mesh(tipFinGeom, rearLightbarCyanMat);
    tipFinMesh.position.set(endPt.x + side * 0.006, endPt.y, endPt.z - 0.003);
    tipFinMesh.rotation.y = side * -0.65;
    rearLightbarGroup.add(tipFinMesh);
  }

  // 6. 16-Blade Welcome Matrix Modules (8 Left, 8 Right, animating sequentially)
  rearBladeMaterials.length = 0;
  for (const side of [-1, 1]) {
    for (let k = 0; k < 8; k++) {
      const uK = 0.14 + k * 0.105;
      const s = 1.0 - uK * (1.0 - sMin);
      const theta = s * (Math.PI / 2);
      const sinT = Math.sin(theta);
      const zBase = -1.909 - 0.551 * sinT;
      const halfW = 0.955 * Math.sqrt(Math.max(0, 1.0 - Math.pow(sinT, 2.2)));
      const yEdge = 0.34 + 0.18 * Math.pow(sinT, 1.2);
      const yTop = 0.78 - 0.24 * Math.pow(sinT, 1.6);
      const yTarg = 0.530 - 0.012 * uK * uK;
      const sinPhi = Math.min(0.98, Math.max(0.05, (yTarg - yEdge) / (yTop - yEdge)));
      const cosPhi = Math.cos(Math.asin(sinPhi));
      const xOffset = side * halfW * cosPhi;
      const yOffset = yEdge + (yTop - yEdge) * sinPhi;

      // Dark Titanium blade fin
      const finGeom = new RoundedBoxGeometry(0.006, 0.028, 0.032, 4, 0.002);
      const finMesh = new THREE.Mesh(finGeom, darkTitaniumMaterial);
      finMesh.position.set(xOffset, yOffset, zBase - 0.012);
      finMesh.rotation.y = side * (0.15 + k * 0.06);
      rearLightbarGroup.add(finMesh);

      // Dedicated dynamic material for this matrix blade
      const bladeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(CYAN_LED),
        toneMapped: false,
      });
      rearBladeMaterials.push(bladeMat);

      // Glowing matrix laser diode slit
      const diodeGeom = new THREE.BoxGeometry(0.004, 0.020, 0.012);
      const diodeMesh = new THREE.Mesh(diodeGeom, bladeMat);
      diodeMesh.position.set(xOffset, yOffset, zBase - 0.016);
      diodeMesh.rotation.y = side * (0.15 + k * 0.06);
      rearLightbarGroup.add(diodeMesh);
    }
  }

  // 7. Rear Illuminated E-Sphere Logo (Integrated directly above light bar horizon at X = 0, Y = 0.582m, Z = -2.463m)
  const rearLogoGroup = new THREE.Group();
  rearLogoGroup.name = 'rear-illuminated-logo';
  rearLogoGroup.position.set(0, 0.582, -2.463);
  rearLogoGroup.rotation.x = -0.22;

  // Outer Dark Titanium Metallic Bezel Ring (#2C3E50)
  const rearLogoRingGeom = new THREE.TorusGeometry(0.046, 0.006, 16, 36);
  const rearLogoRing = new THREE.Mesh(rearLogoRingGeom, darkTitaniumMaterial);
  rearLogoGroup.add(rearLogoRing);

  // Concentric Glowing Neon Cyan Halo (#00E5FF)
  const rearLogoHaloGeom = new THREE.TorusGeometry(0.036, 0.005, 16, 36);
  const rearLogoHalo = new THREE.Mesh(rearLogoHaloGeom, rearLogoHaloMat);
  rearLogoGroup.add(rearLogoHalo);

  // Dark Obsidian Glass Medallion Backing
  const rearLogoBackingGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.006, 32);
  const rearLogoBacking = new THREE.Mesh(rearLogoBackingGeom, aeroTrimMaterial);
  rearLogoBacking.rotation.x = Math.PI / 2;
  rearLogoGroup.add(rearLogoBacking);

  // Illuminated Stylized "E" / Orbital Core Insignia
  const rearLogoCoreArc = new THREE.TorusGeometry(0.022, 0.004, 12, 28, Math.PI * 1.5);
  const rearLogoArcMesh = new THREE.Mesh(rearLogoCoreArc, rearLogoCoreMat);
  rearLogoArcMesh.rotation.z = Math.PI * 0.25;
  rearLogoGroup.add(rearLogoArcMesh);

  const rearLogoCenterBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.024, 0.004, 0.006),
    rearLogoCoreMat
  );
  rearLogoGroup.add(rearLogoCenterBar);

  // Soft Rear Tail Logo Glow
  rearLogoLight = new THREE.PointLight(CYAN_LED, 1.2, 1.2, 1.5);
  rearLogoLight.position.set(0, 0, -0.06);
  rearLogoGroup.add(rearLogoLight);

  rearLightbarGroup.add(rearLogoGroup);

  // Dedicated Atmospheric Cyan Glow Lights for Full-Width Rear Light Bar
  rearLightbarCenterGlow = new THREE.PointLight(CYAN_LED, 3.8, 4.2, 1.3);
  rearLightbarCenterGlow.position.set(0, 0.52, -2.50);
  rearLightbarGroup.add(rearLightbarCenterGlow);

  rearLightbarLeftGlow = new THREE.PointLight(CYAN_LED, 2.2, 3.2, 1.3);
  rearLightbarLeftGlow.position.set(-0.75, 0.54, -2.22);
  rearLightbarGroup.add(rearLightbarLeftGlow);

  rearLightbarRightGlow = new THREE.PointLight(CYAN_LED, 2.2, 3.2, 1.3);
  rearLightbarRightGlow.position.set(0.75, 0.54, -2.22);
  rearLightbarGroup.add(rearLightbarRightGlow);

  // Rear Ground Atmospheric Bounce Light
  rearTailLight = new THREE.PointLight(0x00e5ff, 3.5, 4.5, 1.2);
  rearTailLight.position.set(0, 0.40, -2.55);
  lightsGroup.add(rearTailLight);

  lightsGroup.add(rearLightbarGroup);

  // 4.3 CONTINUOUS CYAN LED STRIPS (Waistline Light Ribbon & Lower Rocker Sill)
  sideBeltlineLedMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_LED),
    toneMapped: false,
  });
  lowerSillLedMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_LED),
    toneMapped: false,
  });
  archLipLedMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_CORE),
    toneMapped: false,
  });

  for (const side of [-1, 1]) {
    // Upper Beltline Cyan LED Light Strip: Follows the cabin waistline between wheel arches
    const upperSideCurve = new THREE.LineCurve3(
      new THREE.Vector3(side * 0.958, 0.745, 1.02),
      new THREE.Vector3(side * 0.958, 0.745, -1.02)
    );
    const upperSideGeom = new THREE.TubeGeometry(upperSideCurve, 32, 0.012, 8, false);
    const upperSideStrip = new THREE.Mesh(upperSideGeom, sideBeltlineLedMat);
    lightsGroup.add(upperSideStrip);

    // Continuous Lower Rocker Sill LED Strip: Glowing Cyan runner between wheel arches (matches original concept poster!)
    const lowerSideCurve = new THREE.LineCurve3(
      new THREE.Vector3(side * 0.958, 0.35, 0.98),
      new THREE.Vector3(side * 0.958, 0.35, -0.98)
    );
    const lowerSideGeom = new THREE.TubeGeometry(lowerSideCurve, 32, 0.012, 8, false);
    const lowerSideStrip = new THREE.Mesh(lowerSideGeom, lowerSillLedMat);
    lightsGroup.add(lowerSideStrip);

    // 4.4 Glowing Neon Cyan Wheel Arch Lip Runners (Front & Rear outer arch accents matching blueprint views)
    for (const zAxle of [wheelBaseZ, -wheelBaseZ]) {
      const runnerCurve = new THREE.EllipseCurve(
        0, 0,
        archRadius + 0.004, archRadius + 0.004,
        Math.PI * 0.15, Math.PI * 0.85,
        false, 0
      );
      const points2D = runnerCurve.getPoints(24);
      const points3D = points2D.map(p => new THREE.Vector3(side * 0.962, wheelCenterY + p.y, zAxle - p.x));
      const runner3DCurve = new THREE.CatmullRomCurve3(points3D);
      const runnerGeom = new THREE.TubeGeometry(runner3DCurve, 24, 0.008, 8, false);
      const runnerMesh = new THREE.Mesh(runnerGeom, archLipLedMat);
      lightsGroup.add(runnerMesh);
    }
  }

  // 4.5 APPLE-INSPIRED MINIMALIST ROOF AI SENSOR ISLAND (Integrated into Roof Glass)
  const roofSensorGroup = new THREE.Group();
  roofSensorGroup.name = 'roof-ai-sensor-island';

  // 1. Molded Optical Glass Transition Plinth (Seamlessly nested into panoramic roof canopy)
  const glassPlinthMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xe0f2fe),
    transmission: 0.95,
    opacity: 0.92,
    transparent: true,
    roughness: 0.025,
    ior: 1.52,
    thickness: 0.020,
    attenuationColor: new THREE.Color(0x38bdf8),
    attenuationDistance: 0.35,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    reflectivity: 0.98,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const glassPlinthGeom = new RoundedBoxGeometry(0.128, 0.010, 0.238, 8, 0.016);
  const glassPlinth = new THREE.Mesh(glassPlinthGeom, glassPlinthMat);
  glassPlinth.position.set(0, 1.512, 0.035);
  roofSensorGroup.add(glassPlinth);

  // 2. Precision CNC Dark Titanium Chamfered Bezel Ring (Apple Watch Ultra / iPhone Pro style)
  const titaniumBezelGeom = new RoundedBoxGeometry(0.116, 0.009, 0.226, 8, 0.014);
  const titaniumBezel = new THREE.Mesh(titaniumBezelGeom, darkTitaniumMaterial);
  titaniumBezel.position.set(0, 1.516, 0.035);
  titaniumBezel.castShadow = true;
  roofSensorGroup.add(titaniumBezel);

  // 3. Seamless Mirror-Polished Black Sapphire / Ceramic Top Face
  const sapphireFaceMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x04060a),
    roughness: 0.012,
    metalness: 0.90,
    clearcoat: 1.0,
    clearcoatRoughness: 0.005,
    reflectivity: 1.0,
  });
  const sapphireFaceGeom = new RoundedBoxGeometry(0.106, 0.004, 0.216, 8, 0.012);
  const sapphireFace = new THREE.Mesh(sapphireFaceGeom, sapphireFaceMat);
  sapphireFace.position.set(0, 1.521, 0.035);
  roofSensorGroup.add(sapphireFace);

  // 4. Solid-State Forward LiDAR Infrared-Transparent Optical Transceiver Window
  const solidStateLidarGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.002, 32);
  const solidStateLidar = new THREE.Mesh(solidStateLidarGeom, sensorMaterial);
  solidStateLidar.position.set(0, 1.5235, 0.030);
  roofSensorGroup.add(solidStateLidar);

  // 5. Apple-Style Laser-Etched Cyan Micro-Telemetry Ring
  roofSensorRingMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYAN_CORE),
    toneMapped: false,
  });
  const lidarRingGeom = new THREE.TorusGeometry(0.022, 0.0016, 12, 36);
  const lidarRing = new THREE.Mesh(lidarRingGeom, roofSensorRingMat);
  lidarRing.position.set(0, 1.5245, 0.030);
  lidarRing.rotation.x = Math.PI / 2;
  roofSensorGroup.add(lidarRing);

  // 6. Forward Stereo Bionic Vision Optical Apertures (Flush micro-cameras)
  for (const s of [-1, 1]) {
    // Titanium Lens Bezel Ring
    const camRingGeom = new THREE.TorusGeometry(0.0065, 0.0012, 12, 24);
    const camRing = new THREE.Mesh(camRingGeom, darkTitaniumMaterial);
    camRing.position.set(s * 0.026, 1.5235, 0.100);
    camRing.rotation.x = Math.PI / 2;
    roofSensorGroup.add(camRing);

    // Deep Antireflective Optical Lens Core
    const camLensGeom = new THREE.CylinderGeometry(0.005, 0.005, 0.002, 20);
    const camLens = new THREE.Mesh(camLensGeom, sensorMaterial);
    camLens.position.set(s * 0.026, 1.523, 0.100);
    roofSensorGroup.add(camLens);

    // Sub-surface Optical Cyan Glint Point
    const camCoreGeom = new THREE.SphereGeometry(0.002, 8, 8);
    const camCore = new THREE.Mesh(camCoreGeom, cyanCoreMaterial);
    camCore.position.set(s * 0.026, 1.5225, 0.100);
    roofSensorGroup.add(camCore);
  }

  // 7. Rear Ultra-Wide Autonomous Vision Aperture (Flush under glass, replaces clunky fin!)
  const rearCamRingGeom = new THREE.TorusGeometry(0.0055, 0.0012, 12, 24);
  const rearCamRing = new THREE.Mesh(rearCamRingGeom, darkTitaniumMaterial);
  rearCamRing.position.set(0, 1.5235, -0.045);
  rearCamRing.rotation.x = Math.PI / 2;
  roofSensorGroup.add(rearCamRing);

  const rearCamLensGeom = new THREE.CylinderGeometry(0.0045, 0.0045, 0.002, 20);
  const rearCamLens = new THREE.Mesh(rearCamLensGeom, sensorMaterial);
  rearCamLens.position.set(0, 1.523, -0.045);
  roofSensorGroup.add(rearCamLens);

  // 8. Ethereal Glass Undermount Ambient Cyan Halo
  roofSensorHaloLight = new THREE.PointLight(CYAN_LED, 0.40, 0.8, 2.0);
  roofSensorHaloLight.position.set(0, 1.506, 0.035);
  roofSensorGroup.add(roofSensorHaloLight);

  lightsGroup.add(roofSensorGroup);

  // Flush Mirrorless Side Camera Wings with Dark Titanium Trim (#2C3E50) & Cyan Status LED
  for (const side of [-1, 1]) {
    const camWingGeom = new RoundedBoxGeometry(0.055, 0.016, 0.11, 4, 0.007);
    const camWing = new THREE.Mesh(camWingGeom, darkTitaniumMaterial);
    camWing.position.set(side * 0.94, 0.82, 0.40);
    camWing.rotation.z = side > 0 ? 0.12 : -0.12;
    lightsGroup.add(camWing);

    const camLedGeom = new THREE.BoxGeometry(0.007, 0.007, 0.055);
    const camLed = new THREE.Mesh(camLedGeom, cyanLedMaterial);
    camLed.position.set(side * 0.965, 0.82, 0.40);
    lightsGroup.add(camLed);

    const camLensGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.011, 16);
    const camLens = new THREE.Mesh(camLensGeom, sensorMaterial);
    camLens.position.set(side * 0.97, 0.82, 0.35);
    camLens.rotation.z = Math.PI / 2;
    lightsGroup.add(camLens);
  }

  // 4.6 SOFT CYAN UNDERGLOW (Ground Aura & Undercarriage Physical Lighting)
  const underglowGeom = new THREE.PlaneGeometry(2.40, 5.20);
  const underglowTex = makeSoftCyanUnderglowTexture();
  underglowMat = new THREE.MeshBasicMaterial({
    map: underglowTex,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const underglowMesh = new THREE.Mesh(underglowGeom, underglowMat);
  underglowMesh.rotation.x = -Math.PI / 2;
  underglowMesh.position.set(0, 0.015, 0);
  lightsGroup.add(underglowMesh);

  // Undercarriage Physical Soft Cyan PointLights
  frontUnderLight = new THREE.PointLight(CYAN_LED, 4.5, 3.2, 1.2);
  frontUnderLight.position.set(0, 0.20, 0.90);
  lightsGroup.add(frontUnderLight);

  rearUnderLight = new THREE.PointLight(CYAN_LED, 4.5, 3.2, 1.2);
  rearUnderLight.position.set(0, 0.20, -0.90);
  lightsGroup.add(rearUnderLight);

  // Soft Cyan Chassis Perimeter Underrunner Light Bars
  for (const side of [-1, 1]) {
    const underRunnerGeom = new THREE.BoxGeometry(0.022, 0.012, 3.10);
    const underRunner = new THREE.Mesh(underRunnerGeom, cyanLedMaterial);
    underRunner.position.set(side * 0.62, 0.32, 0);
    lightsGroup.add(underRunner);
  }

  root.add(lightsGroup);

  // =========================================================================
  // 5. INTERIOR MESH GROUP (Ultra-Luxury Autonomous Executive Lounge)
  // =========================================================================
  const interiorGroup = new THREE.Group();
  interiorGroup.name = 'interior';

  // 5.0 Ambient Executive Cabin Illumination
  const cabinDomeLight = new THREE.PointLight(0xffffff, 2.2, 4.0, 1.1);
  cabinDomeLight.position.set(0, 1.35, 0);
  interiorGroup.add(cabinDomeLight);

  // 5.0b AMBIENT CYAN LIGHTING (Luxury Autonomous Cabin Lounge Mood)
  const cabinCyanAmbient = new THREE.PointLight(0x00e5ff, 2.4, 4.2, 1.0);
  cabinCyanAmbient.position.set(0, 0.90, 0.05);
  interiorGroup.add(cabinCyanAmbient);

  // 5.0c Secondary Sapphire Ambient Fill Light
  const cabinBlueFill = new THREE.PointLight(0x2563eb, 1.5, 3.5, 1.1);
  cabinBlueFill.position.set(0, 0.65, -0.20);
  interiorGroup.add(cabinBlueFill);

  // 5.0d Continuous Cyan Floor Perimeter Runners & Sill Inlays
  for (const side of [-1, 1]) {
    // Inner sill runway LED strip
    const sillLedGeom = new THREE.BoxGeometry(0.014, 0.008, 2.20);
    const sillLed = new THREE.Mesh(sillLedGeom, cyanLedMaterial);
    sillLed.position.set(side * 0.68, 0.365, -0.05);
    interiorGroup.add(sillLed);

    // Subtle blue accent runner
    const blueRunnerGeom = new THREE.BoxGeometry(0.010, 0.006, 1.90);
    const blueRunner = new THREE.Mesh(blueRunnerGeom, new THREE.MeshBasicMaterial({ color: 0x2563eb, toneMapped: false }));
    blueRunner.position.set(side * 0.58, 0.365, -0.05);
    interiorGroup.add(blueRunner);
  }

  // 5.1 Acoustic Composite Floor Pan & Satin Aluminum Door Thresholds
  const floorGeom = new RoundedBoxGeometry(1.48, 0.05, 2.40, 8, 0.022);
  const floorMat = new THREE.MeshStandardMaterial({
    color: OBSIDIAN_TRIM,
    roughness: 0.70,
    metalness: 0.20,
  });
  const floor = new THREE.Mesh(floorGeom, floorMat);
  floor.position.set(0, 0.35, 0);
  interiorGroup.add(floor);

  // Satin Aluminum Threshold Plates
  for (const side of [-1, 1]) {
    const threshGeom = new RoundedBoxGeometry(0.065, 0.008, 1.10, 4, 0.004);
    const thresh = new THREE.Mesh(threshGeom, satinAlumMaterial);
    thresh.position.set(side * 0.74, 0.375, 0);
    interiorGroup.add(thresh);
  }

  // 5.2 Seamless Curved Cowl Dashboard & Executive Rear Parcel Deck
  const dashCowlGeom = new RoundedBoxGeometry(1.44, 0.14, 0.52, 8, 0.040);
  const dashCowl = new THREE.Mesh(dashCowlGeom, aeroTrimMaterial);
  dashCowl.position.set(0, 0.70, 0.82);
  dashCowl.castShadow = true;
  interiorGroup.add(dashCowl);

  const rearParcelGeom = new RoundedBoxGeometry(1.44, 0.14, 0.52, 8, 0.040);
  const rearParcel = new THREE.Mesh(rearParcelGeom, aeroTrimMaterial);
  rearParcel.position.set(0, 0.70, -0.82);
  rearParcel.castShadow = true;
  interiorGroup.add(rearParcel);

  // Dashboard Ambient Fiber-Optic Arc (Continuous Neon Cyan)
  const dashGlowGeom = new THREE.BoxGeometry(1.36, 0.012, 0.016);
  const dashGlow = new THREE.Mesh(dashGlowGeom, cyanLedMaterial);
  dashGlow.position.set(0, 0.73, 0.64);
  interiorGroup.add(dashGlow);

  const dashBlueTrimGeom = new THREE.BoxGeometry(1.36, 0.008, 0.010);
  const dashBlueTrim = new THREE.Mesh(dashBlueTrimGeom, darkTitaniumMaterial);
  dashBlueTrim.position.set(0, 0.71, 0.66);
  interiorGroup.add(dashBlueTrim);

  // Primary Floating Curved Holographic OLED Screen (Windshield Heads-up Display)
  const hudGeom = new THREE.PlaneGeometry(1.15, 0.36);
  const hudTex = makeHologramHudTexture();
  const hudMat = new THREE.MeshBasicMaterial({
    map: hudTex,
    transparent: true,
    toneMapped: false,
    side: THREE.FrontSide,
  });
  const hudScreen = new THREE.Mesh(hudGeom, hudMat);
  hudScreen.position.set(0, 0.88, 0.60);
  hudScreen.rotation.x = -0.18;
  interiorGroup.add(hudScreen);

  const hudMatRear = new THREE.MeshBasicMaterial({
    map: hudTex,
    transparent: true,
    toneMapped: false,
    side: THREE.FrontSide,
  });
  const hudScreenRear = new THREE.Mesh(hudGeom, hudMatRear);
  hudScreenRear.position.set(0, 0.88, 0.60);
  hudScreenRear.rotation.x = 0.18;
  hudScreenRear.rotation.y = Math.PI;
  interiorGroup.add(hudScreenRear);

  // 5.3 FLOATING HOLOGRAPHIC DISPLAY (Mid-Air Executive Workspace Widget Banner)
  floatingHud = new THREE.Group();
  floatingHud.name = 'floating-holographic-display';
  floatingHud.position.set(0, 0.90, 0.34);
  floatingHud.rotation.x = -0.12;

  const widgetGeom = new THREE.PlaneGeometry(0.72, 0.28);
  const widgetTex = makeFloatingWorkspaceWidgetTexture();
  const widgetMatFront = new THREE.MeshBasicMaterial({
    map: widgetTex,
    transparent: true,
    toneMapped: false,
    side: THREE.FrontSide,
  });
  const widgetMeshFront = new THREE.Mesh(widgetGeom, widgetMatFront);
  floatingHud.add(widgetMeshFront);

  const widgetMatRear = new THREE.MeshBasicMaterial({
    map: widgetTex,
    transparent: true,
    toneMapped: false,
    side: THREE.FrontSide,
  });
  const widgetMeshRear = new THREE.Mesh(widgetGeom, widgetMatRear);
  widgetMeshRear.rotation.y = Math.PI;
  floatingHud.add(widgetMeshRear);

  // Floating Hologram Frame Emitter Bezel (Cyan Neon Outline)
  const widgetBorderGeom = new THREE.BoxGeometry(0.725, 0.285, 0.006);
  const widgetBorderMat = new THREE.MeshBasicMaterial({
    color: CYAN_CORE,
    wireframe: true,
    transparent: true,
    opacity: 0.50,
    toneMapped: false,
  });
  const widgetBorder = new THREE.Mesh(widgetBorderGeom, widgetBorderMat);
  floatingHud.add(widgetBorder);

  // Subtle Hologram Projector Emitter Rays
  const projRayGeom = new THREE.CylinderGeometry(0.004, 0.012, 0.16, 8);
  const projRayMat = new THREE.MeshBasicMaterial({
    color: CYAN_LED,
    transparent: true,
    opacity: 0.35,
    toneMapped: false,
  });
  for (const xOff of [-0.25, 0.25]) {
    const ray = new THREE.Mesh(projRayGeom, projRayMat);
    ray.position.set(xOff, -0.18, 0);
    floatingHud.add(ray);
  }
  interiorGroup.add(floatingHud);

  // 5.4 PREMIUM WHITE LEATHER PBR MATERIALS (Warm Porcelain White Semi-Aniline Nappa Leather)
  const whiteLeatherMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(LEATHER_WHITE),
    roughness: 0.38,                          // Soft, supple natural nappa leather matte feel
    metalness: 0.0,                           // Pure non-metallic dielectric
    clearcoat: 0.22,                          // Subtle protective leather balm sheen
    clearcoatRoughness: 0.42,                 // Soft, diffused light response
    sheen: 0.85,                              // Aniline leather velvety nap
    sheenColor: new THREE.Color(0xffffff),
    sheenRoughness: 0.40,
    bumpMap: makePerforatedLeatherBumpTexture(),
    bumpScale: 0.0022,
    specularIntensity: 0.55,                  // Natural leather specular response
    specularColor: new THREE.Color(0xffffff),
    side: THREE.DoubleSide,
  });

  const whiteLeatherSmoothMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(LEATHER_WHITE),
    roughness: 0.34,                          // Ultra-smooth glove nappa leather on bolsters & armrests
    metalness: 0.0,
    clearcoat: 0.25,
    clearcoatRoughness: 0.38,
    sheen: 0.90,
    sheenColor: new THREE.Color(0xffffff),
    sheenRoughness: 0.35,
    specularIntensity: 0.60,
    specularColor: new THREE.Color(0xffffff),
    side: THREE.DoubleSide,
  });

  // Piping materials
  const royalPipingMat = new THREE.MeshPhysicalMaterial({
    color: LEATHER_ROYAL,
    roughness: 0.20,
    metalness: 0.30,
    clearcoat: 0.8,
    clearcoatRoughness: 0.05,
  });

  const cyanPipingMat = new THREE.MeshPhysicalMaterial({
    color: CYAN_LED,
    roughness: 0.15,
    metalness: 0.40,
    emissive: new THREE.Color(0x004455),
  });

  // 5.5 2 ROTATING SMART SEATS (Executive Lounge Swivel Captain Seats)
  function createRotatingSmartSeat(angleInwardRad: number): THREE.Group {
    const seatAssembly = new THREE.Group();

    // Swivel Base Pedestal with Glowing Cyan Ring
    const baseGeom = new THREE.CylinderGeometry(0.24, 0.26, 0.10, 32);
    const baseMesh = new THREE.Mesh(baseGeom, satinAlumMaterial);
    baseMesh.position.set(0, 0.40, 0);
    seatAssembly.add(baseMesh);

    // Glowing Neon Cyan Base Halo Ring
    const baseRingGeom = new THREE.TorusGeometry(0.23, 0.012, 12, 36);
    const baseRing = new THREE.Mesh(baseRingGeom, cyanLedMaterial);
    baseRing.position.set(0, 0.44, 0);
    baseRing.rotation.x = Math.PI / 2;
    seatAssembly.add(baseRing);

    // Telescopic Swivel Pivot Strut (Dark Titanium)
    const pivotGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 24);
    const pivot = new THREE.Mesh(pivotGeom, darkTitaniumMaterial);
    pivot.position.set(0, 0.48, 0);
    seatAssembly.add(pivot);

    // Swivel Chair Upper (Angled for Conversation / Executive Mode)
    const chairUpper = new THREE.Group();
    chairUpper.position.set(0, 0.49, 0);
    chairUpper.rotation.y = angleInwardRad;

    // Ergonomic Lower Seat Cushion in Perforated White Leather
    const cushionGeom = new RoundedBoxGeometry(0.52, 0.11, 0.54, 8, 0.050);
    const cushion = new THREE.Mesh(cushionGeom, whiteLeatherMat);
    cushion.position.set(0, 0.06, 0.04);
    cushion.castShadow = true;
    chairUpper.add(cushion);

    // Seat Bolster Wings (Side stability contours)
    for (const bSide of [-1, 1]) {
      const bolsterGeom = new RoundedBoxGeometry(0.06, 0.07, 0.46, 6, 0.025);
      const bolster = new THREE.Mesh(bolsterGeom, whiteLeatherSmoothMat);
      bolster.position.set(bSide * 0.23, 0.09, 0.04);
      chairUpper.add(bolster);
    }

    // Contoured Reclined Backrest with Perforated White Leather Center
    const backGeom = new RoundedBoxGeometry(0.48, 0.52, 0.11, 8, 0.040);
    const back = new THREE.Mesh(backGeom, whiteLeatherMat);
    back.position.set(0, 0.36, -0.18);
    back.rotation.x = -0.15;
    back.castShadow = true;
    chairUpper.add(back);

    // Floating Ergonomic Lumbar Comfort Pad (White Leather)
    const lumbarGeom = new RoundedBoxGeometry(0.38, 0.16, 0.05, 6, 0.025);
    const lumbar = new THREE.Mesh(lumbarGeom, whiteLeatherSmoothMat);
    lumbar.position.set(0, 0.24, -0.13);
    lumbar.rotation.x = -0.15;
    chairUpper.add(lumbar);

    // Royal Blue and Cyan Luxury Accent Seam Piping
    const vertPipingGeom = new RoundedBoxGeometry(0.038, 0.48, 0.014, 4, 0.007);
    const vertPiping = new THREE.Mesh(vertPipingGeom, royalPipingMat);
    vertPiping.position.set(0, 0.36, -0.12);
    vertPiping.rotation.x = -0.15;
    chairUpper.add(vertPiping);

    const cyanPipingGeom = new RoundedBoxGeometry(0.46, 0.014, 0.012, 4, 0.006);
    const horizCyanPiping = new THREE.Mesh(cyanPipingGeom, cyanPipingMat);
    horizCyanPiping.position.set(0, 0.61, -0.22);
    chairUpper.add(horizCyanPiping);

    // Floating Executive Headrest with Acoustic Winglets & Speakers
    const headGeom = new RoundedBoxGeometry(0.28, 0.15, 0.08, 6, 0.035);
    const head = new THREE.Mesh(headGeom, whiteLeatherSmoothMat);
    head.position.set(0, 0.68, -0.24);
    head.rotation.x = -0.12;
    chairUpper.add(head);

    // Acoustic Speaker Grille Inlays on Headrest Winglets
    for (const hSide of [-1, 1]) {
      const spkGeom = new THREE.CylinderGeometry(0.024, 0.024, 0.008, 16);
      const spk = new THREE.Mesh(spkGeom, darkTitaniumMaterial);
      spk.position.set(hSide * 0.12, 0.68, -0.21);
      spk.rotation.z = Math.PI / 2;
      chairUpper.add(spk);
    }

    // Satin Aluminum Headrest Floating Strut
    const strutGeom = new RoundedBoxGeometry(0.065, 0.09, 0.024, 4, 0.01);
    const strut = new THREE.Mesh(strutGeom, satinAlumMaterial);
    strut.position.set(0, 0.60, -0.21);
    chairUpper.add(strut);

    // Sculpted Metallic Silver Gray Protective Outer Rear Shell
    const shellGeom = new RoundedBoxGeometry(0.52, 0.56, 0.045, 6, 0.022);
    const shell = new THREE.Mesh(shellGeom, bodyMaterial);
    shell.position.set(0, 0.36, -0.22);
    shell.rotation.x = -0.15;
    chairUpper.add(shell);

    // Smart Multi-Function Armrests with Capacitive Touch Glass Controls
    for (const armSide of [-1, 1]) {
      const armGroup = new THREE.Group();
      armGroup.position.set(armSide * 0.29, 0.20, 0.02);

      // Armrest Leather Cushion Top
      const armGeom = new RoundedBoxGeometry(0.075, 0.075, 0.34, 6, 0.025);
      const arm = new THREE.Mesh(armGeom, whiteLeatherSmoothMat);
      armGroup.add(arm);

      // Satin Titanium Support Strut Cantilever
      const armStrutGeom = new RoundedBoxGeometry(0.025, 0.14, 0.04, 4, 0.008);
      const armStrut = new THREE.Mesh(armStrutGeom, satinAlumMaterial);
      armStrut.position.set(0, -0.07, -0.10);
      armGroup.add(armStrut);

      // Smart Capacitive Glass Control Surface
      const touchPadGeom = new THREE.BoxGeometry(0.045, 0.006, 0.14);
      const touchPad = new THREE.Mesh(touchPadGeom, aeroTrimMaterial);
      touchPad.position.set(0, 0.040, 0.04);
      armGroup.add(touchPad);

      // Cyan Micro-LED Touch Buttons
      for (let btn = -2; btn <= 2; btn++) {
        const btnGeom = new THREE.BoxGeometry(0.025, 0.004, 0.014);
        const btnMesh = new THREE.Mesh(btnGeom, cyanLedMaterial);
        btnMesh.position.set(0, 0.044, 0.04 + btn * 0.024);
        armGroup.add(btnMesh);
      }

      chairUpper.add(armGroup);
    }

    seatAssembly.add(chairUpper);
    return seatAssembly;
  }

  // Exactly TWO luxury executive rotating smart seats (angled inward for conversation mode)
  rotatingSeatLeft = createRotatingSmartSeat(0.24);
  rotatingSeatLeft.position.set(-0.38, 0, -0.10);
  interiorGroup.add(rotatingSeatLeft);

  rotatingSeatRight = createRotatingSmartSeat(-0.24);
  rotatingSeatRight.position.set(0.38, 0, -0.10);
  interiorGroup.add(rotatingSeatRight);

  // 5.6 CENTRAL CONSOLE BRIDGE & HIDDEN STORAGE COMPARTMENTS
  const centerBridgeGeom = new RoundedBoxGeometry(0.28, 0.18, 1.25, 6, 0.035);
  const centerBridge = new THREE.Mesh(centerBridgeGeom, aeroTrimMaterial);
  centerBridge.position.set(0, 0.44, 0.08);
  interiorGroup.add(centerBridge);

  // Dark Titanium Bridge Edge Trim Rails
  for (const side of [-1, 1]) {
    const railGeom = new RoundedBoxGeometry(0.012, 0.020, 1.22, 4, 0.005);
    const rail = new THREE.Mesh(railGeom, darkTitaniumMaterial);
    rail.position.set(side * 0.142, 0.52, 0.08);
    interiorGroup.add(rail);

    // Ambient Cyan Edge Runner
    const edgeLedGeom = new THREE.BoxGeometry(0.006, 0.008, 1.20);
    const edgeLed = new THREE.Mesh(edgeLedGeom, cyanLedMaterial);
    edgeLed.position.set(side * 0.145, 0.525, 0.08);
    interiorGroup.add(edgeLed);
  }

  // HIDDEN STORAGE 1: Front Motorized Slide-Out Storage Drawer
  const frontDrawerGeom = new RoundedBoxGeometry(0.22, 0.08, 0.02, 4, 0.006);
  const frontDrawer = new THREE.Mesh(frontDrawerGeom, darkTitaniumMaterial);
  frontDrawer.position.set(0, 0.44, 0.705);
  interiorGroup.add(frontDrawer);

  const drawerPullGeom = new THREE.BoxGeometry(0.12, 0.008, 0.008);
  const drawerPull = new THREE.Mesh(drawerPullGeom, satinAlumMaterial);
  drawerPull.position.set(0, 0.46, 0.716);
  interiorGroup.add(drawerPull);

  const drawerLockLed = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.004, 0.004), cyanLedMaterial);
  drawerLockLed.position.set(0, 0.42, 0.716);
  interiorGroup.add(drawerLockLed);

  // HIDDEN STORAGE 2: Rear Sliding Executive Tambour Storage Vault
  const rearTambourGeom = new RoundedBoxGeometry(0.24, 0.06, 0.32, 6, 0.015);
  const rearTambour = new THREE.Mesh(rearTambourGeom, aeroTrimMaterial);
  rearTambour.position.set(0, 0.48, -0.42);
  interiorGroup.add(rearTambour);

  for (let s = -3; s <= 3; s++) {
    const slatGeom = new THREE.BoxGeometry(0.22, 0.006, 0.014);
    const slat = new THREE.Mesh(slatGeom, darkTitaniumMaterial);
    slat.position.set(0, 0.512, -0.42 + s * 0.038);
    interiorGroup.add(slat);
  }

  // HIDDEN STORAGE 3: Footwell Secret Valuables Drawers (Under Seat Outer Flanks)
  for (const side of [-1, 1]) {
    const footVaultGeom = new RoundedBoxGeometry(0.06, 0.08, 0.42, 4, 0.010);
    const footVault = new THREE.Mesh(footVaultGeom, darkTitaniumMaterial);
    footVault.position.set(side * 0.65, 0.39, -0.10);
    interiorGroup.add(footVault);

    const vaultLatch = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.012, 0.04), cyanLedMaterial);
    vaultLatch.position.set(side * 0.68, 0.39, -0.10);
    interiorGroup.add(vaultLatch);
  }

  // HIDDEN STORAGE 4: Rear Executive Luggage Lounge Deck & Retention Rails
  const luggageDeckGeom = new RoundedBoxGeometry(1.20, 0.04, 0.48, 6, 0.018);
  const luggageDeck = new THREE.Mesh(luggageDeckGeom, floorMat);
  luggageDeck.position.set(0, 0.38, -0.85);
  interiorGroup.add(luggageDeck);

  for (let r = -2; r <= 2; r++) {
    const lugRailGeom = new RoundedBoxGeometry(0.020, 0.018, 0.44, 4, 0.006);
    const lugRail = new THREE.Mesh(lugRailGeom, satinAlumMaterial);
    lugRail.position.set(r * 0.24, 0.405, -0.85);
    interiorGroup.add(lugRail);

    const lugLed = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.006, 0.42), cyanLedMaterial);
    lugLed.position.set(r * 0.24, 0.412, -0.85);
    interiorGroup.add(lugLed);
  }

  // 5.7 WIRELESS CHARGING SURFACE (Dual Qi 2.0 Fast Charging Dock)
  const wirelessSurfaceGeom = new THREE.PlaneGeometry(0.24, 0.16);
  const wirelessMat = new THREE.MeshStandardMaterial({
    map: makeWirelessChargingTexture(),
    roughness: 0.30,
    metalness: 0.35,
  });
  const wirelessSurface = new THREE.Mesh(wirelessSurfaceGeom, wirelessMat);
  wirelessSurface.position.set(0, 0.536, -0.10);
  wirelessSurface.rotation.x = -Math.PI / 2;
  interiorGroup.add(wirelessSurface);

  // Raised Dark Titanium Wireless Dock Bezel Rim
  const wirelessBezelGeom = new RoundedBoxGeometry(0.255, 0.012, 0.175, 4, 0.008);
  const wirelessBezel = new THREE.Mesh(wirelessBezelGeom, darkTitaniumMaterial);
  wirelessBezel.position.set(0, 0.533, -0.10);
  interiorGroup.add(wirelessBezel);

  // 5.8 FOLDABLE WORK TABLE (Executive Dual-Leaf Crystal Glass Surface)
  const tableGroup = new THREE.Group();
  tableGroup.name = 'foldable-work-table';
  tableGroup.position.set(0, 0.58, 0.12);

  // Central Articulated Titanium Hinge Spine
  const tableSpineGeom = new RoundedBoxGeometry(0.045, 0.024, 0.46, 4, 0.008);
  const tableSpine = new THREE.Mesh(tableSpineGeom, darkTitaniumMaterial);
  tableGroup.add(tableSpine);

  // Digital Stylus Recessed Inductive Docking Trench
  const stylusTrenchGeom = new THREE.BoxGeometry(0.012, 0.008, 0.24);
  const stylusTrench = new THREE.Mesh(stylusTrenchGeom, aeroTrimMaterial);
  stylusTrench.position.set(0, 0.010, 0);
  tableGroup.add(stylusTrench);

  const stylusLed = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.004, 0.22), cyanLedMaterial);
  stylusLed.position.set(0, 0.012, 0);
  tableGroup.add(stylusLed);

  // Articulated Dual Pivot Hinge Knuckles
  for (const hZ of [-0.18, 0.18]) {
    const hingeGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.055, 16);
    const hinge = new THREE.Mesh(hingeGeom, satinAlumMaterial);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0.006, hZ);
    tableGroup.add(hinge);
  }

  // Frosted Crystal Glass / Acrylic Tabletop Leaves (Left & Right Foldable Wings)
  const deskGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6f9ff,
    transmission: 0.94,
    opacity: 1.0,
    transparent: true,
    roughness: 0.02,
    ior: 1.54,
    thickness: 0.35,
    attenuationColor: new THREE.Color(0x38bdf8),
    attenuationDistance: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    reflectivity: 0.98,
  });

  for (const side of [-1, 1]) {
    // Foldable Table Leaf Wing
    const leafGeom = new RoundedBoxGeometry(0.18, 0.018, 0.44, 6, 0.010);
    const leaf = new THREE.Mesh(leafGeom, deskGlassMat);
    leaf.position.set(side * 0.115, 0.002, 0);
    tableGroup.add(leaf);

    // Continuous Cyan Under-Table Ambient Perimeter Edge Strip
    const tableEdgeLedGeom = new THREE.BoxGeometry(0.17, 0.006, 0.006);
    const tableEdgeLed = new THREE.Mesh(tableEdgeLedGeom, cyanSubtleMaterial);
    tableEdgeLed.position.set(side * 0.115, -0.008, 0.21);
    tableGroup.add(tableEdgeLed);

    const tableSideLedGeom = new THREE.BoxGeometry(0.006, 0.006, 0.42);
    const tableSideLed = new THREE.Mesh(tableSideLedGeom, cyanSubtleMaterial);
    tableSideLed.position.set(side * 0.20, -0.008, 0);
    tableGroup.add(tableSideLed);
  }
  interiorGroup.add(tableGroup);

  // 5.9 VOICE AI ASSISTANT ORB (Interactive Holographic AI Hub)
  aiOrbGroup = new THREE.Group();
  aiOrbGroup.name = 'voice-ai-assistant-orb';
  aiOrbGroup.position.set(0, 0.69, 0.42);

  // Cylindrical Acoustic Baffle Base Node in Dark Titanium
  const orbNodeGeom = new THREE.CylinderGeometry(0.065, 0.075, 0.024, 32);
  const orbNode = new THREE.Mesh(orbNodeGeom, darkTitaniumMaterial);
  orbNode.position.set(0, -0.08, 0);
  aiOrbGroup.add(orbNode);

  // Concentric Cyan Soundwave Acoustic Grooves
  const soundRingGeom = new THREE.TorusGeometry(0.058, 0.004, 12, 32);
  const soundRing = new THREE.Mesh(soundRingGeom, cyanLedMaterial);
  soundRing.position.set(0, -0.068, 0);
  soundRing.rotation.x = Math.PI / 2;
  aiOrbGroup.add(soundRing);

  // Floating Inner Glowing AI Core Sphere (Neon Cyan)
  const orbCoreGeom = new THREE.SphereGeometry(0.045, 32, 24);
  aiOrbCoreMat = new THREE.MeshBasicMaterial({
    color: CYAN_CORE,
    toneMapped: false,
  });
  aiOrbInner = new THREE.Mesh(orbCoreGeom, aiOrbCoreMat);
  aiOrbGroup.add(aiOrbInner);

  // Dedicated Soft Cyan AI Pulse PointLight
  aiOrbLight = new THREE.PointLight(CYAN_LED, 2.0, 1.8, 1.2);
  aiOrbLight.position.set(0, 0, 0);
  aiOrbGroup.add(aiOrbLight);

  // Outer Rotating Gyroscopic Gimbal Rings & Wireframe Icosahedron
  aiOrbOuter = new THREE.Group();
  aiOrbOuter.name = 'ai-orb-outer-gimbal';

  const gimbalRing1Geom = new THREE.TorusGeometry(0.068, 0.004, 12, 32);
  const gimbalRing1 = new THREE.Mesh(gimbalRing1Geom, cyanLedMaterial);
  aiOrbOuter.add(gimbalRing1);

  const gimbalRing2Geom = new THREE.TorusGeometry(0.076, 0.0035, 12, 32);
  const gimbalRing2 = new THREE.Mesh(gimbalRing2Geom, new THREE.MeshBasicMaterial({ color: 0x80faff, toneMapped: false }));
  gimbalRing2.rotation.y = Math.PI / 2;
  aiOrbOuter.add(gimbalRing2);

  const orbWireGeom = new THREE.IcosahedronGeometry(0.088, 1);
  const orbWireMat = new THREE.MeshBasicMaterial({
    color: HOLO_CYAN,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
    toneMapped: false,
  });
  const orbWire = new THREE.Mesh(orbWireGeom, orbWireMat);
  aiOrbOuter.add(orbWire);

  aiOrbGroup.add(aiOrbOuter);
  interiorGroup.add(aiOrbGroup);

  // 5.10 PANORAMIC SKY ROOF WITH OVERHEAD SPINE & STARLIGHT MATRIX
  const skyRoofGroup = new THREE.Group();
  skyRoofGroup.name = 'panoramic-sky-roof-spine';

  // Longitudinal Overhead Centerline Spine following canopy arch curvature
  const nSpinePts = 32;
  const spinePts: THREE.Vector3[] = [];
  const inlayPts: THREE.Vector3[] = [];
  for (let i = 0; i < nSpinePts; i++) {
    const t = i / (nSpinePts - 1);
    const z = -0.72 + 1.44 * t; // Z from -0.72m to +0.72m
    const yApex = getCanopyCenterApex(z);
    spinePts.push(new THREE.Vector3(0, yApex - 0.028, z));
    inlayPts.push(new THREE.Vector3(0, yApex - 0.036, z));
  }
  const spineCurve = new THREE.CatmullRomCurve3(spinePts);
  const spineGeom = new THREE.TubeGeometry(spineCurve, 32, 0.024, 12, false);
  const spineMesh = new THREE.Mesh(spineGeom, darkTitaniumMaterial);
  skyRoofGroup.add(spineMesh);

  const inlayCurve = new THREE.CatmullRomCurve3(inlayPts);
  const inlayGeom = new THREE.TubeGeometry(inlayCurve, 32, 0.012, 12, false);
  const spineInlay = new THREE.Mesh(inlayGeom, satinAlumMaterial);
  skyRoofGroup.add(spineInlay);

  // Overhead Neuromorphic Starlight Matrix LEDs (Cyan & Pure White Star Points)
  const starlightGeom = new THREE.BoxGeometry(0.006, 0.006, 0.006);
  const cyanStarMat = new THREE.MeshBasicMaterial({ color: CYAN_CORE, toneMapped: false });
  const whiteStarMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });

  for (let st = -14; st <= 14; st++) {
    const t = (st + 14) / 28;
    const z = -0.66 + 1.32 * t;
    const yApex = getCanopyCenterApex(z);
    const xStar = Math.sin(st * 1.8) * 0.035;
    const starMesh = new THREE.Mesh(starlightGeom, Math.abs(st) % 2 === 0 ? cyanStarMat : whiteStarMat);
    starMesh.position.set(xStar, yApex - 0.040, z);
    skyRoofGroup.add(starMesh);
  }

  // Overhead Reading / Mood Dome Lights with Cyan Halos
  for (const dZ of [-0.30, 0.30]) {
    const yApex = getCanopyCenterApex(dZ);
    const domeGeom = new THREE.CylinderGeometry(0.020, 0.020, 0.006, 24);
    const domeMesh = new THREE.Mesh(domeGeom, new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
    domeMesh.position.set(0, yApex - 0.038, dZ);
    skyRoofGroup.add(domeMesh);

    const domeHaloGeom = new THREE.TorusGeometry(0.024, 0.0035, 12, 24);
    const domeHalo = new THREE.Mesh(domeHaloGeom, cyanLedMaterial);
    domeHalo.position.set(0, yApex - 0.038, dZ);
    domeHalo.rotation.x = Math.PI / 2;
    skyRoofGroup.add(domeHalo);
  }

  // Continuous Ambient Cyan Sky Roof Framing Light Ribbons
  for (const side of [-1, 1]) {
    const roofRailLedCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.88, 0.76, 0.95),
      new THREE.Vector3(side * 0.86, 1.14, 0.50),
      new THREE.Vector3(side * 0.84, 1.44, 0.00),
      new THREE.Vector3(side * 0.86, 1.14, -0.50),
      new THREE.Vector3(side * 0.88, 0.76, -0.95),
    ]);
    const roofRailLedGeom = new THREE.TubeGeometry(roofRailLedCurve, 36, 0.008, 8, false);
    const roofRailLed = new THREE.Mesh(roofRailLedGeom, cyanLedMaterial);
    skyRoofGroup.add(roofRailLed);
  }

  interiorGroup.add(skyRoofGroup);

  root.add(interiorGroup);

  // =========================================================================
  // 6. ANIMATION & TELEMETRY LOOP (userData.tick)
  // =========================================================================
  let totalElapsed = 0;
  root.userData.tick = (dt: number, _elapsed: number) => {
    totalElapsed += dt;

    // =======================================================================
    // EXHIBITION SHOWCASE MODE ANIMATION ENGINE (60 FPS)
    // =======================================================================
    // 1. Slow Wheel Rotation for Exhibition Presentation (Smooth, elegant ~9.6s per turn)
    const wheelRollSpeed = 0.65;
    for (const w of animatedWheels) {
      w.rotation.x += wheelRollSpeed * dt;
    }

    // 2. Animated Side LED Strips & Wheel Halos: Traveling energy wave & breathing luminescence
    if (sideBeltlineLedMat && lowerSillLedMat && archLipLedMat && wheelHaloMat) {
      const travelPulse = 0.95 + 0.25 * Math.sin(totalElapsed * 2.8);
      const sillBreath = 0.95 + 0.22 * Math.sin(totalElapsed * 2.0);
      const archPulse = 0.95 + 0.25 * Math.sin(totalElapsed * 2.4 + 0.5);
      const wheelPulse = 0.95 + 0.25 * Math.sin(totalElapsed * 2.0);

      sideBeltlineLedMat.color.setRGB(0.0, 1.25 * travelPulse, 1.45 * travelPulse);
      lowerSillLedMat.color.setRGB(0.0, 1.25 * sillBreath, 1.45 * sillBreath);
      archLipLedMat.color.setRGB(0.80 + 0.25 * archPulse, 1.30 + 0.30 * archPulse, 1.55 + 0.25 * archPulse);
      wheelHaloMat.color.setRGB(0.0, 1.25 * wheelPulse, 1.45 * wheelPulse);
    }

    // 3. Glowing AI Core: Multi-axis gyroscopic rotation, breathing scale & celestial energy modulation
    if (aiOrbGroup && aiOrbOuter && aiOrbInner && aiOrbLight && aiOrbCoreMat) {
      aiOrbOuter.rotation.y += 1.25 * dt;
      aiOrbOuter.rotation.x += 0.65 * dt;
      aiOrbOuter.rotation.z += 0.35 * dt;

      const orbPulse = 1.0 + 0.08 * Math.sin(totalElapsed * 3.6);
      aiOrbInner.scale.setScalar(orbPulse);

      // Levitation floating oscillation
      aiOrbGroup.position.y = 0.69 + 0.012 * Math.sin(totalElapsed * 2.4);

      // Dedicated voice AI breathing aura pulse & celestial color modulation
      const aiAura = 1.0 + 0.30 * Math.sin(totalElapsed * 3.6);
      aiOrbLight.intensity = 2.8 + 1.2 * Math.sin(totalElapsed * 3.6);
      aiOrbCoreMat.color.setRGB(
        0.80 + 0.25 * aiAura,
        1.25 + 0.35 * aiAura,
        1.55 + 0.30 * aiAura
      );
    }

    // 4. Breathing Ambient Lights: Soft Cyan Ground Underglow & Chassis Atmospheric Aura
    if (underglowMat && frontUnderLight && rearUnderLight) {
      const underglowBreath = 0.80 + 0.20 * Math.sin(totalElapsed * 1.8);
      underglowMat.opacity = underglowBreath;
      frontUnderLight.intensity = 4.2 * underglowBreath;
      rearUnderLight.intensity = 4.2 * underglowBreath;
    }

    // Mid-Air Floating Holographic Infotainment Display gentle oscillation
    if (floatingHud) {
      floatingHud.position.y = 0.90 + 0.006 * Math.sin(totalElapsed * 1.8);
    }

    // Rotating Smart Seats subtle autonomous micro-swivel
    if (rotatingSeatLeft && rotatingSeatRight) {
      rotatingSeatLeft.rotation.y = 0.015 * Math.sin(totalElapsed * 0.8);
      rotatingSeatRight.rotation.y = -0.015 * Math.sin(totalElapsed * 0.8);
    }

    // Apple-Style Minimalist Roof Sensor Module: Solid-State Telemetry Ring & Ethereal Glass Breathing Aura
    lidarRing.rotation.z += 3.5 * dt;
    if (roofSensorRingMat) {
      const sensorPulse = 0.95 + 0.25 * Math.sin(totalElapsed * 2.4);
      roofSensorRingMat.color.setRGB(0.0, 1.25 * sensorPulse, 1.45 * sensorPulse);
    }
    if (roofSensorHaloLight) {
      const sensorAuraPulse = 0.85 + 0.15 * Math.sin(totalElapsed * 2.4);
      roofSensorHaloLight.intensity = 0.60 * sensorAuraPulse;
    }

    // Front Illuminated E-Sphere Logo breathing aura pulse
    if (frontLogoLight) {
      const logoPulse = 1.0 + 0.25 * Math.sin(totalElapsed * 2.8);
      frontLogoLight.intensity = 1.6 * logoPulse;
    }

    // Full-Width Front LED Light Bar: Subtle futuristic animated glow & breathing luminescence
    if (frontLightbarCyanMat && frontLightbarCoreMat) {
      // Gentle autonomous breathing pulse (calm period ~2.85s, frequency 2.2 rad/s)
      const glowPulse = 1.0 + 0.25 * Math.sin(totalElapsed * 2.2);
      const corePulse = 1.0 + 0.20 * Math.sin(totalElapsed * 2.2 + 0.35);

      // Subtle cyan color temperature modulation with boosted bloom emission
      frontLightbarCyanMat.color.setRGB(
        0.0,
        1.25 * glowPulse,
        1.45 * glowPulse
      );
      frontLightbarCoreMat.color.setRGB(
        0.80 + 0.25 * corePulse,
        1.30 + 0.30 * corePulse,
        1.55 + 0.25 * corePulse
      );

      // Dedicated front light bar atmospheric glow lights
      if (frontLightbarCenterGlow && frontLightbarLeftGlow && frontLightbarRightGlow) {
        frontLightbarCenterGlow.intensity = 3.6 * glowPulse;
        // Subtle micro-phase shift for organic high-tech wave along the wings
        frontLightbarLeftGlow.intensity = 2.2 * (1.0 + 0.25 * Math.sin(totalElapsed * 2.2 + 0.45));
        frontLightbarRightGlow.intensity = 2.2 * (1.0 + 0.25 * Math.sin(totalElapsed * 2.2 - 0.45));
      }

      if (frontBeam) {
        frontBeam.intensity = 6.5 * (0.95 + 0.15 * Math.sin(totalElapsed * 2.2));
      }
    }

    // =======================================================================
    // Full-Width Rear LED Light Bar: Animated Welcome Sequence
    // =======================================================================
    if (rearLightbarCyanMat && rearLightbarCoreMat && rearBladeMaterials.length === 16) {
      const cyclePeriod = 7.5;
      const tSeq = totalElapsed % cyclePeriod;

      let baseGlow = 0.0;
      let coreGlow = 0.0;
      let sweepWave = 0.0; // Normalized wave position [0, 1] from center to wings
      let flashBoost = 0.0;

      if (tSeq < 0.6) {
        // Phase 1: Dormant Standby / Awakening Pulse
        const p = tSeq / 0.6;
        baseGlow = 0.10 + 0.18 * Math.sin(p * Math.PI);
        coreGlow = 0.12 + 0.35 * Math.sin(p * Math.PI);
        sweepWave = 0.05;
        if (rearLogoLight) rearLogoLight.intensity = 0.4 + 1.2 * Math.sin(p * Math.PI);
      } else if (tSeq < 2.2) {
        // Phase 2: Center-Outward Progressive Cascade Sweep
        const p = (tSeq - 0.6) / 1.6; // 0 to 1
        sweepWave = p;
        baseGlow = 0.20 + 0.70 * p;
        coreGlow = 0.25 + 0.75 * p;
        if (rearLogoLight) rearLogoLight.intensity = 1.4;
      } else if (tSeq < 3.4) {
        // Phase 3: Dual Confirmation Bloom & Flash
        const p = (tSeq - 2.2) / 1.2;
        sweepWave = 1.0;
        const flash1 = Math.max(0, Math.sin(p * Math.PI * 3.5));
        flashBoost = Math.pow(flash1, 2.0) * 0.45;
        baseGlow = 0.90 + flashBoost;
        coreGlow = 0.95 + flashBoost * 1.2;
        if (rearLogoLight) rearLogoLight.intensity = 1.4 + flashBoost * 1.5;
      } else if (tSeq < 6.6) {
        // Phase 4: Autonomous Cruise Breathing Luminescence
        const p = (tSeq - 3.4);
        sweepWave = 1.0;
        const breath = 0.88 + 0.12 * Math.sin(p * 2.2);
        baseGlow = breath;
        coreGlow = 0.90 + 0.10 * Math.sin(p * 2.2 + 0.35);
        if (rearLogoLight) rearLogoLight.intensity = 1.2 * breath;
      } else {
        // Phase 5: Smooth Transition into Next Cycle
        const p = (tSeq - 6.6) / 0.9;
        sweepWave = 1.0 - p * 0.9;
        baseGlow = 0.88 * (1.0 - p * 0.88);
        coreGlow = 0.90 * (1.0 - p * 0.88);
        if (rearLogoLight) rearLogoLight.intensity = 1.2 * (1.0 - p * 0.75);
      }

      // 1. Modulate continuous outer ribbon and laser core
      rearLightbarCyanMat.color.setRGB(
        0.0,
        1.25 * baseGlow,
        1.45 * baseGlow
      );
      rearLightbarCoreMat.color.setRGB(
        0.80 + 0.25 * coreGlow,
        1.30 + 0.30 * coreGlow,
        1.55 + 0.25 * coreGlow
      );

      if (rearLogoHaloMat && rearLogoCoreMat) {
        rearLogoHaloMat.color.setRGB(0.0, 1.25 * baseGlow, 1.45 * baseGlow);
        rearLogoCoreMat.color.setRGB(0.80 + 0.25 * coreGlow, 1.30 + 0.30 * coreGlow, 1.55 + 0.25 * coreGlow);
      }

      // 2. Modulate the 16 matrix blades (8 left, 8 right)
      for (let sideIdx = 0; sideIdx < 2; sideIdx++) {
        for (let k = 0; k < 8; k++) {
          const matIdx = sideIdx * 8 + k;
          const bladeMat = rearBladeMaterials[matIdx];
          const uBlade = k / 7.0; // 0 at center, 1 at fender tip

          let bladeIntensity = 0.12; // minimal pilot light
          if (tSeq >= 0.6 && tSeq < 2.2) {
            // Wave sweep: if wave has reached this blade
            const distFromWave = sweepWave - uBlade;
            if (distFromWave >= 0) {
              const bloom = Math.max(0, 1.0 - distFromWave * 3.0);
              bladeIntensity = 0.85 + 0.95 * bloom;
            } else if (distFromWave > -0.08) {
              bladeIntensity = 0.40;
            }
          } else if (tSeq >= 2.2 && tSeq < 3.4) {
            bladeIntensity = 1.10 + flashBoost * 1.2;
          } else if (tSeq >= 3.4 && tSeq < 6.6) {
            const ripple = Math.sin((tSeq - 3.4) * 2.2 - uBlade * 1.2);
            bladeIntensity = 1.0 + 0.25 * ripple;
          } else if (tSeq >= 6.6) {
            const p = (tSeq - 6.6) / 0.9;
            bladeIntensity = 1.0 * (1.0 - p * 0.90);
          }

          bladeMat.color.setRGB(
            0.0,
            1.25 * bladeIntensity,
            1.45 * bladeIntensity
          );
        }
      }

      // 3. Modulate rear atmospheric glow lights
      if (rearLightbarCenterGlow && rearLightbarLeftGlow && rearLightbarRightGlow && rearTailLight) {
        rearLightbarCenterGlow.intensity = 3.8 * baseGlow;
        rearLightbarLeftGlow.intensity = 2.2 * baseGlow;
        rearLightbarRightGlow.intensity = 2.2 * baseGlow;
        rearTailLight.intensity = 3.5 * baseGlow;
      }
    }
  };

  return root;
}

export function createESphereOneLookDevLights(): THREE.Group {
  const lights = new THREE.Group();
  lights.name = 'e-sphere-one-look-dev-lights';

  // Ambient studio illumination (calibrated for Pearl Metallic Silver & Dark Titanium)
  const ambient = new THREE.AmbientLight(0xf8fafc, 0.65);
  lights.add(ambient);

  // Overhead Studio Softbox Light (Broad ceiling illumination casting smooth reflections across panoramic glass and pearl paint)
  const overheadSoftbox = new THREE.DirectionalLight(0xffffff, 2.8);
  overheadSoftbox.position.set(0, 11, 0);
  lights.add(overheadSoftbox);

  // Key Light (Angled top-front-left for clean form definition and metallic sheen)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(5.5, 8.5, 5.0);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.bias = -0.0001;
  lights.add(keyLight);

  // Left Horizontal Studio Strip Light (Creates razor-thin white reflection horizon along the entire 4.92m beltline)
  const leftStrip = new THREE.DirectionalLight(0xffffff, 2.4);
  leftStrip.position.set(-8.5, 1.3, 0);
  lights.add(leftStrip);

  // Right Horizontal Studio Strip Light (Symmetrical right reflection horizon)
  const rightStrip = new THREE.DirectionalLight(0xffffff, 2.2);
  rightStrip.position.set(8.5, 1.3, 0);
  lights.add(rightStrip);

  // Fill Light (Subtle titanium cool fill preserving metallic luster and form)
  const fillLight = new THREE.DirectionalLight(0x94a3b8, 0.60);
  fillLight.position.set(-6, 4, -4);
  lights.add(fillLight);

  // Rim Light (High specular brilliant white edge highlight along roof canopy & fastback shoulders)
  const rimLight = new THREE.DirectionalLight(0xffffff, 3.8);
  rimLight.position.set(0, 7.5, -8.5);
  lights.add(rimLight);

  // Front Nose Glint Light (Highlights front full-width light bar and pearl metallic hood curvature)
  const noseGlintLight = new THREE.DirectionalLight(0xffffff, 2.0);
  noseGlintLight.position.set(0, 2.6, 7.0);
  lights.add(noseGlintLight);

  // Soft Cyan Underglow Ground Bounce Light (Reflects upward onto sills & titanium arches)
  const groundCyanBounce = new THREE.DirectionalLight(0x00e5ff, 1.4);
  groundCyanBounce.position.set(0, -2.5, 0);
  lights.add(groundCyanBounce);

  // Futuristic Blue Accent Side Fill Light
  const blueSideFill = new THREE.DirectionalLight(0x2563eb, 0.45);
  blueSideFill.position.set(7, 2, 0);
  lights.add(blueSideFill);

  return lights;
}
