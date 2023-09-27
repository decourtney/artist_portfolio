import jwt from "jsonwebtoken";

const secret = "mysecretsshhhhh";
const expiration = "2h";

// Type of any used to bypass typescript errors until later
export const authMiddleware = ({ req }: any) => {
  // allows the token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  // changed for typescript... maybe? its right??
  const decodedToken = jwt.verify(token, secret, { maxAge: expiration });
  if (typeof decodedToken === "string") {
    throw new Error("Invalid token"); // Token is a string, not an object
  }
  req.user = decodedToken.data;
  return req;
};

export const signToken = ({
  firstName,
  email,
  _id,
}: {
  firstName: string;
  email: string;
  _id: string;
}) => {
  const payload = { firstName, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
