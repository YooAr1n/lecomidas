<template>
  <div class="prepare-wrapper">
    <div class="confirm-card">
      <div class="card-header">
        <h1>Your order is being prepared ☕</h1>
      </div>
      
      <hr class="divider">

      <div class="card-body">
        <p>Thank you for choosing <strong>Lecomidas Coffee & Pastries</strong>. Your order is currently being processed and will be ready shortly.</p>
        
        <ul class="info-list">
          <li>For dine-in customers, your order will be served directly to your table.</li>
          <li>For takeout, please wait for your name to be called.</li>
          <li>If you arranged delivery via a courier (Grab, Lalamove, etc.), kindly inform us once your rider is on the way.</li>
        </ul>

        <p class="footer-note">
          We appreciate your support — sit back, relax, and enjoy the Lecomidas experience.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrepareComponent"
}
</script>

<style scoped>
.prepare-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Start from top to account for margin-top in parent */
  padding: 40px 20px;
}

.confirm-card {
  background-color: rgba(255, 255, 255, 0.832);
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  padding: 40px;
  text-align: left;
}

.card-header h1 {
  font-size: 2.2rem;
  color: #53433f;
  text-align: center;
  margin: 0;
}

.divider {
  border: none;
  border-top: 1px solid #333;
  margin: 25px 0;
}

.card-body {
  color: #333;
  line-height: 1.6;
  font-size: 1.1rem;
}

.info-list {
  list-style-type: none;
  padding-left: 0;
  margin: 20px 0;
}

.info-list li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
}

/* Bullet point matching the screenshot style */
.info-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  font-weight: bold;
  font-size: 1.2rem;
}

.footer-note {
  margin-top: 30px;
  font-style: italic;
  color: #333;
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .confirm-card {
    padding: 20px;
  }
  .card-header h1 {
    font-size: 1.6rem;
  }
}
</style>