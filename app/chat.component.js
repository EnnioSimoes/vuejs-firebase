import db from './firebase-db';
import Vue from 'vue';
import VueFire from 'vuefire';

Vue.use(VueFire);

export default {
    template: require('html!../templates/chat.component.html'),
    created: function() {
        var roomRef = 'chat/rooms/' + this.$route.params.room;
        this.$bindAsArray('messages', db.ref(roomRef + '/messages'));
    },
    data: function()  {
        return {
            user: {
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                photo: localStorage.getItem('photo')
            },
            message: ''
        };
    },
    methods: {
        isUser: function(email) {
            return this.user.email == email;
        },
        sendMessage: function() {
            this.$firebaseRefs.messages.push({
                name: this.user.name,
                email: this.user.email,
                text: this.message,
                photo: this.user.photo
            });
        }
    }
};
