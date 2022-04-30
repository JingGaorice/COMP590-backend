# COMP590-backend

Team member: Duo Xu(dx9), Danfeng Yang(dy33), Siqing Zheng(sz70), Jing Gao(jg107), Kaiven Deng(kd45)

## Introduction

The function of this Repository is taking the [data](https://github.com/NUMBKV/COMP590-Data-Processing) that analyzed by Data Processing Team, and provide a serious APIs for front-end team to get data based on different functions requirement. For example, get vaccine data, conform data based on state, county, etc.

## Reproducibility

### Deployed on Heroku

This back-end project deployed on Heroku with Node.js Runtime. The base Url is:  https://guarded-peak-91121.herokuapp.com

You are free to deploy by yourself.

Here is how to Do it.

- `git add .`
- `git commit -m ‘first commit`
- `heroku login` The login page will pop out.
- `heroku create` Create your application instance.
- `git push heroku main` 

Run it on your local machine

- ` npm init `

- ` npm start `

  Get local url from terminal and test it 


## APIs

Read [api.md](https://github.com/JingGaorice/COMP590-backend/blob/main/api.md) to see the REST API to the example app.



## Implement Details

- Util Folder
  - Implemented the function that fetches CSV data from data process team and transform to json file asynchronously.
  Handles errors, like it should have message out when fetching invalid url.
- fetchData.js
  - Here include function for comfirmed cases
- fetchVacine.js
  - Here include functions for vaccine data
- Index.js
  - This file is where we produce the APIs, which utilizes express.js framework to create API Urls. 
  
  
## Technology used
- Heroku: deploy online platform
- express: api framework
- Dependencies 
  1. axios
  2. body-parser
  3. cookie-parser
  4. csv-parser
  5. csvtojson
  6. fast-csv
  7. got
