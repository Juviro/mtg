import Koa from 'koa';
import server from './server';
import './cron';

const app = new Koa();
const port = process.env.PORT || '4000';

server.applyMiddleware({ app });
app.listen({ port }, () => console.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
