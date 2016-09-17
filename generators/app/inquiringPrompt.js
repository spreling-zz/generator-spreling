'use strict';
/**
 * @type {_.LoDashStatic}
 * @private
 * @mixes underscore.string
 */
var _ = require('lodash');

module.exports = function(parent) {
    return [
        {
            type: 'confirm',
            name: 'useConfig',
            message: 'Hi, Bob found a .yo-rc config file. He asked if he should ' +
                     'use that instead of asking a lot of boring questions',
            default: true,
            when: function(answers) {
                if (parent.options.s) {
                    answers.useConfig = true;
                    return false;
                }
                return (!_.isEmpty(parent.config.getAll()));
            }
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the app',
            default: function() {
                var defaultAppName = (parent.appname ? parent.appname : parent.determineAppname());
                return _.camelCase(defaultAppName);
            },
            when: function(answers) {
                if (answers.useConfig) {
                    if (_.isEmpty(parent.config.get('name'))) {
                        return true;
                    }

                    parent.appname = parent.config.get('name');
                    return false;

                }
                return true;
            }.bind(parent)
        },
        {
            type: 'list',
            name: 'license',
            message: 'Which license do you want to use?',
            choices: [
                {name: 'Apache 2.0', value: 'Apache-2.0'},
                {name: 'MIT', value: 'MIT'},
                {name: 'Unlicense', value: 'unlicense'},
                {name: 'FreeBSD', value: 'BSD-2-Clause-FreeBSD'},
                {name: 'NewBSD', value: 'BSD-3-Clause'},
                {name: 'Internet Systems Consortium (ISC)', value: 'ISC'},
                {name: 'No License (Copyrighted)', value: 'nolicense'}
            ],
            when: function(answers) {
                if (answers.useConfig) {
                    return (_.isEmpty(parent.config.get('license')));
                }
                return true;
            }
        },
        {
            type: 'confirm',
            name: 'jetbrains',
            message: 'Do you use jetbrains? If so i will include the right code style settings',
            default: true,
            when: function(answers) {
                if (answers.useConfig) {
                    return (_.isEmpty(parent.config.get('jetbrains')));
                }
                return true;
            }
        },
        {
            type: 'checkbox',
            name: 'projectLayers',
            message: 'Do type op project layers do you which',
            choices: [
                {
                    name: 'Frontend',
                    checked: true
                },
                {
                    name: 'Backend',
                    checked: true
                },
                {
                    name: 'Console'
                },
                {
                    name: 'Common'
                }
            ],
            validate: function(answers) {
                if (answers.length < 1) {
                    return 'You must choose at least one project layer.';
                }
                return true;
            },
            when: function(answers) {
                if (answers.useConfig) {
                    return (_.isEmpty(parent.config.get('projectLayers')));
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'backend',
            message: 'What backend do you which to use',
            choices: [
                'Electron',
                'not yet implemented'
            ],
            filter: function(value) {
                return value.toLowerCase();
            },
            when: function(answers) {

                if (_.includes(answers.projectLayers, 'Backend')) {
                    if (answers.useConfig) {
                        return (_.isEmpty(parent.config.get('backend')));
                    }
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'frontend',
            message: 'What Frontend do you which to use',
            choices: [
                'Angular',
                'not yet implemented'
            ],
            filter: function(value) {
                return value.toLowerCase();
            },
            when: function(answers) {

                if (_.includes(answers.projectLayers, 'Backend')) {
                    if (answers.useConfig) {
                        return (_.isEmpty(parent.config.get('frontend')));
                    }
                    return true;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'angularAddons',
            message: 'Do you whish to use any angular addons?',
            choices: [
                {
                    name: 'angular-mocks',
                    checked: true
                },
                {
                    name: 'angular-route',
                    checked: true
                },
                {
                    name: 'angular-aria',
                    checked: true
                },
                {
                    name: 'angular-animate'
                },
                {
                    name: 'angular-cookies'
                },
                {
                    name: 'angular-messages'
                },
                {
                    name: 'angular-resource',
                    checked: true
                },
                {
                    name: 'angular-sanitize'
                },
                {
                    name: 'angular-touch'
                }
            ],
            when: function(answers) {
                if (_.includes(answers.frontend, 'angular')) {
                    if (answers.useConfig) {
                        return (_.isEmpty(parent.config.get('angularAddons')));
                    }
                    return true;
                }
            }
        }
    ];
};
