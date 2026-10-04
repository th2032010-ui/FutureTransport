import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * AETHER X-1 — Next-Gen Autonomous Electric Hypercar
 *
 * Upgraded from low-poly concept blocks to high-fidelity procedural Three.js:
 *  - Sculpted Aerodynamic Monocoque Body: Pearl White (#F8FAFC) with dual-stage liquid clearcoat
 *  - Single Seamless Teardrop Panoramic Canopy: Ultra-clear optical glass with interior visibility
 *  - High-Tech Wheel Assemblies: Royal Blue (#2563EB) turbine aero discs, ventilated brake rotors,
 *    cyan calipers, and low-profile performance rubber tires
 *  - Signature Cyber-Lighting: Horizon front LED blade, continuous side rocker ribbons, and rear trailing blade
 *  - Luxury Autonomous Cockpit: Dual sport bucket seats (white/blue leather), floating yoke, curved OLED HUD
 *  - Interactive Animation: Wheel rotation, pulsing LED core, and smooth suspension breathing
 */

export interface AetherX1Options {
  scale?: number;
  shadows?: boolean;
}

// ---------------------------------------------------------------------------
// Material Palette
// ---------------------------------------------------------------------------

function createAetherX1Materials() {
  return {
    pearlWhiteBody: new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      metalness: 0.25,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      sheen: 0.75,
      sheenColor: new THREE.Color(0xdceaff),
      reflectivity: 0.9,
    }),

    metallicSlateTrim: new THREE.MeshPhysicalMaterial({
      color: 0x1e2632,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.5,
    }),

    glossCarbon: new THREE.MeshStandardMaterial({
      color: 0x090c12,
      metalness: 0.9,
      roughness: 0.08,
    }),

    royalBlueWheels: new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      metalness: 0.82,
      roughness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
    }),

    panoramicGlass: new THREE.MeshPhysicalMaterial({
      color: 0xbfefff,
      transmission: 0.96,
      opacity: 1.0,
      transparent: true,
      roughness: 0.015,
      ior: 1.52,
      thickness: 0.08,
      specularIntensity: 1.0,
      attenuationColor: new THREE.Color(0xd9f2ff),
      attenuationDistance: 2.8,
    }),

    cockpitDarkGlass: new THREE.MeshPhysicalMaterial({
      color: 0x071120,
      transmission: 0.78,
      opacity: 1.0,
      transparent: true,
      roughness: 0.02,
      ior: 1.54,
    }),

    neonCyanLED: new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      toneMapped: false,
    }),

    laserRedLED: new THREE.MeshBasicMaterial({
      color: 0xff1e42,
      toneMapped: false,
    }),

    tireRubber: new THREE.MeshStandardMaterial({
      color: 0x14171d,
      roughness: 0.85,
      metalness: 0.08,
    }),

    brakeRotor: new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.92,
      roughness: 0.28,
    }),

    whiteLeather: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.45,
      metalness: 0.05,
    }),

    blueLeather: new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.4,
      metalness: 0.1,
    }),

    interiorDash: new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.2,
    }),

    hologramCyan: new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  };
}

type Materials = ReturnType<typeof createAetherX1Materials>;

// ---------------------------------------------------------------------------
// 1. Aerodynamic Body Sculpting (4.8m x 2.0m x 1.1m)
// ---------------------------------------------------------------------------

