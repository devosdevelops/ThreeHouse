import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const grassPlane = new THREE.BoxGeometry(8,0.5,8);
const grassMaterial = new THREE.MeshPhongMaterial( { 
  color: 0x00ff00,
  shininess: 20,
  side: THREE.DoubleSide
} );
const grass = new THREE.Mesh( grassPlane, grassMaterial );
grass.position.y = -1;
//grass.rotation.z = Math.PI / 2;
scene.add(grass);

const ambient = new THREE.AmbientLight(0xffffff, 1);
ambient.intensity = 1;
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(5, 10, 7.5);
sun.intensity = 3;
scene.add(sun);
const sunHelper = new THREE.DirectionalLightHelper(sun, 1);
scene.add(sunHelper);

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {


  renderer.render( scene, camera );

}