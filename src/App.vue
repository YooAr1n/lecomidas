<template>
  <nav class="navbar">

    <!-- 🌸 Logo -->
    <div class="logo">
      <router-link to="/">
        <img src="./assets/logofinal.png" alt="Lecomidas Cafe" />
      </router-link>
    </div>

    <!-- 🎶 Links -->
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/menu">Menu</router-link>
      <router-link to="/about">About Us</router-link>
      <router-link to="/visit">Visit Us</router-link>
      <router-link to="/book">Book Us</router-link>
    </div>

  </nav>

  <router-view />
</template>
