import db from './firebase-db';
import Vue from 'vue';
import VueFire from 'vuefire';

Vue.use(VueFire);

export default {
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
