// Initialize Firebase
var config = {
  apiKey: "AIzaSyDaWR8G1TMrDtGAQRHscbH833yV63TZzvg",
  authDomain: "vuejs-firebase-4aeb4.firebaseapp.com",
  databaseURL: "https://vuejs-firebase-4aeb4.firebaseio.com",
  storageBucket: "vuejs-firebase-4aeb4.appspot.com",
};
var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database();

var chatComponent = Vue.extend({
    template: `
            <style type="text/css" media="screen" scoped>
                .chat
                {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .chat li
                {
                    margin-bottom: 10px;
                    padding-bottom: 5px;
                    border-bottom: 1px dotted #B3A9A9;
                }
                .chat li.left .chat-body
                {
                    margin-left: 60px;
                }
                .chat li.right .chat-body
                {
                    margin-right: 60px;
                }
                .chat li .chat-body p
                {
                    margin: 0;
                    color: #777777;
                }
                .panel .slidedown .glyphicon, .chat .glyphicon
                {
                    margin-right: 5px;
                }
                .panel-body
                {
                    overflow-y: scroll;
                    height: 250px;
                }
                ::-webkit-scrollbar-track
                {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    background-color: #F5F5F5;
                }
                ::-webkit-scrollbar
                {
                    width: 12px;
                    background-color: #F5F5F5;
                }
                ::-webkit-scrollbar-thumb
                {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: #555;
                }
            </style>

            <div class="panel panel-primary">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-comment"></span> Chat
                    <div class="btn-group pull-right">
                        <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-chevron-down"></span>
                        </button>
                        <ul class="dropdown-menu slidedown">
                            <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-refresh">
                            </span>Refresh</a></li>
                            <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-ok-sign">
                            </span>Available</a></li>
                            <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-remove">
                            </span>Busy</a></li>
                            <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-time"></span>
                                Away</a></li>
                            <li class="divider"></li>
                            <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-off"></span>
                                Sign Out</a></li>
                        </ul>
                    </div>
                </div>
                <div class="panel-body">
                    <ul class="chat">
                        <li class="clearfix" v-bind:class="{ left: !isUser(o.email), right: isUser(o.email) }" v-for="o in messages">
                            <span class="chat-img" v-bind:class="{ 'pull-left': !isUser(o.email), 'pull-right': isUser(o.email) }">
                                <img src="{{ o.photo }}" alt="User Avatar" class="img-circle" />
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font"  v-bind:class="{ 'pull-left': !isUser(o.email), 'pull-right': isUser(o.email) }">{{ o.name }} </strong>
                                    <small class="text-muted" >
                                        <span class="glyphicon glyphicon-time"></span>
                                        12 mins ago
                                    </small>
                                </div>
                                <p v-bind:class="{ 'pull-left': !isUser(o.email), 'pull-right': isUser(o.email) }">
                                    {{ o.text }}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="panel-footer">
                    <div class="input-group">
                        <input id="btn-input" type="text" class="form-control input-sm" placeholder="Digite sua mensagem" v-model="message" @keyup.enter="sendMessage" />
                        <span class="input-group-btn">
                            <button class="btn btn-warning btn-sm" id="btn-chat" @click="sendMessage">Send</button>
                        </span>
                    </div>
                </div>
            </div>
    `,
    created: function() {
        var roomRef = 'chat/rooms/' + this.$route.params.room;
        this.$bindAsArray('messages', db.ref(roomRef + '/messages'));
        this.$set('user.photo', 'http://www.gravatar.com/avatar/'+md5(this.user.email) + '.jpg');
    },
    data: function()  {
        return {
            user: {
                name: 'Ennio',
                email: 'ennio.simoes@outlook.com'
            },
            message: ''
            // chat: {
            //     messages: [
            //         {
            //             text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.',
            //             name: 'Ennio',
            //             email: 'ennio.simoes@outlook.com',
            //             photo: 'http://placehold.it/50/FA6F57/fff&text=ME'
            //         },
            //         {
            //             text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.',
            //             name: 'Greicy',
            //             email: 'greicy.simoes@outlook.com',
            //             photo: 'http://placehold.it/50/55C1E7/fff&text=U'
            //         }
            //     ]
            // }
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
});

var roomsComponent = Vue.extend({
    template: `
        <div class="col-md-4" v-for="o in rooms">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    {{ o.name }}
                </div>
                <div class="panel-body">
                    {{ o.description }}
                    <br>
                    <a href="javascript:void(0)" @click="goToChat(o)">Entrar</a>
                </div>
            </div>
        </div>
    `,
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
            ]
        };
    },
    methods: {
        goToChat: function(room) {
            this.$route.router.go('/chat/'+room.id);
        }
    }
});

var rooms = [
    {id: "001", name: "PHP", description: "Só fera do PHP"},
    {id: "002", name: "Java", description: "Só fera do Java"},
    {id: "003", name: "C#", description: "Só fera do C#"},
    {id: "004", name: "C++", description: "Só fera do C++"},
    {id: "005", name: "Javascript", description: "Só fera do Javascript"},
    {id: "006", name: "VueJs", description: "Só fera do VueJs"},
];

var roomsCreateComponent = Vue.extend({
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
        });
    }
});

var appComponent = Vue.extend({});

var router = new VueRouter();

router.map({
    '/chat/:room': {
        component: chatComponent
    },
    '/rooms': {
        component: roomsComponent
    },
    '/rooms-create': {
        component: roomsCreateComponent
    }
});

router.start(appComponent, "#app");
