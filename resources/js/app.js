require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router'
// import First from './first.vue'
import Second from './second.vue'
import Test from './test.vue'
import Home from './home.vue'
import Tags from './admin/components/pages/tags.vue'
import Category from './admin/components/pages/category.vue'
import myMixin from './common.js';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

// import NotFoundComponent from './NotFoundComponent'

// import router from './router.js'


Vue.use(VueRouter);
Vue.mixin(myMixin);
Vue.use(ViewUI);

const routes = [
    { path: '/', component: Home },
    { path: '/tags', component: Tags },
    { path: '/category', component: Category },
    { path: '/test', component: Test },
    // { path: '*', component:  NotFoundComponent}

  ]

  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })
  

window.Vue = require('vue');
 Vue.component('first', require('./first.vue').default);
 const app = new Vue({
   el: '#app',
   router
   
 });
