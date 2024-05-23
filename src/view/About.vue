<template>
    <div>
        <div>{{ props.model }}</div>
        <div>{{ props.textureData }}</div>
    </div>
    <!-- a droite  -->
    <nav id="nav">
        <div v-for="(link, index) in links" :key="index" :class="{ 'nav-link': true, 'active': isActive(link.url) }">
            <div>
                <a @click="navigate(link.url)" class="buttonIcon">{{ link.name }}</a>
            </div>
        </div>
        <div class="gauche">
            <div class="nav-link">
                <a href="mailto:bapt.audeon@gmail.com" class="buttonIcon">Contact</a>
            </div>
            <div class="nav-link">
                <a href="https://www.linkedin.com/in/baptiste-audeon-04b070287/" target="_blank"
                    class="buttonIcon">Linkedin</a>
            </div>

        </div>
    </nav>

    <div class="anime"></div>
    <div class="black"></div>

    <div id="image-track12" data-mouse-down-at="0" data-prev-percentage="0">

        <div id="un">
            <div class="txt">
                <h2 class="l1">Je suis Baptiste,</h2>
                <h2 class="l2">un developpeur</h2>
                <h2 class="l3">de vingt-deux ans.</h2>
            </div>
        </div>
        <div id="deux" class="slide">
            <canvas class="astronaute" draggable="false"></canvas>
        </div>
        <div id="troix">
            <div class="left">
                <span>P</span>
                <span>a</span>
                <span>r</span>
                <span>c</span>
                <span>o</span>
                <span>u</span>
                <span>r</span>
                <p>
                    Actuellement en deuxième année d'études en informatique, je m'intéresse particulièrement au
                    développement front-end,
                    surtout dans les domaines du motion et de l'interaction.
                </p>
                <span class="technologies">O</span>
                <span class="technologies">u</span>
                <span class="technologies">t</span>
                <span class="technologies">i</span>
                <span class="technologies">l</span>
                <span class="technologies">s</span>

            </div>

            <div class="right">
                <p>
                    J'ai toujours aimé créer des choses, des vidéos aux dessins animés. J'aime utiliser mon imagination
                    pour donner
                    vie à mes idées. Peux être que que l'on aura l'occasion de créer quelque chose ensemble.
                </p>
                <span>C</span>
                <span>r</span>
                <span>e</span>
                <span>a</span>
                <span>t</span>
                <span>i</span>
                <span>v</span>
                <span>i</span>
                <span>t</span>
                <span>e</span>
                <p>
                    Je travaille avec Vue.js et j'utilise Anime.js pour l'animation et Three.js pour la 3D. J'ai
                    l'habitude d'utiliser
                    WordPress. Mes projets personnels et mes études m'ont amenés à utiliser
                    une variété de
                    technologies, dont java, laravel, pythons ...
                </p>
            </div>
            <div class="ligne"></div>
        </div>


    </div>
</template>



