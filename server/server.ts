import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authMiddleware } from "./utils/auth";
import { typeDefs, resolvers } from "./schemas";
import { graphqlUploadExpress } from "graphql-upload-ts";
import express, { Request, Response } from "express";
import db from "./config/connection";
import cors from "cors";
import path from "path";

const HOSTNAME = process.env.HOSTNAME
const PORT = process.env.PORT || 3000;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
} else {
  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs: any, resolvers: any, app: any) => {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "https://studio.apollographql.com",
      ],
    }),
    express.json(),
    graphqlUploadExpress(),
    express.urlencoded({ extended: false }),
    express.static(path.join(__dirname, "../client/public/")),
    expressMiddleware(server, { context: authMiddleware })
  );

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://${HOSTNAME}:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers, app);
// removed passing of typedefs and resolvers ** if this becomes an issue revisist this
