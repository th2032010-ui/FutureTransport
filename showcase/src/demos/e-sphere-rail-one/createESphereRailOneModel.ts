import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * E-SPHERE RAIL ONE — Smart Green High-Speed Autonomous Maglev Train
 * "Tàu điện thông minh vì một hành tinh xanh"
 *
 * Reconstructed procedurally from official concept poster:
 *  - High-Speed Aerodynamic Bullet Train (350 km/h) Consist on Elevated Maglev Guideway
 *  - Lead Locomotive Car + Articulated Observation Lounge Coach + Aerodynamic Rear Coach
 *  - Finish: Ceramic Pearl White (#F8FAFD), Metallic Slate Skirts (#242B35), Royal Blue Aero Accents (#1D4ED8)
 *  - Signature Lighting: Swept Neon Cyan LED (#00F0FF) lightbar blades, illuminated glowing E-SPHERE vortex badge
 *  - Roof Autonomous Sensor Island: 360° Radar disc, rotating LiDAR optical turret, AI Vision Camera ring
 *  - Photovoltaic Solar Panels: Curved photovoltaic solar cells integrated flush along the roof
 *  - Panoramic Smart Glass: Continuous wrap-around tinted/clear canopy with vertical cyan LED arch runners
 *  - Luxury Interior: Rotating executive captain swivel seats (white & royal blue leather),
 *    biophilic greenery planters, floating holographic route telemetry HUD
 *  - Magnetic Levitation: Maglev bogie skirts with glowing cyan magnetic stator rails
 */

export interface ESphereRailOneOptions {
  scale?: number;
  shadows?: boolean;
  includeTrack?: boolean;
}

// ---------------------------------------------------------------------------
// Procedural Canvas Textures
// ---------------------------------------------------------------------------

function createSolarCellTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#081226';
  ctx.fillRect(0, 0, 512, 512);

  const cellSize = 32;
  const pad = 2;
  for (let y = 0; y < 512; y += cellSize) {
    for (let x = 0; x < 512; x += cellSize) {
      const grad = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize);
      grad.addColorStop(0, '#16284d');
      grad.addColorStop(0.5, '#0c3b6d');
      grad.addColorStop(1, '#081c3b');
      ctx.fillStyle = grad;
      ctx.fillRect(x + pad, y + pad, cellSize - pad * 2, cellSize - pad * 2);

      // Silver busbars
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + cellSize * 0.35, y + pad);
      ctx.lineTo(x + cellSize * 0.35, y + cellSize - pad);
      ctx.moveTo(x + cellSize * 0.65, y + pad);
      ctx.lineTo(x + cellSize * 0.65, y + cellSize - pad);
      ctx.stroke();

      // Micro grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 0.5;
      for (let fy = y + pad + 5; fy < y + cellSize - pad; fy += 6) {
        ctx.beginPath();
        ctx.moveTo(x + pad, fy);
        ctx.lineTo(x + cellSize - pad, fy);
        ctx.stroke();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  return texture;
}

function createLogoBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 512);

  // Cyan Vortex Swirl Emblem
  ctx.save();
  ctx.translate(256, 190);
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 16;
  ctx.lineCap = 'round';

  for (let i = 0; i < 3; i++) {
    ctx.rotate((Math.PI * 2) / 3);
    ctx.beginPath();
    ctx.arc(0, 0, 75, 0, Math.PI * 0.88);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 9;
    ctx.arc(0, 0, 46, 0.35, Math.PI * 0.98);
    ctx.stroke();
  }
  ctx.restore();

  // Typography
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 46px sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '8px';
  ctx.fillText('E-SPHERE', 256, 355);

  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = '#00f0ff';
  ctx.letterSpacing = '10px';
  ctx.fillText('RAIL ONE', 256, 405);

  return new THREE.CanvasTexture(canvas);
}

// ---------------------------------------------------------------------------
// Material Palette
// ---------------------------------------------------------------------------

