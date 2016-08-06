require('./jquery');
require('bootstrap');
var Vue = require('vue');
var VueFire = require('vuefire');
var db = require('./firebase-db');
var md5 = require('blueimp-md5');

Vue.use(VueFire);


module.exports = {
    template: `
        <div class="col-md-4" v-for="o in rooms">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    {{ o.name }}
                </div>
                <div class="panel-body">
                    {{ o.description }}
                    <br>
                    <a href="javascript:void(0)" @click="openModal(o)">Entrar</a>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalLoginEmail" tabindex="-1" role="dialog" aria-labelledby="modalLoginEmail">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="exampleModalLabel">Entre com as informações</h4>
              </div>
              <div class="modal-body">
                  <form>
                      <div class="form-group">
                          <input type="text" class="form-control" name="email" v-model="email" placeholder="Email">
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" name="name" v-model="name" placeholder="Nome">
                      </div>
                  </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" @click="login">Login</button>
              </div>
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
