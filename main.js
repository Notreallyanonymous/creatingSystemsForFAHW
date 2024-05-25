import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


let selectTag = document.getElementById("itemSelected");
let options = document.getElementById('systemSelected');
options.addEventListener("change" , updateModel );


function updateModel(){
switch(options.value){
  case "Hvac System":
  condenser()
  break;
  case "Water Heater":
  waterHeater()
  break;
  default: 
  console.log("The option selected is not yet programmed")
  break;
}
}

var scene = new THREE.Scene();



function condenser(){
  let generateButton = document.getElementById('generateButton');
  let resetButton = document.getElementById('resetButton');
  options.addEventListener("change" , updateDescription );
  options.addEventListener("change" , enableButton );
  generateButton.addEventListener("click", moveObjects);
  resetButton.addEventListener("click", resetModels);

function updateDescription(){
  selectTag.innerHTML = ""
  if(options.value == "Hvac System"){
    let arrayHvac = ["Compressor", "Condensor Fan", "Condensor Coils"];
    console.log(arrayHvac[1])
    for(let i = 0; i<= arrayHvac.length-1; i++){
      console.log(arrayHvac[i])
      var option = document.createElement("option");
      option.text = arrayHvac[i]
      selectTag.appendChild(option)
    }
  }


}

updateDescription();

function enableButton(){
 generateButton.disabled = false;
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();


const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);
/*
const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);
*/
// Vertex shader
const vertexShader = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalMatrix * normal; // Calculate the normal
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Fragment shader
const fragmentShader = `
    varying vec3 vNormal;
    void main() {
        float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
        gl_FragColor = vec4(.5, .5, .5, 1.0) * intensity;
    }
`;


// fragment shader cylinder
const fragmentShadercylinder = `
    varying vec3 vNormal;
    void main() {
        float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
        gl_FragColor = vec4(.5, .5, .5, 1.0) * intensity;
    }
`;


// Vertex shader
const vertexShadercylinder = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalMatrix * normal; // Calculate the normal
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;


var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
const loader = new THREE.TextureLoader()


  const geometry = new THREE.BoxGeometry( 2, 3.5, 2.4 ,5,5,5); 
  const material = new THREE.ShaderMaterial( {
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  } );
  const cube = new THREE.Mesh( geometry, material ); 
  scene.add( cube );

const size = 10;
const divisions = 30;

const planeForCondensor = new THREE.PlaneGeometry( 2, 3.5 , 1, 10);
const texture = loader.load('https://t3.ftcdn.net/jpg/01/97/58/26/360_F_197582614_AegRZYwcGjpSqzXk2Ye6ohzzqpUvnjBn.jpg')
const materialForCondensor = new THREE.MeshBasicMaterial( { map:texture } );
const plane = new THREE.Mesh( planeForCondensor, materialForCondensor );
scene.add( plane );

plane.position.z = 1.22

const planeForCondensor2 = new THREE.PlaneGeometry( 2.3, 3.5 , 1, 10);
const plane2 = new THREE.Mesh( planeForCondensor2, materialForCondensor );
scene.add( plane2 );

plane2.position.x = 1.01
plane2.rotation.y = Math.PI/2


const plane3 = new THREE.Mesh( planeForCondensor2, materialForCondensor );
scene.add( plane3 );

plane3.position.x = -1.01
plane3.rotation.y = Math.PI/-2

        // Parameters
        const numPoints = 100; // Number of points on the spiral
        const a = 0.001; // Radius of the spiral
        const b = 0.016; // Height of the spiral

        // Generate points along the spiral
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            const t = i / Math.PI * 2;
            const x = (a+b*t) * Math.cos(t);
            const y = (a+b*t) * Math.sin(t);
            points.push(new THREE.Vector3(x, y, 0));
        }

        // Create geometry and material
        const archemSpiral = new THREE.RingGeometry(.1,1,35)
        const textureForFan = loader.load('https://t4.ftcdn.net/jpg/00/88/96/27/360_F_88962760_u9lRjArRClXljZpqfPQTMHv0m4WTdX2O.jpg')
        const materialSpiral = new THREE.MeshBasicMaterial({ map: textureForFan , side: THREE.DoubleSide});

        // Create the line
        const ring = new THREE.Mesh(archemSpiral, materialSpiral);
        
        scene.add(ring);

        ring.position.y = 1.77
        ring.position.x = 0
        ring.rotation.x = 1.57


    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    const geometryCompressor = new THREE.CylinderGeometry( 0.5, 0.5, 1, 15 ); 
    const textureCompressor = loader.load( 'https://as2.ftcdn.net/v2/jpg/01/26/66/71/1000_F_126667196_pW51proVyxF6gZv82QzuVRqdGzcCS2b7.jpg' ); 
    const materialCompressor = new THREE.MeshBasicMaterial( {map: textureCompressor});
    const cylinder = new THREE.Mesh(geometryCompressor, materialCompressor)
    scene.add( cylinder );
    cylinder.position.y = 0.5
    cylinder.position.z = 0
    cylinder.rotation.x= Math.PI/2

  



