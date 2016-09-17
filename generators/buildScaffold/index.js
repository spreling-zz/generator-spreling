'use strict';
var generators = require('yeoman-generator');
var Q = require('q');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

// noinspection JSUnusedGlobalSymbols
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

    },
    /**
     * @type {function}
     * @this yo.YeomanGeneratorBase
     */
    configuring: function() {

    },
    /**
     * @this yo.YeomanGeneratorBase
     */
    writing: {
        /**
         * @this yo.YeomanGeneratorBase
         */
        createFolderStructure: function() {
            var mkfolder = function(directories, rootFolder) {
                var deferred = Q.defer();

                directories = _.map(directories, function(dir) {
                    return rootFolder + dir;
                }, rootFolder);

                _.forEach(directories, function(directory) {
                    mkdirp(directory, function(err) {
                        if (err) {
                            deferred.reject(chalk.red('error: ') + err);
                            return deferred.promise;
                        }
                    });
                });
                deferred.resolve();
                return deferred.promise;
            };

            this.log(chalk.green('Scaffold') + ' folder structure');

            mkfolder(['src', 'build', 'releases'], './')
                .then(mkfolder(_.map(this.config.get('projectLayers')), 'src/'));
// todo bezig met alles vai de functie te doen. nu nog de if frontend
/*            _.forEach(_.map(this.config.get('projectLayers'), function(dir) {
                return 'src/' + dir.toLowerCase();
            }), function(directory) {
                mkdirp(directory, function(err) {
                    if (err) {
                        console.log(chalk.red('error: ') + err);
                    }
                });
                if (directory == 'src/frontend') {
                    var directories = ['src/frontend/assets',
                                       'src/frontend/assets/css',
                                       'src/frontend/assets/img',
                                       'src/frontend/core',
                                       'src/frontend/web'];
                    console.log(this.config.getAll());
                    if (this.config.get('frontend') != 'angular') {
                        directories.push('src/frontend/assets/js');
                    }
                    _.forEach(directories, function(frontDirectory) {
                        mkdirp(frontDirectory, function(err) {
                            if (err) {
                                console.log(chalk.red('error: ') + err);
                            }
                        });
                    });
                }
            }, this);*/
            // this.log(this.config.getAll());
        }
    },
    /**
     * @this yo.YeomanGeneratorBase
     */
    install: {
        /**
         * @this yo.YeomanGeneratorBase
         */
        populateGitConfigFiles: function() {
            var files = _.map(['.gitkeep', '.gitignore'], _.bind(function(path) {
                return this.templatePath(path);
            }, this));

            this.fs.copy(files, this.destinationPath('build'));
            this.fs.copy(files, this.destinationPath('releases'));

        }
    },
    /**
     * @this yo.YeomanGeneratorBase
     */
    end: {}
});

