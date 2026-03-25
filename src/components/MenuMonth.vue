<template>
  <div class="menu-container">
    <h2>Menu of the Month</h2>

    <!-- Slider with arrows -->
    <div class="slider">
      <button class="arrow left" @click="prevSlide">&#10094;</button>
      <button class="arrow right" @click="nextSlide">&#10095;</button>

      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        :class="{ active: index === currentIndex }"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

// Import images
import cookie1 from "../assets/chewy-cookies-1.jpg";
import cookie2 from "../assets/chewy-cookies-2.jpg";
import cookie3 from "../assets/chewy-cookies-3.jpg";
import cookie4 from "../assets/chewy-cookies-4.jpg";
import cookie5 from "../assets/chewy-cookies-5.jpg";

export default {
  name: "MenuMonth",
  setup() {
    const images = [
      cookie1,
      cookie2,
      cookie3,
      cookie4,
      cookie5,
    ];

    const currentIndex = ref(0);

    // Show previous slide
    const prevSlide = () => {
      currentIndex.value =
        (currentIndex.value - 1 + images.length) % images.length;
    };

    // Show next slide
    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % images.length;
    };

    return { images, currentIndex, prevSlide, nextSlide };
  },
};
</script>

<style scoped>
.menu-container {
  text-align: center;
  font-size: 20px;
  padding: 5px 20px;
  color: #53433f;
  background-color: rgba(255, 255, 255, 0.832);
  border-radius: 20px;
}

.menu-container h2 {
  margin: 10px;
}

/* Slider container */
.slider {
  position: relative;
  margin: 10px auto;
  overflow: hidden;
  border-radius: 15px;
  aspect-ratio: 4/3;
}

/* Slider images */
.slider img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

/* Active image */
.slider img.active {
  opacity: 1;
}

/* Arrow buttons */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px; /* smaller to fit nicely inside circle */
  color: white;
  background: rgba(0,0,0,0.3);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 10;

  /* ✅ Center content */
  display: flex;
  align-items: center;
  justify-content: center;

  transition: background 0.3s;
}

.arrow:hover {
  background: rgba(0,0,0,0.6);
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}
</style>