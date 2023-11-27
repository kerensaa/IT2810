const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const dbo = require('./db/conn');

const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    // ... define other recipe fields
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    recipe: {
      type: RecipeType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // Logic to fetch data from MongoDB
        const db_connect = dbo.getDb("recipe_db");
        return db_connect.collection("indian_recipes").findOne({ id: args.id });
      },
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      // Add arguments if needed for filtering, sorting, etc.
      resolve(parent, args) {
        const db_connect = dbo.getDb("recipe_db");
        return db_connect.collection("indian_recipes").find({}).toArray();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // If you have mutations, define them here
});
