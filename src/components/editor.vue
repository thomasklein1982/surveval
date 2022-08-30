<template>
  <div class="screen">
    <table v-if="false" class="daten">
      <tr><th>Nr</th><th v-for="(item,i) in allItems">{{item.caption}}</th></tr>
      <tr><th></th><th v-for="(item,i) in allItems">{{item.isNumeric}}</th></tr>
      <template v-for="(rec,i) in records">
        <tr>
          <td>{{i+1}}</td><td v-for="(attr,j) in rec">{{attr.value}}</td>
        </tr>
      </template>
    </table>
    <div>
      <template v-for="(item,i) in allItems" >
        <template v-if="i!==groupBy">
          <h2>{{item.caption}}</h2>
          <DataDiagram :group-by="groupBy" :records="records" :item-index="i"/> 
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import DataDiagram from "./data-diagram.vue";

export default{
  props: {
    daten: Array
  },
  data(){
    return {
      groupBy: 0
    }
  },
  computed: {
    records(){
      if(!this.allItems){
        return null;
      }
      let records=[];
      for(let i=3;i<this.daten.length;i++){
        let rec=[];
        for(let j=0;j<this.allItems.length;j++){
          let item=this.allItems[j];
          rec.push({
            item: item,
            value: item.values[i-3]
          });
        }
        records.push(rec);
      }
      return records;
    },
    allItems(){
      if(!this.daten){
        return null;
      }
      let items=[];
      let captions=this.daten[2];
      for(let j=0;j<captions.length;j++){
        let scales=this.daten[1][j].trim();
        if(scales.substring(0,"scale ".length).toLowerCase()==="scale "){
          scales=scales.substring("scale ".length);
        }else{
          continue;
        }
        scales=scales.split("/");
        if(scales.length<=1){
          continue;
        }
        let item={
          indexInDaten: j,
          caption: captions[j],
          scales: [],
          scaleDescriptions: [],
          hasScaleDescriptions: false,
          values: [],
          isNumeric: true
        };
        let isNumeric=true;
        for(let i=0;i<scales.length;i++){
          scales[i]=scales[i].trim();
          item.scaleDescriptions[i]="";
          if(isNumeric){
            let n=scales[i]*1;
            if(scales[i]===n+""){
              scales[i]=n;
            }else{
              let s=scales[i].split("=");
              if(s.length>1){
                scales[i]=s[0]*1;
                item.scaleDescriptions[i]=s[1].trim();
                item.hasScaleDescriptions=true;
              }else{
                isNumeric=false;
              }
            }
          }
        }
        item.scales=scales;
        item.isNumeric=isNumeric;
        if(item.isNumeric){
          let scalesAndDescriptions=[];
          for(let k=0;k<item.scales.length;k++){
            scalesAndDescriptions.push({
              s: item.scales[k],
              d: item.scaleDescriptions[k]
            });
          }
          scalesAndDescriptions.sort(function(a,b){
            return a.s-b.s;
          });
          for(let k=0;k<item.scales.length;k++){
            item.scales[k]=scalesAndDescriptions[k].s;
            item.scaleDescriptions[k]=scalesAndDescriptions[k].d;
          }
        }
        for(let i=3;i<this.daten.length;i++){
          let d=this.daten[i][j].trim();
          if(item.isNumeric){
            d=d*1;
          }
          if(item.scales.indexOf(d)<0){
            d=null;
          }
          item.values.push(d);
        }
        items.push(item);
      }
      return items;
    },
    
  },
  components: {
    DataDiagram
  }
}
</script>