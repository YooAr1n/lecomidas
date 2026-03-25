<template>
  <div class="about-info-row" :class="{ 'row-reverse': reverse }">
    <div class="image-wrapper">
      <img :src="imageSrc" alt="About Image" class="side-img" />
    </div>

    <div class="text-card">
      <h3>{{ title }}</h3>
      <div class="content" v-if="content" v-html="content"></div>
      
      <div class="content" v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutInfo",
  props: {
    title: String,
    imageSrc: String,
    content: String,
    reverse: Boolean, // If true, image goes to the right
  },
};
</script>

<style scoped>
.about-info-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 90%;
  margin: 40px auto; /* Adds spacing between the "lines" */
}

/* Switches order when 'reverse' prop is true */
.row-reverse {
  flex-direction: row-reverse;
}

.image-wrapper {
  flex: 1;
  height: 500px;
}

.side-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.text-card {
  flex: 2;
  background-color: rgba(255, 255, 255, 0.832);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: left;
  font-size: 20px;
}

.text-card h3 {
  color: #53433f;
  margin-top: 0;
  font-size: 30px;
}

.content {
  color: #333;
  line-height: 1.6;
}

/* Remove the default browser gaps and adjust indentation */
.content :deep(ul) {
  margin: 0;      /* Reduces top/bottom gap */
  padding-left: 25px;   /* Controls how far the bullets are indented */
}

/* Optional: Space out the individual list items slightly */
.content :deep(li) {
  margin-bottom: 5px;
}

</style>