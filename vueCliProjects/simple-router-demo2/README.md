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


---------------
demo1 **动态路由**
上面我们定义的路由，都是严格匹配的，只有 router-link 中的to属性和 js 中一条路由 route 中 path 一模一样，才能显示相应的组件 component. 但有时现实却不是这样的，当我们去访问网站并登录成功后，它会显示 `欢迎你，+ 你的名字`。不同的用户登录， 只是显示“你的名字” 部分不同，其它部分是一样的。这就表示，它是一个组件，假设是 user 组件。不同的用户（就是用户的id不同），它都会导航到同一个 user 组件中。这样我们在配置路由的时候，就不能写死, 就是路由中的 path 属性，不能写死，那要怎么设置? 导航到 user 组件，路径中肯定有 user, id 不同，那就给路径一个动态部分来匹配不同的id.  在 vue-router 中，动态部分以 `:` 开头，那么路径就变成了 `/user/:id`，这条路由就可以这么写： `{ path:"/user/:id", component: user }`.

我们定义一个user组件（自己随便写一个就好了），页面中再添加两个router-link 用于导航， 最后router.js中添加路由配置，来体验一下

app.vue 中添加两个router-link：

```vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <header>
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
     <!--  增加两个到user组件的导航，可以看到这里使用了不同的to属性 -->
      <router-link to="/user/123">User123</router-link>
      <router-link to="/user/456">User456</router-link>
    </header>
    <router-view></router-view>   
  </div>
</template>
```

router.js 配置user动态路由：

```vue
...
...
import user from "./user.vue";
...
...
const routes = [
    {
        path: "/home",
        component: home
    },
    {
        path: "/about",
        component: about
    },
    /*新增user路径，配置了动态的id*/
    {
        path: "/user/:id",
        component: user
    },
    {
        path: '/',
        redirect: '/home'
    }
]
```
user.vue

```vue
<!-- 简单示例 -->
<!-- <template>
  <div>
    <h1>User</h1>
    <div>我是user组件</div>
  </div>
</template>
<script>
export default {};
</script> -->


<!-- 传递参数示例 -->
<!-- <template>
  <div>
    <h1>User</h1>
    <div>我是user组件, 动态部分是{{dynamicSegment}}</div>
  </div>
</template>
<script>
export default {
  computed: {
    dynamicSegment() {
      return this.$route.params.id;
    },
  },
};
</script> -->

<!-- watch 来监听$route -->
<template>
  <div>
    <h1>User</h1>
    <div>我是user组件, 动态部分是{{dynamicSegment}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicSegment: "",
    };
  },
  watch: {
    $route(to, from) {
      // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
      console.log(to);
      console.log(from);
      this.dynamicSegment = to.params.id;
    },
  },
};
</script>
```

>当整个vue-router 注入到根实例后，在组件的内部，可以通过`this.$route` 来获取到 router 实例。它有一个params 属性，就是来获得这个动态部分的。它是一个对象，属性名，就是路径中定义的动态部分 id, 属性值就是router-link中to 属性中的动态部分，如123。使用vuex时，组件中想要获取到state 中的状态，是用computed 属性，在这里也是一样，在组件中，定义一个computed 属性 dynamicSegment  
>动态路由在来回切换时，由于它们都是指向同一组件，vue不会销毁再创建这个组件，而是复用这个组件，就是当第一次点击（如：user123）的时候，vue 把对应的组件渲染出来，但在user123, user456点击来回切换的时候，这个组件就不会发生变化了，组件的生命周期不管用了。这时如果想要在组件来回切换的时候做点事情，那么只能在组件内部（user.vue中）利用watch 来监听 `$route` 的变化。把上面的代码用监听`$route` 实现   
>上面示例还有个问题：在相同组件之间切换时因为不刷新组件,所以用watch 来监听`$route`;但是我发现从其他组件切换到该组件时,第一次没能触发watch里面的`$route()`函数;拿您的例子来说就是:当我从home组件或者about组件第一次切换到user组件的时候不能触发`$route`,导致不能获取到id;这是正常的吗? 是正常的， 从home 组件或about组件切换到user组件的时候，home组件或about组件销毁，user组件重新生成，user组件是一个全新的组件，不同组件的切换是组件的创建和销毁，不会走`$route`


**嵌套路由**
嵌套路由，主要是由我们的页面结构所决定的。当我们进入到home页面的时候，它下面还有分类，如手机系列，平板系列，电脑系列。当我们点击各个分类的时候，它还是需要路由到各个部分，如点击手机，它肯定到对应到手机的部分。

在路由的设计上，首先进入到 home ,然后才能进入到phone, tablet, computer.  Phone, tablet, compute 就相当于进入到了home的子元素。所以vue  提供了childrens 属性，它也是一组路由,相当于我们所写的routes。

首先，在home页面上定义三个router-link 标签用于导航，然后再定义一个router-view标签，用于渲染对应的组件。router-link 和router-view 标签要一一对应。home.vue 组件修改如下：

```
<template>
    <div>
        <h1>home</h1>
<!-- router-link 的to属性要注意，路由是先进入到home,然后才进入相应的子路由如 phone,所以书写时要把 home 带上 -->
        <p>
            <router-link to="/home/phone">手机</router-link>
            <router-link to="/home/tablet">平板</router-link>
            <router-link to="/home/computer">电脑</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>
```

router.js 配置路由，修改如下：

```
const routes = [
    {
        path:"/home",
　　　　　// 下面这个属性也不少，因为，我们是先进入home页面，才能进入子路由
        component: home,
　　　　 // 子路由
        children: [
            {
                path: "phone",
                component: phone
            },
            {
                path: "tablet",
                component: tablet
            },
            {
                path: "computer",
                component: computer
            }
        ]
    },
    {
        path: "/about",
        component: about
    },
    {
        path: "/user/:id",
        component: user
    },
    {
        path: '/', 
        redirect: '/home' 
    }
]
```

　　这时当我们点击home 时，它下面出现手机等字样，但没有任何对应的组件进行显示，这通常不是我们想要的。要想点击home时，要想渲染相对应的子组件，那还需要配置一条路由。当进入到home 时，它在children中对应的路由path 是空 ‘’，完整的childrens 如下：

```
children: [
    {
        path: "phone",
        component: phone
    },
    {
        path: "tablet",
        component: tablet
    },
    {
        path: "computer",
        component: computer
    },
    // 当进入到home时，下面的组件显示
    {
        path: "",
        component: phone
    }
]
```