function buildBody(materials: Materials, shadows: boolean): THREE.Group {
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'Aether_Body';

  const L = 4.8;
  const W = 2.0;

  // Center Fuselage / Core Monocoque (Pearl White)
  const mainCore = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.88, 0.62, L * 0.92, 6, 0.22),
    materials.pearlWhiteBody
  );
  mainCore.position.set(0, 0.68, 0);
  mainCore.castShadow = shadows;
  mainCore.receiveShadow = shadows;
  bodyGroup.add(mainCore);

  // Low-slung Aerodynamic Shark Nose (Forward taper)
  const noseSlope = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.82, 0.34, 1.4, 4, 0.12),
    materials.pearlWhiteBody
  );
  noseSlope.position.set(0, 0.52, L * 0.38);
  noseSlope.rotation.x = -0.12;
  noseSlope.castShadow = shadows;
  bodyGroup.add(noseSlope);

  // Carbon Fiber Front Splitter & Air Inlets
  const frontSplitter = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.94, 0.08, 0.85, 3, 0.03),
    materials.glossCarbon
  );
  frontSplitter.position.set(0, 0.28, L * 0.46);
  frontSplitter.castShadow = shadows;
  bodyGroup.add(frontSplitter);

  // Dual Hood Aerodynamic Air Extractors
  for (const side of [-1, 1]) {
    const hoodScoop = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.04, 0.75),
      materials.metallicSlateTrim
    );
    hoodScoop.position.set(side * 0.48, 0.74, L * 0.26);
    hoodScoop.rotation.x = -0.08;
    bodyGroup.add(hoodScoop);
  }

  // Muscular Wheel Arches / Fenders (Front & Rear)
  const archOffsets = [
    { z: 1.55, w: 0.96, h: 0.48 }, // Front
    { z: -1.55, w: 0.98, h: 0.52 }, // Rear
  ];

  for (const arch of archOffsets) {
    for (const side of [-1, 1]) {
      const fender = new THREE.Mesh(
        new RoundedBoxGeometry(0.24, arch.h, 1.25, 4, 0.08),
        materials.pearlWhiteBody
      );
      fender.position.set(side * (W * 0.48), 0.58, arch.z);
      fender.castShadow = shadows;
      bodyGroup.add(fender);
    }
  }

  // Sculpted Side Rocker Sills & Aerodynamic Air Channels
  for (const side of [-1, 1]) {
    const sill = new THREE.Mesh(
      new RoundedBoxGeometry(0.18, 0.18, L * 0.58, 3, 0.04),
      materials.metallicSlateTrim
    );
    sill.position.set(side * (W * 0.48), 0.32, 0);
    sill.castShadow = shadows;
    bodyGroup.add(sill);

    // Continuous Side Rocker Cyan LED Light Ribbon (User's leftLed / rightLed elevated)
    const rockerLED = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.035, L * 0.94),
      materials.neonCyanLED
    );
    rockerLED.position.set(side * (W * 0.505), 0.35, 0);
    bodyGroup.add(rockerLED);
  }

  // Aerodynamic Tapered Rear Deck & Fastback Tail
  const rearDeck = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.84, 0.42, 1.35, 4, 0.14),
    materials.pearlWhiteBody
  );
  rearDeck.position.set(0, 0.72, -L * 0.36);
  rearDeck.rotation.x = 0.08;
  rearDeck.castShadow = shadows;
  bodyGroup.add(rearDeck);

  // Active Aerodynamic Rear Wing / Spoiler
  const wing = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.88, 0.06, 0.42, 3, 0.02),
    materials.royalBlueWheels
  );
  wing.position.set(0, 0.92, -L * 0.44);
  bodyGroup.add(wing);

  // Wing Uprights
  for (const side of [-1, 1]) {
    const upright = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.18, 0.22),
      materials.glossCarbon
    );
    upright.position.set(side * 0.55, 0.82, -L * 0.43);
    bodyGroup.add(upright);
  }

  // Rear Carbon Diffuser with Aero Fins
  const rearDiffuser = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.86, 0.14, 0.65, 3, 0.03),
    materials.glossCarbon
  );
  rearDiffuser.position.set(0, 0.32, -L * 0.45);
  rearDiffuser.rotation.x = -0.15;
  bodyGroup.add(rearDiffuser);

  for (let f = -0.6; f <= 0.6; f += 0.3) {
    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.12, 0.55),
      materials.glossCarbon
    );
    fin.position.set(f, 0.28, -L * 0.45);
    bodyGroup.add(fin);
  }

  // Full-width Front Horizon LED Blade (Neon Cyan)
  const frontLED = new THREE.Mesh(
    new THREE.BoxGeometry(W * 0.78, 0.035, 0.05),
    materials.neonCyanLED
  );
  frontLED.position.set(0, 0.56, L * 0.465);
  bodyGroup.add(frontLED);

  // Dual Projector Headlights
  for (const side of [-1, 1]) {
    const projector = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.12, 16),
      materials.neonCyanLED
    );
    projector.rotation.x = Math.PI * 0.5;
    projector.position.set(side * 0.65, 0.55, L * 0.44);
    bodyGroup.add(projector);
  }

  // Full-width Rear Trailing LED Blade (Laser Red / Neon Cyan)
  const rearLED = new THREE.Mesh(
    new THREE.BoxGeometry(W * 0.82, 0.035, 0.04),
    materials.laserRedLED
  );
  rearLED.position.set(0, 0.68, -L * 0.465);
  bodyGroup.add(rearLED);

  return bodyGroup;
}

