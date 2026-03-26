<template>
    <div class="prepare-container">
        <Prepare></Prepare>
    </div>
</template>

<script>
import Prepare from '../components/Prepare.vue';


export default {
    components: {
        Prepare
    },
    mounted() {
        document.title = "Order Confirmation";
    },
};
</script>

<style scoped>
.prepare-container {
    /* Background Magic */
    background-image: url("../assets/cafebg.png");
    background-size: cover;
    background-position: center top;
    /* Keeps the image centered */
    background-attachment: fixed;
    /* STOPS the image from moving when scrolling */

    min-height: calc(100vh - 90px);
    width: 100%;
    /* Ensures it spans side-to-side */
}
</style>