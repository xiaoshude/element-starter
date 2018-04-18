import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/' }
]
const router = new VueRouter({ routes })

router.afterEach((to, from) => {
  const title = to.meta.title
  document.title = `${title} - Shopee Xpress System`
})

export default router
