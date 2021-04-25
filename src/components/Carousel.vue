<template>

    <carousel-3d
            height="180"
            width="460"
            :space="280"
            :perspective="0"
            :animationSpeed="1000"
            autoplay
    >
        <slide v-for="(img, i) in imgs" :index="i" :key="i">
            <img :src="img"/>
        </slide>
    </carousel-3d>
</template>


<script lang="js">


    import {Carousel3d, Slide} from "vue-carousel-3d";

    import img1 from "@/assets/carousel/109951165499185023.jpg";
    import img2 from "@/assets/carousel/109951165499275181.jpg";
    import img3 from "@/assets/carousel/109951165499324953.jpg";
    import img4 from "@/assets/carousel/109951165499341194.jpg";


    export default {
        name: 'Carousel',
        components: {
            Carousel3d,
            Slide
        },
        props: {},
        data() {
            return {
                imgs: [
                    img1, img2, img3, img4


                ],
            };
        }
    };
</script>


<style scoped>


</style>