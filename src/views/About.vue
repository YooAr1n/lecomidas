<template>
  <div class="about-container">
    <AboutInfo title="Business Overview" :imageSrc="signImage" content="
        <p>Lecomidas Coffee & Pastries is a cozy café located in Quezon City, Metro Manila. We specialize in coffee, beverages, pastries, and cheesecakes, offering a home-like atmosphere where customers can unwind.</p>
        <p>Our café highlights cheesecakes as our flagship product, earning us the title <b>“Home of the Best Cheesecake.”</b></p>
        ">
    </AboutInfo>
    <AboutInfo :reverse="true" title="Operating Hours & Services" :imageSrc="openImage" content="
        <p>We are open daily from 5:00 PM to 12:00 AM.</p><b>Services Offered:</b>
            <ul>
                <li>Dine-In: Available</li>
                <li>Takeout: Available</li>
                <li>Delivery: Customer-arranged</li>
            </ul>
        ">
    </AboutInfo>
    <AboutInfo title="Our Philosophy" :imageSrc="bookImage" content="
        <p>We serve students, professionals, and dessert lovers looking for a warm, inviting café experience.</p>
        <p>Comfort, warmth, and relaxation — that’s the space we aim to create.</p>
        <p><b>“Relax your soul with a sip of coffee.”</b><p>
        ">
    </AboutInfo>
  </div>
</template>

<script>
import AboutInfo from '../components/AboutInfo.vue';
import signImg from '../assets/sign.jpg';
import openImg from '../assets/open.jpg'
import bookImg from '../assets/book.jpg'

export default {
  components: {
    AboutInfo
  },
  data() {
    return {
      signImage: signImg, // Assign it to a data property
      openImage: openImg,
      bookImage: bookImg
    };
  },
  mounted() {
    document.title = "About Us";
  },
};
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0; /* Vertical padding for spacing */
  
  /* Background Magic */
  background-image: url("../assets/cafebg.png");
  background-size: cover;        
  background-position: center top;   /* Keeps the image centered */
  background-attachment: fixed; /* STOPS the image from moving when scrolling */
  
  min-height: calc(100vh - 90px);
  width: 100%;                  /* Ensures it spans side-to-side */
}

</style>