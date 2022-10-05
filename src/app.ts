import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
// import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';
import { graphqlHTTP } from 'express-graphql';
import { dbConnection } from './databases';
import { Routes } from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import schema from './graphql/schemas';
import resolvers from './graphql/resolvers';
const swaggerJSON = require('../swagger.json');

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initializeGraphql();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    // this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    // this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeGraphql() {
    this.app.use(
      '/graphql',
      graphqlHTTP((req, res) => ({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
        context: {
          req,
          res,
        },
      })),
    );
  }

  private initializeSwagger() {
    // const options = {
    //   swaggerDefinition: {
    //     info: {
    //       title: 'REST API',
    //       version: '1.0.0',
    //       description: 'Example docs',
    //     },
    //   },
    //   apis: ['swagger.yaml'],
    // };

    // const options = {
    //   definition: {
    //     openapi: '3.0.0',
    //     info: {
    //       title: 'Acronym API',
    //       version: '1.0.0',
    //       description: 'Build a REST API for the World Texting Foundation, also known as WTF',
    //     },

    //     servers: [
    //       {
    //         url: 'http://localhost:3000',
    //         description: 'My API Documentation',
    //       },
    //     ],
    //   },
    //   apis: ['swagger.json'],
    // };

    // const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
