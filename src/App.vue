<template>
  <nav class="navbar">
    <div class="nav-top">
      <div class="logo">
        <router-link to="/">
          <img src="./assets/logofinal.png" alt="Lecomidas Cafe" />
        </router-link>
      </div>

      <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
        <span :class="{'open': isMenuOpen}"></span>
        <span :class="{'open': isMenuOpen}"></span>
        <span :class="{'open': isMenuOpen}"></span>
      </button>
    </div>

    <div class="nav-content" :class="{'show': isMenuOpen}">
      <div class="nav-links">
        <router-link to="/" @click="isMenuOpen = false">Home</router-link>
        <router-link to="/menu" @click="isMenuOpen = false">Menu</router-link>
        <router-link to="/orders" @click="isMenuOpen = false">My Orders</router-link>
        <router-link to="/about" @click="isMenuOpen = false">About Us</router-link>
        <router-link to="/visit" @click="isMenuOpen = false">Visit Us</router-link>
        <router-link to="/book" @click="isMenuOpen = false">Book Us</router-link>
      </div>

      <div class="balance-container">
        <span class="balance-label">Balance:</span>
        <span class="balance-amount">₱{{ format(userBalance, 2) }}</span>
        <div class="topup-group">
          <button @click="addFunds(1000)" class="btn-topup">+₱1k</button>
          <button @click="addFunds(5000)" class="btn-topup">+₱5k</button>
        </div>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const format = window.format;
    const userBalance = ref(parseFloat(localStorage.getItem('lecomidas_balance')) || 5000.00);
    const isMenuOpen = ref(false); // Track mobile menu state

    const updateBalance = () => {
      const stored = localStorage.getItem('lecomidas_balance');
      if (stored !== null) userBalance.value = parseFloat(stored);
    };

    onMounted(() => {
      window.addEventListener('storage', updateBalance);
      const interval = setInterval(updateBalance, 1000);
      onUnmounted(() => {
        window.removeEventListener('storage', updateBalance);
        clearInterval(interval);
      });
    });

    const addFunds = (amount) => {
      const current = parseFloat(localStorage.getItem('lecomidas_balance')) || 5000.00;
      const updated = current + amount;
      localStorage.setItem('lecomidas_balance', updated.toFixed(2));
      userBalance.value = updated;
    };

    return { userBalance, format, addFunds, isMenuOpen };
  }
}
</script>