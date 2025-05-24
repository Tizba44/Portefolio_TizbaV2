<template>
  <div v-if="!isLoading2">

    <div v-if="loadMounted">
      <div class="counter-label">{{ Math.floor(progress) }}</div>
      <canvas class="canvas3"></canvas>
      <div class="date">
        <span class="datespan"></span>
        <span class="datespan">2</span>
        <span class="datespan">0</span>
        <span class="datespan">0</span>
        <span class="datespan">1</span>
      </div>
      <div class="nom">
        <span class="nomspan">T</span>
        <span class="nomspan">i</span>
        <span class="nomspan">z</span>
        <span class="nomspan">b</span>
        <span class="nomspan">a</span>
        <span class="nomspan"></span>
        <span class="nomspan"></span>
        <span class="nomspan"></span>
      </div>
    </div>

    <div v-if="isLoaded">
      <router-view :data="{ model: model, textureData: textureData }" />
    </div>
  </div>

  <div v-if="!Loadingphone">
    <component :is="currentComponent" />
  </div>

</template>

<script setup>
import {
  ref, onMounted, markRaw, computed, watch
} from 'vue'



import * as THREE from 'three';

import pointVertex from '/src/assets/shaders/pointVertex.glsl';

import pointFragment from '/src/assets/shaders/pointFragment.glsl';

import anime from 'animejs/lib/anime.es.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";


import frog1 from '/src/assets/img/frog1.svg';
import frog2 from '/src/assets/img/frog2.svg';
import frog3 from '/src/assets/img/frog3.svg';
import frog4 from '/src/assets/img/frog4.svg';
import frog5 from '/src/assets/img/frog5.svg';
import frog7 from '/src/assets/img/frog7.svg';
import frog8 from '/src/assets/img/frog8.svg';
import frog9 from '/src/assets/img/frog9.svg';

import image1 from '/src/assets/img/image1.jpg';



import project1 from '/src/assets/img/projet1.png';
import project2 from '/src/assets/img/projet2.png';
import project3 from '/src/assets/img/projet3.png';
import project4 from '/src/assets/img/projet4.png';
import project5 from '/src/assets/img/projet5.png';
import project6 from '/src/assets/img/projet6.png';
import Phone from './components/Phone.vue';

const imagesToPreload = [
  frog1,
  frog2,
  frog3,
  frog4,
  frog5,
  frog7,
  frog8,
  frog9,
  image1,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6
];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let currentComponent = ref('router-view')
let isLoaded = false;
let isLoading = ref(true);
let isLoading2 = ref(true);
let Loadingphone = ref(true);
const loadMounted = ref(true);
const progress = ref(0);

const model = ref(null);
const textureData = ref(null);






