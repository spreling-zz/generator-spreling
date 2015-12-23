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
        npmGrunt: {
            "dependencies": {},
            "devDependencies": {
                "grunt-electron": "*",
                "grunt-shell": "*"
            }
        }
    },
    test: {
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
        npmGrunt: {
            "dependencies": {},
            "devDependencies": {
                "grunt-shell": "*",
                "grunt-exec": "*"
            }
        }
    },
    kaas: {
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
        npmGrunt: {
            "dependencies": {},
            "devDependencies": {
                "grunt-shell": "*",
                "grunt-exec": "*"
            }
        }
    }
};
