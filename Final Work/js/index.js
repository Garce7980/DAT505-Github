// GLOBALS ======================================================
var camera, scene, renderer, controls, clock,Bplace = [];
var texture;
var INV_MAX_FPS = 1 / 100, frameDelta = 0;

var floor;

//var Object3D;

// SETUP ========================================================

function setup() {
  document.body.style.backgroundColor = '#d7f0f7';
  setupThreeJS();
  setupWorld();

//Execute the animation and ask the browser to call the specified function to update the animation before the next redraw.
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
  scene = new THREE.Scene(); //Define the scene
  scene.fog = new THREE.FogExp2(0x9db3b5, 0.0007);//Define the atomization effect

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 ); //Define the camera and it's index
  camera.position.y = 400;
  camera.position.z = 400;
  camera.rotation.x = -45 * Math.PI / 180;

  renderer = new THREE.WebGLRenderer({antialias: true}); //Define the renderer and it's render effect
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = true;
  renderer.setClearColor(0x454759, 1);

  document.body.appendChild( renderer.domElement );//Output renderer

  clock = new THREE.Clock();
  controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 1000;
  controls.lookSpeed = 0.1;
}

//Ray trigger event
function rayBreathing() {
			document.addEventListener('click', ray);

			function ray() {
				var Sx = event.clientX;
				var Sy = event.clientY;

				var x = (Sx / window.innerWidth) * 2 - 1;
				var y = -(Sy / window.innerHeight) * 2 + 1;

				var raycaster = new THREE.Raycaster();
				raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

				var intersects = raycaster.intersectObjects(Bplace, true); //Bplace

				if(intersects.length > 0) {

					let bone = intersects[0].object
					let name = bone.name
					alert(`Introduction to this planet:${name}`) //Alert the  Dialog

				}
			}
		}

