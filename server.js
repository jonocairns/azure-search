'use strict';

const Hapi = require('hapi');
const fetch = require('node-fetch');

// Create a server with a host and port
const server = Hapi.server({
    host: 'localhost',
    port: 6969,
    routes: {cors: { origin: ['*']}}
});

// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        const q = request.query;
        const serviceName = 'mfb-recipes';
        const indexName = 'azuresql-index';
        const url = `https://${serviceName}.search.windows.net/indexes/${indexName}/docs/search?api-version=2017-11-11&$order=search.score() desc,LastUpdated desc`;
        
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(
                {
                    search: q.search,  
                    facets: [ "ReadyIn", "ProteinType", "Difficulty", "NumberOfServes" ],  
                    filter: ""
                }
            ),
          headers: { 'Accept': 'application/json', 'api-key': 'REPLACEME', 'Content-Type': 'application/json'}
        })
        const response = result.json();
        return response;
    }
});

// Start the server
const start = async function () {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();