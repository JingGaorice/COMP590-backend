const axios =  require('axios')

async function getJSONFromUrl(url){
    const response = await axios.get(url);
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