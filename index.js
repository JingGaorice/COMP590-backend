const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dataFetch = require('./fetchData')
const vacDataFetch = require('./fetchVaccine')
const accOutliersFetch = require('./fetchAccumulativeRemovedOutliersData')
const rOutliersFetch = require('./fetchRemovedOutliersData')
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
//https://stackoverflow.com/questions/30761154/how-to-enable-cors-on-express-js-4-x-on-all-files
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');

    res.header('Access-Control-Allow-Credentials', true);

    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');



    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});
dataFetch(app);
vacDataFetch(app);
accOutliersFetch(app);
rOutliersFetch(app);
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
});
