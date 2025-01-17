const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
dotenv.config();
// const corsOptions = {
//     origin: '*'
// };
app.use(cors());
app.use(bodyParser.json());app.use(express.json()); // Parse requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data


app.use(express.json());  // To parse incoming request bodies
// Connect to MongoDB
connectDB();

// app.use(upload.none()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('./routes/users/user.routes')(app);
require('./routes/SuperAdmin/user.routes')(app);
require('./routes/restaurant/restaurant.routes')(app);
require('./routes/restaurant/cuisine.routes')(app);
require('./routes/restaurant/category.routes')(app);
require('./routes/restaurant/menu.routes')(app);
require('./routes/restaurant/order.routes')(app);
// If you are using form-urlencoded data in Postman (instead of JSON), also add this:
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
