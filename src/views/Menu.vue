<template>
  <div class="menu-layout">
    <!-- Left visual -->
    <div class="side-images">
      <img src="../assets/menu.png" alt="Left Menu Visual" />
    </div>

    <!-- Main menu -->
    <div class="menu-container">
      <MainMenu />
    </div>

    <!-- Right visual -->
    <div class="side-images">
      <img src="../assets/menu.png" alt="Right Menu Visual" />
    </div>
  </div>
</template>

<script>
import MainMenu from "../components/MainMenu.vue";

export default {
  components: { MainMenu },
  mounted() {
    document.title = "Menu";
  },
};
</script>

<style scoped>
/* Layout: Keeps the 3-column structure on all screen sizes */
.menu-layout {
  display: flex;
  flex-direction: row; /* Always stay in a row */
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

/* Side images: 25% width on desktop */
.side-images {
  flex: 0 0 25%; 
  display: flex;
  overflow: hidden;
}

.side-images img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the cake stays centered and fills the bar */
  display: block;
}

/* Main menu container: 50% width on desktop */
.menu-container {
  flex: 0 0 50%;
  background-color: #f1ece5;
  padding: 30px 15px;
  box-sizing: border-box;
  z-index: 2;
}

/* --- Responsive for smaller screens --- */
@media (max-width: 768px) {
  /* On mobile, make images thinner so the menu has more room */
  .side-images {
    flex: 0 0 15%; 
  }

  .menu-container {
    flex: 0 0 70%;
    padding: 20px 10px;
  }
}

@media (max-width: 480px) {
  /* On very small phones, keep images even thinner */
  .side-images {
    flex: 0 0 10%;
  }

  .menu-container {
    flex: 0 0 80%;
    padding: 15px 5px;
  }
}
</style>