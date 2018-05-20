import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import midllMmusic from '@/components/middle-music'
import playHistory from '@/components/playHistort'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'midllMmusic',
      component: midllMmusic
    },
    {
      path:'/playHistory',
      name:'playHistory',
      component:playHistory
    }
  ]
})
