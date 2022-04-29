const axios = require('axios');
const cookieParser = require('cookie-parser');
const csv2Json = require('./utils/csv2Json')

const fs = require("fs");
const csv = require("fast-csv");
// fetch accine data by state + county
async function makeVaccineData(req, res) {
    // https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/main/vaccination/vaccination_data_county/vaccination_data_Florida.csv
    state = req.params.state.toString();
    county = req.params.county?.toString();

    state = state.charAt(0).toUpperCase() + state.slice(1);
    county = county?.charAt(0).toUpperCase() + county?.slice(1);

    url = 'https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/main/vaccination/vaccination_data_county/vaccination_data_' + state + '.csv';
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

// fetch the fisrt dose vaccine data by state name
async function fetchFirstDose(req, res) {
    state = req.params.state?.toString();
    county = req.params.county?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/main/vaccination/first_dose_county_state.csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name."})
    } else {
        if (state) {
            result = result.filter(data=> data.recip_state == state)
        }
        if (county) {
            result = result.filter(data=> data.recip_county == county);
        }
        res.send({firstDose: result})
    }
}
// fetch the second dose vaccine data by state name
async function fetchSecondDose(req, res) {
    state = req.params.state?.toString();
    county = req.params.county?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/main/vaccination/second_dose_county_state.csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name."})
    } else {
        if (state) {
            result = result.filter(data=> data.recip_state == state)
        }
        if (county) {
            result = result.filter(data=> data.recip_county == county);
        }
        res.send({secondDose: result})
    }
}
// fetch the booster vaccine data by state name
async function fetchBooster(req, res) {
    state = req.params.state?.toString();
    county = req.params.county?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/main/vaccination/booster_county_state.csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name."})
    } else {
        if (state) {
            result = result.filter(data=> data.recip_state == state)
        }
        if (county) {
            result = result.filter(data=> data.recip_county == county);
        }
        res.send({booster: result})
    }
}
module.exports = (app) => {
    app.get('/fetchVaccinedData/:state/:county?', makeVaccineData)
    app.get('/fetchFirstDose/:state?/:county?', fetchFirstDose);
    app.get('/fetchSecondDose/:state?/:county?', fetchSecondDose);
    app.get('/fetchBooster/:state?/:county?', fetchBooster);
}