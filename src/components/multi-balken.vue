<template>
  <g>
    <rect :fill="colors[i]" v-for="(h,i) in heights" :x="x+offsets[i]-width/2" :y="0" :width="width" :height="h*scaleY" />
  </g>
</template>

<script>
export default{
  props: {
    x: Number,
    heights: Array,
    scaleY: {
      type: Number,
      default: 1
    },
    colors: {
      type: Array
    }
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