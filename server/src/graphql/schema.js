const graphql = require('graphql');
import BookType from './BookType';
const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLSchema, 
} = graphql;

const data = [
  { id: '1', name: 'The Macbook Pro guide', genre: 'Technology' },
  { id: '2', name: 'A guide for adventurers', genre: 'Adventure' },
  { id: '3', name: 'Expect the unexpected', genre: 'Personal' },
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: BookType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        return data.filter(x => x.id == args.id)[0]
      }
    }
  }
  
})

const schema  = new GraphQLSchema({
  query: RootQuery
});

export default schema;