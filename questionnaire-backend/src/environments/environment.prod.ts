export const environment = {
    http: {
        host: '0.0.0.0',
        port: 3000
    },
    mongoose: {
        uri: 'mongodb://mongo-service:27017/questionnaire',
        options: {
            reconnectTries: Number.MAX_VALUE,
            autoReconnect : true,
            useNewUrlParser: true
        }
    }
};