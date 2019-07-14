import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function importRoutes(r) {
  let routes = r.keys().map(key => r(key).default);
  console.log(r,routes)
  return _.flatten(routes);
}

const children = importRoutes(require.context('./', true, /^\.\/pages\/((?!\/)[\s\S])+\/route\.js$/));

export default new Router({
  routes: [
    ...[
      {
        path: '*',
        redirect: '/',
      },{
        path: '/',
        redirect: '/home'
      }],
    ...children
  ]
})