function createMaterials() {
  const solarTex = createSolarCellTexture();
  const logoTex = createLogoBadgeTexture();

  return {
    pearlWhite: new THREE.MeshPhysicalMaterial({
      color: 0xf8fafd,
      metalness: 0.12,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      sheen: 0.8,
      sheenColor: new THREE.Color(0xdceaff),
      reflectivity: 0.9,
      side: THREE.DoubleSide,
    }),

    metallicSlateHull: new THREE.MeshPhysicalMaterial({
      color: 0x222a36,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    }),

    royalBlueAccent: new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      metalness: 0.45,
      roughness: 0.22,
      clearcoat: 0.8,
    }),

    glossBlackMask: new THREE.MeshPhysicalMaterial({
      color: 0x070a10,
      metalness: 0.9,
      roughness: 0.06,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    }),

    panoramicGlass: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 1.0,
      transparent: true,
      roughness: 0.015,
      ior: 1.52,
      thickness: 0.08,
      specularIntensity: 1.0,
      attenuationColor: new THREE.Color(0xd9f2ff),
      attenuationDistance: 3.5,
      side: THREE.DoubleSide,
    }),

    windshieldDarkGlass: new THREE.MeshPhysicalMaterial({
      color: 0x050e1c,
      transmission: 0.82,
      opacity: 1.0,
      transparent: true,
      roughness: 0.02,
      ior: 1.54,
      thickness: 0.12,
      side: THREE.DoubleSide,
    }),

    neonCyanLED: new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      toneMapped: false,
    }),

    laserCyanEmissive: new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 3.2,
      roughness: 0.1,
    }),

    solarPanels: new THREE.MeshPhysicalMaterial({
      color: 0x182c52,
      map: solarTex,
      metalness: 0.85,
      roughness: 0.16,
      clearcoat: 0.95,
      iridescence: 0.7,
      iridescenceIOR: 1.45,
      side: THREE.DoubleSide,
    }),

    interiorFloor: new THREE.MeshStandardMaterial({
      color: 0x1b222d,
      roughness: 0.35,
      metalness: 0.2,
    }),

    whiteLeather: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.45,
      metalness: 0.05,
    }),

    blueLeather: new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.4,
      metalness: 0.1,
    }),

    plantGreen: new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.6,
      metalness: 0.05,
    }),

    hologramCyan: new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),

    bellowRubber: new THREE.MeshStandardMaterial({
      color: 0x181e24,
      roughness: 0.85,
      metalness: 0.1,
    }),

    guidewayConcrete: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.85,
      metalness: 0.1,
    }),

    guidewaySteel: new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.85,
      roughness: 0.3,
    }),

    logoDecal: new THREE.MeshBasicMaterial({
      map: logoTex,
      transparent: true,
      side: THREE.DoubleSide,
    }),
  };
}

type Materials = ReturnType<typeof createMaterials>;

// ---------------------------------------------------------------------------
// Parametric Lofted Shell Generator with OUTWARD Normals
// ---------------------------------------------------------------------------

