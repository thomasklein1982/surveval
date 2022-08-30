<template>
  <g :transform="'translate('+0+','+(offset)+')'">
    <line :y1="0" :y2="0" :x1="quartils[0]" :x2="quartils[4]"/>
    <rect style="fill: white; stroke: black" :x="quartils[1]" :y="-height/2" :width="quartils[3]-quartils[1]" :height="height"/>
    <line :y1="-height/3" :y2="height/3" :x1="quartils[0]" :x2="quartils[0]"/>
    <line :y1="-height/3" :y2="height/3" :x1="quartils[4]" :x2="quartils[4]"/>
    <line style="stroke: red" :y1="-height/2" :y2="height/2" :x1="quartils[2]" :x2="quartils[2]"/>
    <diagram-label :x="quartils[4]+0.1" :y="0" pos="r">{{label}}</diagram-label>
  </g>
</template>

<script>
  import DiagramLabel from './diagram-label.vue';
  export default{
    props: {
      quartils: Array,
      height: Number,
      offset: {
        type: Number,
        default: 0
      },
      vertical: {
        type: Boolean,
        default: false
      },
      label: String
    },
    computed: {
      frame(){
        let frame=this;
        while(frame.$parent && (frame.minX===undefined || frame.maxX===undefined || frame.minY===undefined || frame.maxY===undefined)){
          frame=frame.$parent;
        }
        return frame;
      }
    },
    components: {
      DiagramLabel
    }
  }
</script>