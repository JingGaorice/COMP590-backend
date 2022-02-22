const axios = require('axios');
const cookieParser = require('cookie-parser');

const fs = require("fs");
const csv = require("fast-csv");
var stream = fs.createReadStream("./csv/TexasData.csv");
var data2020 = Array(12).fill(0).map(row => new Array(31).fill({}));
var data2021 = Array(12).fill(0).map(row => new Array(31).fill({}));

var data2020AllCounties = Array(12).fill(0).map(row => new Array(31).fill({}));
var data2021AllCounties = Array(12).fill(0).map(row => new Array(31).fill({}));

function removeSpace(str){
    return str.replace(/\s+/g, "");
}

function isDate(str){
    //var dateReg = /^\d{2}([./-])\d{2}\1\d{2}$/
    return (str.split("/").length === 3);
}

function returnDateList(str) {
    let splitList = str.split("/");
    for(let i = 0; i < splitList.length; i += 1) {
        splitList[i] = removeSpace(splitList[i]);
    }
    return splitList;
}

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

            res.send({data2020: data2020, data2021: data2021});
        });
}

async function makeDataRequestData2020(req, res){
    const csv= require('fast-csv')
    var allCountiesStream = fs.createReadStream("./csv/daily_confirmed _cases_county.csv");

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


async function makeAllCountiesData(req, res){
    const csv = require('fast-csv');
    let stateToCountyList = {};
    let dateMap = {};

    let count = 0;
    var allCountiesStream = fs.createReadStream("./csv/daily_confirmed _cases_county.csv");
    csv
        .parseStream(allCountiesStream, {headers : true})
        .on("data", function(data){
            // infoList should have county state country
            let infoList = data.Combined_Key.split(",");
            // if it is us county
            let county = data.Admin2, state = data.Province_State;
            if(!stateToCountyList[state]){
                stateToCountyList[state] = [];
            }
            stateToCountyList[state].push(county);
            for (const [key, value] of Object.entries(data)){
               if(isDate(key)){
                   if(!dateMap[key]){
                       dateMap[key] = {};
                   }
                   dateMap[key][county+","+state] = value;
               }
            }
            // if(infoList.length === 3 && infoList[2].includes("US")){
            //     let stateName = removeSpace(infoList[1]), countyName = removeSpace(infoList[0]);
            //     if(!stateToCountyList[stateName]){
            //         stateToCountyList[stateName] = [];
            //     }
            //     stateToCountyList[stateName].push(countyName);
            //
            //     for (const [key, value] of Object.entries(data)) {
            //         if(isDate(key)){
            //             let dateList = returnDateList(key);
            //             let confirmedCases = data.key;
            //             let month = parseInt(dateList[0]), day = parseInt(dateList[1]), year = parseInt(dateList[2]);
            //
            //             if(year === 20){
            //                 if(!data2020AllCounties[month - 1][day - 1][stateName]){
            //
            //                     data2020AllCounties[month - 1][day - 1][stateName] = {};
            //                 }
            //                 if(!data2020AllCounties[month - 1][day - 1][stateName][countyName]){
            //
            //                     data2020AllCounties[month - 1][day - 1][stateName][countyName] = {};
            //                 }
            //                 data2020AllCounties[month - 1][day - 1][stateName][countyName] = confirmedCases;
            //             } else {
            //                 if(!data2021AllCounties[month - 1][day - 1][stateName]){
            //                     data2021AllCounties[month - 1][day - 1][stateName] = {};
            //                 }
            //                 if(!data2021AllCounties[month - 1][day - 1][stateName][countyName]){
            //                     data2021AllCounties[month - 1][day - 1][stateName][countyName] = {};
            //                 }
            //                 data2021AllCounties[month - 1][day - 1][stateName][countyName] = confirmedCases;
            //             }
            //         }
            //     }
            //
            //
            // }




        })
        .on("end", function(){
            for (const [date, data] of Object.entries(dateMap)){
                let dateList = returnDateList(date);
                let month = parseInt(dateList[0]), day = parseInt(dateList[1]), year = parseInt(dateList[2]);
                if(year === 20){
                    data2020AllCounties[month - 1][day - 1] = data;
                } else if(year === 21){
                    data2021AllCounties[month - 1][day - 1] = data;
                }
            }
            //res.send({success: 'success'});
            res.send({data2020AllCounties: data2020AllCounties, data2021AllCounties: data2021AllCounties, stateToCountyList: stateToCountyList});
        });
 }

module.exports = (app) =>{
    app.use(cookieParser());
    app.get('/fetchAllData', makeDataRequest);
    app.get('/fetchData2020', makeDataRequestData2020);
    app.get('/fetchAllCountiesData', makeAllCountiesData);
}