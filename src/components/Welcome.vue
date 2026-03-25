<template>
  <div class="welcome-container">
    <h2>Welcome to Lecomidas Coffee & Pastries!</h2>

    <!-- Auto sliding welcome images -->
    <div class="slider">
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
import { ref, onMounted, onBeforeUnmount } from "vue";

// ✅ Import images using ES module imports
import coffee1 from "../assets/coffee-1.jpg";
import coffee2 from "../assets/coffee-2.jpg";
import coffee3 from "../assets/coffee-3.jpg";
import coffee4 from "../assets/coffee-4.jpg";
import coffee5 from "../assets/coffee-5.jpg";
import coffee6 from "../assets/coffee-6.jpg";
import coffee7 from "../assets/coffee-7.jpg";
import coffee8 from "../assets/coffee-8.jpg";
import coffee9 from "../assets/coffee-9.jpg";

export default {
  name: "Welcome",
  setup() {
    const images = [
      coffee1,
      coffee2,
      coffee3,
      coffee4,
      coffee5,
      coffee6,
      coffee7,
      coffee8,
      coffee9,
    ];

    const currentIndex = ref(0);
    let interval;

    onMounted(() => {
      interval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length;
      }, 3000); // slide every 3 seconds
    });

    onBeforeUnmount(() => {
      clearInterval(interval);
    });

    return { images, currentIndex };
  },
};
</script>

<style scoped>
.welcome-container {
  text-align: center;
  font-size: 20px;
  padding: 5px 20px;
  color: #53433f;
  background-color: rgba(255, 255, 255, 0.832);
  border-radius: 20px;
}

.welcome-container h2 {
  margin: 10px;
}

/* Slider container */
.slider {
  position: relative;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 15px;
  aspect-ratio: 1.414;
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
  transition: opacity 1s ease-in-out;
}

/* Active image */
.slider img.active {
  opacity: 1;
}
</style>