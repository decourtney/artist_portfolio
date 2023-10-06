import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {createUploadLink} from 'apollo-upload-client'

import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const uploadLink = createUploadLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'Apollo-Require-Preflight': 'true'
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <div className="flex flex-col min-h-screen scrollbar-hide">
            <Header />
            <Routes>
              {/* <Route path="/" element={<Profile />} />{" "} */}
              {/* This is just for initial development stages. delete when necessary */}
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="/profile/:username" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
