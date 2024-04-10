<template>
  <div class="top">
    <svg width="61" height="56" viewBox="0 0 61 56" fill="none" alt="logo" class="logobi" @click="reloadPage">
      <path fill-rule="evenodd" clip-rule="evenodd" class="logo"
        d="M32.9998 6.50004C34.9067 11.3361 35.7249 13.9779 36.4998 18.5C44.3541 21.5881 49.0233 24.4579 53.5 29.5C54.2003 31.2663 54.5283 32.4196 54 36.5C52.9174 39.9698 50.474 41.0773 46.9998 43.5L34.4998 44.5C29.9529 43.7768 27.3582 43.225 22.4998 41.5C17.1749 39.6406 15.8274 37.8219 10.5 34.0002C7.11077 32.7348 8.39119 33.4021 8 36C12.5669 40.735 14.4134 40.824 20.4998 43.5C25.5377 45.7378 28.5166 46.6799 34.4998 47C36.7591 47.1446 43.4596 44.6896 43.9998 46C44.54 47.3105 31.202 58.4121 27.4998 57.5C23.7976 56.588 15.8613 53.8927 13.4998 52.5C11.1383 51.1073 7.55109 49.5719 3.4998 44.5C0.589438 39.1179 -0.672616 36.9842 1.49999 30.0002C1.88798 25.5105 2.7064 23.1125 4.99999 19.0002C6.13955 11.1113 7.3535 6.01901 13.4998 2.00004C17.8729 -0.405661 22.4998 4.50003 22.4998 4.50003C26.7834 -0.897591 29.1108 -0.579235 32.9998 6.50004ZM13.4197 18.1558C13.4197 15.9613 13.4529 9.92765 13.4529 9.92765C13.4529 8.66853 13.7902 7.43693 14.4554 6.54659C15.1207 5.65626 16.6956 5.15607 17.6364 5.15607C18.5772 5.15607 19.4795 5.65626 20.1448 6.54659C20.81 7.43693 21.2451 8.64789 21.2451 9.90701V18.1561L13.4197 18.1558ZM31.8271 9.28397V16.1561L26.135 16.1557L26.1349 9.20708C26.1349 7.9384 26.4919 6.79857 27.1554 5.90148C27.8189 5.00439 28.2203 4.50003 29.1586 4.50003C29.8744 4.50003 30.0619 4.79362 30.4053 5.33123C30.5119 5.49826 30.6336 5.68884 30.7909 5.90148C31.4544 6.79857 31.8271 8.01529 31.8271 9.28397Z"
        fill="rgb(139, 139, 139)" />
    </svg>
    <p class="date">2023</p>
  </div>
  <div class="txt">
    <h2 class="l1"> Hi! I'm Baptiste,</h2>
    <h2 class="l2">a twenty-two y.o</h2>
    <h2 class="l3">French developer.
    </h2>
  </div>
  <p>Visit on a desktop for a comprehensive experience.</p>

  <p class="presentation">
    I am currently in my second year of computer science studies. I have a passion for development in general, but
    I am particularly interested in front-end development, especially in the areas of motion and interaction.
  </p>

  <p class="end1">
    Available for freelance work, Would you like to discuss a new project?
  </p>
  <a href="mailto:bapt.audeon@gmail.com">
    <img src="/src/assets/img/e-mail.png" alt="" class="mail" draggable="false" width="150px">
  </a>
  <p class="end1">Contact :</p>

  <div class="res">
    <a class="reseaux" href="https://www.linkedin.com/in/baptiste-audeon-04b070287/">Linkedin</a>
    <!-- <a class="reseaux" href="">Twitter</a>
    <a class="reseaux" href="">Behance</a> -->
  </div>

  <p class="by">Designed by Baptiste Audeon.</p>
</template>


<style>
html,
body {
  overflow-y: auto;
  overflow-x: auto;
}

.top {
  display: flex;
  justify-content: space-between;
  margin: 7vh 9vw 5vh 9vw;
}

.logobi {
  z-index: 10;
  align-self: flex-start;

}

.date {
  color: #fff;
  align-self: flex-start;
  font-family: 'font2.ttf';
  font-size: 1.5rem;
  padding-right: 3vw;
}

.l1 {
  z-index: 3;
  margin: 0 0 0 5vw;
}

.l2 {
  margin: 0 0 0 5vw;
  z-index: 1;
}

.l3 {
  margin: 0;
  z-index: 3;
  margin: 0 0 0 5vw;
}

span {
  color: #961a98;
  text-transform: uppercase;
  font-family: 'font2.ttf';
}

.txt {
  display: flex;
  white-space: nowrap;
  font-size: 1.7em;
  color: #fff;
  flex-direction: column;
  top: 0;
  transform: scaleX(0.6);
  transform-origin: left;
  /* aligber aux milieux */
  margin: 0 0 0vh 5vw;
}

p {
  color: #961a98;
  font-size: .9rem;
  margin: .5vh 0 0 7vw;
}

.end1 {
  color: #fff;
  font-size: 1rem;
  margin: 5vh 5vw;
}

.presentation {
  color: #fff;
  font-size: 1rem;
  margin: 5vh 5vw;

}

.mail {
  margin: 0 0 0 35vw;
}

.res {
  font-size: 1rem;
  text-decoration: none;
  font-style: italic;
  margin: 3vh 10vw 0 5vw;
}

.reseaux {
  color: #ffffff;
  margin: 0 30px 0vh 0 !important;
  font-style: italic;
  font-family: 'tenby-five.otf';
}