document.getElementById('progress-container').style.display = 'none';

function hoverPieces(){
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children)
  for(let i =0;i<intersects.length; i++){
    intersects[i].object.material.transparent = true;
    intersects[i].object.material.opacity = 0.5
  }
}

function resetMaterial(){
  for(let i=0;i< scene.children.length;i++){
    if(scene.children[i].material){
      scene.children[i].material.opacity=1.0
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  resetMaterial()
  hoverPieces()
  renderer.render(scene, camera);
}

gsap.to(ring .rotation, {
  duration: 0.15,
  z: ring .rotation.z + Math.PI*2 , 
  repeat: -1// rotate by 180° on y-axis
});


function onPointerMove( event ) {

  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
animate();

window.addEventListener( 'mousemove', onPointerMove );



const cylinderCover = new THREE.CircleGeometry( 0.5, 35 ); 
const cylinderCoverMaterial = new THREE.MeshBasicMaterial({color:0x000000})
const circleCover = new THREE.Mesh( cylinderCover, cylinderCoverMaterial ); 


scene.add(circleCover)

circleCover.position.y = -0.52
circleCover.rotation.x = Math.PI/2


const compressorSquare = new THREE.BoxGeometry( 0.5,0.5,0.5); 
const compressorSquareMesh = new THREE.Mesh( compressorSquare, materialCompressor ); 
cylinder.add( compressorSquareMesh );


  compressorSquareMesh.position.z = -0.5
  compressorSquareMesh.position.y = 0.2


scene.add(circleCover)

circleCover.position.y = -0.52
circleCover.rotation.x = Math.PI/2


let frameCount = 0;
function moveObjects(){
generateButton.disabled = true;


switch(selectTag.value){

  case "Compressor":
  frameCount+= 1;
  cube.position.y +=   .13;
  plane.position.z +=  .11;
  plane2.position.x += .11;
  plane3.position.x -= .11;
  cylinder.position.z +=.05;
  cylinder.rotation.z = Math.PI/2;
  cylinder.add(circleCover)
  console.log(cylinder.position)

    // Check if the desired frame count is reached
    if(frameCount < 50){ // Change 100 to your desired frame count
      // Continue the animation by scheduling the next frame
      console.log("step " +frameCount)
      requestAnimationFrame(moveObjects);
  } 
  if(frameCount==49){
    displayInfo()
    createImages()
    selectTag.innerHTML = ""
    var option = document.createElement("option");
    option.text = "Compressor"
    selectTag.appendChild(option)
  }

break;

case "Condensor Fan":
  frameCount+= 1;
  cube.position.y +=   .13;
  plane.position.z +=  .11;
  plane2.position.x += .11;
  plane3.position.x -= .11;
  ring.position.z +=.05;
  ring.rotation.x = Math.PI;


    // Check if the desired frame count is reached
    if(frameCount < 50){ // Change 100 to your desired frame count
      // Continue the animation by scheduling the next frame
      console.log("step " +frameCount)
      requestAnimationFrame(moveObjects);
  } 

  if(frameCount==49){
    displayInfo()
    createImages()
    selectTag.innerHTML = ""
    var option = document.createElement("option");
    option.text = "Condensor Fan"
    selectTag.appendChild(option)
    }
    break;

   case "Condensor Coils":
    frameCount+= 1;
    plane.position.z += .04;
    plane.position.x += .05
    plane.rotation.y += .01
    // Check if the desired frame count is reached
    if(frameCount < 50){ // Change 100 to your desired frame count
    // Continue the animation by scheduling the next frame
    console.log("step " + frameCount)
    requestAnimationFrame(moveObjects);
    } 
    if(frameCount==49){
    displayInfo()
    createImages()
    selectTag.innerHTML = ""
    var option = document.createElement("option");
    option.text = "Condensor Coils"
    selectTag.appendChild(option)
    }
    break;

    default:
    console.log("Not the right option was selected")
    break;
}
  
}

const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff} );


let line;
let image1Compressor 
let image2Compressor




function createImages(){

  var lineOne =  []
  if(selectTag.value == "Compressor"){
  lineOne.push(new THREE.Vector3(cylinder.position.x,cylinder.position.y, cylinder.position.z))
  lineOne.push(new THREE.Vector3(cylinder.position.x,cylinder.position.y+2, cylinder.position.z))
  lineOne.push(new THREE.Vector3(cylinder.position.x-2,cylinder.position.y+2, cylinder.position.z))
  lineOne.push(new THREE.Vector3(cylinder.position.x-2,cylinder.position.y+3 , cylinder.position.z))

  var lineGeometry = new THREE.BufferGeometry().setFromPoints( lineOne );
  line = new THREE.Line( lineGeometry, lineMaterial );
  scene.add(line)


  const images = new THREE.PlaneGeometry(1.5,1.5);  
  const texture1 = loader.load("https://t3.ftcdn.net/jpg/03/10/69/40/360_F_310694087_nhLU0ZVxXKifP12jeCvRsH3wdEDBYZuB.jpg")
  const materialForImage1 = new THREE.MeshBasicMaterial( { map:texture1  , side: THREE.DoubleSide});
  const texture2 = loader.load("https://as1.ftcdn.net/v2/jpg/04/70/62/52/1000_F_470625271_zkPnaCHgTjEjisky9eogyJkejJlyPdBK.jpg")
  const materialForImage2 = new THREE.MeshBasicMaterial( { map:texture2  , side: THREE.DoubleSide});
  image1Compressor = new THREE.Mesh(images, materialForImage1)
  image2Compressor = new THREE.Mesh(images, materialForImage2)
  scene.add(image1Compressor)
  scene.add(image2Compressor)
  image1Compressor.position.set( lineOne[lineOne.length-1].x,  lineOne[lineOne.length-1].y-0.5, lineOne[lineOne.length-1].z+0.1)
  image1Compressor.rotation.y = Math.PI/6
  image2Compressor.position.set( lineOne[lineOne.length-1].x-1,  lineOne[lineOne.length-1].y+1, lineOne[lineOne.length-1].z)
  image2Compressor.rotation.y = Math.PI/6
}

  if(selectTag.value == "Condensor Fan"){
  lineOne.push(new THREE.Vector3(ring.position.x,ring.position.y+0.5, ring.position.z))
  lineOne.push(new THREE.Vector3(ring.position.x,ring.position.y+2, ring.position.z))
  lineOne.push(new THREE.Vector3(ring.position.x-2,ring.position.y+2, ring.position.z))


  const images = new THREE.PlaneGeometry(1.5,1.5);  
  const texture1 = loader.load("https://t4.ftcdn.net/jpg/05/15/25/51/360_F_515255157_h75nczt91dSg3lL5k3h8oM5mmJscO8Oy.jpg")
  const materialForImage1 = new THREE.MeshBasicMaterial( { map:texture1  , side: THREE.DoubleSide});
  const texture2 = loader.load("https://as1.ftcdn.net/v2/jpg/06/10/28/72/1000_F_610287273_9991xFCvFavAcgdn4fM0z7HZzEg0p92j.jpg")
  const materialForImage2 = new THREE.MeshBasicMaterial( { map:texture2  , side: THREE.DoubleSide});
  image1Compressor = new THREE.Mesh(images, materialForImage1)
  image2Compressor = new THREE.Mesh(images, materialForImage2)
  scene.add(image1Compressor)
  scene.add(image2Compressor)
  image1Compressor.position.set( lineOne[lineOne.length-1].x,  lineOne[lineOne.length-1].y-0.5, lineOne[lineOne.length-1].z+0.1)
  image1Compressor.rotation.y = Math.PI/6
  image2Compressor.position.set( lineOne[lineOne.length-1].x-1,  lineOne[lineOne.length-1].y+1, lineOne[lineOne.length-1].z)
  image2Compressor.rotation.y = Math.PI/6


  var lineGeometry = new THREE.BufferGeometry().setFromPoints( lineOne );
  line = new THREE.Line( lineGeometry, lineMaterial );
  scene.add(line)
  }


  if(selectTag.value == "Condensor Coils"){
    lineOne.push(new THREE.Vector3(plane.position.x,ring.position.y, plane.position.z))
    lineOne.push(new THREE.Vector3(plane.position.x,ring.position.y+2, plane.position.z))
    lineOne.push(new THREE.Vector3(plane.position.x-2,ring.position.y+2, plane.position.z))
  
  
    const images = new THREE.PlaneGeometry(1.5,1.5);  
    const texture1 = loader.load("https://as1.ftcdn.net/v2/jpg/01/37/40/62/1000_F_137406285_710TesOA4jX9GpbyM4EI5ZWngu6ayTiv.jpg")
    const materialForImage1 = new THREE.MeshBasicMaterial( { map:texture1  , side: THREE.DoubleSide});
    const texture2 = loader.load("https://as1.ftcdn.net/v2/jpg/02/20/14/08/1000_F_220140850_Ud72ZjAkTuwalEAOJOjDQQOU0URkpmz9.jpg")
    const materialForImage2 = new THREE.MeshBasicMaterial( { map:texture2  , side: THREE.DoubleSide});
    image1Compressor = new THREE.Mesh(images, materialForImage1)
    image2Compressor = new THREE.Mesh(images, materialForImage2)
    scene.add(image1Compressor)
    scene.add(image2Compressor)
    image1Compressor.position.set( lineOne[lineOne.length-1].x,  lineOne[lineOne.length-1].y-0.5, lineOne[lineOne.length-1].z+0.1)
    image1Compressor.rotation.y = Math.PI/6
    image2Compressor.position.set( lineOne[lineOne.length-1].x-1,  lineOne[lineOne.length-1].y+1, lineOne[lineOne.length-1].z)
    image2Compressor.rotation.y = Math.PI/6
  
  
    var lineGeometry = new THREE.BufferGeometry().setFromPoints( lineOne );
    line = new THREE.Line( lineGeometry, lineMaterial );
    scene.add(line)
    }


}

let table = document.getElementById("dataAppendTest")
let datatable

function resetModels(){
  generateButton.disabled = false;
  if(frameCount==50){
  scene.remove(line) 
  scene.remove(image1Compressor)
  scene.remove(image2Compressor)
  }


switch(selectTag.value){

  case "Compressor":
  frameCount-= 1;
  cube.position.y -=   .13;
  plane.position.z -=  .11;
  plane2.position.x -= .11;
  plane3.position.x += .11;
  cylinder.position.z -=.05;
  cylinder.rotation.z = -Math.PI/2;

    // Check if the desired frame count is reached
    if(frameCount > 0){ // Change 100 to your desired frame count
      // Continue the animation by scheduling the next frame
      console.log("step " + frameCount)
      requestAnimationFrame(resetModels);
  } else {
    updateDescription()
  }

break;
  case "Condensor Fan":
  frameCount-= 1;
  cube.position.y -=   .13;
  plane.position.z -=  .11;
  plane2.position.x -= .11;
  plane3.position.x += .11;
  ring.position.z -=.05;
  ring.rotation.x = Math.PI/2;

    // Check if the desired frame count is reached
    if(frameCount > 0){ // Change 100 to your desired frame count
      // Continue the animation by scheduling the next frame
      console.log("step " + frameCount)
      requestAnimationFrame(resetModels);
  } else {
    updateDescription()
  }


break;

  case "Condensor Coils":
  frameCount-= 1;
  plane.position.z -= .04;
  plane.position.x -= .05
  plane.rotation.y -= .01

    // Check if the desired frame count is reached
    if(frameCount > 0){ // Change 100 to your desired frame count
      // Continue the animation by scheduling the next frame
      console.log("step " + frameCount)
      requestAnimationFrame(resetModels);
  } else {
    updateDescription()
  }


break;
default: 
console.log("No item that is in the codebase was seleceted")
break;
}

}

$('#resetButton').on('click', function(){
  datatable.clear().destroy();
})

// come back to this by the end of the night
function displayInfo(){


if(selectTag.value == "Compressor"){


camera.lookAt(0,0,cylinder.position.z-4)
const dataSet = [
  ["• Description: The compressor is a vital component of an air conditioning (AC) system"],
  ["• Function: The main function of the compressor is to compress the refrigerant gas, increasing its pressure and temperature."],
  ["• Location: It is located inside the condesor unit"], 
  ["• Pricing: 1.5 tons cost range $800-1,400"],
  ["• Pricing: 2.0 tons cost range $900-1,500"],
  ["• Pricing: 2.5 tons cost range $1000-1,700"],
  ["• Pricing: 3.0 tons cost range $1200-3000"],

];

dataSet.forEach(r => {
  var div1 = document.createElement('div');
  div1.innerHTML = r[1];
  r[1] = div1;

  var div3 = document.createElement('div');
  div3.innerHTML = r[3];
  r[3] = div3;
})

datatable = new DataTable('#dataAppendTest', {
  columns: [
      { title: 'Description Of Item: ' }
  ],       
  pageLength : 5,
  lengthMenu: [[5,10,20-1], [5,10,20, 'All']],
  data: dataSet
});
}
if(selectTag.value == "Condensor Fan"){


  camera.lookAt(0,0,cylinder.position.z-4)

  const dataSet = [
    ["• Condenser fans are responsible for dissipating heat from the condenser coils. They help maintain the proper operating temperature of the refrigerant"],
    ["• Condenser fans are designed to move air over the condenser coils, facilitating the release of heat absorbed from the indoor environment. "],
    ["• Consist of a motor, blades, and a protective housing."]
  ];
  
  dataSet.forEach(r => {
    var div1 = document.createElement('div');
    div1.innerHTML = r[1];
    r[1] = div1;
  
    var div3 = document.createElement('div');
    div3.innerHTML = r[3];
    r[3] = div3;
  })
  
  datatable = new DataTable('#dataAppendTest', {
    columns: [
        { title: 'Description Of Item: ' }
    ],     
    pageLength: 5,
    "paging": false,
    data: dataSet
  });
  }

if(selectTag.value == "Condensor Coils"){


  camera.lookAt(0,0,cylinder.position.z-4)

  const dataSet = [
    ["• It is responsible for releasing heat absorbed by the refrigerant gas during the cooling process."],
    ["• The main function of a condenser coil is to transfer heat from the refrigerant gas to the outside air. As the hot refrigerant gas flows through the coil, it releases heat to the surrounding air"]
  ];
  
  dataSet.forEach(r => {
    var div1 = document.createElement('div');
    div1.innerHTML = r[1];
    r[1] = div1;
  
    var div3 = document.createElement('div');
    div3.innerHTML = r[3];
    r[3] = div3;
  })
  
  datatable = new DataTable('#dataAppendTest', {
    columns: [
        { title: 'Description Of Item: ' }
    ],     
    "paging": false,
     pageLength: 5,
    data: dataSet
  });
  }
}
}

