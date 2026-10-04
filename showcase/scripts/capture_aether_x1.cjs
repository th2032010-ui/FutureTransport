const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\Dinh Thien Hoang\\.gemini\\antigravity\\brain\\74a887b5-b804-4ac3-b566-399c40ace869';
const outDir = path.join(artifactDir, 'renders');
fs.mkdirSync(outDir, { recursive: true });

const distDir = path.join(__dirname, '..', 'dist');

function serveStatic(port) {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    };

    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0].split('#')[0];
      if (reqPath === '/' || !path.extname(reqPath)) {
        reqPath = '/index.html';
      }
      const filePath = path.join(distDir, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        const indexPath = path.join(distDir, 'index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(indexPath).pipe(res);
      }
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve(server);
    });
  });
}

(async () => {
  const PORT = 5202;
  const server = await serveStatic(PORT);

  console.log('Launching browser for capture...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--enable-webgl', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  page.on('console', (msg) => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', (err) => console.log('BROWSER ERROR:', err.message));

  console.log(`Navigating to http://127.0.0.1:${PORT}/#/demo/aether-x1 ...`);
  await page.goto(`http://127.0.0.1:${PORT}/#/demo/aether-x1`, { waitUntil: 'domcontentloaded' });

  for (let i = 0; i < 25; i++) {
    const ready = await page.evaluate(() => !!document.querySelector('canvas') && !!window.__IMG2THREEJS_VIEWER__);
    if (ready) {
      console.log(`Canvas and viewer detected at T+${i + 1}s!`);
      break;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  await new Promise((r) => setTimeout(r, 1500));

  await page.evaluate(() => {
    document
      .querySelectorAll('.ldr, .demo-panel, .hint, .status-badge, .drawer, .toolbar, .inspector-panel, .workbench-panel, header, nav, .back-link, .demo-stage-label, .demo-stage-axis')
      .forEach((el) => {
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
    if (viewer && viewer.renderer && viewer.camera) {
      viewer.renderer.setSize(1440, 900);
      viewer.camera.aspect = 1440 / 900;
      viewer.camera.updateProjectionMatrix();
    }
  });

  const shots = [
    {
      name: 'aether_x1_hero_three_quarters.png',
      desc: 'Hero 3/4 perspective showing shark-nose, canopy and turbine wheels',
      camera: [-4.6, 2.0, 4.4],
      target: [0, 0.7, 0],
    },
    {
      name: 'aether_x1_side_profile.png',
      desc: 'Broadside profile showing 4.8m streamline and rocker LED ribbon',
      camera: [-5.6, 1.2, 0.0],
      target: [0, 0.7, 0.0],
    },
    {
      name: 'aether_x1_front_view.png',
      desc: 'Front low-angle view showing horizon lightbar and carbon splitter',
      camera: [0.0, 1.0, 4.8],
      target: [0, 0.65, 0],
    },
    {
      name: 'aether_x1_rear_view.png',
      desc: 'Rear 3/4 perspective showing active wing, rear LED blade and diffuser',
      camera: [4.4, 2.0, -4.4],
      target: [0, 0.7, 0],
    },
  ];

  for (const shot of shots) {
    console.log(`Framing: ${shot.name}...`);
    await page.evaluate((s) => {
      const viewer = window.__IMG2THREEJS_VIEWER__;
      if (viewer && viewer.camera && viewer.controls) {
        viewer.camera.position.set(...s.camera);
        viewer.controls.target.set(...s.target);
        viewer.controls.update();
        if (viewer.renderer && viewer.scene) {
          viewer.renderer.render(viewer.scene, viewer.camera);
        }
      }
    }, shot);

    await new Promise((r) => setTimeout(r, 600));

    const outPath = path.join(outDir, shot.name);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`Saved: ${outPath}`);
  }

  await browser.close();
  server.close();
  console.log('All Aether X-1 shots captured successfully!');
  process.exit(0);
})();