function createLoftedSurfaceGeometry(
  zStart: number,
  zEnd: number,
  zSegments: number,
  radialSegments: number,
  profileFn: (z: number) => { width: number; yMin: number; yMax: number; yApex: number }
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let j = 0; j <= zSegments; j++) {
    const tZ = j / zSegments;
    const z = zStart + (zEnd - zStart) * tZ;
    const p = profileFn(z);

    const halfW = p.width * 0.5;
    const yCenter = (p.yMin + p.yMax) * 0.5;
    const yRadius = (p.yMax - p.yMin) * 0.5;

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const angle = u * Math.PI * 2;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const x = cosA * halfW;
      let y = yCenter + sinA * yRadius;

      if (sinA > 0) {
        y = yCenter + Math.pow(sinA, 0.82) * (p.yApex - yCenter);
      } else {
        y = yCenter + sinA * (yCenter - p.yMin);
      }

      positions.push(x, y, z);
      uvs.push(u, tZ);
    }
  }

  // Proper CCW winding for OUTWARD facing surface normals
  const stride = radialSegments + 1;
  for (let j = 0; j < zSegments; j++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = j * stride + i;
      const b = (j + 1) * stride + i;
      const c = (j + 1) * stride + (i + 1);
      const d = j * stride + (i + 1);

      // (a, d, b) and (b, d, c) ensures outward normals
      indices.push(a, d, b);
      indices.push(b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

// ---------------------------------------------------------------------------
// 1. Aerodynamic Lead Locomotive Car
// ---------------------------------------------------------------------------

function buildLeadCar(materials: Materials, shadows: boolean): { group: THREE.Group; lidarTurret: THREE.Object3D } {
  const car = new THREE.Group();
  car.name = 'Lead_Locomotive_Car';

  // Lead Car spans Z = -7.0 to Z = +10.2 (total 17.2m). Nose taper begins at Z = 1.5 to 10.2.
  const leadFullProfile = (z: number) => {
    if (z <= 1.5) {
      return { width: 3.4, yMin: 0.35, yMax: 3.9, yApex: 4.15 };
    }
    const t = Math.min(1.0, (z - 1.5) / 8.7); // 0 at cabin, 1 at tip
    const widthFactor = Math.max(0.04, 1.0 - Math.pow(t, 1.35)); // naturally converges to tip
    const yMin = 0.35 + t * 0.45;
    const yMax = Math.max(yMin + 0.08, 4.15 - Math.pow(t, 1.08) * 3.3); // roof slopes smoothly to tip
    const yApex = yMax + 0.1 * (1.0 - t);
    return {
      width: 3.4 * widthFactor,
      yMin,
      yMax,
      yApex,
    };
  };

  // 1. Aerodynamic Roof Canopy (Pearl White)
  // Covers the upper roof and slopes down into the nose
  const upperShellGeo = createLoftedSurfaceGeometry(-7.0, 10.15, 42, 32, (z) => {
    const p = leadFullProfile(z);
    // Upper section from waistline up
    const waistY = p.yMin + (p.yMax - p.yMin) * 0.28;
    return {
      width: p.width,
      yMin: waistY,
      yMax: p.yMax,
      yApex: p.yApex,
    };
  });
  const upperShell = new THREE.Mesh(upperShellGeo, materials.pearlWhite);
  upperShell.castShadow = shadows;
  upperShell.receiveShadow = shadows;
  car.add(upperShell);

  // 2. Aerodynamic Lower Hull & Skirts (Metallic Slate Hull)
  // Follows the same smooth aerodynamic taper to the tip!
  const lowerHullGeo = createLoftedSurfaceGeometry(-7.0, 10.15, 42, 32, (z) => {
    const p = leadFullProfile(z);
    const waistY = p.yMin + (p.yMax - p.yMin) * 0.32;
    return {
      width: p.width * 0.98,
      yMin: p.yMin,
      yMax: waistY,
      yApex: waistY,
    };
  });
  const lowerHull = new THREE.Mesh(lowerHullGeo, materials.metallicSlateHull);
  lowerHull.castShadow = shadows;
  lowerHull.receiveShadow = shadows;
  car.add(lowerHull);

  // 3. Front Gloss Black Mask Visor (Signature dark face mask)
  const frontMaskGeo = createLoftedSurfaceGeometry(4.2, 10.12, 24, 32, (z) => {
    const p = leadFullProfile(z);
    const maskMin = p.yMin + (p.yMax - p.yMin) * 0.16;
    const maskMax = p.yMax * 0.985;
    return {
      width: p.width * 0.99,
      yMin: maskMin,
      yMax: maskMax,
      yApex: maskMax,
    };
  });
  const frontMask = new THREE.Mesh(frontMaskGeo, materials.glossBlackMask);
  car.add(frontMask);
  // 4. Raked Windshield Cockpit (Glass nestled in the nose)
  const windshieldGeo = createLoftedSurfaceGeometry(2.0, 5.8, 14, 32, (z) => {
    const p = leadFullProfile(z);
    const glassMin = p.yMin + (p.yMax - p.yMin) * 0.44;
    return {
      width: p.width * 1.005,
      yMin: glassMin,
      yMax: p.yMax * 1.002,
      yApex: p.yApex * 1.002,
    };
  });
  const windshield = new THREE.Mesh(windshieldGeo, materials.windshieldDarkGlass);
  car.add(windshield);

  // 5. Swept Front Cyan LED Headlight Blades ("Đèn LED hiện đại")
  // Signature wing-like ribbons sweeping down the nose jawline
  for (const side of [-1, 1]) {
    const bladePoints = [
      new THREE.Vector3(side * 0.22, 0.76, 9.75),
      new THREE.Vector3(side * 0.62, 0.88, 8.85),
      new THREE.Vector3(side * 1.12, 1.16, 7.2),
      new THREE.Vector3(side * 1.45, 1.52, 5.2),
      new THREE.Vector3(side * 1.64, 1.88, 3.2),
      new THREE.Vector3(side * 1.68, 1.88, 1.5),
    ];
    const bladeCurve = new THREE.CatmullRomCurve3(bladePoints);
    const bladeGeo = new THREE.TubeGeometry(bladeCurve, 36, 0.045, 8, false);
    const ledBlade = new THREE.Mesh(bladeGeo, materials.neonCyanLED);
    car.add(ledBlade);

    // Projector Headlight Pods
    const headlampBulb = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 0.16, 16),
      materials.neonCyanLED
    );
    headlampBulb.rotation.x = Math.PI * 0.5;
    headlampBulb.position.set(side * 0.85, 1.02, 8.2);
    car.add(headlampBulb);
  }

  // Continuous Cyan LED Waistline Light Runner along both sides
  for (const side of [-1, 1]) {
    const sillLight = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.05, 8.5),
      materials.neonCyanLED
    );
    sillLight.position.set(side * 1.69, 1.48, -2.75);
    car.add(sillLight);
  }

  // 6. Illuminated Glowing E-SPHERE Vortex Badge on Nose Face
  const badgeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.95, 0.95),
    materials.logoDecal
  );
  badgeMesh.position.set(0, 1.16, 9.88);
  badgeMesh.rotation.x = -0.46;
  car.add(badgeMesh);

  // Soft Front Badge Glow
  const badgeLight = new THREE.PointLight(0x00f0ff, 1.4, 4.5, 1.5);
  badgeLight.position.set(0, 1.18, 10.1);
  car.add(badgeLight);

  // 7. Panoramic Cabin Windows (Lead Car Rear Section Z = -6.5 to 1.5)
  const windowLength = 7.8;
  for (const side of [-1, 1]) {
    const sideGlass = new THREE.Mesh(
      new RoundedBoxGeometry(0.08, 1.68, windowLength, 3, 0.04),
      materials.panoramicGlass
    );
    sideGlass.position.set(side * 1.66, 2.55, -2.6);
    car.add(sideGlass);

    // Vertical Cyan LED Divider Arch Ribs
    for (let z = -windowLength * 0.45; z <= windowLength * 0.45; z += 2.4) {
      const rib = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 1.74, 0.08),
        materials.neonCyanLED
      );
      rib.position.set(side * 1.68, 2.55, -2.6 + z);
      car.add(rib);
    }
  }

  // 8. Roof Autonomous Sensor Island ("CÔNG NGHỆ NỔI BẬT")
  const sensorGroup = new THREE.Group();
  sensorGroup.name = 'Sensor_Island';
  sensorGroup.position.set(0, 4.08, 1.2);

  // Aerodynamic Plinth Base
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.45, 0.28, 32),
    materials.pearlWhite
  );
  plinth.scale.set(1.0, 1.0, 2.2);
  plinth.castShadow = shadows;
  sensorGroup.add(plinth);

  // AI Camera 360° Ring Turret
  const cameraTurret = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 1.0, 0.24, 32),
    materials.glossBlackMask
  );
  cameraTurret.position.y = 0.22;
  sensorGroup.add(cameraTurret);

  // Optical Camera Sensor Lenses
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.08, 16),
      materials.laserCyanEmissive
    );
    lens.position.set(Math.sin(a) * 0.94, 0.22, Math.cos(a) * 0.94);
    lens.rotation.x = Math.PI * 0.5;
    lens.rotation.z = -a;
    sensorGroup.add(lens);
  }

  // Rotating LiDAR Turret
  const lidarTurret = new THREE.Group();
  lidarTurret.position.y = 0.44;
  const lidarDrum = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.75, 0.18, 32),
    materials.metallicSlateHull
  );
  lidarTurret.add(lidarDrum);

  const lidarAperture = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 0.68, 0.06, 32),
    materials.laserCyanEmissive
  );
  lidarTurret.add(lidarAperture);
  sensorGroup.add(lidarTurret);

  // 360° Radar Top Disc
  const radarDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.48, 0.54, 0.12, 32),
    materials.glossBlackMask
  );
  radarDisc.position.y = 0.58;
  sensorGroup.add(radarDisc);

  // Fin Antenna
  const radarFin = new THREE.Mesh(
    new RoundedBoxGeometry(0.05, 0.18, 0.32, 2, 0.02),
    materials.royalBlueAccent
  );
  radarFin.position.set(0, 0.72, 0);
  sensorGroup.add(radarFin);

  car.add(sensorGroup);

  // 9. Photovoltaic Solar Panels on Curved Roof ("Pin năng lượng mặt trời")
  const solarPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(2.35, 7.2),
    materials.solarPanels
  );
  solarPanel.rotation.x = -Math.PI * 0.5;
  solarPanel.position.set(0, 4.16, -2.8);
  car.add(solarPanel);

  // 10. Luxury Interior Lounge Cabin
  buildInteriorCabin(car, windowLength, materials, false);

  // 11. Maglev Levitation Bogies (Underbody)
  buildMaglevBogies(car, [-4.0, 3.2], materials);

  return { group: car, lidarTurret };
}

