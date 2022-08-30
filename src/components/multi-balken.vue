<template>
  <rect v-for="(h,i) in heights" :x="offsets[i]-width/2" :y="0" :width="width" :height="h" />
</template>

<script>
export default{
  props: {
    x: Number,
    heights: Array,
  },
  computed: {
    width(){
      return 1/(this.heights.length+2);
    },
    offsets(){
      var offsets=[];
      let o=0-this.heights.length/2*this.width;
      for(let i=0;i<this.heights.length;i++){
        offsets.push(o);
        o+=this.width;
      }
      return offsets;
    }
  }
}
</script>