import './style.css';
import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(10);
camera.position.setY(1);
camera.position.setZ(50);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xfc0303, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.001;
    torus.rotation.y += 0.001;
    torus.rotation.z += 0.001;

    renderer.render(scene, camera);
}

animate();