<template>
    <nav id="nav">
        <div v-for="(link, index) in links" :key="index" :class="{ 'nav-link': true, 'active': isActive(link.url) }">
            <div class="gravityButton">
                <a @click="navigate(link.url)" class="buttonIcon">{{ link.name }}</a>
            </div>
        </div>
    </nav>


    <div class="anime"></div>
    <div class="black"></div>

    <div id="image-track2" data-mouse-down-at="0" data-prev-percentage="0">

        <div id="un">
            <div class="txt">
                <h2 class="l1"> Hi! I'm Baptiste,</h2>
                <h2 class="l2">a twenty-two y.o</h2>
                <h2 class="l3">French developer.
                </h2>
            </div>
        </div>
        <div id="deux" class="slide">
            <!-- <img class="astronaute" src="/src/assets/img/image2.png" alt="" width="50%" draggable="false"> -->
            <canvas class="astronaute"></canvas>


        </div>
        <div id="troix">
            <div class="left">
                <span>J</span>
                <span>o</span>
                <span>u</span>
                <span>r</span>
                <span>n</span>
                <span>e</span>
                <span>y</span>
                <p>
                    Currently in my second year of computer science studies, I am particularly interested in front-end
                    development,
                    especially in the areas of motion and interaction.
                </p>
                <span class="technologies">T</span>
                <span class="technologies">o</span>
                <span class="technologies">o</span>
                <span class="technologies">l</span>
                <span class="technologies">s</span>
            </div>
            <div class="right">
                <p>
                    I've always loved creating things, from videos to cartoons. I like to use my imagination to give
                    flesh to my
                    ideas.This is just the beginning let's go further and create something together.
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
                <span>y</span>
                <p>
                    I work with Vue.js and use Anime.js for animation and Three.js for WEBGL. I am accustomed to using
                    WordPress,
                    whether it's headless or not. My personal projects and studies have led me to use a variety of
                    technologies,
                    including java, laravel ...
                </p>
            </div>
        </div>

    </div>


    <div>
        <div>{{ props.model }}</div>
        <div>{{ props.textureData }}</div>
    </div>
</template>


<script setup>
import { ref, onMounted, unref } from 'vue';
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
    { name: 'Projects', url: '/' },
    { name: 'About', url: '/about' }
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

const reloadPage = () => {
    location.reload()
};