let counterWaterHeater = 1

function waterHeater(){

let generateButton = document.getElementById('generateButton');
let resetButton = document.getElementById('resetButton');
options.addEventListener("change" , updateItemSelectTag );
scene.remove.apply(scene, scene.children);




function updateItemSelectTag(){

  if(options.value == "Water Heater"){
    let waterHeaterArray = ["T&P", "Overflow Pipe", "Pilot Light Assembly"];
    console.log(waterHeaterArray[1])
    for(let i = 0; i<= waterHeaterArray.length-1; i++){
      console.log(waterHeaterArray[i])
      var option = document.createElement("option");
      option.text = waterHeaterArray[i]
      selectTag.appendChild(option)
    }

  }
}

updateItemSelectTag()



const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();


const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);
/*
const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);
*/
// Vertex shader
const vertexShader = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalMatrix * normal; // Calculate the normal
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Fragment shader
const fragmentShader = `
    varying vec3 vNormal;
    void main() {
        float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
        gl_FragColor = vec4(.5, .5, .5, 1.0) * intensity;
    }
`;


// fragment shader cylinder
const fragmentShadercylinder = `
    varying vec3 vNormal;
    void main() {
        float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
        gl_FragColor = vec4(.5, .5, .5, 1.0) * intensity;
    }
`;


// Vertex shader
const vertexShadercylinder = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalMatrix * normal; // Calculate the normal
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;


var mouse = new THREE.Vector2();
const loader = new THREE.TextureLoader()

const geometry = new THREE.CylinderGeometry( 1, 1, 6, 32 ); 
const texture = loader.load('https://t3.ftcdn.net/jpg/03/81/63/94/360_F_381639459_9d1BBXXBTTR1JzGQnXprqBd1TvhNDoSD.jpg')
const materialForWaterHeater = new THREE.MeshBasicMaterial( { map:texture } );
const cylinder = new THREE.Mesh( geometry, materialForWaterHeater );
scene.add( cylinder );


const size = 10;
const divisions = 30;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );




function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onPointerMove( event ) {

  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
animate();

window.addEventListener( 'mousemove', onPointerMove );
document.getElementById('progress-container').style.display = 'none';




}

