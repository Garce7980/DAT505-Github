var camera, scene, renderer, controls, clock;
var INV_MAX_FPS = 1 / 100, frameDelta = 0;

var floor;


function setup() {
  document.body.style.backgroundColor = '#D8BFD8';
  setupThreeJS();
  setupWorld();

  requestAnimationFrame(function animate() {
    draw();

    frameDelta += clock.getDelta();
    while (frameDelta >= INV_MAX_FPS) {
      update(INV_MAX_FPS);
      frameDelta -= INV_MAX_FPS;
    }

    requestAnimationFrame( animate );
  });
}

function setupThreeJS() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x9db3b5, 0.002);

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.y = 400;
  camera.position.z = 400;
  camera.rotation.x = -45 * Math.PI / 180;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = true;
  renderer.setClearColor(0x9db3b5, 1);

  document.body.appendChild( renderer.domElement );

  clock = new THREE.Clock();
  controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 100;
  controls.lookSpeed = 0.1;
}

function setupWorld() {

  var geo = new THREE.PlaneGeometry(2000, 2000, 40, 40);
  var mat = new THREE.MeshPhongMaterial({color: 0x9db3b5, overdraw: true});
  floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;



  var geometry = new THREE.CubeGeometry( 1, 1, 1 );

  var material = new THREE.MeshPhongMaterial({overdraw: true, color: 0xcccccc,wireframe:true,fog:true});

  var cityGeometry = new THREE.Geometry();
  for (var i = 0; i < 3000; i++) {

    var building = new THREE.Mesh(geometry.clone());


    building.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
    building.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
    building.position.y = Math.floor( Math.random() * 2000 - 1000 ) * 4;
    building.scale.x  = Math.pow(Math.random(), 2) * 50 + 10;
    building.scale.y  = building.scale.x;
    building.scale.z  = building.scale.x;


    THREE.GeometryUtils.merge(cityGeometry, building);
  }


  var city = new THREE.Mesh(cityGeometry, material);


  scene.add(city);



  var light = new THREE.DirectionalLight(0xf9f1c2, 1);
  light.position.set(500, 1500, 1000);
  light.castShadow = true;

  var d = 1000;

  scene.add(light);
}


function draw() {
  renderer.render( scene, camera );
}

function update(delta) {
  controls.update(delta);
  if(controls.object.position.y < floor.position.y + 10){
      controls.object.position.y = 10;
  }

}


setup();
