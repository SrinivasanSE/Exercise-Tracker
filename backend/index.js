import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// configuration for environment variables
dotenv.config();

const app = express();

// To access content in body in post request
app.use(express.json());

/*Returns middleware that only parses {urlencoded} bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
*/

app.use(express.urlencoded({ extended: false }));

// To allow CORS
app.use(cors());

const port = process.env.port || 4000;

app.listen(port, () => console.log(`app is listening at ${port}`));