<script setup>
import { ref, onMounted, unref, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import * as THREE from 'three';

import anime from 'animejs/lib/anime.es.js';

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import project1 from '/src/assets/img/projet1.png';
import project2 from '/src/assets/img/projet2.png';
import project3 from '/src/assets/img/projet3.png';
import project4 from '/src/assets/img/projet4.png';
import project5 from '/src/assets/img/projet5.png';
import project6 from '/src/assets/img/projet6.png';


const props = defineProps({
    data: Object
});

const links = ref([
    { name: 'Projets', url: '/' },
    { name: 'A propos', url: '/about' }
])


const route = useRoute()
const router = useRouter()

function isActive(url) {
    return route.path === url;
}
function navigate(url) {
    about().then(() => {
        router.push(url)
    })
}

let about = function () {

    return new Promise((resolve, reject) => {

        resolve();
    });

}
/////////////////////////////////////////:
////////////////////////////////////////
////////////////////////////////////////


onMounted(() => {
    let model = unref(props.data.model);
    let texture = unref(props.data.textureData);

    let scene = new THREE.Scene();
    let scene2 = new THREE.Scene();

    scene.environment = texture;
    scene2.environment = texture;
    // ===================================================================================
    // scene UFO ==================================================================================
    // ==================================================================================

    const tailleecran = 1.5;

    let camera = new THREE.PerspectiveCamera(
        75,
        window.screen.width / window.screen.height * tailleecran,
        0.1,
        1000
    );

    const canvas = document.querySelector(".astronaute");

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.screen.width * tailleecran, window.screen.height);

    window.addEventListener("resize", () => {
        camera.updateProjectionMatrix()
    });

    const renderscene = new RenderPass(scene2, camera);
    const bloomPass1 = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
    );
    bloomPass1.threshold = 0.1;
    bloomPass1.strength = 1;
    bloomPass1.radius = 0.1;

    const composer1 = new EffectComposer(renderer);
    composer1.addPass(renderscene);
    composer1.addPass(bloomPass1);


    const spheres = [];
    const rectangles = [];
    const textureLoader = new THREE.TextureLoader();


    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
        })
    );

    scene.add(sphere);
    sphere.name = 'sphere' + 0;
    sphere.position.y = 1.5;
    spheres.push(sphere);

    // Stockez vos projets dans un tableau
    let projects = [project1, project2, project3, project4, project5, project6];

    // Créez une fonction pour charger la texture

    let texture2 = textureLoader.load(project1);

    function loadTexture(project) {
        let switchimage = project;
        let texture2 = textureLoader.load(switchimage);
        rectangles[0].material.map = texture2;
    }

    setTimeout(() => {
        setInterval(() => {
            let random = Math.floor(Math.random() * projects.length);
            loadTexture(projects[random]);
        }, 3000);
    }, 3000);

    const rectangle = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 10, 10),
        new THREE.MeshPhongMaterial({
            transparent: true,
            map: texture2,
            side: THREE.DoubleSide,
            opacity: 0.5,
            // Définissez la couleur émissive du matériau
            emissive: 0xFF0000
        })
    );

    scene2.add(rectangle);

    rectangle.position.z = -50;

    rectangles.push(rectangle);

    sphere.add(model.clone());

    function animate() {
        renderer.autoClear = false;

        renderer.clearDepth();

        renderer.render(scene, camera);
        renderer.render(scene2, camera);

        sphere && (sphere.rotation.y += 0.01);
        window.requestAnimationFrame(animate);
    }
    animate();


    camera.position.set(0, 0, 100);

    camera.setFocalLength(85);


    ////////////////////////////////////////////////////
    /////////////////////////////////////////
    ////////////////////////////////////////
    //////////////////////////////////////////
    const track1 = document.getElementById("image-track12");

    track1.style.transform = `translate(0%, -50%)`;

    function createAnimation(target, properties) {
        properties.targets = target;
        properties.easing = 'easeInOutQuad';
        anime(properties);
    }

    createAnimation('.anime', {
        delay: 0,
        width: '60%',
        right: 0,
        duration: 1000
    });

    createAnimation('.anime', {
        delay: 1200,
        opacity: '0',
        duration: 1,
        zIndex: '-10'
    });

    createAnimation('.black', {
        delay: 200,
        left: '0',
        duration: 1000
    });

    createAnimation('.black', {
        delay: 1200,
        opacity: '0',
        duration: 1,
        zIndex: '-10'
    });

    var elements = ['.l1', '.l2', '.l3'];
    var marginLeftValues = ['5vw', '7.5vw', '10vw'];

    elements.forEach((element, i) => {
        anime.timeline({
            targets: element,
            easing: 'easeInOutCubic',
            delay: 1200 + (300 * i),
            duration: 250,
        })
            .add({
                opacity: [0, 1],
            })
            .add({
                targets: element,
                marginLeft: ['-100vw', marginLeftValues[i]],
            }, 0);
    });

    anime({
        targets: '.astronaute',
        delay: 1500,
        marginBottom: ['-200%', '-150%'],
        easing: 'easeInOutQuad',
        duration: 1200,
        loop: false,
        complete: function (anim) {
            carrousel2();
        }
    });

    anime.timeline({
        delay: 2500,
        targets: rectangles[0].material,
        easing: 'easeInOutCubic',
        duration: 250, // Durée de l'animation en millisecondes
    })
        .add({
            opacity: [0, 1], // Change l'opacité de 0 à 1
        })
        .add({
            targets: rectangles[0].position,
            y: [0, -1], // Déplace le rectangle de -1 à 0 le long de l'axe Y
        }, 0); // Commence cette animation en même temps que le changement d'opacité

    carrousel2();

    let hasRun = true;

    function slide3() {
        anime.timeline({
            targets: 'span:not(.technologies,.ty)',
            easing: 'easeInOutCubic',
            duration: 250,
        })
            .add({
                opacity: [0, 1],
                delay: anime.stagger(100), // Delay between each span
                complete: function (anim) {
                    anime.timeline({
                        targets: 'span.technologies',
                        easing: 'easeInOutCubic',
                        duration: 250,
                    })
                        .add({
                            opacity: [0, 1],
                            delay: anime.stagger(100), // Delay between each span
                        })
                        .add({
                            targets: 'span.technologies',
                            y: [0, -1],
                        }, 0);
                }
            })
            .add({
                targets: 'span:not(.technologies)',
                y: [0, -1],
            }, 0);
    }

    function carrousel2() {



        track1.dataset.percentage = 0;


        const handleOnDown = e => track1.dataset.mouseDownAt = e.clientX;
        const handleOnUp = () => {
            track1.dataset.mouseDownAt = "0";
            track1.dataset.prevPercentage = track1.dataset.percentage;
        }

        const handleOnMove2 = e => {
            if (track1.dataset.mouseDownAt === "0") return;
            const mouseDelta = parseFloat(track1.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;

            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentage2Unconstrained2 = parseFloat(track1.dataset.prevPercentage) + percentage * .6,
                nextPercentage2 = Math.max(Math.min(nextPercentage2Unconstrained2, 0), -50);

            function animateElements(elements, properties, options) {
                for (const element of elements) {
                    element.animate(properties, options);
                }
            }

            let duration = 3000;
            let easing = 'cubic-bezier(0.33, 1, 0.68, 1)';



            let options = { duration: duration, fill: "forwards" };
            if (easing) options.easing = easing;

            track1.animate(
                { transform: `translate(${nextPercentage2}%, -50%)` },
                options
            );

            animateElements(track1.getElementsByClassName("slide"),
                { backgroundPosition: `${100 + nextPercentage2 * 3}% center` },
                options
            );

            animateElements(track1.getElementsByClassName("astronaute"),
                { bottom: `${-nextPercentage2 * 2.7}%` },
                options
            );
            window.nextPercentage2 = nextPercentage2;
            track1.dataset.percentage = nextPercentage2;

            // Jouer si nextPercentage2 est en dessous de -150 et hasRun est vrai
            if (window.nextPercentage2 <= -24 && hasRun === true) {
                slide3();
                hasRun = false;
            }


        }

        window.onmousedown = e => handleOnDown(e);
        window.ontouchstart = e => handleOnDown(e.touches[0]);
        window.onmouseup = e => handleOnUp(e);
        window.ontouchend = e => handleOnUp(e.touches[0]);
        window.onmousemove = e => handleOnMove2(e);
        window.ontouchmove = e => handleOnMove2(e.touches[0]);

        function handleScroll2(direction2) {
            const nextPercentage2Unconstrained2 = direction2 + parseFloat(track1.dataset.percentage);


            const nextPercentage2 = Math.max(Math.min(nextPercentage2Unconstrained2, 0), -50);

            function animateElements(elements, properties, options) {
                for (const element of elements) {
                    element.animate(properties, options);
                }
            }
            let duration = 1500;
            let easing = 'cubic-bezier(0.33, 1, 0.68, 1)';

            let options = { duration: duration, fill: "forwards" };
            if (easing) options.easing = easing;

            track1.animate(
                { transform: `translate(${nextPercentage2}%, -50%)` },
                options
            );

            animateElements(track1.getElementsByClassName("slide"),
                { backgroundPosition: `${100 + nextPercentage2 * 3}% center` },
                options
            );

            animateElements(track1.getElementsByClassName("astronaute"),
                { bottom: `${-nextPercentage2 * 2.7}%` },
                options
            );

            track1.dataset.percentage = nextPercentage2;

            window.nextPercentage2 = nextPercentage2;
            track1.dataset.prevPercentage = track1.dataset.percentage;

            // Jouer si nextPercentage2 est en dessous de -150 et hasRun est vrai
            if (window.nextPercentage2 <= -24 && hasRun === true) {
                slide3();
                hasRun = false;
            }


        }

        // Listen for the "wheel" event
        window.addEventListener("wheel", (event) => {
            const direction2 = event.deltaY > 0 ? 2 : -2;
            handleScroll2(direction2);
        });
        // Listen for the "keydown" event
        document.addEventListener("keydown", function (event) {
            let direction2 = 0;
            switch (event.key) {
                case "ArrowUp":
                    direction2 = -2;
                    break;
                case "ArrowDown":
                    direction2 = 2;
                    break;
                case "ArrowLeft":
                    direction2 = 2;
                    break;
                case "ArrowRight":
                    direction2 = -2;
                    break;
                default:
                    return;
            }
            handleScroll2(direction2);
        });

    }
});




