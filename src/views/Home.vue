<template>
  <div class="columns-container">
    <div class="left-column">
      <Welcome />
    </div>

    <div class="right-column">
      <div class="right-content">
        <div class="right-item">
          <MenuMonth />
        </div>
        <div class="right-item">
          <Customers />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuMonth from '../components/MenuMonth.vue';
import Welcome from '../components/Welcome.vue';
import Customers from '../components/Customers.vue';

export default {
  components: {
    Welcome,
    MenuMonth,
    Customers,
  },
  mounted() {
    document.title = "Lecomidas Café";
  },
};
</script>

<style scoped>
/* Container holding both columns */
.columns-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  align-items: stretch; /* stretch both columns to same height */

  /* Background Magic */
  background-image: url("../assets/cafebg.png");
  background-size: cover;        
  background-position: center top;   /* Keeps the image centered */
  background-attachment: fixed; /* STOPS the image from moving when scrolling */
  
  min-height: calc(100vh - 90px);
  width: 100%;                  /* Ensures it spans side-to-side */
}

/* Left column (twice as wide) */
.left-column {
  flex: 2; /* 2 parts of 3 total */
  display: flex;
  flex-direction: column;
}

/* Right column */
.right-column {
  flex: 1; /* 1 part of 3 total */
  display: flex;
  justify-content: center;
}

/* Right column content wrapper */
.right-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%; /* stretch to match left column height */
}

/* Each right item stretches equally */
.right-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* optional: spacing inside each section */
}

/* Responsive: stack columns on smaller screens */
@media (max-width: 992px) {
  .columns-container {
    flex-direction: column;
  }

  .left-column,
  .right-column {
    flex: unset;
    width: 100%;
  }

  .right-content {
    max-width: 100%;
    height: auto;
  }

  .right-item {
    flex: unset;
  }
}
</style>