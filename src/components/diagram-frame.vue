<template>
  <div style="display: inline-block; position:relative">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" :style="{width: size.w, height: size.h, 'font-size': fontSize, stroke: 'black', 'stroke-width': strokeWidth}" style="overflow: hidden; font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica,Arial,sans-serif;" :viewBox="viewBox">
      <defs>
        <filter x="0" y="0" width="1" height="1" id="white0.5">
          <feFlood flood-color="white" flood-opacity="0.5" result="bg" />
          <feMerge>
            <feMergeNode in="bg"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g :transform="transformation">
        <slot></slot>
      </g>
    </svg>
  </div>
</template>

<script>
export default{
  data(){
    return {
      isFrame: true,
      custom: {
        scale: 80,
        minX: this.minX,
        maxX: this.maxX,
        minY: this.minY,
        maxY: this.maxY
      }
    };
  },
  props: {
    minX: {
      type: Number,
      default: 0
    },
    maxX: {
      type: Number,
      default: 10
    },
    minY: {
      type: Number,
      default: 0
    },
    maxY: {
      type: Number,
      default: 10
    },
    width: {
      type: String,
      default: "auto"
    },
    height: {
      type: String,
      default: "auto"
    },
    scale: {
      type: Number,
      default: 1
    },
    fontScale: {
      type: Number,
      default: 1
    },
    ratioXY: {
      type: Number,
      default: 1
    }
  },
  computed: {
    systemAttributes: function(){
      var attr={};
      attr.markerX=0.1;
      attr.markerY=attr.markerX;
      attr.offsetX=0;
      attr.offsetY=0;
      attr.stepX=1;
      attr.stepY=1;
      attr.divX=1;
      attr.divY=1;
      attr.labelsX=true;
      attr.labelsY=true;
      attr.grid=false;
      attr.arrowX=0.05;
      attr.arrowY=attr.arrowX;
      if(this.system!==true&& this.system!==false){
        for(var a in attr){
          if(this.system[a]){
            attr[a]=this.system[a];
          }
        }
      }
      attr.minX=this.custom.minX;
      attr.maxX=this.custom.maxX-attr.arrowX*3;
      attr.minY=this.custom.minY;
      attr.maxY=this.custom.maxY-attr.arrowY*3;

      return attr;
    },
    strokeWidth: function(){
      return 0.2*this.scale;
    },
    fontSize: function(){
      return (this.scale*this.fontScale)+"px";
    },
    size: function(){
      var w=this.width;
      var h=this.height;
      var mathW=this.custom.maxX-this.custom.minX;
      var mathH=this.custom.maxY-this.custom.minY;
      var ratio=mathW/mathH;
      ratio*=this.ratioXY;
      var scaleX=10;
      var scaleY=scaleX*this.ratioXY;
      var customScale=0.8/80*this.custom.scale+0.2;
      if(w==="auto"){
        if(h==="auto"){
          /*beides auto*/
          throw "diagram-frame: You must specify exactly one of 'width' and 'height'";
        }else{
          /*w gleich skalieren*/
          var hn=parseFloat(h);
          var unit=h.match(/[^0-9\.]+/)[0];
          h=hn*customScale+unit;
          w=hn*ratio*customScale;
          w=w+unit;
        }
      }else{
        if(h==="auto"){
          /*h gleich skalieren*/
          var wn=parseFloat(w);
          var unit=w.match(/[^0-9\.]+/)[0];
          w=wn*customScale+unit;
          h=wn/ratio*customScale;
          h=h+unit;
        }else{
          /*beides spezifiziert*/
          throw "diagram-frame: It's not allowed to specify 'width' AND 'height'";
        }
      }
      return {
        w: w,
        h: h,
        ratio: ratio,
        scaleX: scaleX,
        scaleY: scaleY
      };
    },
    transformation: function(){
      /*
        a c e
        b d f
        0 0 1
      */
      return "matrix("+(this.size.scaleX)+",0,0,"+(-this.size.scaleY)+","+(-this.custom.minX*this.size.scaleX)+","+(this.custom.maxY*this.size.scaleY)+")";
    },
    viewBox: function(){
      var x=0;
      var y=0;
      var x2=(this.custom.maxX-this.custom.minX)*this.size.scaleX;
      var y2=(this.custom.maxY-this.custom.minY)*this.size.scaleY;
      return x+" "+y+" "+x2+" "+y2;
    }
  },
  methods: {
    transformToDiagramCoordinates: function(x,y){
      return {
        x: (x+this.custom.minX),
        y: (-y+this.custom.maxY)
      }
    }
  }
}

</script>