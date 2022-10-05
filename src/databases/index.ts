import { DB_HOST, DB_PORT, DB_DATABASE } from '../config';

export const dbConnection: any = {
  // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  url: `mongodb+srv://Ichiro:Security!2022@cluster0.1tuuvwu.mongodb.net/?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
