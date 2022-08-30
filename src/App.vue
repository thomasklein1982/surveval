<template>
  <div style="width:100%; height: 100%; overflow: hidden">
    <StartScreen v-if="!daten" @upload="uploadRawData"/>
    <Editor v-else :daten="daten"/>
  </div>
</template>

<script>
  import StartScreen from './components/start-screen.vue';
  import Editor from './components/editor.vue';
  
  export default{
    data(){
      return {
        daten: null
      }
    },
    methods: {
      uploadRawData(daten){
        this.daten=daten;
      }
    },
    components: {
      StartScreen,Editor
    }
  }
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
