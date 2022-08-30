<template>
  <div class="screen">
    <h1>Survey Evaluation</h1>
    <h2>Thomas Klein</h2>
    <p>Auswerten einer Edkimo-Umfrage mit Hilfe von SQL</p>
    <Button @click="uploadData()" label="Daten hochladen (csv)"/>
    
  </div>
</template>

<script>
import FileUpload from "primevue/fileupload";
import {upload} from '../functions/helper';
export default {
  methods: {
    async uploadData(){
      let s=await upload({accept: "text/csv"});
      if(!s) return null;
      
      let raw=s.code.trim();
      raw=raw.split("\n");
      let data=[];
      for(let i=0;i<raw.length;i++){
        let line=raw[i];
        let entries=line.split(";");
        data.push(entries);
      }
      this.$emit("upload",data);
    }
  },
  components: [FileUpload]
};
</script>