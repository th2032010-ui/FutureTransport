import type * as THREE from 'three';
import type { BloomOptions, CameraOrbitLimits, PinnedCaptureCamera } from '../scene';

export interface DemoMetadata {
  /** route id, e.g. 'crown-chest' */
  id: string;
  title: string;
  subjectClass: 'object' | 'character';
  /** 1-2 sentences */
  blurb: string;
  referenceImage: string;
  /**
   * WHAT THE RECONSTRUCTION WAS MEASURED FROM, which is the single most important thing to know when
   * reading any number on this page. Default `image`.
   *
   * `image` — photographs or renders. Only two dimensions are given, so every depth, every cross-section
   * profile and every hidden face is INFERRED, and a silhouette match is the strongest claim available.
   * `model` — an existing 3D asset. Geometry is MEASURED: cross-sections, triangle counts and per-part
   * volumes are read off the reference, so a claim like "the reference's exact triangle count" means
   * something here and could not be stated at all from an image.
   *
   * The two deserve different credit and different scepticism, and a visitor cannot tell them apart from
   * a thumbnail -- a render of a GLB and a photograph look alike.
   */
  referenceKind?: 'image' | 'model';
  /** Where the reference itself can be inspected, when it is something a visitor can open. */
  referenceUrl?: string;
  /** Optional label when the linked asset is an additional reference rather than the source. */
  referenceLabel?: string;
  /** repo-relative path shown in UI */
  sourcePath: string;
  sourceUrl: string;
  generatedWith: string;
  /**
   * The reconstruction prompt this demo was built from — the subject description handed to
   * img2threejs, kept next to the result so the two can be read against each other.
   */
  prompt?: string;
  /** display name of whoever contributed this demo */
  author: string;
  /** link to the author's profile (GitHub, etc.) */
  authorUrl: string;
  /**
   * Optional link to the Tripo asset this demo was generated from. The reconstruction is still
   * code, but where a Tripo generation was the measurement instrument, the asset is part of the
   * provenance and belongs next to the result.
   */
  tripoUrl?: string;
  /** Optional link to the ArtStation artwork the reference image comes from. */
  artstationUrl?: string;
  status: 'placeholder' | 'final';
  /**
   * When this exhibit was last worked on, `YYYY-MM-DD`, taken from the last commit that touched its
   * folder. The gallery is ordered by it, newest first.
   *
   * Recorded here rather than derived: the browser cannot read git history, and a build-time stamp would
   * make every exhibit look updated on every deploy.
   */
  updatedAt: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  cameraFov: number;
  cameraOrbit?: CameraOrbitLimits;
  /** Optional per-demo accent (hex) — themes the panel to the object's signature colour. */
  accent?: string;
  /** Optional radial-gradient backdrop (inner→outer hex) for a themed hero stage. */
  backgroundGradient?: { inner: string; outer: string };
  /** ACES exposure (default 1.0); <1 = darker/moodier to match a low-key reference. */
  exposure?: number;
  /** Scene IBL intensity (default 1.0); <1 = less ambient fill. */
  environmentIntensity?: number;
  /** Tone-mapping operator (default 'aces'); 'agx' preserves saturated crimson/red a Ruby-Doppler
   * blade needs (ACES desaturates pure red toward pink/brown). */
  toneMapping?: 'aces' | 'agx' | 'neutral';
  /** Optional bloom post-processing for glowing LEDs, lasers, and emissive cores. */
  bloom?: boolean | BloomOptions;
  /**
   * Orbit the camera slowly on load, so a subject whose sides differ shows them without a drag
   * (default false). The visitor can stop it from the toolbar, and a drag pauses it either way.
   */
  turntable?: boolean;
  /** Turntable rate in degrees per second for smooth exhibition orbit (default 15). */
  turntableSpeed?: number;
  /** Action id to start automatically once the runtime lands. Skipped in capture mode. */
  defaultAnimation?: string;
  /** Optional deterministic capture framing margin for source plates with tight bounds. */
  captureMargin?: number;
  /** Optional vertical framing correction as a fraction of the measured subject bbox height. */
  captureTargetOffsetY?: number;
  /** Optional reverse-view vertical correction for asymmetric source padding. */
  captureTargetOffsetYBack?: number;
  /** Optional capture-only world-X correction for asymmetric transparent source padding. */
  captureTargetOffsetX?: number;
  /** Optional reverse-view capture correction; the back plate has different transparent padding. */
  captureTargetOffsetXBack?: number;
  /**
   * Explicit review camera per broadside. When present, capture uses these numbers instead of
   * frameForCapture()'s bbox-derived framing, so a geometry change cannot reframe the shot.
   */
  capturePinnedCamera?: { front: PinnedCaptureCamera; back: PinnedCaptureCamera };
}

