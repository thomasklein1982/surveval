import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {registerSW} from 'virtual:pwa-register';
import Primevue from 'primevue/config';
import Button from "primevue/button";

import 'primevue/resources/themes/saga-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons

const updateSW=registerSW({
  onNeedRefresh(){
    let a=confirm("Es ist eine neue Version verfügbar. Aktualisieren?");
    if(a){
      updateSW();
    }
  },
  onOfflineReady(){}
});

let app=createApp(App);
app.use(Primevue);
app.component('Button',Button);
app.mount('#app');