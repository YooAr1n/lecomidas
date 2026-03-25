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
/* Layout: left image - menu - right image */
.menu-layout {
  display: flex;
  gap: 0;
  flex-wrap: nowrap;
  align-items: stretch;       /* stretch all children vertically */
  margin: 100px 0 auto;
}

/* Side images (25% each) */
.side-images {
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.side-images img {
  flex: 1;                    /* fill vertical space */
  width: 100%;
  object-fit: cover;
  display: block;
}

/* Main menu container (50% width) */
.menu-container {
  flex: 0 0 50%;
  background-color: #f1ece5;
  padding: 30px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Optional: scrollable menu if too tall */
.menu-container > * {
  overflow-y: auto;
}

/* Responsive for smaller screens */
@media (max-width: 992px) {
  .menu-layout {
    flex-direction: column;
  }

  .side-images, .menu-container {
    flex: unset;
    width: 100%;
    max-height: none;
  }

  .side-images img {
    height: 200px; /* optional height for mobile */
  }
}
</style>