// ---------------------------------------------------------------------------
// 2. Articulated Passenger Coach Car (Observation Lounge)
// ---------------------------------------------------------------------------

function buildCoachCar(
  materials: Materials,
  shadows: boolean,
  isRear: boolean = false
): { group: THREE.Group } {
  const car = new THREE.Group();
  car.name = isRear ? 'Rear_Coach_Car' : 'Passenger_Lounge_Coach';

  const carLength = 15.5;

  const coachFullProfile = (z: number) => {
    if (isRear && z < -5.5) {
      const t = (-5.5 - z) / 2.2;
      const widthFactor = 1.0 - t * 0.25;
      return {
        width: 3.4 * widthFactor,
        yMin: 0.35 + t * 0.15,
        yMax: 4.15 - t * 0.35,
        yApex: 4.15 - t * 0.35,
      };
    }
    return { width: 3.4, yMin: 0.35, yMax: 3.9, yApex: 4.15 };
  };

  // 1. Aerodynamic Roof Canopy (Pearl White)
  const roofShellGeo = createLoftedSurfaceGeometry(-carLength * 0.5, carLength * 0.5, 26, 32, (z) => {
    const p = coachFullProfile(z);
    const waistY = p.yMin + (p.yMax - p.yMin) * 0.28;
    return {
      width: p.width,
      yMin: waistY,
      yMax: p.yMax,
      yApex: p.yApex,
    };
  });
  const roofShell = new THREE.Mesh(roofShellGeo, materials.pearlWhite);
  roofShell.castShadow = shadows;
  roofShell.receiveShadow = shadows;
  car.add(roofShell);

  // 2. Aerodynamic Lower Hull
  const lowerHullGeo = createLoftedSurfaceGeometry(-carLength * 0.5, carLength * 0.5, 26, 32, (z) => {
    const p = coachFullProfile(z);
    const waistY = p.yMin + (p.yMax - p.yMin) * 0.32;
    return {
      width: p.width * 0.98,
      yMin: p.yMin,
      yMax: waistY,
      yApex: waistY,
    };
  });
  const lowerHull = new THREE.Mesh(lowerHullGeo, materials.metallicSlateHull);
  lowerHull.castShadow = shadows;
  lowerHull.receiveShadow = shadows;
  car.add(lowerHull);

  // Continuous Cyan LED Waistline Light Ribbon
  for (const side of [-1, 1]) {
    const sillLight = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.05, carLength * 0.96),
      materials.neonCyanLED
    );
    sillLight.position.set(side * 1.69, 1.48, 0);
    car.add(sillLight);
  }

  // 3. Continuous Panoramic Observation Windows
  const windowLength = carLength * 0.88;
  for (const side of [-1, 1]) {
    const sideGlass = new THREE.Mesh(
      new RoundedBoxGeometry(0.08, 1.72, windowLength, 3, 0.04),
      materials.panoramicGlass
    );
    sideGlass.position.set(side * 1.66, 2.55, 0);
    car.add(sideGlass);

    // Vertical Cyan LED Dividers & Automated Sliding Door Outlines ("Cửa tự động")
    for (let z = -windowLength * 0.45; z <= windowLength * 0.45; z += 2.5) {
      const rib = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 1.78, 0.08),
        materials.neonCyanLED
      );
      rib.position.set(side * 1.68, 2.55, z);
      car.add(rib);
    }
  }

  // 4. Roof Photovoltaic Solar Panels
  const solarPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(2.35, carLength * 0.88),
    materials.solarPanels
  );
  solarPanel.rotation.x = -Math.PI * 0.5;
  solarPanel.position.set(0, 4.16, 0);
  car.add(solarPanel);

  // 5. Rear Aerodynamic Tail Spoiler & Light Blade (for rear car)
  if (isRear) {
    const spoiler = new THREE.Mesh(
      new RoundedBoxGeometry(3.1, 0.12, 1.4, 3, 0.04),
      materials.royalBlueAccent
    );
    spoiler.position.set(0, 4.02, -carLength * 0.5 - 0.4);
    car.add(spoiler);

    const tailLight = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.08, 0.08),
      materials.neonCyanLED
    );
    tailLight.position.set(0, 1.45, -carLength * 0.5 - 0.6);
    car.add(tailLight);

    // Rear End Closure Cap
    const rearCap = new THREE.Mesh(
      new RoundedBoxGeometry(3.0, 3.2, 0.4, 3, 0.1),
      materials.metallicSlateHull
    );
    rearCap.position.set(0, 2.3, -carLength * 0.5 - 0.2);
    car.add(rearCap);
  }

  // 6. Luxury Interior Cabin
  buildInteriorCabin(car, windowLength, materials, true);

  // 7. Maglev Levitation Bogies
  buildMaglevBogies(car, [-carLength * 0.32, carLength * 0.32], materials);

  return { group: car };
}

