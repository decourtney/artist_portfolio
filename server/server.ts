import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authMiddleware } from "./utils/auth";
import { typeDefs, resolvers } from "./schemas";
import { graphqlUploadExpress } from "graphql-upload-ts";
import express from "express";
import db from "./config/connection";
import cors from 'cors';
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // csrfPrevention: true,
  // context: authMiddleware,
});

// app.use(graphqlUploadExpress());

// Configure CORS to allow requests from specific origins
// app.use(
//   cors({
//     origin: "https://studio.apollographql.com", // Replace with the allowed origin(s)
//     credentials: true, // Enable sending cookies or authentication headers
//   })
// );

// app.use(
//   cors<cors.CorsRequest>({
//     origin: [
//       // "https://www.your-app.example",
//       "https://studio.apollographql.com",
//     ],
//   })
// );

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Serve up static assets
// app.use(express.static(path.join(__dirname, "../client/public/")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Create a new instance of an Apollo server
const startApolloServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        // "https://www.your-app.example",
        "https://studio.apollographql.com",
      ],
    }),
    express.json(),
    expressMiddleware(server, { context: authMiddleware }),
    graphqlUploadExpress(),
    express.urlencoded({ extended: false }),
    express.static(path.join(__dirname, "../client/public/")),
  );

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
