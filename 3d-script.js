const container = document.getElementById('three-container');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0015);

const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.set(0, 1.5, 6);

const renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;

// Lights – neon style
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const neon1 = new THREE.PointLight(0x00ffff, 2, 20);
neon1.position.set(4, 4, 4); scene.add(neon1);

const neon2 = new THREE.PointLight(0xff00ff, 2, 20);
neon2.position.set(-4, -3, 5); scene.add(neon2);

const neon3 = new THREE.PointLight(0x00ff9d, 1.8, 15);
neon3.position.set(0, 6, -3); scene.add(neon3);

// Motherboard base
const board = new THREE.Mesh(
  new THREE.BoxGeometry(7, 0.15, 5),
  new THREE.MeshStandardMaterial({
    color: 0x003322,
    emissive: 0x004d40,
    emissiveIntensity: 0.7,
    metalness: 0.3,
    roughness: 0.45
  })
);
scene.add(board);

// More glowing components (CPU, RAM, etc.)
const cpu = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 0.4, 1.2),
  new THREE.MeshStandardMaterial({color:0x660066, emissive:0xff00ff, emissiveIntensity:1.1})
);
cpu.position.set(0, 0.3, 1.8);
scene.add(cpu);

for(let i=-1.5; i<=1.5; i+=0.8){
  const ram = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.25, 2),
    new THREE.MeshStandardMaterial({color:0x004d99, emissive:0x00aaff, emissiveIntensity:0.9})
  );
  ram.position.set(i, 0.25, 0);
  scene.add(ram);
}

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
