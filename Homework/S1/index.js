
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(95, window.innerWidth/window.innerHeight, 1, 10000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor("#FFA07A");

        var light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
        light.position.set( 200, 200, 200 );


        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
        var geometry1 = new THREE.CubeGeometry(0.5,0.5,0.5);
        var material1 = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube1 = new THREE.Mesh(geometry1, material1);

        var geometry2 = new THREE.CylinderGeometry(0.3,0.3,1,1000,1000);
        var material2 = new THREE.MeshNormalMaterial();
        var cylinder1 = new THREE.Mesh(geometry2,material2);
        cylinder1.position.x = -1;
        cylinder1.position.y = -0.5;
        cylinder1.position.z = 3;

        var geometry3= new THREE.SphereGeometry(1.5, 20,20);
        var material3 = new THREE.MeshNormalMaterial({color: 0x00ff00,wireframe:false});
        var sphere = new THREE.Mesh(geometry3, material3);
        sphere.position.x = 2;
        sphere.position.y = 0.5;
        sphere.position.z = 1;
        sphere.castShadow = true;

        scene.add(cube1);
        scene.add(cylinder1);
        scene.add(sphere);


        camera.position.z = 5;

        function render() {
            requestAnimationFrame(render);
            cube1.rotation.x += 0.01;
            cube1.rotation.y += 0.01;
            cylinder1.rotation.x += 0.01;
            cylinder1.rotation.y += 0.01;
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        render();
