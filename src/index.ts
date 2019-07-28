'use strict';

// Create a server with a host and port
import ExpressServer from "./lib/frameworks_drivers/webserver/server";

const dotenv = require('dotenv');
dotenv.config();

import sequelize from "./lib/frameworks_drivers/database";
import UWSServer from "./lib/frameworks_drivers/websocket_server/server";

// Start the server
const start = async () => {
    console.log(process.env.DB_ADDR)
    try {
        await sequelize.sync();
        console.log('Connection to DB has been established successfully.');

    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }

    try {
        const server = new ExpressServer();
        const wsServer = new UWSServer();
        wsServer.registerRoutes();
        wsServer.initializeHandlers();
        wsServer.listen(5992);
        console.log('Server running at port:', server.listen(3000));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();