const { ApolloServer } = require('apollo-server');
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const {PrismaClient, Prisma} = require("@prisma/client");

const fileContent = require("fs");
const server = new ApolloServer(
  { 

    typeDefs, 
    resolvers,
    context: ({req}) =>{      
      return {
        prismaClient: new PrismaClient(),
        prisma: Prisma,
        req: req
      }

    },    
    
  
  });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});