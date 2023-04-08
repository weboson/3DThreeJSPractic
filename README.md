Second test-project website with 3D animation Cube letter R, used lib THREE.js

Steps (terminal):
1. npm init
2. git init
3. npm install three

Steps (starting):
1. download for format .GLTFL the loader "GLTFLoader.js" from the list of different loaders: https://github.com/mrdoob/three.js/tree/dev/examples/jsm/loaders
2. Working imports:
importmap (index.html):
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.139.0/build/three.module.js",
                "OrbitControls": "https://unpkg.com/three@0.139.0/examples/jsm/controls/OrbitControls.js",
                "GLTFLoader": "https://unpkg.com/three@0.139.0/examples/jsm/loaders/GLTFLoader.js",
                "RectAreaLightHelper": "https://unpkg.com/three@0.139.0/examples/jsm/helpers/RectAreaLightHelper.js",
                "RectAreaLightUniformsLib": "https://unpkg.com/three@0.139.0/examples/jsm/lights/RectAreaLightUniformsLib.js"
            }
        }
    </script>
import (main.js):

        import * as THREE from 'three';
        import { OrbitControls } from 'OrbitControls';
        import { GLTFLoader } from 'GLTFLoader';
        import { RectAreaLightHelper } from 'RectAreaLightHelper'
        import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';

Other Sources:
1. Video: https://youtu.be/7fo5V_MgbKo
Git Repo: https://github.com/Mixturka613/Lesson-ThreeJS


Screenshot #1:
![screenshotGoPro](https://user-images.githubusercontent.com/42917939/230699691-e2861c2d-84c3-43a8-8faf-7d03191cc40a.jpg)



