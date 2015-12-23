var generators = require('yeoman-generator');
var prompt = require('./inquiringPrompt.js');
var Q = require('q');
var lo = require('lodash');
var _ = require('underscore');
_.mixin({
    mergeElements: function (obj) {
        var merge = {};
        _.each(obj, function (num, key) {
            lo.merge(merge, num);
        });

        return merge;
    },
    take: function (obj, interceptor) {
        return interceptor(obj);
    }
});
//_.mixin(require('underscore.string').exports());

var dependencies = require('./../resources/dependecies');


//noinspection JSUnusedGlobalSymbols
/**
 * @type {Object}
 * @extends yo.YeomanGeneratorBase
 */
var generator = {
    /**
     * @constructor
     * @this generator
     */
    constructor: function () {
        generators.Base.apply(this, arguments);
        this.argument('appname', {type: String, required: false});

        //console.log(this.fs.readJSON(this.destinationRoot()+"\\package.json"));

        this.option('s'); // This method adds support for a `--s` flag silence install
    },
    initializing: function () {
        this.log('initializing');
    },
    prompting: function () {
        var done = this.async();
        this.prompt(prompt(this), function (answers) {
            this.answers = answers;
            done();
        }.bind(this));
    },
    configuring: {
        storeAnswers: function () {
            _.forEach(this.answers, function (answer, questionKey) {
                this.config.set(questionKey, answer);
            }, this);
        },
        initNpm: function () {
            var dependenciesPick = lo.chain()
                .toArray()
                .push(this.config.get('frontend'))
                .push(this.config.get('backend'))
                .flattenDeep()
                .value();

            var defaultNpmConfig = {
                'name': '' + this.config.get('name'),
                'version': '0.0.1',
                'description': 'no description written yet',
                'license': "Apache-2.0",
                'private': true,
                'author': {
                    "name": this.user.git.name(),
                    "email": this.user.git.email()
                },
                'keywords': _.values(dependenciesPick)
            };

            var npmDependencies = _(dependencies).chain()
                .pick(dependenciesPick)
                .mergeElements()
                .take(function (chain) {
                    if (true) {
                        return _.omit(chain, 'npmGrunt');
                    }
                })
                .value();
            var npmDevConfig = _(defaultNpmConfig).chain()
                .extend(npmDependencies);

            this.log(this.config.getAll());
            this.log(
                JSON.stringify(npmDependencies, null, 4)
            );

        }
    },
    writing: {
        eerste: function () {
            this.composeWith('spreling:buildScaffold', {
                options: {
                    nested: true,
                    appName: this.appName
                }
            });
        },
        tweede: function () {
            //this.log('test');
        }
    },

    /*    writing: function () {



     this._QComposeWith = function(namespace, option, settings){
     var deferred = Q.defer();

     this.composeWith(namespace, option, settings)
     return deferred.promise;
     }.bind(this);


     this._QComposeWith('spreling:buildScaffold', {
     options: {
     nested: true,
     appName: this.appName
     }
     }).then(this._QComposeWith('spreling:buildScaffold', {
     options: {
     nested: true,
     appName: this.appName
     }})).done(function (test, test1) {
     console.log(test);
     console.log(test1);

     });
     },*/
    install: {
        method2: function () {

            //this.log(this.destinationRoot() + ' ');
            //this.log(this.sourceRoot() + ' ');
        },
        met3hod2: function () {
            //console.log(this);
        }
    }
};
module.exports = generators.NamedBase.extend(generator);