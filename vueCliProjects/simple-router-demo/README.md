# simple-router-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


-----------------

##### 创建一个vue-cli项目：

```bash
vue create simpleRouterDemo
```

提示：
>Invalid project name: "simpleRouterDemo"
>Warning: name can no longer contain capital letters

换成横线连接的名字：

```bash
vue create simple-router-demo
```

##### 在src 目录下新建两个组件，home.vue 和 about.vue

home.vue

```vue
<template>
  <div>
    <h1>home</h1>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "我是home 组件",
    };
  },
};
</script>
```
about.vue

```vue
<template>
  <div>
    <h1>about</h1>
    <p>{{aboutMsg}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aboutMsg: "我是about组件",
    };
  },
};
</script>
```

##### 在 App.vue中 定义`<router-link >` 和 `</router-view>`

```vue
<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <header>
      <!-- router-link 定义点击后导航到哪个路径下 -->
      <router-link to="/home">Home</router-link>
      <br />
      <router-link to="/about">About</router-link>
    </header>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
```
 
##### 在 src目录下新建 router.js 定义router, 就是定义路径到组件的映射。

```js
import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import home from "./home.vue";
import about from "./about.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        component: home
    },
    {
        path: "/about",
        component: about
    },
    // 重定向
    {
        path: '/',
        redirect: '/home'
    }
]

var router = new VueRouter({
    routes
})
export default router;
```

>注意：假如上面没有重定向，可以注释掉运行观察，点击页面上的home 和about 可以看到组件来回切换。但是有一个问题，当首次进入页面的时候，页面中并没有显示任何内容（期望进来默认显示 home ）。这是因为首次进入页面时，它的路径是 '/'，我们并没有给这个路径做相应的配置。一般，页面一加载进来都会显示home页面，我们也要把这个路径指向home组件。但是如果我们写{ path: '/', component: Home },vue 会报错，因为两条路径却指向同一个方向。这怎么办？这需要重定向，所谓重定向，就是重新给它指定一个方向，它本来是访问 / 路径，我们重新指向‘/home’, 它就相当于访问 '/home', 相应地, home组件就会显示到页面上。vueRouter中用 redirect 来定义重定向。

```
    // 重定向
    {
        path: '/',
        redirect: '/home'
    }
```


##### 把路由注入到根实例中，启动路由

这里其实还有一种方法，就像vuex  store 注入到根实例中一样，我们也可以把vueRouter 直接注入到根实例中。在main.js中引入路由，注入到根实例中。

```js
import Vue from 'vue'
import App from './App.vue'

// Vue.config.productionTip = false


// 引入路由
import router from "./router.js"    // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错
new Vue({
  el: '#app',
  router,  // 注入到根实例中
  render: h => h(App)
})
```


##### 运行

```bash
npm run serve
```
遇到错误：

```text
Failed to compile.

./src/router.js
Module not found: Error: Can't resolve 'vue-router' in '/Users/zhang/FE/learn-vue/vueCliProjects/simple-router-demo/src'
```
注意需要安装：

```bash
npm install --save vue-router
```

##### 示例的路由是怎么实现？
打开浏览器控制台，首先看到 router-link 标签渲染成了 a 标签，to 属性变成了a 标签的 href 属性，这时就明白了点击跳转的意思。router-view 标签渲染成了我们定义的组件，其实它就是一个占位符，它在什么地方，匹配路径的组件就在什么地方，所以 router-link 和router-view 标签一一对应，成对出现。

![](https://codingames.coding.net/p/codingames/d/sources/git/raw/master/vueRouter.png)

当点击Home和About 来回切换时，a 标签有一个样式类 `.router-link-active` 也在来回切换， 原来这是当router-link 处于选中状态时，vueRouter 会自动添加这个类，因此我们也可以利用这个类来改变选中时的状态，如选中时，让它变成红色。但当设置 `.router-link-active {color: red;}`，它并没有生效，这时还要在类前面加一个a, `a.router-link-active {color: red;}`, 这样就没有问题了。未处于选中状态的router-link， 我们也想给它更改样式，怎么办? 直接给它添加一个 class 就可以了， `<router-link class="red">Home</router-link>`
