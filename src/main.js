import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometries = [];


//Textures
const loader = new THREE.TextureLoader();

const forestFloorTexture = loader.load('../public/resources/textures/forest_leaves_02_diffuse_2k.jpg');
forestFloorTexture.wrapS = THREE.RepeatWrapping;
forestFloorTexture.wrapT = THREE.RepeatWrapping;
forestFloorTexture.repeat.set(2,2);

//Materials
const forestFloorMaterial = new THREE.MeshPhongMaterial({ 
  map: forestFloorTexture,
  //color: 0x00ff00,
  shininess: 20,
  side: THREE.DoubleSide
})

const treeTrunkMaterial = new THREE.MeshPhongMaterial({
  color: 0x5e3933,
  shininess: 10,
  side: THREE.DoubleSide
});

const treeHouseMaterial = new THREE.MeshPhongMaterial({
  color: 0x8a5443,
  shininess: 15,
  side: THREE.DoubleSide
});

//Scene Floor
const forestFloorGeometry = new THREE.BoxGeometry(50,0.5,50);
const forestFloor = new THREE.Mesh( forestFloorGeometry, forestFloorMaterial );
forestFloor.position.y = -1;
geometries.push(forestFloor);

//Tree house Trunk
const treeTrunkRadiusTop =  1;  
const treeTrunkRadiusBottom =  1.1;  
const treeTunkHeight = 10;  
const treeTrunkRadialSegments = 24;  
const treeTrunkGeometry = new THREE.CylinderGeometry(
	treeTrunkRadiusTop, treeTrunkRadiusBottom, treeTunkHeight, treeTrunkRadialSegments
);
const treeTrunk = new THREE.Mesh( treeTrunkGeometry, treeTrunkMaterial );

treeTrunk.position.set(0,4,0);
geometries.push(treeTrunk);

//Tree house floor
const treeHouseFloorGeometry = new THREE.BoxGeometry(8,0.2,8);
const treeHouseFloor = new THREE.Mesh( treeHouseFloorGeometry, treeHouseMaterial);
treeHouseFloor.position.set(0,5,0);
geometries.push(treeHouseFloor);

//Tree House 

//Scene Lighting
const ambient = new THREE.AmbientLight(0xffffff, 1);
ambient.intensity = 1;
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(5, 10, 7.5);
sun.intensity = 3;
scene.add(sun);
// const sunHelper = new THREE.DirectionalLightHelper(sun, 1);
// scene.add(sunHelper);

const controls = new OrbitControls( camera, renderer.domElement );

geometries.forEach(g => {
  scene.add(g);
});

console.log(geometries);

function animate() {

  renderer.render( scene, camera );

}