// ---------------------------------------------------------------------------
// 3. Articulated Inter-Car Gangway Bellow ("Khớp nối toa")
// ---------------------------------------------------------------------------

function buildGangwayBellow(materials: Materials): THREE.Group {
  const bellow = new THREE.Group();
  bellow.name = 'Inter_Car_Gangway_Bellow';

  const count = 5;
  const depth = 0.7 / count;

  for (let i = 0; i < count; i++) {
    const ring = new THREE.Mesh(
      new RoundedBoxGeometry(3.05, 3.4, depth * 0.75, 2, 0.1),
      materials.bellowRubber
    );
    ring.position.set(0, 2.2, (i - (count - 1) * 0.5) * depth);
    bellow.add(ring);
  }

  // Cyan safety LED outline
  const lightRing = new THREE.Mesh(
    new THREE.BoxGeometry(3.12, 0.04, 0.06),
    materials.neonCyanLED
  );
  lightRing.position.set(0, 2.2, 0);
  bellow.add(lightRing);

  return bellow;
}

// ---------------------------------------------------------------------------
// 4. Interior Luxury Cabin ("NỘI THẤT HIỆN ĐẠI")
// ---------------------------------------------------------------------------

function buildInteriorCabin(
  parent: THREE.Group,
  length: number,
  materials: Materials,
  isObservationLounge: boolean
) {
  const interior = new THREE.Group();
  interior.name = 'Interior_Cabin';

  // Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(3.0, 0.08, length),
    materials.interiorFloor
  );
  floor.position.set(0, 1.62, 0);
  interior.add(floor);

  // Ceiling indirect LED runner
  const ceilingLight = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.04, length * 0.95),
    materials.neonCyanLED
  );
  ceilingLight.position.set(0, 3.55, 0);
  interior.add(ceilingLight);

  // Rotating Executive Captain Swivel Seats ("Ghế ngồi êm ái có thể xoay linh hoạt")
  const spacing = 2.4;
  const halfSpan = length * 0.4;

  for (let z = -halfSpan; z <= halfSpan; z += spacing) {
    for (const side of [-1, 1]) {
      const chair = new THREE.Group();
      chair.position.set(side * 0.95, 1.66, z);
      chair.rotation.y = side * 0.18; // angled toward windows

      // Chrome swivel pedestal
      const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.16, 0.22, 16),
        materials.metallicSlateHull
      );
      chair.add(pedestal);

      // White leather seat cushion
      const seat = new THREE.Mesh(
        new RoundedBoxGeometry(0.68, 0.12, 0.65, 3, 0.04),
        materials.whiteLeather
      );
      seat.position.y = 0.26;
      chair.add(seat);

      // Ergonomic high backrest
      const backrest = new THREE.Mesh(
        new RoundedBoxGeometry(0.64, 0.72, 0.12, 3, 0.04),
        materials.whiteLeather
      );
      backrest.position.set(0, 0.66, -0.26);
      backrest.rotation.x = -0.14;
      chair.add(backrest);

      // Royal Blue Upholstery Inset
      const blueInset = new THREE.Mesh(
        new RoundedBoxGeometry(0.52, 0.62, 0.04, 2, 0.02),
        materials.blueLeather
      );
      blueInset.position.set(0, 0.66, -0.22);
      blueInset.rotation.x = -0.14;
      chair.add(blueInset);

      // Armrests
      for (const armSide of [-1, 1]) {
        const arm = new THREE.Mesh(
          new RoundedBoxGeometry(0.08, 0.22, 0.42, 2, 0.02),
          materials.blueLeather
        );
        arm.position.set(armSide * 0.38, 0.44, -0.06);
        chair.add(arm);
      }

      interior.add(chair);
    }
  }

  // Biophilic Greenery Planters ("Không gian xanh với cây cảnh mini")
  const planterPositions = [
    new THREE.Vector3(0, 1.66, -length * 0.25),
    new THREE.Vector3(0, 1.66, length * 0.25),
  ];

  for (const pos of planterPositions) {
    const pot = new THREE.Mesh(
      new RoundedBoxGeometry(0.65, 0.35, 0.65, 3, 0.04),
      materials.pearlWhite
    );
    pot.position.set(pos.x, pos.y + 0.18, pos.z);
    interior.add(pot);

    for (let f = 0; f < 3; f++) {
      const foliage = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.22 - f * 0.04, 1),
        materials.plantGreen
      );
      foliage.position.set(
        pos.x + (f === 1 ? 0.07 : f === 2 ? -0.07 : 0),
        pos.y + 0.42 + f * 0.12,
        pos.z + (f === 1 ? -0.05 : 0.05)
      );
      interior.add(foliage);
    }
  }

  // Holographic Journey Route Display ("Màn hình hologram hiển thị thông tin hành trình")
  if (isObservationLounge) {
    const hologram = new THREE.Group();
    hologram.name = 'Holographic_Route_HUD';
    hologram.position.set(0, 2.55, 0);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.012, 12, 32),
      materials.hologramCyan
    );
    ring1.rotation.x = Math.PI * 0.42;
    hologram.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.008, 12, 32),
      materials.hologramCyan
    );
    ring2.rotation.y = Math.PI * 0.35;
    hologram.add(ring2);

    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.2, 2),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      })
    );
    hologram.add(globe);

    interior.add(hologram);
  }

  parent.add(interior);
}

