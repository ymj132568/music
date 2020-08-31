import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css'
import element from '@/utils/element'
import VueRouter from 'vue-router'
Vue.use(element)
Vue.use(VueRouter)
import '@/style/base.scss'
import discovery from '@/views/03.discovery.vue'
import playlists from '@/views/04.playlists.vue' 
import songs from '@/views/05.songs.vue'
import mvs from '@/views/06.mvs.vue'
import result from '@/views/07.result.vue'
import playlist from '@/views/08.playlist.vue'
import mv from '@/views/mv.vue'
let router=new VueRouter({  
  routes:[
    {
      path:'/discovery',
      component:discovery
    },
    {
 
      path:"/",

      component:discovery
    },
    {
      path:"/playlists",
      component:playlists
    },
    {
  
      path:"/songs",

      component:songs
    },
    {
    
      path:"/mvs",
 
      component:mvs
    },
    {
      path:'/mv',
      component:mv
    },
    {
   
      path:"/result",
  
      component:result
    },
    {
      path:'/playlist',
      component:playlist
    }
  ]
})

import moment from 'moment';
Vue.filter('formatDuration',(dt)=>{
  let min = Math.ceil(dt / 1000 / 60);
  min = min < 10 ? '0' + min : min;
  let sec = Math.ceil((dt / 1000) % 60);
  sec = sec < 10 ? '0' + sec : sec;
  return min + ':' + sec;
})
Vue.filter('formatTime', (time)=>{
  return moment(time).format('YYYY-MM-DD hh:mm:ss');
})
Vue.filter('formatCount',(count)=>{
  if (count / 10000 > 10) {
    return parseInt(count / 10000) + '万';
  } else {
    return count;
  }
})
new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router// router:router
}).$mount('#app')
