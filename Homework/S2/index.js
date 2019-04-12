var camera, scene, renderer, geometry, material, mesh;
var texture;

function init() {

	scene = new THREE.Scene();


	geometry1 = new THREE.SphereGeometry( 1, 5, 10 );
  geometry2 = new THREE.SphereGeometry( 1, 5, 10 );
  geometry3 = new THREE.SphereGeometry( 1, 5, 10 );

	texture = new THREE.TextureLoader().load( "texture.jpg" );


	material = new THREE.MeshBasicMaterial( { map: texture} );


	mesh1 = new THREE.Mesh( geometry1, material );
  mesh2 = new THREE.Mesh( geometry2, material );
  mesh3 = new THREE.Mesh( geometry3, material );

	scene.add( mesh1 );
  	scene.add( mesh2 );
    	scene.add( mesh3 );


	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000 );

	camera.position.z = 30;


	renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#EEE8AA");


	renderer.setSize( window.innerWidth, window.innerHeight );


	document.body.appendChild( renderer.domElement );
}

function animate() {

	requestAnimationFrame( animate );


	mesh1.rotation.x += 0.02;

	mesh1.rotation.y += 0.01;

	mesh1.position.y -= 0.2;

  mesh2.rotation.x += 0.05;

	mesh2.rotation.y += 0.01;

	mesh2.position.y -= 0.1;
  mesh2.position.x = 5;

  mesh3.rotation.x += 0.02;

	mesh3.rotation.y += 0.08;

	mesh3.position.y -= 0.3;
  mesh3.position.x = -5;


	if (mesh1.position.y <- 30){
		mesh1.position.y = 35;
		mesh1.position.x = (Math.random() * -20) +10;
	}
  if (mesh2.position.y <- 30){
    mesh2.position.y = 35;
    mesh2.position.x = (Math.random() * -20) +10;
  }
  if (mesh3.position.y <- 30){
		mesh3.position.y = 35;
		mesh3.position.x = (Math.random() * -20) +10;
	}
	
	renderer.render( scene, camera );
}

init();
animate();