// ---------------------------------------------------------------------------
// 5. Magnetic Levitation Bogies ("Hệ thống từ trường hiện đại")
// ---------------------------------------------------------------------------

function buildMaglevBogies(parent: THREE.Group, zOffsets: number[], materials: Materials) {
  const bogieGroup = new THREE.Group();
  bogieGroup.name = 'Maglev_Bogies';

  for (const bz of zOffsets) {
    const bogie = new THREE.Group();
    bogie.position.set(0, 0.38, bz);

    const frame = new THREE.Mesh(
      new RoundedBoxGeometry(3.1, 0.28, 3.2, 3, 0.05),
      materials.metallicSlateHull
    );
    bogie.add(frame);

    for (const side of [-1, 1]) {
      // Stator Core
      const stator = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.22, 3.0),
        materials.glossBlackMask
      );
      stator.position.set(side * 1.35, -0.12, 0);
      bogie.add(stator);

      // Glowing Cyan Magnetic Field Strip
      const statorGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.06, 2.8),
        materials.neonCyanLED
      );
      statorGlow.position.set(side * 1.38, -0.22, 0);
      bogie.add(statorGlow);
    }

    bogieGroup.add(bogie);
  }

  parent.add(bogieGroup);
}

// ---------------------------------------------------------------------------
// 6. Elevated Maglev Monorail Guideway Track
// ---------------------------------------------------------------------------

