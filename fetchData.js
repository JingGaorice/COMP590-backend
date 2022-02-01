const axios = require('axios');
const cookieParser = require('cookie-parser');

const fs = require("fs");
var stream = fs.createReadStream("./TexasData.csv");
var data2020 = Array(12).fill(0).map(row => new Array(31).fill({}));
var data2021 = Array(12).fill(0).map(row => new Array(31).fill({}));

const processRecipients = async () => {
    const recipients = await csvToJson({
        trim:true
    }).fromFile('./TexasData.csv');

    // Code executes after recipients are fully loaded.
    console.log(recipients);
};

async function makeDataRequest(req, res){
    const csv= require('fast-csv');
    csv
        .parseStream(stream, {headers : true})
        .on("data", function(data){
            let dateArray = data.Date.toString().split("/");
            if(dateArray.length === 3){
               let month = parseInt(dateArray[0]), day = parseInt(dateArray[1]), year = parseInt(dateArray[2]);

               if(year === 20){
                   data2020[month - 1][day - 1] = data;
               } else if(year === 21){
                   data2021[month - 1][day - 1] = data;
               }
            }

        })
        .on("end", function(){
            console.log(data2021);
            res.send({data2020: data2020, data2021: data2021});
        });
}

async function makeDataRequestData2020(req, res){
    const csv= require('fast-csv')
    csv
        .parseStream(stream, {headers : true})
        .on("data", function(data){
            let dateArray = data.Date.toString().split("/");
            if(dateArray.length === 3){
                let month = parseInt(dateArray[0]), day = parseInt(dateArray[1]), year = parseInt(dateArray[2]);

                if(year === 20){
                    data2020[month - 1][day - 1] = data;
                }
            }

        })
        .on("end", function(){

            res.send({data2020: data2020});
        });
}

module.exports = (app) =>{
    app.use(cookieParser());
    app.get('/fetchAllData', makeDataRequest);
    app.get('/fetchData2020', makeDataRequestData2020);
}