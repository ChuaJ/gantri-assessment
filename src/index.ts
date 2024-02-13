import { AppDataSource } from './config/data-source';
import * as express from 'express';
import { apiBaseUrl, env, port } from './config/config';
import { api } from './controllers';
import { errorHandler } from './middleware/errorHandler';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use('/api', api);
    app.use(errorHandler);

    app.listen(port);
    console.log(`${env} environment API v1 listening at ${apiBaseUrl}`);
  })
  .catch((error) => console.log(error));
