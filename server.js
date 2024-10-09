const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const cors = require('cors')
dotenv.config();
// const corsOptions = {
//     origin: '*'
// };
app.use(cors());
app.use(bodyParser.json());app.use(express.json()); // Parse requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data


app.use(express.json());  // To parse incoming request bodies
const upload = multer(); 
// Connect to MongoDB
connectDB();

app.use(upload.none()); 
require('./routes/Users/user.routes')(app);

// If you are using form-urlencoded data in Postman (instead of JSON), also add this:
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
