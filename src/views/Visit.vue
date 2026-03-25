<template>
    <div class="visit-container">
        <VisitMap></VisitMap>
    </div>
</template>

<script>
import VisitMap from '../components/VisitMap.vue';


export default {
    components: {
        VisitMap
    },
    mounted() {
        document.title = "Visit Us";
    },
};
</script>

<style scoped>
.visit-container {
    margin-top: 100px;

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