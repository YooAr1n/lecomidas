<template>
  <div class="map-overlay-wrapper">
    <div class="info-card">
      <h2 class="tagline">Drop by and relax your soul with a sip of coffee.</h2>

      <div class="content-layout">
        <div class="text-section">
          <section class="info-group">
            <h3 class="section-title">📍 Location</h3>
            <div class="details">
              <p><strong>Lecomidas Coffee & Pastries</strong></p>
              <p>20A Faustino St., Brgy. Holy Spirit</p>
              <p>Quezon City, Metro Manila</p>
            </div>
          </section>

          <section class="info-group">
            <h3 class="section-title">📞 Contact Us</h3>
            <div class="details">
              <p><strong>Phone:</strong> 0977 419 9344</p>
              <p><strong>Email:</strong> lecomidas.ventures@gmail.com</p>
              <p><strong>Facebook:</strong> facebook.com/Lecomidas</p>
              <p><strong>Instagram:</strong> instagram.com/lecomidas</p>
            </div>
          </section>
        </div>

        <div class="map-section">
          <div class="map-border">
            <a href="https://maps.app.goo.gl/B19UVgjsCCLJ3Ccu8">
                <img src="../assets/map.png">
            </a>
          </div>
        </div>
      </div>

      <p class="footer-msg">See you around!</p>
    </div>
  </div>
</template>

<style scoped>
/* Center the card on the page */
.map-overlay-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.info-card {
  background-color: rgba(255, 255, 255, 0.832);
  border-radius: 15px;
  max-width: 950px;
  width: 100%;
  padding: 30px;
  text-align: center;
}

.tagline {
  font-size: 36px;
  font-weight: bold;
  color: #53433f;
  margin-top: 0;
  margin-bottom: 20px;
}

.content-layout {
  display: flex;
  align-items: center; /* This keeps text and map balanced */
  gap: 40px;
  text-align: left;
}

.text-section {
  flex: 1;
}

.section-title {
  color: #53433f;
  font-size: 24px;
  margin-bottom: 10px;
}

.details p {
  margin: 4px 0;
  font-size: 20px;
  color: #333;
}

.map-section {
  flex: 1.2;
  min-width: 0; /* Forces flex items to respect container width */
}

.map-border {
  border: 5px solid #4b3621;
  border-radius: 8px;
  height: 320px;
  overflow: hidden; /* Clips anything outside the border */
  display: flex;
}

.map-border a {
  width: 100%;
  height: 100%;
}

.map-border img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This makes the image fill the box without stretching or overflowing */
  display: block;
}

.footer-msg {
  margin-top: 20px;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 28px;
  color: #53433f;
}

/* Make it stack on mobile */
@media (max-width: 768px) {
  .content-layout {
    flex-direction: column;
  }
  .info-card {
    padding: 30px 15px;
  }
}
</style>