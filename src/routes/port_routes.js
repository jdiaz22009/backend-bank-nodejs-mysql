var routes = []

routes['bank'] = {
    id: 0,
    name: 'bank',
    port: process.env.BANKPORT || 3001
};

module.exports = routes;