function buildGuidewayTrack(totalLength: number, materials: Materials, shadows: boolean): THREE.Group {
  const track = new THREE.Group();
  track.name = 'Elevated_Maglev_Guideway';

  const deckY = 0.0;
  const beamW = 3.2;
  const beamH = 0.9;

  // Concrete Deck Beam
  const deckBeam = new THREE.Mesh(
    new THREE.BoxGeometry(beamW, beamH, totalLength),
    materials.guidewayConcrete
  );
  deckBeam.position.set(0, deckY - beamH * 0.5, 0);
  deckBeam.receiveShadow = shadows;
  track.add(deckBeam);

  // Twin Steel Magnetic Reaction Guide Rails
  for (const side of [-1, 1]) {
    const steelRail = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.16, totalLength),
      materials.guidewaySteel
    );
    steelRail.position.set(side * 1.35, deckY + 0.08, 0);
    steelRail.receiveShadow = shadows;
    track.add(steelRail);

    // Glowing Cyan Magnetic Linear Stator Power Strip
    const maglevPower = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.04, totalLength),
      materials.neonCyanLED
    );
    maglevPower.position.set(side * 1.35, deckY + 0.16, 0);
    track.add(maglevPower);
  }

  // Elevated Concrete Pylons / Columns
  const pylonSpacing = 16.0;
  const pylonH = 6.0;
  for (let z = -totalLength * 0.45; z <= totalLength * 0.45; z += pylonSpacing) {
    const pylon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.25, pylonH, 24),
      materials.guidewayConcrete
    );
    pylon.position.set(0, deckY - beamH - pylonH * 0.5, z);
    pylon.castShadow = shadows;
    pylon.receiveShadow = shadows;
    track.add(pylon);

    // Crosshead Pier Cap
    const pierCap = new THREE.Mesh(
      new RoundedBoxGeometry(beamW * 1.35, 0.65, 2.4, 3, 0.1),
      materials.guidewayConcrete
    );
    pierCap.position.set(0, deckY - beamH - 0.32, z);
    pierCap.castShadow = shadows;
    pierCap.receiveShadow = shadows;
    track.add(pierCap);
  }

  return track;
}

// ---------------------------------------------------------------------------
// 7. Master Assembly & Interactive Tick
// ---------------------------------------------------------------------------