onMounted(() => {

    //COMPOSANT enfant:

    //COMPOSANT enfant:
    let model = unref(props.data.model);
    let texture = unref(props.data.textureData);

    let scene = new THREE.Scene();
    let scene2 = new THREE.Scene();

    scene.environment = texture;
    scene2.environment = texture;
    // ===================================================================================
    // scene UFO ==================================================================================
    // ===================================================================================

    const planete = [
        { name: 'project6', minia: project6 },
        { name: 'project5', minia: project5 },
        { name: 'project4', minia: project4 },
        { name: 'project3', minia: project3 },
        { name: 'project2', minia: project2 },
        { name: 'project1', minia: project1 },
    ];

    const tailleecran = 0.3 * planete.length;
    const zoom = 50 * planete.length;


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
    bloomPass1.strength = .8;
    bloomPass1.radius = 0.1;

    const composer1 = new EffectComposer(renderer);
    composer1.addPass(renderscene);
    composer1.addPass(bloomPass1);


    const spheres = [];
    const rectangles = [];
    const textureLoader = new THREE.TextureLoader();


    const planet = planete[0];

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

    const texture2 = textureLoader.load(planet.minia);

    const rectangle = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 10, 10),
        new THREE.MeshPhongMaterial({
            transparent: true,
            map: texture2,
            side: THREE.DoubleSide,
            opacity: 0,
            // Définissez la couleur émissive du matériau
            emissive: 0xE300E7
        })
    );

    scene2.add(rectangle);

    rectangle.position.z = -100;
    rectangle.position.y = 0;
    rectangle.position.x = 0;

    rectangles.push(rectangle);

    sphere.add(model.clone());

    function animate() {
        // composer1.render();

        renderer.autoClear = false; // Empêche l'effacement automatique du buffer.

        renderer.clearDepth(); // Clear the depth buffer

        // Effectue le rendu de la deuxième scène par-dessus la première
        renderer.render(scene, camera);
        renderer.render(scene2, camera);

        spheres.forEach((sphere, index) => {
            let angle = (window.nextPercentage / 100) * 2 * Math.PI;

            anime({
                targets: sphere.rotation,
                y: angle,
                duration: 1200,
                easing: 'cubicBezier(0.33, 1, 0.68, 1)'
            });

        });

        window.requestAnimationFrame(animate);
    }
    animate();

    for (let i = 0; i < rectangles.length; i++) {
        anime.timeline({
            targets: rectangles[i].material,
            easing: 'easeInOutCubic',
            duration: 250, // Durée de l'animation en millisecondes
        })
            .add({
                opacity: [0, 1], // Change l'opacité de 0 à 1
            })
            .add({
                targets: rectangles[i].position,
                y: [0, -1], // Déplace le rectangle de -1 à 0 le long de l'axe Y
            }, 0); // Commence cette animation en même temps que le changement d'opacité
    }

    camera.position.set(0, 0, zoom);

    camera.setFocalLength(zoom);
    /////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////



    function slide4() {

        let text = 'Thanks';
        let textArray = text.split('');
        let randomChar = () => String.fromCharCode(65 + Math.random() * 25);

        setTimeout(function () {

            textArray.forEach((char, i) => {
                let span = document.querySelector('.ty:nth-child(' + (i + 1) + ')');
                span.innerText = char;


                anime({
                    targets: '.ty',
                    duration: 800,
                    delay: i * 100,
                    easing: 'easeInOutCubic',
                    update: function () {
                        span.innerText = randomChar();
                    },
                    complete: function () {
                        span.innerText = char;
                    }
                });
            });
            const logostart = "M32.9998 6.50004C34.9067 11.3361 35.7249 13.9779 36.4998 18.5C44.3541 21.5881 49.0233 24.4579 53.5 29.5C54.2003 31.2663 54.5283 32.4196 54 36.5C52.9174 39.9698 50.474 41.0773 46.9998 43.5L34.4998 44.5C29.9529 43.7768 27.3582 43.225 22.4998 41.5C17.1749 39.6406 15.8274 37.8219 10.5 34.0002C7.11077 32.7348 8.39119 33.4021 8 36C12.5669 40.735 14.4134 40.824 20.4998 43.5C25.5377 45.7378 28.5166 46.6799 34.4998 47C36.7591 47.1446 43.4596 44.6896 43.9998 46C44.54 47.3105 31.202 58.4121 27.4998 57.5C23.7976 56.588 15.8613 53.8927 13.4998 52.5C11.1383 51.1073 7.55109 49.5719 3.4998 44.5C0.589438 39.1179 -0.672616 36.9842 1.49999 30.0002C1.88798 25.5105 2.7064 23.1125 4.99999 19.0002C6.13955 11.1113 7.3535 6.01901 13.4998 2.00004C17.8729 -0.405661 22.4998 4.50003 22.4998 4.50003C26.7834 -0.897591 29.1108 -0.579235 32.9998 6.50004ZM13.4197 18.1558C13.4197 15.9613 13.4529 9.92765 13.4529 9.92765C13.4529 8.66853 13.7902 7.43693 14.4554 6.54659C15.1207 5.65626 16.6956 5.15607 17.6364 5.15607C18.5772 5.15607 19.4795 5.65626 20.1448 6.54659C20.81 7.43693 21.2451 8.64789 21.2451 9.90701V18.1561L13.4197 18.1558ZM31.8271 9.28397V16.1561L26.135 16.1557L26.1349 9.20708C26.1349 7.9384 26.4919 6.79857 27.1554 5.90148C27.8189 5.00439 28.2203 4.50003 29.1586 4.50003C29.8744 4.50003 30.0619 4.79362 30.4053 5.33123C30.5119 5.49826 30.6336 5.68884 30.7909 5.90148C31.4544 6.79857 31.8271 8.01529 31.8271 9.28397Z";


            const logoend = "M56.2405 16.2727V21.9706L60.2328 21.9708V27.7302C60.2282 30.8996 57.9157 33.4676 55.0628 33.4708H44.2814H38.8907H33.5H24.8664H16.2328C14.9146 33.4708 13.6601 34.0332 12.728 34.9865C11.7959 35.9398 11.2722 37.2328 11.2722 38.5759C11.2722 39.9291 11.7959 41.222 12.728 42.1753C13.6601 43.1286 14.9243 43.6642 16.2424 43.6642H32L42.5 43.6675L53 43.6708H60.2328V49.4302C60.2282 52.5996 57.9157 55.1677 55.0628 55.1708H45.3553H35.6478H25.9403H16.2328C11.925 55.1708 7.75334 53.4426 4.7573 50.3273C1.71125 47.212 3.25227e-07 42.9867 0 38.5759C0 36.224 0.489763 33.9186 1.41165 31.7573L1.42596 16.4452L1.42599 16.4143C1.43394 12.1421 3.09048 8.04673 6.20083 5.02525C9.31867 1.99649 13.5474 0.294956 17.9567 0.294956C22.1009 0.294956 26.0837 1.57193 29.1362 4.24015C32.2018 1.28266 35.3264 -1.14441e-05 39.6597 -1.14441e-05C44.0572 -1.11183e-05 48.2746 1.71444 51.3841 4.76619C54.4936 7.81794 56.2405 11.9569 56.2405 16.2727ZM12.8741 21.9691C12.8741 19.6846 12.9216 16.4702 12.9216 16.4702C12.9216 15.1595 13.4053 13.8775 14.3594 12.9507C15.3134 12.0239 16.6074 11.5032 17.9567 11.5032C19.3059 11.5032 20.5999 12.0239 21.5539 12.9507C22.508 13.8775 23.1319 15.1381 23.1319 16.4488V21.9693L12.8741 21.9691ZM44.7334 16.2728L44.7355 21.9702L34.6107 21.9698L34.6085 16.1928C34.6085 14.8721 35.1205 13.6856 36.072 12.7518C37.0236 11.818 38.3141 11.2933 39.6597 11.2933C41.0053 11.2933 42.2959 11.818 43.2474 12.7518C44.1989 13.6856 44.7334 14.9522 44.7334 16.2728Z";


            anime({
                targets: '.logobi',
                keyframes: [

                    { rotate: 90, duration: 1000, easing: 'easeInOutSine', delay: 1750 },
                ],
                loop: false
            });


            anime({
                targets: '.logo',
                d: [
                    { value: logostart },
                    { value: logoend, duration: 700, }
                ],
                fill: [
                    { value: '#fff', duration: 2500, delay: 600 },
                ],
                loop: false
            });


            anime.timeline({
                targets: '.mail',
                easing: 'easeInOutCubic',
                delay: 1500,
                duration: 250,
            })
                .add({
                    opacity: [0, 1],
                })
                .add({
                    targets: '.mail',
                    y: [-1, 0],
                }, 0);



            anime({
                targets: '.laposte',
                delay: 750,
                top: '70vh',
                left: '90vw',
                easing: 'easeInOutQuad',
                duration: 1500,
                loop: false
            });

        }, 700);
    }

    const track = document.getElementById("image-track2");

    track.style.transform = `translate(0%, -50%)`;







    function createAnimation(target, properties) {
        properties.targets = target;
        properties.easing = 'easeInOutQuad';
        anime(properties);
    }

    createAnimation('.anime', {
        delay: 0,
        width: '74.5%',
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




    let hasRun = true;
    let hasRun2 = true;

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
        track.dataset.percentage = 0;
        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
        const handleOnUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        }

        const handleOnMove2 = e => {
            if (track.dataset.mouseDownAt === "0") return;
            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;

            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentage2Unconstrained2 = parseFloat(track.dataset.prevPercentage) + percentage * .6,
                nextPercentage2 = Math.max(Math.min(nextPercentage2Unconstrained2, 0), -66.66);

            function animateElements(elements, properties, options) {
                for (const element of elements) {
                    element.animate(properties, options);
                }
            }

            let duration = 3000;
            let easing = 'cubic-bezier(0.33, 1, 0.68, 1)';



            let options = { duration: duration, fill: "forwards" };
            if (easing) options.easing = easing;

            track.animate(
                { transform: `translate(${nextPercentage2}%, -50%)` },
                options
            );

            animateElements(track.getElementsByClassName("slide"),
                { backgroundPosition: `${100 + nextPercentage2 * 4.5}% center` },
                options
            );

            animateElements(track.getElementsByClassName("astronaute"),
                { bottom: `${-nextPercentage2 * 2.7}%` },
                options
            );
            window.nextPercentage2 = nextPercentage2;
            track.dataset.percentage = nextPercentage2;

            // Jouer si nextPercentage2 est en dessous de -150 et hasRun est vrai
            if (window.nextPercentage2 <= -15 && hasRun === true) {
                slide3();
                hasRun = false;
            }

            if (window.nextPercentage2 <= -65 && hasRun2 === true) {
                slide4();
                hasRun2 = false;
            }
        }

        window.onmousedown = e => handleOnDown(e);
        window.ontouchstart = e => handleOnDown(e.touches[0]);
        window.onmouseup = e => handleOnUp(e);
        window.ontouchend = e => handleOnUp(e.touches[0]);
        window.onmousemove = e => handleOnMove2(e);
        window.ontouchmove = e => handleOnMove2(e.touches[0]);

        function handleScroll2(direction2) {
            const nextPercentage2Unconstrained2 = direction2 + parseFloat(track.dataset.percentage);


            const nextPercentage2 = Math.max(Math.min(nextPercentage2Unconstrained2, 0), -66.66);

            function animateElements(elements, properties, options) {
                for (const element of elements) {
                    element.animate(properties, options);
                }
            }
            let duration = 1500;
            let easing = 'cubic-bezier(0.33, 1, 0.68, 1)';

            let options = { duration: duration, fill: "forwards" };
            if (easing) options.easing = easing;

            track.animate(
                { transform: `translate(${nextPercentage2}%, -50%)` },
                options
            );

            animateElements(track.getElementsByClassName("slide"),
                { backgroundPosition: `${100 + nextPercentage2 * 4.5}% center` },
                options
            );

            animateElements(track.getElementsByClassName("astronaute"),
                { bottom: `${-nextPercentage2 * 2.7}%` },
                options
            );

            track.dataset.percentage = nextPercentage2;

            window.nextPercentage2 = nextPercentage2;
            track.dataset.prevPercentage = track.dataset.percentage;

            // Jouer si nextPercentage2 est en dessous de -150 et hasRun est vrai
            if (window.nextPercentage2 <= -15 && hasRun === true) {
                slide3();
                hasRun = false;
            }

            if (window.nextPercentage2 <= -65 && hasRun2 === true) {
                slide4();
                hasRun2 = false;
            }
        }

        // Listen for the "wheel" event
        window.addEventListener("wheel", (event) => {
            const direction2 = event.deltaY > 0 ? 4 : -4;
            handleScroll2(direction2);
        });
        // Listen for the "keydown" event
        document.addEventListener("keydown", function (event) {
            let direction2 = 0;
            switch (event.key) {
                case "ArrowUp":
                    direction2 = -4;
                    break;
                case "ArrowDown":
                    direction2 = 4;
                    break;
                case "ArrowLeft":
                    direction2 = 4;
                    break;
                case "ArrowRight":
                    direction2 = -4;
                    break;
                default:
                    return;
            }
            handleScroll2(direction2);
        });

        /////////////////////////////////////////////////////
    }
});





















