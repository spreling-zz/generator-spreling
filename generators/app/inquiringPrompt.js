/**
 * @type {_.LoDashStatic}
 * @private
 * @mixes underscore.string
 */
var _ = require('lodash');
_.mixin(require('underscore.string').exports());

module.exports = function(parent) {
        return [
            {
                test:"",
                type: "confirm",
                name: "useConfig",
                message: "Hi, Bob found a .yo-rc config file. He asked if he should use that instead of asking a lot of boring questions",
                default: true,
                when: function (answers) {
                    if (parent.options.s){
                        answers.useConfig = true;
                        return false;
                    }
                    return (!_.isEmpty(parent.config.getAll()));
                }
            },
            {
                type: "input",
                name: "name",
                message: "What is the name of the app",
                default: function () {
                    var defaultAppName = (parent.appname ? parent.appname : parent.determineAppname());
                    return _.camelCase(_.slugify(_.humanize(defaultAppName)));
                },
                when: function (answers) {
                    if (answers.useConfig){
                        if (_.isEmpty(parent.config.get('name'))) {
                            return true;
                        }else {
                            parent.appname = parent.config.get('name');
                            return false;
                        }
                    }
                    return true;
                }.bind(parent)
            },
            {
                type: "checkbox",
                name: "projectLayers",
                message: "Do type op project layers do you which",
                choices: [
                    {
                        name: "Frontend",
                        checked: true
                    },
                    {
                        name: "Backend",
                        checked: true
                    },
                    {
                        name: "Console"
                    },
                    {
                        name: "Common"
                    }
                ],
                validate: function (answers) {
                    if (answers.length < 1) {
                        return "You must choose at least one project layer.";
                    }
                    return true;
                },
                when: function (answers) {
                    if (answers.useConfig){
                        return (_.isEmpty(parent.config.get('projectLayers')));
                    }
                    return true;
                }
            },
            {
                type: "list",
                name: "backend",
                message: "What backend do you which to use",
                choices: [
                    "Electron",
                    "not yet implemented"
                ],
                filter: function(value){
                    return value.toLowerCase();
                },
                when: function (answers) {

                    if (_.includes(answers.projectLayers, 'Backend')) {
                        if (answers.useConfig){
                            return (_.isEmpty(parent.config.get('backend')));
                        }
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "list",
                name: "frontend",
                message: "What Frontend do you which to use",
                choices: [
                    "Angular",
                    "not yet implemented"
                ],
                filter: function(value){
                    return value.toLowerCase();
                },
                when: function (answers) {

                    if (_.includes(answers.projectLayers, 'Backend')) {
                        if (answers.useConfig){
                            return (_.isEmpty(parent.config.get('frontend')));
                        }
                        return true;
                    }
                }
            }
        ];
    };
