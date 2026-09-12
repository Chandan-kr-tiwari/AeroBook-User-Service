const express = require('express');

const { ServerConfig, Logger } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    Logger.info('Health check requested');
    res.send('health');
});


const startServer = async () => {
    try {

        const server = app.listen(ServerConfig.PORT, () => {
            Logger.info(
                `Successfully started the server on PORT: ${ServerConfig.PORT}`
            );
        });

        server.on('error', (error) => {
            Logger.error(`Server error: ${error.message}`);
        });

    } catch (error) {
        Logger.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();
