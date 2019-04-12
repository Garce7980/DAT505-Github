var scene, camera, renderer;
var geometry, material, mesh, threejs, color;

var WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;


var gui = null;


var de2ra = function(degree) {
  return degree*(Math.PI/180);
};

init();
render();

function init(){
  threejs = document.getElementById('threejs');


  scene = new THREE.Scene();


  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x333F47, 1);
  renderer.shadowMap.Enabled = true;
  renderer.shadowMapSoft = true;

  threejs.appendChild(renderer.domElement);


  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1 , 1000);
  camera.position.set(0, 6, 6);
  camera.lookAt(scene.position);
  scene.add(camera);


  geometry = new THREE.CubeGeometry(2, 2, 2);

  geometry1 = new THREE.CubeGeometry(0.1,3,3);

  color = Math.random() * 0xffffff;

  var material = new THREE.MeshLambertMaterial({

    color: color,
    transparent: true
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  mesh.rotation.set(0, 0, 0);
  mesh.rotation.y = de2ra(-90);
  mesh.scale.set(1, 1, 1);
  mesh.doubleSided = true;
  mesh.castShadow = true;
  scene.add(mesh);

  mesh1 = new THREE.Mesh(geometry1, material);
  mesh1.position.set(0, 0, 0);
  mesh1.rotation.set(0, 0, 0);
  mesh1.rotation.y = de2ra(-90);
  mesh1.scale.set(1, 1, 1);
  mesh1.doubleSided = true;
  mesh1.castShadow = true;
  scene.add(mesh1);


  lightingSystem();


  var controller = new function() {
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.positionX = 0;
    this.positionY = 0;
    this.positionZ = 0;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.boxColor = color;
    this.boxOpacity = 1;

    this.cubescaleX = 0.1;
    this.cubescaleY = 1;
    this.cubescaleZ = 1;
    this.cubepositionX = 0;
    this.cubepositionY = 0;
    this.cubepositionZ = 0;
    this.cuberotationX = 0;
    this.cuberotationY = 0;
    this.cuberotationZ = 0;
    this.cubeboxColor = color;
    this.cubeboxOpacity = 1;
  }();

  var gui = new dat.GUI();
  var f1 = gui.addFolder('Scale');
  f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
    mesh.scale.x = (controller.scaleX);
  });
  f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
    mesh.scale.y = (controller.scaleY);
  });
  f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
    mesh.scale.z = (controller.scaleZ);
  });

  var f4 =gui.addFolder('cubeScaleX');
  f4.add(controller,'cubescaleX', 0.1,5).onChange(  function() {
     mesh1.scale.x = (controller.cubescaleX);
  });

  var f2 = gui.addFolder('Position');
  f2.add(controller, 'positionX', -5, 5).onChange( function() {
    mesh.position.x = (controller.positionX);
  });
  f2.add(controller, 'positionY', -5, 5).onChange( function() {
    mesh.position.y = (controller.positionY);
  });
  f2.add(controller, 'positionZ', -5, 5).onChange( function() {
    mesh.position.z = (controller.positionZ);
  });

  var f3 = gui.addFolder('Rotation');
  f3.add(controller, 'rotationX', -180, 180).onChange( function() {
    mesh.rotation.x = de2ra(controller.rotationX);
  });
  f3.add(controller, 'rotationY', -180, 180).onChange( function() {
    mesh.rotation.y = de2ra(controller.rotationY);
  });
  f3.add(controller, 'rotationZ', -180, 180).onChange( function() {
    mesh.rotation.z = de2ra(controller.rotationZ);
  });
  gui.addColor( controller, 'boxColor', color ).onChange( function() {
    mesh.material.color.setHex( dec2hex(controller.boxColor) );
  });

  gui.add( controller, 'boxOpacity', 0.1, 1 ).onChange( function() {
    material.opacity = (controller.boxOpacity);
  });
}


function dec2hex(i) {
  var result = "0x000000";
  if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8){return result;}
}


function render () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

function lightingSystem(){
  var object3d  = new THREE.DirectionalLight('white', 0.15);
  object3d.position.set(6,3,9);
  object3d.name = 'Back light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.60);
  object3d.position.set(-6, -3, 0);
  object3d.name   = 'Key light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.55);
  object3d.position.set(9, 9, 6);
  object3d.name = 'Fill light';
  scene.add(object3d);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 3, 30, 3 );
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 45;
  scene.add( spotLight );
}