onUnmounted(() => {

    window.onmousedown = null;
    window.ontouchstart = null;
    window.onmouseup = null;
    window.ontouchend = null;
    window.onmousemove = null;
    window.ontouchmove = null;
    window.removeEventListener("wheel", null);
    document.removeEventListener("keydown", null);
    window.nextPercentage2 = null;


});
</script>

<style scoped>
.un {
    top: 5vh;
}

/* a gauche les deux boutons linkedin et mail l'un a coté de l' autre a lhorizontale avec un espace entre eux  */
.gauche {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 37px;
    left: 20px;
    z-index: 15;


}

#nav {
    font-family: 'tenby-five.otf';
    position: fixed;
    top: 37px;
    font-size: 1.5rem;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
    color: #fff;
    width: 100%;
    right: 20px;
    z-index: 15;
}

#nav div {
    margin: 1.5vh 1.5vw 0 1.5vw;

}

.nav-link {
    opacity: .3;
    will-change: transform;
    transition: opacity .3s var(--o2);

}

.nav-link:hover {
    opacity: 1;
    cursor: pointer;
}

.active a {
    pointer-events: none;
}

.active {
    opacity: 1;

}


#quatre {
    height: 100vh;
    position: relative;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}


#quatre h3 {
    color: #961a98;
    font-size: 6vw;
    font-family: 'font2.ttf';
    margin: 0;
    z-index: 1;
    white-space: nowrap;
}



