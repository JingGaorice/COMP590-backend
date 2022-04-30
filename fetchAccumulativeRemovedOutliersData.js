const axios = require('axios');
const cookieParser = require('cookie-parser');
const csv2Json = require('./utils/csv2Json')

const fs = require("fs");
const csv = require("fast-csv");

// fetch the booster vaccine data by state name
async function fetchAccMedianFilter(req, res) {
    state = req.params.state?.toString();
    console.log(state)
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/cumulative_remove_outlier_cases/median_filter/cumulative_remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({cumulativeMedianFilter: result})
    }
}

async function fetchAccCart(req, res) {
    state = req.params.state?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/cumulative_remove_outlier_cases/CART/cumulative_remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({cumulativeCartModel: result})
    }
}

async function fetchAccProphet(req, res) {
    state = req.params.state?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/cumulative_remove_outlier_cases/Prophet/cumulative_remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({cumulativeProphet: result})
    }
}

module.exports = (app) => {
    app.get('/cumulativeRemovedOutliers/medianFilter/:state', fetchAccMedianFilter)
    app.get('/cumulativeRemovedOutliers/cart/:state', fetchAccCart)
    app.get('/cumulativeRemovedOutliers/prophet/:state', fetchAccProphet)
    // app.get('/fetchVaccinedData/removeOutliers/cart/:state/:county?', makeVaccineData)
}