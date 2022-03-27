const axios = require('axios');
const cookieParser = require('cookie-parser');
const csv2Json = require('./utils/csv2Json')

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
        splitList[i] = parseInt(removeSpace(splitList[i]));
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

async function makeDataRequestByCounty(req, res){
    let stateName = req.params.stateCounty.toString();
    let url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/main/daily_cases/new_daily_states_county/confirmed_cases_" + stateName.toLowerCase() + ".csv"

    const csv= require('fast-csv');
    let requestData2020 = Array(12).fill(0).map(row => new Array(31).fill().map(Object));
    let requestData2021 = Array(12).fill(0).map(row => new Array(31).fill().map(Object));
    let requestData2022 = Array(12).fill(0).map(row => new Array(31).fill().map(Object));

    // axios.get(url).then((response) => {
    //     let data = response.data
    //     console.log(JSON.parse(JSON.stringify(data)))
    // })

    // var allCountiesStream = fs.createReadStream("./csv/confirmed_cases_" + stateName + ".csv");
    // csv
    //     .parseStream(allCountiesStream, {headers : true})
    //     .on("data", function(data){
    //         // will only return the data of state+county
    //         let copyData = JSON.parse(JSON.stringify(data));
    //         let currentRowStateCountyInfo = data.Combined_Key;
    //         for (let [key, value] of Object.entries(copyData)) {
    //             if(isDate(key)){
    //                 let dateList = returnDateList(key);
    //                 let month = dateList[0], day = dateList[1], year = dateList[2];
    //
    //                 if(stateName.includes("+")){
    //                     let stateCountyList = stateName.split("+");
    //                     let state = removeSpace(stateCountyList[0]), county = removeSpace(stateCountyList[1]);
    //
    //                     if(currentRowStateCountyInfo.includes(state) && currentRowStateCountyInfo.includes(county)){
    //                         if(year === 20){
    //                            requestData2020[month - 1][day - 1][county] = value;
    //                        } else if(year === 21){
    //                            requestData2021[month - 1][day - 1][county] = value;
    //                        } else{
    //                             requestData2022[month - 1][day - 1][county] = value;
    //                         }
    //                     }
    //                 } else{// will return the entire state data
    //                     if(currentRowStateCountyInfo.includes(stateName)){
    //                         let county = data.Admin2;
    //
    //                         if(year === 20){
    //                             requestData2020[month - 1][day - 1][county] = value;
    //                         } else if(year === 21){
    //                             requestData2021[month - 1][day - 1][county] = value;
    //                         } else{
    //                             requestData2022[month - 1][day - 1][county] = value;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //
    //
    //
    //
    //     })
    //     .on("end", function(){
    //         //res.send({success: 'success'});
    //         res.send({requestData2020: requestData2020, requestData2021:requestData2021, requestData2022:requestData2022});
    //     });

    let result = await csv2Json.getJSONFromUrl(url);

    for(let i = 0; i <  result.length; i++) {
        let currentRowStateCountyInfo = result[i]['Combined_Key'].toString();
        for (let [key, value] of Object.entries(result[i])) {
            if (isDate(key)) {
                let dateList = returnDateList(key);
                let month = dateList[0], day = dateList[1], year = dateList[2];

                if (stateName.includes("+")) {
                    let stateCountyList = stateName.split("+");
                    let state = removeSpace(stateCountyList[0]), county = removeSpace(stateCountyList[1]);

                    if (currentRowStateCountyInfo.includes(state) && currentRowStateCountyInfo.includes(county)) {
                        if (year === 20) {
                            requestData2020[month - 1][day - 1][county] = value;
                        } else if (year === 21) {
                            requestData2021[month - 1][day - 1][county] = value;
                        } else {
                            requestData2022[month - 1][day - 1][county] = value;
                        }
                    }
                } else {// will return the entire state data
                    if (currentRowStateCountyInfo.includes(stateName)) {
                        let county = result[i]['Admin2'];

                        if (year === 20) {
                            requestData2020[month - 1][day - 1][county] = value;
                        } else if (year === 21) {
                            requestData2021[month - 1][day - 1][county] = value;
                        } else {
                            requestData2022[month - 1][day - 1][county] = value;
                        }
                    }
                }
            }
        }
    }

    res.send({requestData2020: requestData2020, requestData2021:requestData2021, requestData2022:requestData2022})
}

async function makeCsv2Json(req, res){
    let url = req.body.url;
    let result = await csv2Json.getJSONFromUrl(url);
    res.send({result: result});
}

// fetch accine data by state + county
async function makeVaccineData(req, res) {
    // https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/main/vaccination/vaccination_data_county/vaccination_data_Florida.csv
    state = req.params.state.toString();
    county = req.params.county?.toString();

    state = state.charAt(0).toUpperCase() + state.slice(1);
    county = county?.charAt(0).toUpperCase() + county?.slice(1);

    url = 'https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/main/vaccination/vaccination_data_county/vaccination_data_' + state + '.csv';
    console.log(url)
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "[makeVaccineDateReq] result of 'csv2Json' is null, you may need to check the state name"})
    }else {
        if (county) {
            result = result.filter(data=> data.recip_county == county);
        }
        res.send({res: result});
    }
}

module.exports = (app) =>{
    app.use(cookieParser());
    app.get('/fetchAllData', makeDataRequest);
    app.get('/fetchData2020', makeDataRequestData2020);
    app.get('/fetchStateData/:stateCounty', makeDataRequestByCounty);
    app.get('/fetchVaccinedData/:state/:county?', makeVaccineData)
    app.post('/csv2Json', makeCsv2Json);
}