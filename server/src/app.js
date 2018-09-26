import hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import schema from './graphql/schema';

const server = hapi.server({
  port: 8000,
  host: 'localhost'
});

const init = async () => {
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      },
      route: {
        cors: true
      }
    }
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unHandledRejection', (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

init();