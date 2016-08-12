import md5 from 'blueimp-md5';
import Vue from 'vue';
import VueFire from 'vuefire';
import db from './firebase-db';
import {} from 'bootstrap';

Vue.use(VueFire);

export default {
    template: require('html!../templates/rooms.component.html'),
    firebase: {
        rooms: db.ref('chat/rooms')
    },
    data: function() {
        return {
            rooms: [
                {id: "001", name: "PHP", description: "Só fera do PHP"},
                {id: "002", name: "Java", description: "Só fera do Java"},
                {id: "003", name: "C#", description: "Só fera do C#"},
                {id: "004", name: "C++", description: "Só fera do C++"},
                {id: "005", name: "Javascript", description: "Só fera do Javascript"},
                {id: "006", name: "VueJs", description: "Só fera do VueJs"},
            ],
            name: '',
            email: '',
            room: null
        };
    },
    methods: {
        login: function(room) {
            localStorage.setItem('name', this.name);
            localStorage.setItem('email', this.email);
            localStorage.setItem('photo', 'http://www.gravatar.com/avatar/'+md5(this.email) + '.jpg');
            $('#modalLoginEmail').modal('hide');
            this.$route.router.go('/chat/'+this.room.id);
        },
        openModal: function(room) {
            this.room = room;
            $('#modalLoginEmail').modal('show');
        }
    }
};