function setupWorld() {

  var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);

  //Create the geometry for the floor
  var geo = new THREE.PlaneGeometry(2000, 2000, 40, 40);
  var mat = new THREE.MeshPhongMaterial({color: 0x9db3b5, overdraw: true,wireframe:true});
  floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  //scene.add(floor);

  //The first planet
  var geometry3 = new THREE.OctahedronGeometry(60,2);
  var material3 = new THREE.MeshPhongMaterial( { color:0x7b68ee,specular: 0xffffff,
                                                 shininess: 5} );
  var  mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.name = 'Happy Planet.Happy children live on the happy planet. The maximum age of all children is no more than 16 years old. Each of them is formed by the happy fruit on the planet. Happy Planet children have a high IQ and creativity. When they grow up, they can visit any other planet in the universe to help those unhappy children.'//设置命名----------
  mesh3.position.x = 500;
  mesh3.position.y = 20;
  mesh3.position.z = 10;
  Bplace.push(mesh3); //put the planet into the Bplace

   //The second planet
    var geometry4 = new THREE.IcosahedronGeometry(70,1);
    var material4 = new THREE.MeshPhongMaterial( { color:0x5686bf,specular: 0xffffff,
                                                   shininess: 5} );
    var  mesh4 = new THREE.Mesh( geometry4, material4 );
    mesh4.name = 'Ocean planet.There is no land on the ocean planet, and all living things live in the sea. On the ocean planet, the mermaid is the master of all things, they even have some mysterious cosmic energy to maintain the natural resources of the entire planet. Ocean Planet is a planet of imperial system, the whole planet is ruled by a sacred mermaid king...'
    mesh4.position.x = 800;
    mesh4.position.y = 1000;
    mesh4.position.z = 100;
    Bplace.push(mesh4);

   //The third planet
    var geometry5 = new THREE.IcosahedronGeometry(80,1);
    var material5 = new THREE.MeshPhongMaterial( { color:0x8b4513,specular: 0xffffff,
                                                   shininess: 5} );
    var  mesh5 = new THREE.Mesh( geometry5, material5 );
    mesh5.name = 'Super Earth.This planet is exactly the same as the Earths ecosystem,but the magic is that the planets resources are hundreds of millions of times the Earths, and has a surprisingly renewable capacity. This is a harmonious planet, and people living on this planet will not cause war because of resource conflicts. People on this planet want to establish trade with the planet and sell energy.'
    mesh5.position.x = -800;
    mesh5.position.y = 30;
    mesh5.position.z = 80;
    Bplace.push(mesh5);

    //The fouth planet
     var geometry6 = new THREE.IcosahedronGeometry(100,1);
     var material6 = new THREE.MeshPhongMaterial( { color:0x470024,specular: 0xffffff,
                                                    shininess: 5} );
     var  mesh6 = new THREE.Mesh( geometry6, material6 );
     mesh6.name = 'Planet of Heaven. All creatures that died on Earth will be born again on this planet. They rely on the special gas on the planet to sustain their lives, and they are not affected by gravity, and they will not die. Everyone living here is waiting to be reunited with their loved ones on Earth. But as time goes by, they will eventually enter the black hole of the universe to circulate life...'
     mesh6.position.x = 1000;
     mesh6.position.y = 20;
     mesh6.position.z = 50;
     Bplace.push(mesh6);

     //The fifth planet
      var geometry7 = new THREE.IcosahedronGeometry(100,1);
      var material7 = new THREE.MeshPhongMaterial( { color:0xffff2b,specular: 0xffffff,
                                                     shininess: 5} );
      var  mesh7 = new THREE.Mesh( geometry7, material7 );
      mesh7.name = 'Gold planet. This planet may be the most desirable place for humans. Perhaps because of the special material structure, the entire planet is a huge piece of gold. There are no signs of biological activity on the planet. But what is the value of this gold if it is in the universe?'
      mesh7.position.x = 100;
      mesh7.position.y = 1000;
      mesh7.position.z = 200;
      Bplace.push(mesh7);

      //The sixth planet
       var geometry8 = new THREE.IcosahedronGeometry(150,1);
       var material8 = new THREE.MeshPhongMaterial( { color:0x16171a,specular: 0xffffff,
                                                      shininess: 0} );
       var  mesh8 = new THREE.Mesh( geometry8, material8 );
       mesh8.name = 'Black planet. A planet that cannot accept light. The creatures living on this planet have no eyes. For tens of thousands of years, they have survived on the planet with their ears and other organs. So you never know what you will see when the planet is illuminated...'
       mesh8.position.x = 100;
       mesh8.position.y = -500;
       mesh8.position.z = 200;
       Bplace.push(mesh8);

      //Asteroid that revolves around the mesh5
       var pivotPoint2 = new THREE.Object3D();// Set a pivotPoint
       mesh5.add(pivotPoint2); //Put the pivot point in the star

       var geo13 = new THREE.OctahedronGeometry(8,1);
       var mat13 = new THREE.MeshPhongMaterial({color:0xff6347,fog:true});

       var gmesh13 = new THREE.Mesh(geo13, mat13);
       gmesh13.position.x = 50;
       gmesh13.position.y = 100;
       gmesh13.position.z = 80;
       pivotPoint2.add(gmesh13);//Put the asteroid into the pivotpoint

       var geo14 = new THREE.OctahedronGeometry(6,1);
       var mat14 = new THREE.MeshPhongMaterial({color:0x7fffd4,fog:true});

       var gmesh14 = new THREE.Mesh(geo14, mat14);
       gmesh14.position.x = 50;
       gmesh14.position.y = 100;
       gmesh14.position.z = 40;
       pivotPoint2.add(gmesh14);

       var geo15 = new THREE.OctahedronGeometry(6,1);
       var mat15 = new THREE.MeshPhongMaterial({color:0x1e90ff,fog:true});

       var gmesh15 = new THREE.Mesh(geo15, mat15);
       gmesh15.position.x = 50;
       gmesh15.position.y = -100;
       gmesh15.position.z = 40;
       pivotPoint2.add(gmesh15);

       var geo16 = new THREE.OctahedronGeometry(6,1);
       var mat16 = new THREE.MeshPhongMaterial({color:0x5000b8,fog:true});

       var gmesh16 = new THREE.Mesh(geo16, mat16);
       gmesh16.position.x = 50;
       gmesh16.position.y = -100;
       gmesh16.position.z = -80;
       pivotPoint2.add(gmesh16);

       var geo17 = new THREE.OctahedronGeometry(6,1);
       var mat17 = new THREE.MeshPhongMaterial({color:0xbd2929,fog:true});

       var gmesh17 = new THREE.Mesh(geo17, mat17);
       gmesh17.position.x = 50;
       gmesh17.position.y = -50;
       gmesh17.position.z = -100;
       pivotPoint2.add(gmesh17);

       var geo18 = new THREE.OctahedronGeometry(6,1);
       var mat18 = new THREE.MeshPhongMaterial({color:0x7fffd4,fog:true});

       var gmesh18 = new THREE.Mesh(geo18, mat18);
       gmesh18.position.x = 50;
       gmesh18.position.y = 100;
       gmesh18.position.z = 55;
       pivotPoint2.add(gmesh18);

     //mesh7的公转小行星
      var pivotPoint1 = new THREE.Object3D();
      mesh7.add(pivotPoint1); //把轴点放进mesh3行星中
     //制造mesh3的公转小行星
      var geo11 = new THREE.OctahedronGeometry(30,1);
      var mat11 = new THREE.MeshPhongMaterial({color:0xff6347,fog:true});

      var gmesh11 = new THREE.Mesh(geo11, mat11);
      gmesh11.position.x = 100;
      gmesh11.position.y = 30;
      gmesh11.position.z = 200;
      pivotPoint1.add(gmesh11);//把小行星放入mesh3的公转轴点

      var geo12 = new THREE.TorusGeometry(200,0.5,30,200);
      var mat12 = new THREE.MeshPhongMaterial({color:0xf5fffa,fog:true});

      var gmesh12 = new THREE.Mesh(geo12, mat12);
      gmesh12.position.x = 100;
      gmesh12.position.y = 1000;
      gmesh12.position.z = 200;
      gmesh12.rotation.y = 0;
      gmesh12.rotation.x = -20.6;
      gmesh12.rotation.z = 0;

   //设置 公转轴点
    var pivotPoint = new THREE.Object3D();
    mesh3.add(pivotPoint); //把轴点放进mesh3行星中
   //制造mesh3的公转小行星
    var geo1 = new THREE.OctahedronGeometry(3,1);
    var mat1 = new THREE.MeshPhongMaterial({color:0xff6347,fog:true});

    var gmesh1 = new THREE.Mesh(geo1, mat1);
    gmesh1.position.x = 60;
    gmesh1.position.y = 10;
    gmesh1.position.z = 10;
    pivotPoint.add(gmesh1);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo2 = new THREE.OctahedronGeometry(2,1);
    var mat2 = new THREE.MeshPhongMaterial({color:0xff0000,fog:true});

    var gmesh2 = new THREE.Mesh(geo2, mat2);
    gmesh2.position.x = 50;
    gmesh2.position.y = 10;
    gmesh2.position.z = 10;
    pivotPoint.add(gmesh2);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo3 = new THREE.OctahedronGeometry(2,1);
    var mat3 = new THREE.MeshPhongMaterial({color:0xff0000,fog:true});

    var gmesh3 = new THREE.Mesh(geo3, mat3);
    gmesh3.position.x = 60;
    gmesh3.position.y = 10;
    gmesh3.position.z = 20;
    pivotPoint.add(gmesh3);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo4 = new THREE.OctahedronGeometry(2,1);
    var mat4 = new THREE.MeshPhongMaterial({color:0xff5b40,fog:true});

    var gmesh4 = new THREE.Mesh(geo4, mat4);
    gmesh4.position.x = 55;
    gmesh4.position.y = 10;
    gmesh4.position.z = 20;
    pivotPoint.add(gmesh4);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo5 = new THREE.OctahedronGeometry(2,1);
    var mat5 = new THREE.MeshPhongMaterial({color:0x7fffd4,fog:true});

    var gmesh5 = new THREE.Mesh(geo5, mat5);
    gmesh5.position.x = -22;
    gmesh5.position.y = 13;
    gmesh5.position.z = 50;
    pivotPoint.add(gmesh5);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo6 = new THREE.OctahedronGeometry(2,1);
    var mat6 = new THREE.MeshPhongMaterial({color:0xffa500,fog:true});

    var gmesh6 = new THREE.Mesh(geo6, mat6);
    gmesh6.position.x = -12;
    gmesh6.position.y = 13;
    gmesh6.position.z = -50;
    pivotPoint.add(gmesh6);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo7 = new THREE.OctahedronGeometry(2,1);
    var mat7 = new THREE.MeshPhongMaterial({color:0x00ec00,fog:true});

    var gmesh7 = new THREE.Mesh(geo7, mat7);
    gmesh7.position.x = -32;
    gmesh7.position.y = 13;
    gmesh7.position.z = -60;
    pivotPoint.add(gmesh7);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo8 = new THREE.OctahedronGeometry(2,1);
    var mat8 = new THREE.MeshPhongMaterial({color:0x00e0ec,fog:true});

    var gmesh8 = new THREE.Mesh(geo8, mat8);
    gmesh8.position.x = -52;
    gmesh8.position.y = 13;
    gmesh8.position.z = -10;
    pivotPoint.add(gmesh8);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo9 = new THREE.OctahedronGeometry(2,1);
    var mat9 = new THREE.MeshPhongMaterial({color:0xff9ca6,fog:true});

    var gmesh9 = new THREE.Mesh(geo9, mat9);
    gmesh9.position.x = -52;
    gmesh9.position.y = 13;
    gmesh9.position.z = 50;
    pivotPoint.add(gmesh9);//把小行星放入mesh3的公转轴点

    //制造mesh3的公转小行星
    var geo10 = new THREE.TorusGeometry(80,0.5,30,200);
    var mat10 = new THREE.MeshPhongMaterial({color:0xf5fffa,fog:true});

    var gmesh10 = new THREE.Mesh(geo10, mat10);
    gmesh10.position.x = 500;
    gmesh10.position.y = 20;
    gmesh10.position.z = 10;
    gmesh10.rotation.y = 0;
    gmesh10.rotation.x = -20.6;
    gmesh10.rotation.z = 0;
    //pivotPoint.add(gmesh10);//把小行星放入mesh3的公转轴点


    var render = function () {
          requestAnimationFrame( render );
          //mesh3旋转
          //mesh3.rotation.x += 0.01;
          mesh3.rotation.y += 0.01; //make mesh3 move

          //mesh4旋转
          mesh4.rotation.x += 0.01;
          mesh4.rotation.y += 0.01;

          mesh5.rotation.x += 0.01;
          //mesh5.rotation.y += 0.01;

          mesh6.rotation.x += 0.01;
          mesh6.rotation.y += 0.01;

          mesh7.rotation.y += 0.01;

          mesh8.rotation.x += 0.05;
          mesh8.rotation.y += 0.01;

// render all the objects
          renderer.render(scene, camera);
      };

      render();
      scene.add( mesh3 );
      scene.add( mesh4 );
      scene.add( mesh5 );
      scene.add( mesh6 );
      scene.add( mesh7 );
      scene.add( mesh8 );
      scene.add(gmesh10);
      scene.add(gmesh12);



  //Small stars in the space
  var geo1 = new THREE.SphereGeometry(0.5,8,8);

  var mat1 = new THREE.MeshPhongMaterial({overdraw: true,color:0xf5deb3,wireframe:false,fog:true,
    opacity:0.7,transparent:true});

  var plantGeometry = new THREE.Geometry();
  for (var i = 0; i < 30; i++) { //Increase the number of stars by calculation
    var gp = new THREE.Mesh(geo1.clone());//Assign a group to clone the number of stars

    gp.position.x = Math.floor( Math.random() * 1000 - 500 ) * 2;
    gp.position.z = Math.floor( Math.random() * 1000 - 500 ) * 2;
    gp.position.y = Math.floor( Math.random() * 1000 - 500 ) * 2;
    gp.scale.x  = Math.pow(Math.random(), 2) * 50 + 10;
    gp.scale.y  = gp.scale.x;
    gp.scale.z  = gp.scale.x;


    THREE.GeometryUtils.merge(plantGeometry,gp);
  } //Combine all the groups to form the entire starry sky

  var plant1 = new THREE.Mesh(plantGeometry,mat1);



  var geometry = new THREE.SphereGeometry( 0.1, 8, 8 );
  var material = new THREE.MeshLambertMaterial({overdraw: true, color: 0xf0fff0 ,wireframe:false,fog:true});
  var cityGeometry = new THREE.Geometry();
  for (var i = 0; i < 8000; i++) {
    var building = new THREE.Mesh(geometry.clone());

    //Randomize position and scale of the buildings
    building.position.x = Math.floor( Math.random() * 2000 - 1000 ) * 4;
    building.position.z = Math.floor( Math.random() * 2000 - 1000 ) * 4;
    building.position.y = Math.floor( Math.random() * 2000 - 1000 ) * 4;
    building.scale.x  = Math.pow(Math.random(), 2) * 50 + 10;
    building.scale.y  = building.scale.x;
    building.scale.z  = building.scale.x;

    //Merge all buildings to one model - cityGeometry
    THREE.GeometryUtils.merge(cityGeometry, building);
  }

  //Mesh of the city
  var city = new THREE.Mesh(cityGeometry, material);

  //Cast shadows of the models
  //city.castShadow = true;
  //city.receiveShadow = true;
  scene.add(city);
  scene.add(plant1);


  //灯光系统
  var light = new THREE.DirectionalLight(0xffffff,0.8);
  light.position.set(150, 70, 200);
  //light.target.set(1000, 1000, 100);
  light.castShadow = true;
  var light1 = new THREE.DirectionalLight(0xffffff,0.8);
  light1.position.set(-150, -70, 200);
  //light.target.set(1000, 1000, 100);
  light1.castShadow = true;

  //var ambientLight = new THREE.AmbientLight(0x663344, 0.01);
  var ambiColor = "0x663344";
  var ambientLight = new THREE.AmbientLight(ambiColor);

  //light.shadowMapWidth = 2048;
  //light.shadowMapHeight = 2048;
  var d = 1000;
  //light.shadowCameraLeft = d;
  //light.shadowCameraRight = -d;
  //light.shadowCameraTop = d;
  //light.shadowCameraBottom = -d;
  //light.shadowCameraFar = 2500;
  scene.add(ambientLight);
  scene.add(light);
  scene.add(light1);

  rayBreathing()
}




function draw() {
  renderer.render( scene, camera );
}

// UPDATE =======================================================
function update(delta) {
  controls.update(delta);
  if(controls.object.position.y < floor.position.y + 10){
      controls.object.position.y = 10;
  }
  //console.log(controls);
}



// RUN ==========================================================
setup();
