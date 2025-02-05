//index.js
import app from './app.js';
import {connectDB} from './db/mongoClient.js';

const PORT = 4000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server RollingTicket is running on port ${PORT}`);
    
    });