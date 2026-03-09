import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Generate block positions for a pyramid with the given number of layers.
 * Each layer is a square grid of blocks, each layer smaller than the last.
 * Returns array of { x, y, z, layer } for each block.
 */
export function generatePyramidBlocks(
  layers: number,
  baseSize: number,
  blockSize: number = 1,
  blockHeight: number = 0.5
): { x: number; y: number; z: number; layer: number }[] {
  const blocks: { x: number; y: number; z: number; layer: number }[] = [];

  for (let layer = 0; layer < layers; layer++) {
    const layerSize = baseSize - layer * 2;
    if (layerSize <= 0) break;

    const y = layer * blockHeight;
    const offset = (baseSize - layerSize) / 2;

    for (let row = 0; row < layerSize; row++) {
      for (let col = 0; col < layerSize; col++) {
        blocks.push({
          x: (offset + col - baseSize / 2 + 0.5) * blockSize,
          y,
          z: (offset + row - baseSize / 2 + 0.5) * blockSize,
          layer,
        });
      }
    }
  }

  return blocks;
}

/**
 * Color a block based on its layer and type.
 * Limestone = warm sandy color, granite = reddish, casing = white
 */
function getBlockColor(layer: number, totalLayers: number): THREE.Color {
  // Sandy limestone gradient — darker at base, lighter at top
  const t = layer / totalLayers;
  const r = 0.85 + t * 0.1;
  const g = 0.75 + t * 0.1;
  const b = 0.55 + t * 0.15;
  return new THREE.Color(r, g, b);
}

export interface PyramidViewOptions {
  container: HTMLElement;
  layers?: number;
  baseSize?: number;
  /** Number of blocks currently placed (for build animation) */
  blocksPlaced?: number;
}

export class PyramidView {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private instancedMesh: THREE.InstancedMesh | null = null;
  private totalBlocks: number = 0;
  private allBlocks: { x: number; y: number; z: number; layer: number }[] = [];
  private layers: number;
  private baseSize: number;
  private animationId: number = 0;

  constructor(options: PyramidViewOptions) {
    this.layers = options.layers ?? 20;
    this.baseSize = options.baseSize ?? 40;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // sky blue

    // Camera
    const aspect = options.container.clientWidth / options.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(30, 25, 30);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(options.container.clientWidth, options.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    options.container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 5, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
    sunLight.position.set(30, 40, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    this.scene.add(sunLight);

    // Ground plane (desert sand)
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0xd4b483 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Generate and create pyramid
    this.allBlocks = generatePyramidBlocks(this.layers, this.baseSize);
    this.totalBlocks = this.allBlocks.length;
    this.buildMesh(options.blocksPlaced ?? this.totalBlocks);

    // Handle resize
    const onResize = () => {
      const w = options.container.clientWidth;
      const h = options.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Start render loop
    this.animate();
  }

  /** Build or rebuild the instanced mesh with N blocks placed */
  buildMesh(blocksPlaced: number): void {
    if (this.instancedMesh) {
      this.scene.remove(this.instancedMesh);
      this.instancedMesh.dispose();
    }

    const count = Math.min(blocksPlaced, this.totalBlocks);
    if (count === 0) return;

    const geometry = new THREE.BoxGeometry(0.95, 0.45, 0.95);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    this.instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    this.instancedMesh.castShadow = true;
    this.instancedMesh.receiveShadow = true;

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const block = this.allBlocks[i];
      matrix.setPosition(block.x, block.y, block.z);
      this.instancedMesh.setMatrixAt(i, matrix);

      const blockColor = getBlockColor(block.layer, this.layers);
      // Add slight random variation for visual interest
      const variation = (Math.random() - 0.5) * 0.05;
      color.setRGB(
        blockColor.r + variation,
        blockColor.g + variation,
        blockColor.b + variation
      );
      this.instancedMesh.setColorAt(i, color);
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
    if (this.instancedMesh.instanceColor) {
      this.instancedMesh.instanceColor.needsUpdate = true;
    }

    this.scene.add(this.instancedMesh);
  }

  /** Update the number of visible blocks (for build animation) */
  setBlocksPlaced(n: number): void {
    this.buildMesh(n);
  }

  getTotalBlocks(): number {
    return this.totalBlocks;
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  dispose(): void {
    cancelAnimationFrame(this.animationId);
    this.instancedMesh?.dispose();
    this.renderer.dispose();
  }
}
