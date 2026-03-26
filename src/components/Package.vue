<template>
    <div class="package-item">
        <div class="image-wrapper">
             <img 
                v-for="(img, index) in imageSources" 
                :key="index" 
                :src="img" 
                alt="Package Image" 
                :class="{ active: index === currentIndex }"
            />
        </div>

        <div class="info-details">
            <h3>{{ title }}</h3>
            <p class="price">₱{{ format(price, 2) }}</p>
            <ul class="feature-list">
                <li v-for="(feature, index) in features" :key="index">
                    {{ feature }}
                </li>
            </ul>
            
            <button class="order-pkg-btn" @click="showModal = true">
                Order This Package
            </button>
        </div>

        <BaseModal v-if="showModal" @close="showModal = false">
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 10px;">📦</div>
                <h2>Confirm Package Order</h2>
                <hr>
                <div class="modal-summary">
                    <p>You are about to order:</p>
                    <p><strong>{{ title }}</strong></p>
                    <p class="modal-price">Total: ₱{{ format(price, 2) }}</p>
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel" @click="showModal = false">Cancel</button>
                    <button class="btn-confirm" @click="finalSubmit">Place Order</button>
                </div>
            </div>
        </BaseModal>
        <BaseModal v-if="showSuccessModal" @close="goToPrepare">
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 10px;">☕</div>
                <h2>Order Sent to Lecomidas!</h2>
                <p>Your package is being prepared.</p>
                <div class="modal-actions center">
                    <button class="btn-confirm" @click="goToPrepare">OK</button>
                </div>
            </div>
        </BaseModal>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from 'vue-router';
import BaseModal from '../components/BaseModal.vue'; // Adjust path if needed

export default {
    name: "Package",
    components: { BaseModal },
    props: {
        imageSources: Array, 
        title: String,
        price: [String, Number],
        features: Array
    },
    setup(props) {
        const router = useRouter();
        const currentIndex = ref(0);
        const showModal = ref(false); // Controls the modal visibility
        const showSuccessModal = ref(false);
        let interval;

        const format = window.format;

        onMounted(() => {
            if (props.imageSources && props.imageSources.length > 1) {
                interval = setInterval(() => {
                    currentIndex.value = (currentIndex.value + 1) % props.imageSources.length;
                }, 3000);
            }
        });

        onBeforeUnmount(() => {
            if (interval) clearInterval(interval);
        });

        // This function handles the actual saving logic
        const finalSubmit = () => {
            const newOrder = {
                id: Math.floor(Math.random() * 10000),
                timestamp: Date.now(),
                date: new Date().toLocaleString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', hour12: true
                }),
                total: parseFloat(props.price),
                items: [`Package: ${props.title}`],
                status: 'Preparing',
                estimatedTime: 15 
            };

            const existingOrders = JSON.parse(localStorage.getItem('lecomidas_orders')) || [];
            existingOrders.unshift(newOrder);
            localStorage.setItem('lecomidas_orders', JSON.stringify(existingOrders));

            showModal.value = false;
            showSuccessModal.value = true;
        };

        const goToPrepare = () => {
            showSuccessModal.value = false;
            router.push('/order');
        };

        return { currentIndex, format, showModal, showSuccessModal, finalSubmit, goToPrepare };
    }
}
</script>

<style scoped>
.package-item {
    flex: 1;
    min-width: 300px;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.image-wrapper {
    position: relative; /* Necessary for absolute positioning of images */
    height: 400px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.image-wrapper img {
    position: absolute; /* Stack images on top of each other */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s ease-in-out; /* Smooth fade effect */
}

/* Make the current index visible */
.image-wrapper img.active {
    opacity: 1;
}

.order-pkg-btn {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    background-color: #312618; /* Lecomidas Dark Brown */
    color: #f9ebce;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.order-pkg-btn:hover {
    background-color: #5b4426;
    transform: scale(1.02);
}

.order-pkg-btn:active {
    transform: scale(0.98);
}

/* Ensure info-details allows the button to sit at the bottom */
.info-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    height: 100%;
    z-index: 1; /* Keep text above the image stack if needed */
}

.info-details h3 {
    font-size: 28px;
    margin-bottom: 5px;
    color: #333;
}

.price {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
}

.feature-list {
    list-style: none;
    padding: 0;
    text-align: center;
}

.feature-list li {
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
}

@media (max-width: 768px) {
    .package-item {
        max-width: 100%;
    }
}

.modal-summary {
    margin: 20px 0;
    color: #53433f;
}

.modal-price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #2d6a4f;
    margin-top: 10px;
}

.modal-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.btn-cancel {
    background: #eee;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.btn-confirm {
    background: #312618;
    color: #f9ebce;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.btn-confirm:hover {
    background-color: #5b4426;
}
</style>