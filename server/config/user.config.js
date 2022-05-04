const mongoose = require('mongoose');
const db_name = "login_and_reg_db";

mongoose.connect(`mongodb+srv://root:root@mern.61c6w.mongodb.net/${db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));