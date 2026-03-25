<template>
  <div class="customers-container">
    <h2>What Our Customers Say</h2>

    <!-- Slider with arrows -->
    <div class="slider">
      <button class="arrow left" @click="prevSlide">&#10094;</button>
      <button class="arrow right" @click="nextSlide">&#10095;</button>

      <a
        v-for="(customer, index) in customers"
        :key="index"
        :href="customer.link"
        target="_blank"
        :class="{ active: index === currentIndex }"
      >
        <img :src="customer.img" />
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

// Import customer images
import cust1 from "../assets/review-1.jpg";
import cust2 from "../assets/review-2.jpg";
import cust3 from "../assets/review-3.jpg";

export default {
  name: "Customers",
  setup() {
    const customers = [
      { img: cust1, link: "https://share.google/P9psZCdHl8qU33Jww" },
      { img: cust2, link: "https://share.google/3TlU7T9Ynls9JajEF" },
      { img: cust3, link: "https://share.google/2G414NRwWwtgzfpVt" },
    ];

    const currentIndex = ref(0);

    const prevSlide = () => {
      currentIndex.value =
        (currentIndex.value - 1 + customers.length) % customers.length;
    };

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % customers.length;
    };

    return { customers, currentIndex, prevSlide, nextSlide };
  },
};
</script>

<style scoped>
.customers-container {
  text-align: center;
  font-size: 20px;
  padding: 5px 20px;
  color: #53433f;
  background-color: rgba(255, 255, 255, 0.832);
  border-radius: 20px;
}

.customers-container h2 {
  margin: 10px;
}

/* Slider container */
.slider {
  position: relative;
  margin: 10px auto;
  overflow: hidden;
  border-radius: 15px;
  aspect-ratio: 16/9;
}

/* Slider links */
.slider a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  display: block; /* make anchor fill slider */
}

/* Active link */
.slider a.active {
  opacity: 1;
  z-index: 1;
}

/* Images inside link */
.slider a img {
  width: 100%;
  height: 100%;

  border-radius: 15px;
}

/* Arrow buttons */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  color: white;
  background: rgba(0,0,0,0.3);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 10;

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