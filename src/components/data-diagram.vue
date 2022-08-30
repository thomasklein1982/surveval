<template>
  <table>
    <tr>
      <th>Percentil</th>
      <th>Gesamt</th>
      <th v-for="(s,i) in groupByItem.scales">{{s}}</th>
    </tr>
    <tr v-for="(perc,j) in percentiles">
      <th>{{perc.name}}</th><td>{{calcPercentile(perc.p)}}</td><td v-for="(s,i) in groupByItem.scales">{{calcPercentile(perc.p,s)}}</td>
    </tr>
  </table>
  <div>
    <DiagramFrame ref="frame" :scale="0.2" height="6cm" :min-x="item.scales[0]-0.5" :max-x="item.scales[item.scales.length-1]+2" :min-y="-1" :max-y="boxPlots.offset+boxPlots.distance*3+boxPlots.height/2+0.4">
      <DiagramAxis :arrow="0" :labels="!item.hasScaleDescriptions" include-zero :min="item.scales[0]" :max="item.scales[item.scales.length-1]" />
      <template v-if="item.hasScaleDescriptions">
        <diagram-label v-for="(d,i) in item.scaleDescriptions" :x="item.scales[i]" :y="-0.1-(i%2)*0.2" pos="b">{{d}}</diagram-label>
      </template>
      <template v-if="showBoxPlots">
        <BoxPlot label="alle" :offset="boxPlots.offset" :height="boxPlots.height" :quartils="[calcPercentile(percentiles[0].p),calcPercentile(percentiles[1].p),calcPercentile(percentiles[2].p),calcPercentile(percentiles[3].p),calcPercentile(percentiles[4].p)]"/>
        <BoxPlot :label="s" v-for="(s,i) in groupByItem.scales" :offset="boxPlots.offset+(i+1)*boxPlots.distance" :height="boxPlots.height" :quartils="[calcPercentile(percentiles[0].p,s),calcPercentile(percentiles[1].p,s),calcPercentile(percentiles[2].p,s),calcPercentile(percentiles[3].p,s),calcPercentile(percentiles[4].p,s)]"/>
      </template>
      <template v-else>
        <multi-balken v-for="(s,i) in item.scales" :x="s" :heights="calcTotals(s)"/>
      </template>
    </DiagramFrame>
    <Button :class="showBoxPlots? 'pi pi-align-left': 'pi pi-stop'" @click="showBoxPlots=!showBoxPlots"/>
  </div>
</template>

<script>
  import DiagramLabel from './diagram-label.vue';
import DiagramFrame from './diagram-frame.vue';
import BoxPlot from './box-plot.vue';
import MultiBalken from './multi-balken.vue';
import DiagramAxis from './diagram-axis.vue'


export default{
  props: {
    records: Array,
    groupBy: Number,
    itemIndex: Number
  },
  data(){
    return {
      boxPlots: {
        height: 0.5,
        distance: 0.9,
        offset: 0.5
      },
      showBoxPlots: true,
      percentiles: [
        {
          name: "MIN",
          p: 0
        },
        {
          name: "25%",
          p: 25
        },
        {
          name: "MEDIAN",
          p: 50
        },
        {
          name: "75%",
          p: 75
        },
        {
          name: "MAX",
          p: 100
        }
      ]
    }
  }, 
  computed: {
    item(){
      return this.records[0][this.itemIndex].item;
    },
    groupByItem(){
      return this.records[0][this.groupBy].item;
    },
    groups(){

    }
  },
  methods: {
    calcTotals(s){
      let counts={};
      let total=0;
      for(let i=0;i<this.groupByItem.scales.length;i++){
        counts[this.groupByItem.scales[i]]=0;
      }
      for(let i=0;i<this.records.length;i++){
        let rec=this.records[i];
        let group=rec[this.groupBy].value;
        if(rec[this.itemIndex].value===s){
          counts[group]++;
          total++;
        }
      }
      let res=[total];
      for(let i=0;i<this.groupByItem.scales.length;i++){
        res.push(counts[this.groupByItem.scales[i]]);
      }
      console.log("totals",s,res);
      return res;
    },
    calcPercentile(p,group){
      let counts={};
      let total=0;
      for(let i=0;i<this.item.scales.length;i++){
        counts[this.item.scales[i]]=0;
      }
      for(let i=0;i<this.records.length;i++){
        let rec=this.records[i];
        if(rec[this.itemIndex].value && (!group || rec[this.groupBy].value===group)){
          counts[rec[this.itemIndex].value]++;
          total++;
        }
      }
      let threshold=p*total/100;
      let partialSum=0;
      for(let i=0;i<this.item.scales.length;i++){
        let scale=this.item.scales[i];
        partialSum+=counts[scale];
        if(partialSum>threshold || p===100 && partialSum===threshold){
          return scale;
        }
      }
      return this.item.scales[this.item.scales.length-1];
    }
  },
  components: {
    DiagramFrame, BoxPlot, DiagramAxis, DiagramLabel, MultiBalken
  }
};
</script>