onMounted(async () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // L'utilisateur est sur un téléphone
    const ComponentPhone = markRaw((await import(Phone)).default)
    currentComponent.value = ComponentPhone
    Loadingphone.value = false;


  } else {
    const images = imagesToPreload.map(imageSrc => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = resolve;
        img.onerror = reject;
        isLoading2.value = false;
      });
    });

    try {
      await Promise.all(images);

      isLoading.value = false;

    } catch (error) {

    }
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// je veux que quand la value de la ref isLoading est fausse le code se lance avec computed
watch(
  () => isLoading.value,
  (newValue) => {
    if (!newValue) {


      const loadingManager = new THREE.LoadingManager();
      const gltfLoader = new GLTFLoader(loadingManager);
      const rgbeLoader = new RGBELoader(loadingManager);
      const dLoader = new DRACOLoader();
      dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      dLoader.setDecoderConfig({ type: 'js' });
      gltfLoader.setDRACOLoader(dLoader);


      let updateInterval;
      let currentProgress = 0;
      let targetProgress = 0;
      let luminositer;




      loadingManager.onProgress = function (url, loaded, total) {
        targetProgress = (loaded / total) * 100;
        if (!updateInterval) {
          updateInterval = setInterval(() => {
            currentProgress += (targetProgress - currentProgress) * 0.05; // 0.05 est la vitesse de l'interpolation
            progress.value = currentProgress;
            luminositer = (currentProgress / 100) * 1.2;
            if (currentProgress >= 99.5) {
              loadMounted.value = false;
              clearInterval(updateInterval);
              isLoaded = true; // Ajoutez cette ligne pour marquer que le chargement est terminé
            }
          }, 50);
        }
      };




      // ===================================================================================
      // scene load ==================================================================================
      // ===================================================================================

      // remmetre nom et date leur propriéter de base
      // document.querySelector('.nom').style.bottom = '10vh';
      // document.querySelector('.date').style.bottom = '70vh';


      setTimeout(function () {
        let randomChar = () => String.fromCharCode(65 + Math.random() * 25); // Fonction pour générer un caractère aléatoire

        let animateText = (text, targetClass, spanClass) => {
          let textArray = text.split(''); // Convertir le texte en tableau

          // Créer des spans pour chaque lettre
          textArray.forEach((char, i) => {
            let span = document.querySelector(spanClass + ':nth-child(' + (i + 1) + ')');
            span.innerText = char;

            // Animer la lettre
            anime({
              targets: targetClass,
              duration: 1500,
              delay: i * 100, // Délai pour chaque lettre
              easing: 'easeInOutCubic',
              update: function () {
                span.innerText = randomChar(); // Mettre à jour la lettre avec un caractère aléatoire
              },
              complete: function () {
                span.innerText = char; // Rétablir la lettre correcte à la fin de l'animation
              }
            });
          });
        }

        animateText('baptiste', '.nomspan', '.nomspan');
        animateText('.2023', '.datespan', '.datespan');

        anime({
          targets: '.nom',
          bottom: '80vh',
          easing: 'easeInOutQuad', // Vous pouvez changer l'effet d'animation ici
          duration: 1500, // Durée de l'animation en millisecondes
        });

        anime({
          targets: '.date',
          bottom: '10vh',
          easing: 'easeInOutQuad', // Vous pouvez changer l'effet d'animation ici
          duration: 1500, // Durée de l'animation en millisecondes
        });

      }, 700);


      textureData.value = new THREE.Scene();


      rgbeLoader.load('/vaisseaux/MR_INT-005_WhiteNeons_NAD.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        textureData.value = texture;
      });


      gltfLoader.load('/vaisseaux/untitled.gltf', function (gltf) {
        model.value = gltf.scene;
      });


      const size = {
        width: window.innerWidth,
        height: window.innerHeight
      };


      const params = {
        bloomEnabled: true,
        bloomThreshold: 0.1,
        bloomRadius: 0.1
      };

      const scene3 = new THREE.Scene();

      let camera3 = new THREE.PerspectiveCamera(
        27,
        size.width / size.height,
        1,
        100
      );

      camera3.position.z = 40;

      scene3.background = new THREE.Color(0x141414);
      const canvas3 = document.querySelector(".canvas3");
      const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3, antialias: true });
      renderer3.setSize(size.width, size.height);
      renderer3.render(scene3, camera3);


      const renderscene3 = new RenderPass(scene3, camera3);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        luminositer,
        params.bloomRadius,
        params.bloomThreshold
      );
      const composer = new EffectComposer(renderer3);
      composer.addPass(renderscene3);
      composer.addPass(bloomPass);

      window.addEventListener('resize', () => {
        // Mettre à jour les dimensions de la fenêtre
        size.width = window.innerWidth;
        size.height = window.innerHeight;

        // Mettre à jour l'aspect de la caméra
        camera3.aspect = size.width / size.height;
        camera3.updateProjectionMatrix();

        // Mettre à jour la taille du rendu
        renderer3.setSize(size.width, size.height);

      });


      function addCenterAttribute(geometry) {
        const vectors = [
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 1)
        ];
        const position = geometry.attributes.position;
        const centers = new Float32Array(position.count * 3);
        for (let i = 0, l = position.count; i < l; i++) {
          vectors[i % 3].toArray(centers, i * 3);
        }
        geometry.setAttribute("center", new THREE.BufferAttribute(centers, 3));
      }

      const geometry = new THREE.IcosahedronGeometry(6, 6);
      addCenterAttribute(geometry);

      let pointsSize;

      const atomMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xFF0000) },
          size: { value: pointsSize }
        },
        vertexShader: `
        uniform float size;
        void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
        fragmentShader: `
        uniform vec3 color;
        void main() {
            float r = 0.0, delta = 0.0, alpha = 1.0;
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            r = dot(cxy, cxy);
            if (r > 1.0) {
                discard;
            }
            gl_FragColor = vec4(color, alpha);
        }
    `,
        depthTest: true,
        depthWrite: true
      });

      const spherePoint = new THREE.Points(geometry, atomMaterial);
      scene3.add(spherePoint);

      const sphereLine = new THREE.Mesh(
        geometry,
        new THREE.ShaderMaterial({
          vertexShader: pointVertex,
          fragmentShader: pointFragment,
          side: THREE.DoubleSide,
          transparent: true
        })
      );

      scene3.add(sphereLine);

      function animate() {
        if (isLoaded === false) {
          composer.render();

          bloomPass.strength = luminositer;
          pointsSize = luminositer * 0.8;
          atomMaterial.uniforms.size.value = pointsSize;


          if (targetProgress > 0) {
            sphereLine.rotation.y += 0.003;
            spherePoint.rotation.y += 0.003;

          }
        }

        window.requestAnimationFrame(animate);

      }
      animate();


    }
  }
);
</script>



<style scoped>
.counter-label {
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 10vw;
  transform: translate(50%, -50%);
  font-family: 'font2.ttf';
  /* font size min 3em sinon 6vw */
  font-size: 5em;

  text-transform: uppercase;
}

.date {
  color: #ffffff;
  position: absolute;
  bottom: 70vh;
  right: 0vw;
  text-transform: uppercase;
  font-family: 'font2.ttf';
  font-size: 4vw;
  transform: translate(-50%, 0%);
}

.nom {
  color: #ffffff;
  position: absolute !important;
  bottom: 10vh;
  right: 5vw;
  text-transform: uppercase;
  font-family: 'font2.ttf';
  font-size: 4vw;
  transform: translate(-50%, 0%);

}
</style>
