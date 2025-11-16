import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { degToRad, radToDeg } from 'three/src/math/MathUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 5, 15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometries = [];

//Models
const modelLoader = new GLTFLoader();

let torterraModel;
modelLoader.load(
  '/resources/models/torterra/Torterra.gltf',
  function (gltf) {
    torterraModel = gltf.scene;
    torterraModel.scale.set(2, 2, 2);
    torterraModel.position.set(5, -1, 0);
    torterraModel.rotation.y = degToRad(-60);
    scene.add(torterraModel);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let ladderModel;
modelLoader.load(
  '/resources/models/ladder/scene.gltf',
  function (gltf) {
    ladderModel = gltf.scene;
    ladderModel.scale.set(0.02, 0.02, 0.02);
    ladderModel.position.set(2, 5, 4);
    scene.add(ladderModel);
    console.log("ladder model loaded");
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//Textures
const textureLoader = new THREE.TextureLoader();

const forestFloorTexture = textureLoader.load('/resources/textures/forest_leaves_02_diffuse_2k.jpg');
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

const rooftopMaterial = new THREE.MeshPhongMaterial({
  color: 0x334a3d,
  shininess: 25,
  side: THREE.DoubleSide
});

//Scene Floor
const forestFloorGeometry = new THREE.BoxGeometry(50,0.5,50);
const forestFloor = new THREE.Mesh( forestFloorGeometry, forestFloorMaterial );
forestFloor.position.y = -1;
geometries.push(forestFloor);

//Tree house Trunk
const treeTrunkRadiusTop =  0.7;  
const treeTrunkRadiusBottom =  0.9;  
const treeTunkHeight = 15;  
const treeTrunkRadialSegments = 24;  
const treeTrunkGeometry = new THREE.CylinderGeometry(
	treeTrunkRadiusTop, treeTrunkRadiusBottom, treeTunkHeight, treeTrunkRadialSegments
);
const treeTrunk = new THREE.Mesh( treeTrunkGeometry, treeTrunkMaterial );

treeTrunk.position.set(0,7,0);
geometries.push(treeTrunk);

//Tree house floor
const treeHouseFloorGeometry = new THREE.BoxGeometry(8,0.2,8);
const treeHouseFloor = new THREE.Mesh( treeHouseFloorGeometry, treeHouseMaterial);
treeHouseFloor.position.set(0,5,0);
geometries.push(treeHouseFloor);

//Tree House South Wall
const treeHouseSouthWallGeometry = new THREE.BoxGeometry(4,3,0.4);
const treeHouseSouthWall = new THREE.Mesh( treeHouseSouthWallGeometry, treeHouseMaterial);
treeHouseSouthWall.position.set(-1,6.5, 3);
geometries.push(treeHouseSouthWall);

//Tree House North Wall
const treeHouseNorthWallGeometry = new THREE.BoxGeometry(6,3,0.4);
const treeHouseNorthWall = new THREE.Mesh( treeHouseNorthWallGeometry, treeHouseMaterial);
treeHouseNorthWall.position.set(0,6.5, -3);
geometries.push(treeHouseNorthWall);

//Tree House East Wall
const treeHouseEastWallGeometry = new THREE.BoxGeometry(0.4,3,6.4);
const treeHouseEastWall = new THREE.Mesh( treeHouseEastWallGeometry, treeHouseMaterial);
treeHouseEastWall.position.set(3,6.5,0);
geometries.push(treeHouseEastWall);

//Tree House West Wall
const treeHouseWestWallGeometry = new THREE.BoxGeometry(0.4,3,6.4);
const treeHouseWestWall = new THREE.Mesh( treeHouseWestWallGeometry, treeHouseMaterial);
treeHouseWestWall.position.set(-3,6.5,0);
geometries.push(treeHouseWestWall);

//Tree House South Roof 
const treeHouseSouthRoof = createTriangleGeometry(8, 0.4, 2, treeHouseMaterial);
treeHouseSouthRoof.position.set(0,9,3);
geometries.push(treeHouseSouthRoof);

//Tree House North Roof
const treeHouseNorthRoof = createTriangleGeometry(8, 0.4, 2, treeHouseMaterial);
treeHouseNorthRoof.position.set(0,9,-3);
treeHouseNorthRoof.rotation.y = Math.PI;
geometries.push(treeHouseNorthRoof);

//Tree House East Roof
const treeHouseEastRoof = new THREE.BoxGeometry(0.2,4.5,7);
const treeHouseEastRoofMesh = new THREE.Mesh( treeHouseEastRoof, rooftopMaterial);
treeHouseEastRoofMesh.position.set(2,9,0);
treeHouseEastRoofMesh.rotation.z = degToRad(63);
geometries.push(treeHouseEastRoofMesh);

//Tree House West Roof
const treeHouseWestRoof = new THREE.BoxGeometry(0.2,4.5,7);
const treeHouseWestRoofMesh = new THREE.Mesh( treeHouseWestRoof, rooftopMaterial);
treeHouseWestRoofMesh.position.set(-2,9,0);
treeHouseWestRoofMesh.rotation.z = degToRad(-63);
geometries.push(treeHouseWestRoofMesh);

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

function animate() {

  renderer.render( scene, camera );

}

function createTriangleGeometry(baseWidth, depth, height, material) {
  const shape = new THREE.Shape();
  shape.moveTo(-baseWidth / 2, 0);
  shape.lineTo(baseWidth / 2, 0);
  shape.lineTo(0, height);
  shape.closePath();
  const geom = new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: false });
  geom.center(); // center geometry so positioning is easier
  return new THREE.Mesh(geom, material);
}