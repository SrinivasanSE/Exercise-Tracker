const express = require("express");
const cors = require("cors");
const connect = require("./mongodb/connection");
// configuration for environment variables

const app = express();
connect();

// To access content in body in post request
app.use(express.json());

/*Returns middleware that only parses {urlencoded} bodies and only looks at requests 
where the Content-Type header matches the type option. This parser accepts only UTF-8
 encoding of the body and supports automatic inflation of gzip and deflate encodings.
A new body object containing the parsed data is populated on the request object after
 the middleware (i.e. req.body). This object will contain key-value pairs,
  where the value can be a string or array (when extended is false), or any type (when extended is true).

If extended is false, you can not post "nested object"

person[name] = 'cw'

// Nested Object = { person: { name: cw } }
If extended is true, you can do whatever way that you like.
*/
app.use(express.urlencoded({ extended: false }));

// To allow CORS
app.use(cors());

//Routes

app.use("/users", require("./routes/userRoutes"));
app.use("/exercises", require("./routes/exerciseRoutes"));

const port = process.env.port || 4000;

app.listen(port, () => console.log(`app is listening at ${port}`));
