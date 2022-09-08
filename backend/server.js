const app = require('./app');
const databaseConnect = require('./DB/database');
databaseConnect();

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port no: ${process.env.PORT}`);
});
