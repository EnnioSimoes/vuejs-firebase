import Vue from 'vue';
import VueRouter from 'vue-router';
import ChatComponent from './chat.component';
import RoomsComponent from './rooms.component';
import RoomsCreateComponent from './rooms-create.component';

require('style!css!../node_modules/bootstrap/dist/css/bootstrap.min.css');

Vue.use(VueRouter);

var appComponent = Vue.extend({});

var router = new VueRouter();

router.map({
    '/chat/:room': {
        component: ChatComponent
    },
    '/rooms': {
        component: RoomsComponent
    },
    '/rooms-create': {
        component: RoomsCreateComponent
    }
});

router.start(appComponent, "#app");
