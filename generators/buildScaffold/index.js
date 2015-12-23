var generators = require('yeoman-generator');

var _ = require('lodash');
_.mixin(require('underscore.string').exports());
var mkdirp = require('mkdirp');

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

    },
    configuring: function(){
        //this.log(this.config.getAll());
    },
    writing: {

    },
    install: {
        method2: function () {

            var dirList =['./src', './build', './release'];
            _.forEach(dirList, function (directory) {
                mkdirp(directory, function (err) {
                    if (err)
                    console.log('error: '+ err);
                });
            }, this);
        },
        met3hod2: function () {
        }
    },
    end: function(){

    }
};
module.exports = generators.NamedBase.extend(generator);