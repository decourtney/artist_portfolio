import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { authMiddleware } from "./utils/auth";
import cors from "cors";
import { typeDefs, resolvers } from "./schemas";
import db from "./config/connection";

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Configure CORS to allow requests from specific origins
app.use(
  cors({
    origin: "https://studio.apollographql.com", // Replace with the allowed origin(s)
    credentials: true, // Enable sending cookies or authentication headers
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
// removed passing of typedefs and resolvers ** if this becomes an issue revisist this
