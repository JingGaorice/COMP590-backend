const axios =  require('axios')

async function getJSONFromUrl(url){
    const response = await axios.get(url).catch(function (error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
          console.log("ERROR: [getJSONFromUrl()] from utils/csv2Json.js");
    });
    
    if (!response) return response;
    const file = response.data;
    let rows = file.split('\n')
    let res = []
    let headers = rows[0].split(',')
    for(let i = 1; i < rows.length; i++){
        let obj = {}
        let curRow = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        for(let j = 0; j < headers.length; j++){
            obj[headers[j]] = curRow[j];
        }
        if(curRow.length !== headers.length){
            continue;
        }
        res.push(obj);
    }
    return res;
}

module.exports = {getJSONFromUrl}