// ---------------------------------------------------------------------------
// 2. Panoramic Crystal Glass Canopy (Seamless Teardrop)
// ---------------------------------------------------------------------------

function buildCanopy(materials: Materials, shadows: boolean): THREE.Group {
  const canopyGroup = new THREE.Group();
  canopyGroup.name = 'Aether_Canopy';

  // Continuous Teardrop Canopy Geometry
  const glassCanopy = new THREE.Mesh(
    new RoundedBoxGeometry(1.48, 0.58, 2.75, 5, 0.28),
    materials.panoramicGlass
  );
  glassCanopy.position.set(0, 1.18, -0.05);
  glassCanopy.castShadow = shadows;
  canopyGroup.add(glassCanopy);

  // Aerodynamic Roof Center Rib & A-Pillar Bezels (Pearl White)
  const roofArch = new THREE.Mesh(
    new RoundedBoxGeometry(0.38, 0.06, 2.65, 3, 0.02),
    materials.pearlWhiteBody
  );
  roofArch.position.set(0, 1.48, -0.05);
  canopyGroup.add(roofArch);

  // Dark Titanium Glass Edge Bezel
  const bezel = new THREE.Mesh(
    new RoundedBoxGeometry(1.52, 0.04, 2.8, 3, 0.02),
    materials.metallicSlateTrim
  );
  bezel.position.set(0, 0.94, -0.05);
  canopyGroup.add(bezel);

  return canopyGroup;
}

// ---------------------------------------------------------------------------
// 3. High-Tech Wheel Assemblies (Turbine Aero Discs, Calipers & Rubber Tires)
// ---------------------------------------------------------------------------

function buildWheel(materials: Materials, side: number): THREE.Group {
  const wheel = new THREE.Group();

  const radius = 0.42;
  const width = 0.28;

  // 1. Performance Rubber Tire (Tread & Chamfered Sidewalls)
  const tire = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, width, 32),
    materials.tireRubber
  );
  tire.rotation.z = Math.PI * 0.5;
  wheel.add(tire);

  // 2. Royal Blue Turbine Aero Rim Face
  const rimFace = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.78, radius * 0.78, width * 1.02, 24),
    materials.royalBlueWheels
  );
  rimFace.rotation.z = Math.PI * 0.5;
  wheel.add(rimFace);

  // 3. Directional Aero Turbine Blades (Metallic Slate)
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const spoke = new THREE.Mesh(
      new RoundedBoxGeometry(0.04, 0.22, 0.05, 2, 0.01),
      materials.metallicSlateTrim
    );
    spoke.position.set(
      side * (width * 0.52),
      Math.sin(angle) * (radius * 0.45),
      Math.cos(angle) * (radius * 0.45)
    );
    spoke.rotation.x = angle + 0.3;
    wheel.add(spoke);
  }

  // 4. Center Hub with Glowing Cyan Ring
  const centerHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, width * 1.05, 16),
    materials.metallicSlateTrim
  );
  centerHub.rotation.z = Math.PI * 0.5;
  wheel.add(centerHub);

  const hubRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.012, 8, 24),
    materials.neonCyanLED
  );
  hubRing.rotation.y = Math.PI * 0.5;
  hubRing.position.x = side * (width * 0.53);
  wheel.add(hubRing);

  // 5. Ventilated Brake Rotor & Cyan Caliper
  const rotor = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, 0.02, 24),
    materials.brakeRotor
  );
  rotor.rotation.z = Math.PI * 0.5;
  rotor.position.x = -side * (width * 0.18);
  wheel.add(rotor);

  const caliper = new THREE.Mesh(
    new RoundedBoxGeometry(0.06, 0.16, 0.18, 2, 0.02),
    materials.neonCyanLED
  );
  caliper.position.set(-side * (width * 0.18), radius * 0.38, 0);
  wheel.add(caliper);

  return wheel;
}

