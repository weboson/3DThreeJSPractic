//! с обычном модульным импортом проблемы, поэтому используется URL подключение в importmap в index.htmnl


        import * as THREE from 'three';
        import { OrbitControls } from 'OrbitControls';
        import { GLTFLoader } from 'GLTFLoader';
        import { RectAreaLightHelper } from 'RectAreaLightHelper'
        import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';

        function init() {
            let container = document.querySelector('.container');

            //Scene
            const scene = new THREE.Scene()
            //! фон - изображение появляется, если отдалить модель (колёсиком мыши) -  в общем, нужно настраивать
            const spaceTexture = new THREE.TextureLoader().load('./images/space.jpg');
            scene.background = spaceTexture;
            // добавляет фон - просто цвет
           //scene.background = new THREE.Color("#E2DFE1"); 

            //Camera                                         (первый аргумент это позиция камеры от объетка)
            //      ----------------------------------------------------------------------------- - 4 - это моё - так фон-картинка не исчезает после обновления
            const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight - 4, 0.1, 10);
            // позиция камеры (приближает камеру, камера вверх/низ, зад / перед )
            camera.position.set(1, 0.5, 1); // последний аргумент - это масштаб

            //render
            const renderer = new THREE.WebGLRenderer({antialias: true})
            renderer.setSize(window.innerWidth, window.innerHeight)
            container.appendChild(renderer.domElement)

            let plain;
            {
                plain = new THREE.Mesh( // сетка
                    new THREE.PlaneGeometry(1000, 1000),
                    new THREE.MeshBasicMaterial({color: "#E2DFE1"})
                )
                plain.reciveShadow = true;
                plain.position.set(0, -1, 0);
                plain.rotateX(-Math.PI / 2);
                // plain.scale.set(6, 4, 2);
                //plain.scale.multiplyScalar(1); // Multiply Scalar;
                plain.geometry.scale(2, 2, 2)
                scene.add(plain)
            }



            // 3D Model
            {
                const loader = new GLTFLoader();
                // loader.load('./model/Gopro_H5S_HQ.gltf', gltf => {
                loader.load('./model/Gopro_H5S_HQ.gltf', gltf => {
                scene.add(gltf.scene);
                }, 
                    function (error) {
                        console.log('Error: ' + error)
                    }
                )
            }
            
            {
                const light = new THREE.DirectionalLight((226, 91, 91, 0.69), 100)
                light.position.set(-2, 0, 10)
                light.lookAt(0, -1, 0)
                scene.add(light)

                //*Helper
                // const helper = new THREE.DirectionalLightHelper(light, 5)
                // scene.add(helper)
            }

            {
                const light = new THREE.DirectionalLight(0xffffff, 5); //10 - это интенсивность света
                light.position.set(2, 0, 5)
                light.lookAt(0, 1, 0)
                scene.add(light)

                //* Helper
                // const helper = new THREE.DirectionalLightHelper(light, 5)
                // scene.add(helper)
            }

            RectAreaLightUniformsLib.init();
            {
                const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
                rectLight.position.set(-10,0,0)
                rectLight.rotation.y = Math.PI + Math.PI/4;
                scene.add(rectLight)
            }

            {
                const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
                rectLight.position.set(10,0,0)
                rectLight.rotation.y = Math.PI - Math.PI/4;
                scene.add(rectLight)
            }
            
            //! OrbitControls: движение по орбите
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true; // автоматическое вращение
            controls.autoRotateSpeed = 5;
            controls.enableDamping = true;

            //Resize
            window.addEventListener('resize', onWindowResize, false)
            
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight)
            }

            // Animate
            function animate() {
                requestAnimationFrame(animate)
                controls.update(); //! вращение объекта
                renderer.render(scene, camera)
            }
            animate()

        }

        init()