//Global variables
var scene, camera, renderer;
var geometry, material, mesh;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#6B8E13");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------

  geometry1 = new THREE.ConeGeometry(50, 300, 50);
  geometry2 = new THREE.BoxGeometry(20, 300, 20);
  material = new THREE.MeshBasicMaterial( { color: "#00FFFF" } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh );
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.z += 0.05; //Continuously rotate the mesh
  mesh.rotation.y += 0.05;

  renderer.setClearColor("#6B8E23");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