#image-track12 {
    cursor: grab;
    display: flex;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    user-select: none;
}

.ligne {
    width: 12px;
    height: 100vh;
    background-color: #961a98;
    position: fixed;
    right: 0;
    z-index: 100;
}



span {
    font-size: 9vw;
    color: #961a98;
    opacity: 0;
    text-transform: uppercase;
    font-family: 'font2.ttf';
}

p {
    color: #ffffff;
}

#troix p {
    transform: scaleX(1.5);
    transform-origin: left;
    font-size: 1.65vw;
}



h2 {
    font-size: 9vw;
    transform: scaleX(0.7) !important;
    transform-origin: left;
    color: #ffffff;
    margin: 0;
    z-index: 1;
    white-space: nowrap;
}




#un {
    height: 100vh;
    position: relative;
    width: 66vw;
    display: flex;
    align-items: center;
    top: 5vh;

}

#deux {
    height: 100vh;
    position: relative;
    width: 34vw;
    background-image: url("/src/assets/img/image1.jpg");
    background-size: cover;
    background-position: 100% center;

}

#troix {
    height: 100vh;
    position: relative;
    width: 100vw;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
}

.left {
    margin-top: 4vh;
    width: 45vw;
    transform: scaleX(0.6);
    transform-origin: left;
    font-family: 'font2.ttf';
}

.right {
    justify-content: center;
    width: 45vw;
    margin: 8vh 0 0 0;
    transform: scaleX(0.6);
    transform-origin: left;
    font-family: 'font2.ttf';
}


.black {
    height: 150vw;
    position: fixed;
    width: 66vw;
    background-color: #141414;
    z-index: 100;
    left: -100%;
}


.l1 {
    position: relative;
    margin: 0;
    z-index: 3;
    opacity: 0;

}

.l2 {
    position: relative;

    z-index: 1;
    opacity: 0;
}

.l3 {
    position: relative;
    margin: 0;
    z-index: 3;
    opacity: 0;

}

.astronaute {
    transform: translate(50%, -50%);
    right: 50%;
    position: absolute;
    z-index: 2;
    bottom: 0;
}

.anime {
    position: fixed;
    right: 0;
    width: 100%;
    height: 100%;

    background-image: url("/src/assets/img/image1.jpg");
    background-size: cover;
    /* Cette ligne garantit que l'image couvre toute la zone, tout en conservant son aspect */
    background-position: right;
    /* Cette ligne aligne l'image à droite */
    z-index: 15;
    opacity: 1;
    background-repeat: no-repeat;
}

@media (max-width: 1500px) {
    .anime {
        width: calc(100% + (1500px - 90vw) * 1);
    }
}
</style>