</script>

<style scoped>
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

.res {
    margin-top: 5vh;
    font-size: 2vw;
    text-decoration: none;
    font-style: italic;
}

.reseaux {
    color: #ffffff;
    margin: 0 30px 0 0 !important;
    font-family: 'tenby-five.otf';
    font-style: italic;
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

.left2 {
    width: 35vw;
    margin: 25vw 10vw 0 5vw;
    font-family: 'font2.ttf';
}

.right2 {
    width: 80vw;
    margin: 0 0 0 -30vw;
    font-family: 'font2.ttf';
}

.logobi {
    z-index: 4;
    width: auto;
    width: 10vw;
    max-width: 85px;
    height: auto;
    cursor: pointer;
    position: absolute;
    top: 9vh;
    left: 6vw;
}

.merci {
    transform: scaleX(0.6) !important;
    transform-origin: left;
}

.ty {
    text-transform: uppercase;
    opacity: 1;
    font-size: 14vw;
}

#image-track2 {
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
}

.end1 {
    margin: 2vw 0 0 20vw;
    font-size: 2.2vw;
}

.end2 {
    margin: 0;
    font-size: 2.2vw;
}

.txt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: absolute;
    top: 0;
}

.by {
    margin: 0 0 0 58vw;
    font-size: 1.7vw;
    white-space: nowrap;
}

span {
    font-size: 11vw;
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
    font-size: 1.7vw;
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
    margin-top: -2vh;
    width: 45vw;
    transform: scaleX(0.6);
    transform-origin: left;
    font-family: 'font2.ttf';
}

.right {
    justify-content: center;
    width: 45vw;
    margin: 3vh 0 0 0;
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

.laposte {
    transform: translate(50%, -50%);
    position: absolute;
    z-index: 5;
    top: 52vh;
    left: -1.2vw;
    width: 22%;
}

.mail {
    width: auto;
    height: 17vw;
    margin: 0 0 2vw 45vw;
    opacity: 0;
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