export function createESphereRailOneModel(options: ESphereRailOneOptions = {}): THREE.Group {
  const root = new THREE.Group();
  root.name = 'ESphere_Rail_One_Consist';

  const scale = options.scale ?? 1.0;
  const shadows = options.shadows ?? true;
  const includeTrack = options.includeTrack ?? true;

  const materials = createMaterials();

  const trainConsist = new THREE.Group();
  trainConsist.name = 'Train_Consist';

  const COACH_LEN = 15.5;
  const BELLOW_GAP = 0.7;

  // 1. Lead Car (Locomotive / Forward Aero Coach)
  const lead = buildLeadCar(materials, shadows);
  lead.group.position.set(0, 0.1, COACH_LEN * 0.5 + 7.0 + BELLOW_GAP);
  trainConsist.add(lead.group);

  // 2. Gangway Bellow 1
  const bellow1 = buildGangwayBellow(materials);
  bellow1.position.set(0, 0.1, COACH_LEN * 0.5 + BELLOW_GAP * 0.5);
  trainConsist.add(bellow1);

  // 3. Lounge Coach Car
  const coach = buildCoachCar(materials, shadows, false);
  coach.group.position.set(0, 0.1, 0);
  trainConsist.add(coach.group);

  // 4. Gangway Bellow 2
  const bellow2 = buildGangwayBellow(materials);
  bellow2.position.set(0, 0.1, -COACH_LEN * 0.5 - BELLOW_GAP * 0.5);
  trainConsist.add(bellow2);

  // 5. Rear Coach Car
  const rearCoach = buildCoachCar(materials, shadows, true);
  rearCoach.group.position.set(0, 0.1, -(COACH_LEN + BELLOW_GAP));
  trainConsist.add(rearCoach.group);

  root.add(trainConsist);

  // 6. Elevated Maglev Guideway Track
  if (includeTrack) {
    const track = buildGuidewayTrack(75.0, materials, shadows);
    root.add(track);
  }

  if (scale !== 1.0) {
    root.scale.setScalar(scale);
  }

  // Animation Update Loop
  let totalElapsed = 0;
  root.userData.tick = (delta: number, elapsed?: number) => {
    totalElapsed = elapsed !== undefined ? elapsed : totalElapsed + delta;

    // 1. Rotate 360° Roof LiDAR Scanner Turret
    if (lead.lidarTurret) {
      lead.lidarTurret.rotation.y = totalElapsed * 3.5;
    }

    // 2. Maglev Suspension Floating Bob
    const hover = Math.sin(totalElapsed * 2.2) * 0.015;
    trainConsist.position.y = hover;

    // 3. Pulsing Cyan LED Strips
    const pulse = 0.85 + Math.sin(totalElapsed * 4.0) * 0.15;
    materials.neonCyanLED.color.setRGB(0.0, 0.94 * pulse, 1.0 * pulse);

    // 4. Rotate Holographic HUD
    const hologram = coach.group.getObjectByName('Holographic_Route_HUD');
    if (hologram) {
      hologram.rotation.y = totalElapsed * 0.8;
    }
  };

  return root;
}

// ---------------------------------------------------------------------------
// 8. Look-Dev Light Rig
// ---------------------------------------------------------------------------

export function createESphereRailOneLookDevLights(): THREE.Group {
  const lights = new THREE.Group();
  lights.name = 'ESphere_Rail_One_LookDev_Lights';

  const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x1e293b, 1.3);
  hemiLight.position.set(0, 30, 0);
  lights.add(hemiLight);

  const keySun = new THREE.DirectionalLight(0xffffff, 2.5);
  keySun.position.set(22, 28, 25);
  keySun.castShadow = true;
  keySun.shadow.mapSize.width = 2048;
  keySun.shadow.mapSize.height = 2048;
  keySun.shadow.camera.near = 1.0;
  keySun.shadow.camera.far = 120;
  keySun.shadow.camera.left = -35;
  keySun.shadow.camera.right = 35;
  keySun.shadow.camera.top = 30;
  keySun.shadow.camera.bottom = -30;
  lights.add(keySun);

  const fillCyan = new THREE.DirectionalLight(0x38bdf8, 1.4);
  fillCyan.position.set(-25, 12, 15);
  lights.add(fillCyan);

  const rimLight = new THREE.DirectionalLight(0x93c5fd, 2.0);
  rimLight.position.set(0, 18, -35);
  lights.add(rimLight);

  const maglevGlow = new THREE.PointLight(0x00f0ff, 1.8, 45, 1.2);
  maglevGlow.position.set(0, 0.5, 5);
  lights.add(maglevGlow);

  return lights;
}
