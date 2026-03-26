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
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
    name: "Package",
    props: {
        // Change imageSrc to imageSources (an Array)
        imageSources: Array, 
        title: String,
        price: String,
        features: Array
    },
    setup(props) {
        const currentIndex = ref(0);
        let interval;

        onMounted(() => {
            // Only start the slider if there's more than one image
            if (props.imageSources && props.imageSources.length > 1) {
                interval = setInterval(() => {
                    currentIndex.value = (currentIndex.value + 1) % props.imageSources.length;
                }, 3000); // Slide every 3 seconds
            }
        });

        onBeforeUnmount(() => {
            if (interval) clearInterval(interval);
        });

        const format = window.format;

        return { currentIndex, format };
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

.info-details {
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
</style>