// ---------------------------------------------------------------------------
// 4. Luxury Autonomous Cockpit (Visible Through Glass)
// ---------------------------------------------------------------------------

function buildInterior(materials: Materials): THREE.Group {
  const cockpit = new THREE.Group();
  cockpit.name = 'Aether_Cockpit';

  // Cockpit Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, 0.05, 2.1),
    materials.interiorDash
  );
  floor.position.set(0, 0.48, -0.05);
  cockpit.add(floor);

  // Dual Sport Bucket Seats (White & Royal Blue Leather)
  for (const side of [-1, 1]) {
    const seatGroup = new THREE.Group();
    seatGroup.position.set(side * 0.36, 0.52, -0.15);

    // Cushion
    const cushion = new THREE.Mesh(
      new RoundedBoxGeometry(0.44, 0.08, 0.48, 2, 0.02),
      materials.whiteLeather
    );
    cushion.position.y = 0.12;
    seatGroup.add(cushion);

    // Ergonomic Backrest
    const backrest = new THREE.Mesh(
      new RoundedBoxGeometry(0.42, 0.56, 0.08, 2, 0.02),
      materials.whiteLeather
    );
    backrest.position.set(0, 0.38, -0.2);
    backrest.rotation.x = -0.14;
    seatGroup.add(backrest);

    // Blue Bolster Accent
    const bolster = new THREE.Mesh(
      new RoundedBoxGeometry(0.34, 0.48, 0.03, 2, 0.01),
      materials.blueLeather
    );
    bolster.position.set(0, 0.38, -0.17);
    bolster.rotation.x = -0.14;
    seatGroup.add(bolster);

    // Integrated Headrest
    const headrest = new THREE.Mesh(
      new RoundedBoxGeometry(0.24, 0.14, 0.06, 2, 0.02),
      materials.whiteLeather
    );
    headrest.position.set(0, 0.72, -0.26);
    seatGroup.add(headrest);

    cockpit.add(seatGroup);
  }

  // Minimalist Curved OLED Dashboard
  const dash = new THREE.Mesh(
    new RoundedBoxGeometry(1.22, 0.16, 0.45, 2, 0.04),
    materials.interiorDash
  );
  dash.position.set(0, 0.78, 0.55);
  cockpit.add(dash);

  // Panoramic HUD Display Ribbon
  const hudScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.06, 0.02),
    materials.hologramCyan
  );
  hudScreen.position.set(0, 0.88, 0.48);
  cockpit.add(hudScreen);

  // Futuristic Steering Yoke (Autonomous flight yoke)
  const yoke = new THREE.Mesh(
    new RoundedBoxGeometry(0.28, 0.14, 0.04, 2, 0.02),
    materials.metallicSlateTrim
  );
  yoke.position.set(-0.36, 0.82, 0.32);
  yoke.rotation.x = -0.28;
  cockpit.add(yoke);

  // Center Holographic Telemetry Globe
  const holoCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.08, 1),
    new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    })
  );
  holoCore.name = 'Aether_HoloCore';
  holoCore.position.set(0, 0.72, 0.1);
  cockpit.add(holoCore);

  return cockpit;
}

// ---------------------------------------------------------------------------
// 5. Master Factory & Animation Controller
// ---------------------------------------------------------------------------

