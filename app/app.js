var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

var appComponent = Vue.extend({});

var router = new VueRouter();

router.map({
    '/chat/:room': {
        component: require('./chat.component')
    },
    '/rooms': {
        component: require('./rooms.component')
    },
    '/rooms-create': {
        component: require('./rooms-create.component')
    }
});

router.start(appComponent, "#app");
