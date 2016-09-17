'use strict';

var _ = require('lodash');

module.exports = {
    mergeElements: function(obj) {
        var merge = {};
        _.each(obj, function(num) {
            _.merge(merge, num);
        });

        return merge;
    },
    foreachChain: function(obj, interceptor) {
        return _.map(obj, interceptor);
    },
    mergeNpmCombinationDependencies: function(obj, platform, dependenciesPick) {
        return _.map(obj, function(value) {
            if (!_.isUndefined(value.combinationDependencies[platform])) {
                _.each(value.combinationDependencies[platform], function(valueInternal, keyInternal) {
                    if (_.includes(dependenciesPick, keyInternal)) {
                        if (platform == 'application') {
                            _.merge(value.npm, valueInternal);
                        } else {
                            _.merge(value.npmDev, valueInternal);
                        }
                    }

                });
            }
            return _.omit(value, 'combinationDependencies');
        });
    },
    mergeBowerCombinationDependencies: function(obj, dependenciesPick) {
        return _.map(obj, function(value) {
            if (!_.isUndefined(value.combinationDependencies)) {
                _.each(value.combinationDependencies, function(valueInternal, keyInternal) {
                    if (_.includes(dependenciesPick, keyInternal)) {
                        _.merge(value, valueInternal);
                    }
                });
            }
            return _.omit(value, 'combinationDependencies');
        });
    },
    pickProperty: function(obj, name) {
        return obj[name];
    }
};
