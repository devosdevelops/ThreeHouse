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

const treeHouse = new THREE.Group();
const tree = new THREE.Group();


//Pivot for Bird Animation
const pivot = new THREE.Object3D();
pivot.position.set(0, 0, 0);
scene.add(pivot);

//Models
const modelLoader = new GLTFLoader();

//Torterra (Tree Turtle Pokemon)
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

//Ladder Model
let ladderModel;
modelLoader.load(
  '/resources/models/ladder/scene.gltf',
  function (gltf) {
    ladderModel = gltf.scene;
    ladderModel.scale.set(0.02, 0.02, 0.02);
    ladderModel.position.set(2, 5, 4);
    scene.add(ladderModel);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


//Talonflame (Bird Pokemon)
let talonflameModel;
modelLoader.load(
  '/resources/models/talonflame/scene.gltf',
  function (gltf) {
    talonflameModel = gltf.scene;
    talonflameModel.position.set(-5, 13, 0);
    talonflameModel = gltf.scene;
    talonflameModel.scale.set(0.6, 0.6, 0.6);
    talonflameModel.rotation.x = degToRad(35);

    pivot.add(talonflameModel);
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

const portraitTexture = textureLoader.load('/resources/textures/portrait.jpg');

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

const treeFolliageMaterial = new THREE.MeshPhongMaterial({
  color: 0x144521,
  shininess: 20,
  side: THREE.DoubleSide
});

const portraitMaterials  = [
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 10
  }),
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 10
  }),
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 10
  }),
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 10
  }),
    new THREE.MeshPhongMaterial({
    map: portraitTexture,
    shininess: 50
  }),
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 10
  })
];


//Scene Floor
const forestFloorGeometry = new THREE.BoxGeometry(50,0.5,50);
const forestFloor = new THREE.Mesh( forestFloorGeometry, forestFloorMaterial );
forestFloor.position.y = -1;
scene.add( forestFloor );

//Tree house Trunk
const treeTrunkGeometry = new THREE.CylinderGeometry(0.7, 0.9, 15, 24);
const treeTrunk = new THREE.Mesh( treeTrunkGeometry, treeTrunkMaterial );

treeTrunk.position.set(0,7,0);
scene.add(treeTrunk);

//Tree house floor
const treeHouseFloorGeometry = new THREE.BoxGeometry(8,0.2,8);
const treeHouseFloor = new THREE.Mesh( treeHouseFloorGeometry, treeHouseMaterial);
treeHouseFloor.position.set(0,5,0);
treeHouse.add(treeHouseFloor);

//Tree House South Wall
const treeHouseSouthWallGeometry = new THREE.BoxGeometry(4,3,0.4);
const treeHouseSouthWall = new THREE.Mesh( treeHouseSouthWallGeometry, treeHouseMaterial);
treeHouseSouthWall.position.set(-1,6.5, 3);
treeHouse.add(treeHouseSouthWall);

//Tree House North Wall
const treeHouseNorthWallGeometry = new THREE.BoxGeometry(6,3,0.4);
const treeHouseNorthWall = new THREE.Mesh( treeHouseNorthWallGeometry, treeHouseMaterial);
treeHouseNorthWall.position.set(0,6.5, -3);
treeHouse.add(treeHouseNorthWall);

//Tree House East Wall
const treeHouseEastWallGeometry = new THREE.BoxGeometry(0.4,3,6.4);
const treeHouseEastWall = new THREE.Mesh( treeHouseEastWallGeometry, treeHouseMaterial);
treeHouseEastWall.position.set(3,6.5,0);
treeHouse.add(treeHouseEastWall);

//Tree House West Wall
const treeHouseWestWallGeometry = new THREE.BoxGeometry(0.4,3,6.4);
const treeHouseWestWall = new THREE.Mesh( treeHouseWestWallGeometry, treeHouseMaterial);
treeHouseWestWall.position.set(-3,6.5,0);
treeHouse.add(treeHouseWestWall);

//Tree House South Roof 
const treeHouseSouthRoof = createTriangleGeometry(8, 0.4, 2, treeHouseMaterial);
treeHouseSouthRoof.position.set(0,9,3);
treeHouse.add(treeHouseSouthRoof);

//Tree House North Roof
const treeHouseNorthRoof = createTriangleGeometry(8, 0.4, 2, treeHouseMaterial);
treeHouseNorthRoof.position.set(0,9,-3);
treeHouseNorthRoof.rotation.y = Math.PI;
treeHouse.add(treeHouseNorthRoof);

//Tree House East Roof
const treeHouseEastRoof = new THREE.BoxGeometry(0.2,4.5,7);
const treeHouseEastRoofMesh = new THREE.Mesh( treeHouseEastRoof, rooftopMaterial);
treeHouseEastRoofMesh.position.set(2,9,0);
treeHouseEastRoofMesh.rotation.z = degToRad(63);
treeHouse.add(treeHouseEastRoofMesh);

//Tree House West Roof
const treeHouseWestRoof = new THREE.BoxGeometry(0.2,4.5,7);
const treeHouseWestRoofMesh = new THREE.Mesh( treeHouseWestRoof, rooftopMaterial);
treeHouseWestRoofMesh.position.set(-2,9,0);
treeHouseWestRoofMesh.rotation.z = degToRad(-63);
treeHouse.add(treeHouseWestRoofMesh);

//Portrait
const portraitGeometry = new THREE.BoxGeometry(1.75, 1.18, 0.1);
const portrait = new THREE.Mesh( portraitGeometry, portraitMaterials);
portrait.position.set(1,7.5,-2.8);
treeHouse.add(portrait);

scene.add(treeHouse);

//TREES

//conifer trunk
const coniferTrunkGeometry = new THREE.CylinderGeometry(0.7, 0.9, 5, 24);
const coniferTrunk = new THREE.Mesh( coniferTrunkGeometry, treeTrunkMaterial);
coniferTrunk.position.y = 1.5;
tree.add(coniferTrunk);

//tree folliage
const treeFolliageGeometry = new THREE.ConeGeometry( 3.3, 5, 16 );
const treeFolliage1 = new THREE.Mesh(treeFolliageGeometry, treeFolliageMaterial);
treeFolliage1.position.y = 6;
const treeFolliage2 = new THREE.Mesh(treeFolliageGeometry, treeFolliageMaterial);
treeFolliage2.position.y = 7.5;
treeFolliage2.scale.set(0.8,0.8,0.8);
const treeFolliage3 = new THREE.Mesh(treeFolliageGeometry, treeFolliageMaterial);
treeFolliage3.position.y = 9;
treeFolliage3.scale.set(0.6,0.6,0.6);
tree.add(treeFolliage1);
tree.add(treeFolliage2);
tree.add(treeFolliage3);



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

function animate() {
  requestAnimationFrame( animate );

  //Bird Animation
  if (talonflameModel) {
    pivot.rotation.y += 0.0005;
    talonflameModel.rotation.x = degToRad(35) + Math.sin(Date.now() * 0.001) * degToRad(10);
  }

  renderer.render( scene, camera );

}

const createTriangleGeometry(baseWidth, depth, height, material) => {
  const shape = new THREE.Shape();
  shape.moveTo(-baseWidth / 2, 0);
  shape.lineTo(baseWidth / 2, 0);
  shape.lineTo(0, height);
  shape.closePath();
  const geom = new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: false });
  geom.center(); // center geometry so positioning is easier
  return new THREE.Mesh(geom, material);
}

const randomTreePosition = () => {
  
}