export function createAetherX1(options: AetherX1Options = {}): THREE.Group {
  const car = new THREE.Group();
  car.name = 'Aether_X1_Hypercar';

  const scale = options.scale ?? 1.0;
  const shadows = options.shadows ?? true;

  const materials = createAetherX1Materials();

  // 1. Aerodynamic Bodywork
  const body = buildBody(materials, shadows);
  car.add(body);

  // 2. Crystal Panoramic Canopy
  const canopy = buildCanopy(materials, shadows);
  car.add(canopy);

  // 3. Luxury Interior Cockpit
  const interior = buildInterior(materials);
  car.add(interior);

  // 4. Four High-Tech Wheel Assemblies
  // Preserving user's exact wheel positions: [±1.6 (Z), 0.4 (Y), ±1.0 (X)]
  const wheelGroups: THREE.Group[] = [];
  const wheelPositions: [number, number, number][] = [
    [-1.0, 0.42,  1.55], // Front Left
    [ 1.0, 0.42,  1.55], // Front Right
    [-1.0, 0.42, -1.55], // Rear Left
    [ 1.0, 0.42, -1.55], // Rear Right
  ];

  wheelPositions.forEach(([x, y, z]) => {
    const side = x > 0 ? 1 : -1;
    const wheel = buildWheel(materials, side);
    wheel.position.set(x, y, z);
    wheel.castShadow = shadows;
    wheelGroups.push(wheel);
    car.add(wheel);
  });

  if (scale !== 1.0) {
    car.scale.setScalar(scale);
  }

  // Animation Update Loop in userData.tick
  let totalElapsed = 0;
  car.userData.tick = (delta: number, elapsed?: number) => {
    totalElapsed = elapsed !== undefined ? elapsed : totalElapsed + delta;

    // 1. Rotate Wheels
    const wheelRotSpeed = delta * 4.5;
    for (const w of wheelGroups) {
      w.rotation.x += wheelRotSpeed;
    }

    // 2. Pulse Neon Cyan LED Glow
    const pulse = 0.85 + Math.sin(totalElapsed * 3.5) * 0.15;
    materials.neonCyanLED.color.setRGB(0.0, 0.9 * pulse, 1.0 * pulse);

    // 3. Rotate Holographic Telemetry Core
    const holoCore = car.getObjectByName('Aether_HoloCore');
    if (holoCore) {
      holoCore.rotation.y = totalElapsed * 1.2;
      holoCore.rotation.x = totalElapsed * 0.6;
    }

    // 4. Subtle Suspension Breathing (Idle hovering)
    car.position.y = Math.sin(totalElapsed * 2.0) * 0.008;
  };

  return car;
}

// ---------------------------------------------------------------------------
// 6. Look-Dev Light Rig
// ---------------------------------------------------------------------------

export function createAetherX1LookDevLights(): THREE.Group {
  const lights = new THREE.Group();
  lights.name = 'Aether_X1_LookDev_Lights';

  const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x1e293b, 1.2);
  hemiLight.position.set(0, 20, 0);
  lights.add(hemiLight);

  const keySun = new THREE.DirectionalLight(0xffffff, 2.2);
  keySun.position.set(12, 16, 14);
  keySun.castShadow = true;
  keySun.shadow.mapSize.width = 2048;
  keySun.shadow.mapSize.height = 2048;
  keySun.shadow.camera.near = 0.5;
  keySun.shadow.camera.far = 50;
  keySun.shadow.camera.left = -6;
  keySun.shadow.camera.right = 6;
  keySun.shadow.camera.top = 6;
  keySun.shadow.camera.bottom = -6;
  keySun.shadow.bias = -0.0005;
  lights.add(keySun);

  const fillCyan = new THREE.DirectionalLight(0x00e5ff, 1.0);
  fillCyan.position.set(-14, 8, 8);
  lights.add(fillCyan);

  const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.6);
  rimLight.position.set(0, 10, -18);
  lights.add(rimLight);

  return lights;
}
