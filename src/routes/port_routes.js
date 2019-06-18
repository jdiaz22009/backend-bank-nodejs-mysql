var routes = []

routes['auth'] = {
    id: 0,
    name: 'auth',
    port: process.env.BANKPORT || 3001
};

module.exports = routes;