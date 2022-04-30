const axios = require('axios');
const cookieParser = require('cookie-parser');
const csv2Json = require('./utils/csv2Json')

const fs = require("fs");
const csv = require("fast-csv");

// fetch the booster vaccine data by state name
async function fetchMedianFilter(req, res) {
    state = req.params.state?.toString();
    console.log(state)
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/cumulative_remove_outlier_cases/median_filter/cumulative_remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({booster: result})
    }
}

async function fetchCart(req, res) {
    state = req.params.state?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/cumulative_remove_outlier_cases/CART/cumulative_remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({booster: result})
    }
}

async function fetchProphet(req, res) {
    state = req.params.state?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/cumulative_remove_outlier_cases/Prophet/cumulative_remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({booster: result})
    }
}

module.exports = (app) => {
    app.get('/removeOutliers/medianFilter/:state', fetchMedianFilter)
    app.get('/removeOutliers/cart/:state', fetchCart)
    app.get('/removeOutliers/prophet/:state', fetchProphet)
    // app.get('/fetchVaccinedData/removeOutliers/cart/:state/:county?', makeVaccineData)
}