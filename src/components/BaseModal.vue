<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div :class="['modal-card', extraClass]">
      <slot></slot> </div>
  </div>
</template>

<script>
export default {
  props: {
    extraClass: String // For adding "warning-card" styling
  },
  emits: ['close']
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.warning-card {
  text-align: center;
  border-top: 5px solid #d9534f;
}
</style>