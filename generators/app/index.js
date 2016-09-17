'use strict';

var generators = require('yeoman-generator');
var questionPrompt = require('./inquiringPrompt.js');
// var Q = require('q');
var _ = require('lodash');
_.mixin(require('./lodashMixins.js'));

var npmDependencies = require('./../resources/npmDependencies');
var bowerDependencies = require('./../resources/bowerDependencies');

// Noinspection JSUnusedGlobalSymbols
/**
 * @type {Object}
 * @extends yo.YeomanGeneratorBase
 */
module.exports = generators.Base.extend({
    /**
     * @constructor
     * @this yo.YeomanGeneratorBase
     */
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.argument('appname', {type: String, required: false});
        this.appname = _.camelCase(this.appname);

        this.option('silence', {
            desc: 'This method adds support for a `--s` flag silence install',
            alias: 's'
        });
    },
    /**
     * @this yo.YeomanGeneratorBase
     */
    initializing: function() {
        this.log('initializing');
    },
    /**
     * @this yo.YeomanGeneratorBase
     */
    prompting: function() {
        var done = this.async();
        this.prompt(questionPrompt(this), function(answers) {
            this.answers = answers;
            done();
        }.bind(this));

        //todo subscribe on trigger function on onError onComplete @see https://github.com/SBoudrias/Inquirer.js
    },
    /**
     * @this yo.YeomanGeneratorBase
     * @namespace
     *
     */
    configuring: {
        /**
         * @type {function}
         * @this yo.YeomanGeneratorBase
         */
        storeAnswers: function() {
            _.forEach(this.answers, _.bind(function(answer, questionKey) {
                this.log('test');
                this.config.set(questionKey, answer);
            }, this));
        },
        /**
         * @type {function}
         * @this yo.YeomanGeneratorBase
         */
        initNpm: function() {
            var dependenciesPick = _.chain()
                .toArray()
                .push(this.config.get('frontend'))
                .push(this.config.get('backend'))
                .flattenDeep()
                .value();

            var defaultConfig = {
                name: '' + this.config.get('name'),
                version: '0.0.1',
                description: 'no description written yet',
                license: this.config.get('license'),
                private: true,
                author: {
                    name: this.user.git.name(),
                    email: this.user.git.email()
                },
                keywords: _.values(dependenciesPick)
            };

            this.write('package.json', JSON.stringify(
                _.chain(defaultConfig)
                    .assignIn(
                        _.chain(npmDependencies)
                            .pick(dependenciesPick)
                            .mergeNpmCombinationDependencies('development', dependenciesPick)
                            .mergeElements()
                            .pickProperty('npmDev')
                            .value()), null, 4));

            this.write('./src/package.json', JSON.stringify(
                _.chain(defaultConfig)
                    .chain()
                    .extend(_(npmDependencies)
                        .chain()
                        .pick(dependenciesPick)
                        .mergeNpmCombinationDependencies('application', dependenciesPick)
                        .mergeElements()
                        .pickProperty('npm')
                        .value()), null, 4));
        },
        /**
         * @type {function}
         * @this yo.YeomanGeneratorBase
         */
        initBower: function() {
            var dependenciesPick = _.chain()
                .toArray()
                .push(this.config.get('frontend'))
                .push(this.config.get('backend'))
                .push(this.config.get('angularAddons'))
                .flattenDeep()
                .value();

            var defaultConfig = {
                name: '' + this.config.get('name'),
                version: '0.0.1',
                description: 'no description written yet',
                main: [
                    'nog te bepalen'
                ],
                license: this.config.get('license'),
                private: true,
                author: [
                    this.user.git.name() + ' <' + this.user.git.email() + '>'
                ],
                keywords: _.values(dependenciesPick)
            };

            this.write('bower.json', JSON.stringify(_(defaultConfig)
                .chain()
                .extend(_(bowerDependencies)
                    .chain()
                    .pick(dependenciesPick)
                    .mergeBowerCombinationDependencies(dependenciesPick)
                    .mergeElements()
                    .value()), null, 4));

            this.write('.bowerrc', JSON.stringify({
                directory: './src/frontend/assets/bower_components'
            }, null, 4));


        },
        /**
         * @type {function}
         * @this yo.YeomanGeneratorBase
         */
        initLicence: function() {
            this.composeWith('spreling:license', {
                options: {
                    license: this.config.get('license'),
                    name: this.user.git.name(),
                    email: this.user.git.email(),
                    website: 'nog te bepalen'
                }
            });
            this.fs.write(this.destinationPath('README.md'), '');
        },
        /**
         * @type {function}
         * @this yo.YeomanGeneratorBase
         */
        initCodeStylingConfig: function() {
            this.fs.copy(_.map(['.jscsrc', '.jshintrc', '.editorconfig'], _.bind(function(path) {
                return this.templatePath(path);
            }, this)), this.destinationPath(''));

            if (this.config.get('jetbrains')) {
                this.fs.copy(this.templatePath('codeStyleSettings.xml'),
                    this.destinationPath('.idea/codeStyleSettings.xml'));
            }
        },
        /**
         * @type {function}
         * @this yo.YeomanGeneratorBase
         */
        initGitConfig: function() {
            this.fs.copy(_.map(['.gitignore', '.gitconfig', '.gitattributes'], _.bind(function(path) {
                return this.templatePath(path);
            }, this)), this.destinationPath(''));
        }
    },
    writing: {
        eerste: function() {
            this.composeWith('spreling:buildScaffold', {
                options: {
                    nested: true,
                    appName: this.appName
                }
            });
        },
        tweede: function() {
            // this.log('test');
        }
    },

    /* writing: function () {



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
        method2: function() {
            // this.log(this.destinationRoot() + ' ');
            // this.log(this.sourceRoot() + ' ');
        },
        met3hod2: function() {
            // console.log(this);
        }
    }
});
