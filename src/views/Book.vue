<template>
    <div class="book-container">
        <div class="content-card">
            <h1 class="main-title">Private Event Services</h1>
            <p class="subtitle">Bring the Lecomidas experience to your special occasions with our professional coffee cart services.</p>

            <div class="packages-grid">
                <Package 
                    :imageSources="[event1, event4]" 
                    title="50 Pax Package" 
                    price=6000
                    :features="['FREE 5 Cups', '✓ 5 Coffee Flavors', '✓ 3 Non-Coffee Options', '✓ 2 Baristas + 2 Staff', '✓ Booth Setup • 5 Hours']" 
                />
                <Package 
                    :imageSources="[event2, event5]" 
                    title="100 Pax Package" 
                    price=10000
                    :features="['FREE 10 Cups', '✓ 5 Coffee Flavors', '✓ 3 Non-Coffee Options', '✓ 2 Baristas + 2 Staff', '✓ Booth Setup • 5 Hours']" 
                />
                <Package 
                    :imageSources="[event3, event6]" 
                    title="150 Pax Package" 
                    price=14000
                    :features="['FREE 15 Cups', '✓ 5 Coffee Flavors', '✓ 3 Non-Coffee Options', '✓ 2 Baristas + 2 Staff', '✓ Booth Setup • 5 Hours']" 
                />
            </div>

            <div class="footer-contact">
                <h3>Book Your Event</h3>
                <p>📞 0977 419 9344</p>
                <p>📧 lecomidas.ventures@gmail.com</p>
                <router-link to="/visit">
                    <button class="inquire-btn">Inquire Now</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Package from '../components/Package.vue';

// Import images from assets
import event1 from "../assets/events-1.jpg";
import event2 from "../assets/events-2.jpg";
import event3 from "../assets/events-3.jpg";
import event4 from "../assets/events-4.jpg";
import event5 from "../assets/events-5.jpg";
import event6 from "../assets/events-6.jpg";

export default {
    components: {
        Package
    },
    data() {
        return {
            // Expose the images to the template
            event1,
            event2,
            event3,
            event4,
            event5,
            event6
        };
    },
    mounted() {
        document.title = "Private Event Services";
    },
};
</script>

<style scoped>
.book-container {
    padding: 40px 20px;
    display: flex;
    justify-content: center;
    color: #333;
    background-image: url("../assets/cafebg.png");
    background-size: cover;
    background-position: center top;
    background-attachment: fixed;
    min-height: calc(100vh - 90px);
    width: 100%;
}

.content-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    max-width: 1200px;
    width: 100%;
    padding: 40px;
    text-align: center;
}

.main-title {
    font-size: 2.5rem;
    color: #53433f;
}

.subtitle {
    font-size: 20px;
    margin-bottom: 40px;
    color: #333;
}

.packages-grid {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.footer-contact {
    margin-top: 50px;
    font-size: 20px;
}

.footer-contact h3{
    margin: 0;
    font-size: 24px;
    color: #53433f;
}
.footer-contact p{
    margin: 5px;
}

.inquire-btn {
    background-color: #312618;
    color: #f9ebce;
    border: none;
    padding: 12px 30px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;
} 

.inquire-btn:hover {
    background-color: #5b4426;
}
</style>