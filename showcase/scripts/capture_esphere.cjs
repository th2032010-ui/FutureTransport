const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\Dinh Thien Hoang\\.gemini\\antigravity\\brain\\74a887b5-b804-4ac3-b566-399c40ace869';
const outDir = path.join(artifactDir, 'renders');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  console.log('Launching Edge for capture...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--enable-webgl', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQ FAIL:', req.url(), req.failure() ? req.failure().errorText : ''));
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('unhandledrejection', e => console.error('PAGE REJECTION:', e.reason ? (e.reason.stack || e.reason.message || e.reason) : e));
  });

  // 1. Navigate to Demo Inspector (#/demo/e-sphere-one)
  console.log('Navigating to Demo Inspector (#/demo/e-sphere-one)...');
  await page.goto('http://127.0.0.1:5173/#/demo/e-sphere-one', { waitUntil: 'domcontentloaded' });
  for (let i = 0; i < 20; i++) {
    const ready = await page.evaluate(() => !!document.querySelector('canvas') && !!window.__IMG2THREEJS_VIEWER__);
    if (ready) {
      console.log(`Canvas and viewer detected at T+${i + 1}s!`);
      break;
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  await new Promise(r => setTimeout(r, 1000));

  // Expand canvas to full viewport and hide UI panels
  await page.evaluate(() => {
    document.querySelectorAll('.ldr, .demo-panel, .hint, .status-badge, .drawer, .toolbar, .inspector-panel, .workbench-panel, header, nav, .back-link, .demo-stage-label, .demo-stage-axis').forEach(el => {
      el.style.display = 'none';
    });

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '9999';
    }

    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer) {
      if (viewer.renderer && viewer.camera) {
        viewer.renderer.setSize(1440, 900);
        viewer.camera.aspect = 1440 / 900;
        viewer.camera.updateProjectionMatrix();
        if (viewer.composer) {
          viewer.composer.setSize(1440, 900);
          if (viewer.bloomPass) viewer.bloomPass.resolution.set(1440, 900);
        }
      }
      viewer.turntableSpinning = false;
      viewer.turntableWanted = false;
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Render 1: Hero Front 3/4 Perspective
  console.log('Capturing Hero 3/4 View...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(-5.2, 1.9, 4.4);
      viewer.camera.lookAt(0, 0.55, 0.1);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const heroShot = path.join(outDir, 'esphere_3d_render.png');
  await page.screenshot({ path: heroShot });
  console.log('Saved Hero 3/4 render to:', heroShot);

  // Render 1b: Direct Front View (Full-Width Front LED Light Bar & Illuminated Logo)
  console.log('Capturing Direct Front Light Bar View...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(0, 0.90, 5.0);
      viewer.camera.lookAt(0, 0.55, 1.5);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const frontShot = path.join(outDir, 'esphere_front_view.png');
  await page.screenshot({ path: frontShot });
  console.log('Saved Front View to:', frontShot);

  // Render 1c: Front Light Bar Close-up Perspective (Coast-to-Coast Strip & Jewel Matrix)
  console.log('Capturing Front Light Bar Close-up...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(-1.2, 0.72, 3.6);
      viewer.camera.lookAt(0, 0.54, 2.3);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const frontCloseupShot = path.join(outDir, 'esphere_front_lightbar_closeup.png');
  await page.screenshot({ path: frontCloseupShot });
  console.log('Saved Front Light Bar Close-up to:', frontCloseupShot);

  // Render 2: Sleek Streamliner Side Profile (4.92m Length & Integrated Recessed Wheels)
  console.log('Capturing Streamliner Side Profile...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(-7.6, 1.1, 0);
      viewer.camera.lookAt(0, 0.55, 0);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const sideShot = path.join(outDir, 'esphere_side_view.png');
  await page.screenshot({ path: sideShot });
  console.log('Saved Side Profile to:', sideShot);

  // Render 3: Teardrop Fastback Rear 3/4 View (Kamm-Tail Light Blade & Venturi Diffuser)
  console.log('Capturing Rear Fastback View...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(5.2, 1.9, -4.6);
      viewer.camera.lookAt(0, 0.55, -0.2);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const rearShot = path.join(outDir, 'esphere_rear_view.png');
  await page.screenshot({ path: rearShot });
  console.log('Saved Rear Fastback View to:', rearShot);

  // Render 3b: Direct Rear View (Full-Width Coast-to-Coast LED Light Bar & Rear Logo)
  console.log('Capturing Direct Rear Light Bar View...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(0, 0.85, -5.0);
      viewer.camera.lookAt(0, 0.55, -1.5);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const rearDirectShot = path.join(outDir, 'esphere_direct_rear.png');
  await page.screenshot({ path: rearDirectShot });
  console.log('Saved Direct Rear View to:', rearDirectShot);

  // Render 3c: Rear Light Bar Close-up Perspective (Matrix blades, Diffuser Lens & Curvature)
  console.log('Capturing Rear Light Bar Close-up...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(1.2, 0.72, -3.6);
      viewer.camera.lookAt(0, 0.54, -2.3);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const rearCloseupShot = path.join(outDir, 'esphere_rear_lightbar_closeup.png');
  await page.screenshot({ path: rearCloseupShot });
  console.log('Saved Rear Light Bar Close-up to:', rearCloseupShot);

  // Render 4: Luxury Autonomous Lounge Interior Close-up
  console.log('Capturing Interior Lounge View...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(-2.0, 1.7, 1.4);
      viewer.camera.lookAt(0, 0.65, 0.0);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const interiorShot = path.join(outDir, 'esphere_interior.png');
  await page.screenshot({ path: interiorShot });
  console.log('Saved Interior Lounge View to:', interiorShot);

  // Render 4b: Executive Cockpit & AI Orb Workspace Close-up
  console.log('Capturing Executive Cockpit & AI Orb Workspace...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(-0.85, 0.98, 0.42);
      viewer.camera.lookAt(0.0, 0.57, 0.06);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const cockpitShot = path.join(outDir, 'esphere_cabin_workspace.png');
  await page.screenshot({ path: cockpitShot });
  console.log('Saved Executive Cockpit View to:', cockpitShot);

  // Render 5: Top-Down Teardrop Canopy & AI Sensor Module
  console.log('Capturing Top-Down Canopy & Roof AI Sensor View...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(0.01, 7.8, 0.01);
      viewer.camera.lookAt(0, 0.5, 0);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const topShot = path.join(outDir, 'esphere_top_canopy.png');
  await page.screenshot({ path: topShot });
  console.log('Saved Top Canopy View to:', topShot);

  // Render 5b: Apple-Style Minimalist Roof Sensor Island Close-up
  console.log('Capturing Apple-Style Roof Sensor Island Close-up...');
  await page.evaluate(() => {
    const viewer = window.__IMG2THREEJS_VIEWER__;
    if (viewer && viewer.camera) {
      viewer.camera.position.set(0.0, 2.05, 0.35);
      viewer.camera.lookAt(0, 1.518, 0.035);
      if (viewer.controls) viewer.controls.update();
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const roofSensorShot = path.join(outDir, 'esphere_roof_sensor_island.png');
  await page.screenshot({ path: roofSensorShot });
  console.log('Saved Roof Sensor Island Close-up to:', roofSensorShot);

  // 6. Optional: Capture Workbench View (#/x/e-sphere-one)
  try {
    console.log('Navigating to Workbench (#/x/e-sphere-one)...');
    await page.goto('http://127.0.0.1:5173/#/x/e-sphere-one', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 3000));
    const workbenchShot = path.join(outDir, 'esphere_workbench.png');
    await page.screenshot({ path: workbenchShot });
    console.log('Saved workbench screenshot to:', workbenchShot);
  } catch (e) {
    console.log('Workbench capture skipped:', e.message);
  }

  await browser.close();
  console.log('All captures completed successfully!');
})();