export interface DemoRuntime {
  /**
   * Installs this demo's own light rig. When provided, the Viewer SKIPS its default studio rig —
   * preventing the double-lighting that washes out a bespoke look-dev setup.
   */
  installLights?: (scene: THREE.Scene) => void;
  /** Adds the model (and any demo-specific lights) to the scene, returns the group. */
  build: (scene: THREE.Scene) => THREE.Group;
  /**
   * Precomputes expensive intermediates while yielding to the browser. The synchronous `build`
   * contract remains unchanged after this promise settles.
   */
  prewarm?: () => Promise<void>;
}

export type DemoEntry = DemoMetadata & DemoRuntime;

type CatalogEntry = DemoMetadata & {
  /** Literal, per-demo imports keep unrelated model code out of the selected exhibit's graph. */
  loadRuntime: () => Promise<DemoRuntime>;
};

const BASE = import.meta.env.BASE_URL;
const REPO = 'https://github.com/img2threejs/img2threejs-showcase/blob/main';

const authored: CatalogEntry[] = [
  {
    id: 'e-sphere-one',
    updatedAt: '2026-10-01',
    title: 'E-Sphere One — Future Personal Transport',
    subjectClass: 'object',
    blurb:
      'A futuristic autonomous electric pod car reconstructed in procedural Three.js from multi-view concept blueprints: ' +
      'aerodynamic egg-capsule shell, glowing cyan neon halo contours, hubless wheels with pulsing LED rings, and panoramic glass dome.',
    referenceImage: `${BASE}references/e-sphere-one.png`,
    referenceKind: 'image',
    sourcePath: 'src/demos/e-sphere-one/createESphereOneModel.ts',
    sourceUrl: `${REPO}/src/demos/e-sphere-one/createESphereOneModel.ts`,
    generatedWith: 'img2threejs v2.0',
    author: 'FutureTransport AI',
    authorUrl: 'https://github.com/img2threejs/img2threejs',
    status: 'final',
    cameraPosition: [-4.6, 2.0, 4.4],
    cameraTarget: [0, 0.65, 0],
    cameraFov: 34,
    turntable: true,
    turntableSpeed: 10,
    environmentIntensity: 1.25,
    exposure: 1.0,
    toneMapping: 'aces',
    loadRuntime: async () => {
      const [THREE, { createESphereOneModel, createESphereOneLookDevLights }] = await Promise.all([
        import('three'),
        import('./e-sphere-one/createESphereOneModel'),
      ]);
      return {
        build: (scene) => {
          scene.background = new THREE.Color(0xf0f5fa);
          scene.fog = new THREE.Fog(0xf0f5fa, 12, 35);
          const group = createESphereOneModel({ shadows: true });
          scene.add(group);
          const lights = createESphereOneLookDevLights();
          scene.add(lights);
          return group;
        },
      };
    },
  },
 ];

/**
 * The gallery, newest first.
 *
 * Sorted here so every consumer -- the workbench filmstrip, the drawers, the router -- agrees on one
 * order. `sort` is stable in every engine this ships to, so exhibits sharing a date keep the order they
 * were authored in rather than shuffling between builds.
 */
const catalog = [...authored]
  .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));

const metadataById = new Map<string, DemoMetadata>();
const catalogById = new Map<string, CatalogEntry>();

/** Lightweight exhibit data used by the landing page, drawers and search. */
export const demos: DemoMetadata[] = catalog.map((entry) => {
  const { loadRuntime: _loadRuntime, ...metadata } = entry;
  metadataById.set(metadata.id, metadata);
  catalogById.set(metadata.id, entry);
  return metadata;
});

export function getDemo(id: string): DemoMetadata | undefined {
  return metadataById.get(id);
}

const runtimeLoads = new Map<string, Promise<DemoEntry>>();

/**
 * Loads exactly one exhibit's executable model code. In-flight and fulfilled loads are shared;
 * rejected loads are evicted so a later user action can retry the network request.
 */
export function loadDemo(id: string): Promise<DemoEntry | undefined> {
  const existing = runtimeLoads.get(id);
  if (existing) return existing;

  const entry = catalogById.get(id);
  const metadata = metadataById.get(id);
  if (!entry || !metadata) return Promise.resolve(undefined);

  let retryable: Promise<DemoEntry>;
  retryable = entry.loadRuntime()
    .then((runtime) => ({ ...metadata, ...runtime }))
    .catch((error: unknown) => {
      if (runtimeLoads.get(id) === retryable) runtimeLoads.delete(id);
      throw error;
    });
  runtimeLoads.set(id, retryable);
  return retryable;
}
