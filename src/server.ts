import App from './app';
import AcronymRoute from './routes/acronym.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new AcronymRoute()]);

app.listen();
