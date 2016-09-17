module.exports = {
    electron: {
        npm: {
            "dependencies": {},
            "devDependencies": {}
        },
        npmDev: {
            "dependencies": {},
            "devDependencies": {
                "electron-prebuilt": "*",
                "node-pre-gyp": "*"
            }
        },
        combinationDependencies: {
            application: {
                angular: {
                    "dependencies": {
                        "socket.io": "*"
                    },
                    "devDependencies": {}
                }
            },
            development: {
                angular: {
                    "dependencies": {
                        "socket.io": "*"
                    },
                    "devDependencies": {}
                },
                grunt: {
                    "dependencies": {},
                    "devDependencies": {
                        "grunt-electron": "*",
                        "grunt-shell": "*"
                    }
                }
            }
        }
    },
    angular: {
        npm: {
            "dependencies": {
                "socket.io": "*"
            },
            "devDependencies": {}
        },
        npmDev: {
            "dependencies": {},
            "devDependencies": {}
        },
        combinationDependencies: {
            application: {
                angular: {
                    "dependencies": {
                        "socket.io": "*"
                    },
                    "devDependencies": {}
                }
            },
            development: {
                grunt: {
                    "dependencies": {},
                    "devDependencies": {
                        "grunt-shell": "*",
                        "grunt-exec": "*"
                    }
                }
            }
        }
    }
};
