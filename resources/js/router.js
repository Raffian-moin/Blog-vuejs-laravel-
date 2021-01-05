


Vue.use(VueRouter)

const routes = [
    { path: '/first', component: first },
    { path: '/second', component: second },
  ]

export default new VueRouter({
    mode:'history',
    routes
})