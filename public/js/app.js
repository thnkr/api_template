define('init', ['ember', 'handlebars'], function (INIT) {
    var App = Ember.Application.create({
        LOG_TRANSITIONS: true
    });

    return App;
});

require(['init', 'forge'], function(App, forge) {

    function Secure(){
        var self = this;
        this.key = forge.random.getBytesSync(16);
        this.iv = forge.random.getBytesSync(8);
        this.salt = forge.random.getBytesSync(128);
        this.derivedKey = forge.pkcs5.pbkdf2('32', self.salt, '10', 16);
    }
    Secure.prototype = {
        encrypt: function(text){
            if (text){
                text = 'hello';
            }

            var self = this;
            var cipher = forge.aes.createEncryptionCipher(self.derivedKey, 'CBC');

                cipher.start(self.iv);
                cipher.update(forge.util.createBuffer(text));
                cipher.finish();

            var encrypted = cipher.output;

                return encrypted.toHex();

        },
        decrypt: function(text){

            var self = this;

            var cipher = forge.aes.createDecryptionCipher(self.derivedKey, 'CBC');
                cipher.start(self.iv);
                cipher.update(forge.util.createBuffer(text));
                cipher.finish();

            return cipher.output.toHex();

        }
    }

    App.Router.map(function(){
       this.resource('application', { path: '/'});
    });


    Ember.Handlebars.helper('encrypt', function(value, options) {

        var c = new Secure();

        var t = c.encrypt(value);

        var truncatedString = c.decrypt(t);

        var escaped = Handlebars.Utils.escapeExpression(truncatedString);
        return new Handlebars.SafeString(escaped);
    });

    App.ApplicationRoute = Ember.Route.extend({

        model: function(){

            return ["@twitter"];
        },

        renderTemplate: function() {
            this.render('application');
        }

    });

    App.ApplicationController = Ember.Controller.extend({

        hello: 'Encrypting...',

        dynoForm: '',

        init: function() {
            var controller = this,
                hello = controller.get('902');

            var c = new Secure();

            controller.set('hello',  c.encrypt('Hello how are you?'));
        },

        actions: {
            getDyno: function(inputVal) {
                var controller = this;
                var dynoValue = controller.get('dynoForm');

            }
        }
    });
});