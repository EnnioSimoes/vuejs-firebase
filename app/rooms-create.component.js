import Vue from 'vue';
import VueFire from 'vuefire';
import db from './firebase-db';

Vue.use(VueFire);

var rooms = [
    {id: "001", name: "PHP", description: "Só fera do PHP"},
    {id: "002", name: "Java", description: "Só fera do Java"},
    {id: "003", name: "C#", description: "Só fera do C#"},
    {id: "004", name: "C++", description: "Só fera do C++"},
    {id: "005", name: "Javascript", description: "Só fera do Javascript"},
    {id: "006", name: "VueJs", description: "Só fera do VueJs"},
];

export default {
    template: `
        <ul>
            <li v-for="o in rooms">
                {{ o.name }}
            </li>
        </ul>
    `,
    firebase: {
        rooms: db.ref('chat/rooms')
    },
    ready: function() {
        var chatRef = db.ref('chat');
        var roomsChildren = chatRef.child('rooms');
        rooms.forEach(function(room) {
            roomsChildren.child(room.id).set({
                name: room.name,
                description: room.description
            });
        })
    }
};