.by {
  margin: 5vh 5vw 3vh 0;
  color: #fff;
  font-size: .8rem;
  text-align: right;
  /* Aligns text to the right side of the page */
}
</style>


<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import anime from 'animejs/lib/anime.es.js';
const reloadPage = () => {
  location.reload()
};




onMounted(() => {
  const logostart = "M32.9998 6.50004C34.9067 11.3361 35.7249 13.9779 36.4998 18.5C44.3541 21.5881 49.0233 24.4579 53.5 29.5C54.2003 31.2663 54.5283 32.4196 54 36.5C52.9174 39.9698 50.474 41.0773 46.9998 43.5L34.4998 44.5C29.9529 43.7768 27.3582 43.225 22.4998 41.5C17.1749 39.6406 15.8274 37.8219 10.5 34.0002C7.11077 32.7348 8.39119 33.4021 8 36C12.5669 40.735 14.4134 40.824 20.4998 43.5C25.5377 45.7378 28.5166 46.6799 34.4998 47C36.7591 47.1446 43.4596 44.6896 43.9998 46C44.54 47.3105 31.202 58.4121 27.4998 57.5C23.7976 56.588 15.8613 53.8927 13.4998 52.5C11.1383 51.1073 7.55109 49.5719 3.4998 44.5C0.589438 39.1179 -0.672616 36.9842 1.49999 30.0002C1.88798 25.5105 2.7064 23.1125 4.99999 19.0002C6.13955 11.1113 7.3535 6.01901 13.4998 2.00004C17.8729 -0.405661 22.4998 4.50003 22.4998 4.50003C26.7834 -0.897591 29.1108 -0.579235 32.9998 6.50004ZM13.4197 18.1558C13.4197 15.9613 13.4529 9.92765 13.4529 9.92765C13.4529 8.66853 13.7902 7.43693 14.4554 6.54659C15.1207 5.65626 16.6956 5.15607 17.6364 5.15607C18.5772 5.15607 19.4795 5.65626 20.1448 6.54659C20.81 7.43693 21.2451 8.64789 21.2451 9.90701V18.1561L13.4197 18.1558ZM31.8271 9.28397V16.1561L26.135 16.1557L26.1349 9.20708C26.1349 7.9384 26.4919 6.79857 27.1554 5.90148C27.8189 5.00439 28.2203 4.50003 29.1586 4.50003C29.8744 4.50003 30.0619 4.79362 30.4053 5.33123C30.5119 5.49826 30.6336 5.68884 30.7909 5.90148C31.4544 6.79857 31.8271 8.01529 31.8271 9.28397Z";


  const logoend = "M56.2405 16.2727V21.9706L60.2328 21.9708V27.7302C60.2282 30.8996 57.9157 33.4676 55.0628 33.4708H44.2814H38.8907H33.5H24.8664H16.2328C14.9146 33.4708 13.6601 34.0332 12.728 34.9865C11.7959 35.9398 11.2722 37.2328 11.2722 38.5759C11.2722 39.9291 11.7959 41.222 12.728 42.1753C13.6601 43.1286 14.9243 43.6642 16.2424 43.6642H32L42.5 43.6675L53 43.6708H60.2328V49.4302C60.2282 52.5996 57.9157 55.1677 55.0628 55.1708H45.3553H35.6478H25.9403H16.2328C11.925 55.1708 7.75334 53.4426 4.7573 50.3273C1.71125 47.212 3.25227e-07 42.9867 0 38.5759C0 36.224 0.489763 33.9186 1.41165 31.7573L1.42596 16.4452L1.42599 16.4143C1.43394 12.1421 3.09048 8.04673 6.20083 5.02525C9.31867 1.99649 13.5474 0.294956 17.9567 0.294956C22.1009 0.294956 26.0837 1.57193 29.1362 4.24015C32.2018 1.28266 35.3264 -1.14441e-05 39.6597 -1.14441e-05C44.0572 -1.11183e-05 48.2746 1.71444 51.3841 4.76619C54.4936 7.81794 56.2405 11.9569 56.2405 16.2727ZM12.8741 21.9691C12.8741 19.6846 12.9216 16.4702 12.9216 16.4702C12.9216 15.1595 13.4053 13.8775 14.3594 12.9507C15.3134 12.0239 16.6074 11.5032 17.9567 11.5032C19.3059 11.5032 20.5999 12.0239 21.5539 12.9507C22.508 13.8775 23.1319 15.1381 23.1319 16.4488V21.9693L12.8741 21.9691ZM44.7334 16.2728L44.7355 21.9702L34.6107 21.9698L34.6085 16.1928C34.6085 14.8721 35.1205 13.6856 36.072 12.7518C37.0236 11.818 38.3141 11.2933 39.6597 11.2933C41.0053 11.2933 42.2959 11.818 43.2474 12.7518C44.1989 13.6856 44.7334 14.9522 44.7334 16.2728Z";

  anime({
    targets: '.logobi',
    keyframes: [

      { rotate: 90, duration: 1000, easing: 'easeInOutSine', delay: 500 },
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


  var elements = ['.l1', '.l2', '.l3'];
  var marginLeftValues = ['5vw', '6vw', '5vw'];


  elements.forEach((element, i) => {
    anime.timeline({
      targets: element,
      easing: 'easeInOutCubic',
      delay: 1500 + (300 * i),
      duration: 300,
    })
      .add({
        opacity: [0, 1],
      })
      .add({
        targets: element,
        marginLeft: ['-100vw', marginLeftValues[i]],
      }, 0);
  });


})

</script>