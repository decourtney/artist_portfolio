import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/artist_portfolio_db');

export default mongoose.connection;
