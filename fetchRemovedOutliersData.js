const axios = require('axios');
const cookieParser = require('cookie-parser');
const csv2Json = require('./utils/csv2Json')

const fs = require("fs");
const csv = require("fast-csv");

async function fetchMedianFilter(req, res) {
    state = req.params.state?.toString();
    console.log(state)
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/remove_outlier_cases/median_filter/remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({medianFilter: result})
    }
}

async function fetchCart(req, res) {
    state = req.params.state?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/remove_outlier_cases/CART/remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({cartModel: result})
    }
}

async function fetchProphet(req, res) {
    state = req.params.state?.toString();
    // url located the cvs file in data repo
    url = "https://raw.githubusercontent.com/NUMBKV/COMP590-Data-Processing/remove-outlier-sean/remove_outlier_cases/Prophet/remove_outlier_" + state + ".csv"
    let result = await csv2Json.getJSONFromUrl(url);
    if (!result) {
        res.send({"error" : "Error: please check state name. For example, california"})
    } else {
        res.send({prophet: result})
    }
}

module.exports = (app) => {
    app.get('/removedOutliers/medianFilter/:state', fetchMedianFilter)
    app.get('/removedOutliers/cart/:state', fetchCart)
    app.get('/removedOutliers/prophet/:state', fetchProphet)
    // app.get('/fetchVaccinedData/removeOutliers/cart/:state/:county?', makeVaccineData)
}