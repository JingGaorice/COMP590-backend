# COMP590-backend

Team member: Duo Xu, Danfeng Yang, Siqing Zheng, JingGao

## Description

The function of this Repository is taking the [data](https://github.com/NUMBKV/COMP590-Data-Processing) that analyzed by Data Processing Team, and provide a serious APIs for front-end team to get data based on different functions requirement. For example, get vaccine data, conform data based on state, county, etc.

## Reproducibility

### Deployed on Heroku

This back-end project deployed on Heroku with Node.js Runtime. The base Url is:  https://guarded-peak-91121.herokuapp.com

You are free to deploy by yourself.

Here is how to Do it.

- `git add .`
- ``git commit -m ‘first commit`
- `heroku login` The login page will pop out.
- `heroku create` Create your application instance.
- `git push heroku main` 

Run it on your local machine

- ` npm init `

- ` npm start `

  Get local url from terminal and test it 


## APIs

The REST API to the example app is described below.

### Get all covid data

### Request

`GET /fetchAllData`


### Response

Response body contains fields that represent data from each year, each field value is an array of 12 month, where each month is an object array of size about 30 that represents each day of that month. Each day object consists of Date and the new cases for each county in Texas.

```
   {data2020: [
       [
           {
               "Date": "1/1/21",
               "Anderson": "276",
               "Andrews": "17",
               ...
           },
           ...
       ],
        ...
   ],
   data2021: [...]]}
```

 


## Get covid data from 2020

### Request

`GET /fetchData2020`


### Response

  Response body contains fields that represent covid data from each year, each field value is an array of 12 month, where each month is an object array of size about 30 that represents each day of that month. Each day object consists of Date and the new cases for each county in Texas.

```json
   {
   "data2020": [
       [
           ...,
           {
               "Date": "1/22/20",
               "Anderson": "0",
               "Andrews": "0",
               "Angelina": "0",
               "Aransas": "0",
               ...: String,
           },
       ]
   ]
   }
```



## Fetch covid cases accroding to State

### Request

`GET /fetchStateData/:stateCounty`

Example:  `GET /fetchStateData/texas`


### Response

   Response body contains fields that represent covid data from each year, each field value is an array of 12 month, where each month is an object array of size about 30 that represents each day of that month. Each day object consists of Date and the new cases for each county in the specified state.

```
   {
   "requestData2020": [
       [
           {
               Date: String,
           },
           ...
       ],
       ...
   ],
   "requestData2021": [...]
   }
```



## Fetch vaccine data accroding to State

### Request

`GET /fetchVaccinedData/:state/:county?`

Example:  `GET /fetchVaccinedData/texas/harris`

### Response

```
   {
       "res": []
   }
```

## Fetch first dose of vaccine data accroding to State

### Request

`GET /fetchFirstDose/:state/:county?`

Example:  `GET /fetchFirstDose/TX`

### Response

 ```json
   {
    "firstDose": [
        {
            "": "468",
            "date": "2022-03-01T00:00:00.000",
            "fips": "48179",
            "mmwr_week": "9",
            "recip_county": "Gray County",
            "recip_state": "TX",
            "completeness_pct": "99",
            "administered_dose1_recip": "11836",
            "administered_dose1_pop_pct": "54.1",
            "administered_dose1_recip_5plus": "11836",
            "administered_dose1_recip_5pluspop_pct": "57.9",
            "administered_dose1_recip_12plus": "11677",
            "administered_dose1_recip_12pluspop_pct": "64.1",
            "administered_dose1_recip_18plus": "11050",
            "administered_dose1_recip_18pluspop_pct": "67.6",
            "administered_dose1_recip_65plus": "3332",
            "administered_dose1_recip_65pluspop_pct": "94.4",
            "series_complete_yes": "10393",
            "series_complete_pop_pct": "47.5",
            "series_complete_5plus": "10393",
            "series_complete_5pluspop_pct": "50.8",
            "series_complete_12plus": "10293",
            "series_complete_12pluspop_pct": "56.5",
            "series_complete_18plus": "9767",
            "series_complete_18pluspop_pct": "59.8",
            "series_complete_65plus": "3057",
            "series_complete_65pluspop_pct": "86.6",
            "booster_doses": "3340",
            "booster_doses_vax_pct": "32.1",
            "booster_doses_12plus": "3340",
            "booster_doses_12plus_vax_pct": "32.4",
            "booster_doses_18plus": "3314",
            "booster_doses_18plus_vax_pct": "33.9",
            "booster_doses_50plus": "2533",
            "booster_doses_50plus_vax_pct": "43.3",
            "booster_doses_65plus": "1640",
            "booster_doses_65plus_vax_pct": "53.6",
            "svi_ctgy": "D",
            "series_complete_pop_pct_svi": "15",
            "series_complete_5pluspop_pct_svi": "16",
            "series_complete_12pluspop_pct_svi": "16",
            "series_complete_18pluspop_pct_svi": "16",
            "series_complete_65pluspop_pct_svi": "16",
            "metro_status": "Non-metro",
            "series_complete_pop_pct_ur_equity": "7",
            "series_complete_5pluspop_pct_ur_equity": "8",
            "series_complete_12pluspop_pct_ur_equity": "8",
            "series_complete_18pluspop_pct_ur_equity": "8",
            "series_complete_65pluspop_pct_ur_equity": "8",
            "census2019": "21886",
            "census2019_5pluspop": "20443",
            "census2019_12pluspop": "18211",
            "census2019_18pluspop": "16344",
            "census2019_65pluspop": "3531"
        },
        ...
    ]
    }
 ```




## Fetch second dose of vaccine data accroding to State

### Request

`GET /fetchSecondDose/:state/:county?`

Example:  `GET /fetchSecondDose/TX`

### Response

```json
   {
   "secondDose": [
       {
           "": "468",
           "date": "2022-03-01T00:00:00.000",
           "fips": "48179",
           "mmwr_week": "9",
           "recip_county": "Gray County",
           "recip_state": "TX",
           "completeness_pct": "99",
           "administered_dose1_recip": "11836",
           "administered_dose1_pop_pct": "54.1",
           "administered_dose1_recip_5plus": "11836",
           "administered_dose1_recip_5pluspop_pct": "57.9",
           "administered_dose1_recip_12plus": "11677",
           "administered_dose1_recip_12pluspop_pct": "64.1",
           "administered_dose1_recip_18plus": "11050",
           "administered_dose1_recip_18pluspop_pct": "67.6",
           "administered_dose1_recip_65plus": "3332",
           "administered_dose1_recip_65pluspop_pct": "94.4",
           "series_complete_yes": "10393",
           "series_complete_pop_pct": "47.5",
           "series_complete_5plus": "10393",
           "series_complete_5pluspop_pct": "50.8",
           "series_complete_12plus": "10293",
           "series_complete_12pluspop_pct": "56.5",
           "series_complete_18plus": "9767",
           "series_complete_18pluspop_pct": "59.8",
           "series_complete_65plus": "3057",
           "series_complete_65pluspop_pct": "86.6",
           "booster_doses": "3340",
           "booster_doses_vax_pct": "32.1",
           "booster_doses_12plus": "3340",
           "booster_doses_12plus_vax_pct": "32.4",
           "booster_doses_18plus": "3314",
           "booster_doses_18plus_vax_pct": "33.9",
           "booster_doses_50plus": "2533",
           "booster_doses_50plus_vax_pct": "43.3",
           "booster_doses_65plus": "1640",
           "booster_doses_65plus_vax_pct": "53.6",
           "svi_ctgy": "D",
           "series_complete_pop_pct_svi": "15",
           "series_complete_5pluspop_pct_svi": "16",
           "series_complete_12pluspop_pct_svi": "16",
           "series_complete_18pluspop_pct_svi": "16",
           "series_complete_65pluspop_pct_svi": "16",
           "metro_status": "Non-metro",
           "series_complete_pop_pct_ur_equity": "7",
           "series_complete_5pluspop_pct_ur_equity": "8",
           "series_complete_12pluspop_pct_ur_equity": "8",
           "series_complete_18pluspop_pct_ur_equity": "8",
           "series_complete_65pluspop_pct_ur_equity": "8",
           "census2019": "21886",
           "census2019_5pluspop": "20443",
           "census2019_12pluspop": "18211",
           "census2019_18pluspop": "16344",
           "census2019_65pluspop": "3531"
       },
       ...
   ]
   }
```



## Fetch booster vaccine data accroding to State

### Request

`GET /fetchStateNewData/:state/:county?`

Example:  `GET /fetchBooster/TX`

### Response

 ```json
   {
    "booster": [
        {
            "": "468",
            "date": "2022-03-01T00:00:00.000",
            "fips": "48179",
            "mmwr_week": "9",
            "recip_county": "Gray County",
            "recip_state": "TX",
            "completeness_pct": "99",
            "administered_dose1_recip": "11836",
            "administered_dose1_pop_pct": "54.1",
            "administered_dose1_recip_5plus": "11836",
            "administered_dose1_recip_5pluspop_pct": "57.9",
            "administered_dose1_recip_12plus": "11677",
            "administered_dose1_recip_12pluspop_pct": "64.1",
            "administered_dose1_recip_18plus": "11050",
            "administered_dose1_recip_18pluspop_pct": "67.6",
            "administered_dose1_recip_65plus": "3332",
            "administered_dose1_recip_65pluspop_pct": "94.4",
            "series_complete_yes": "10393",
            "series_complete_pop_pct": "47.5",
            "series_complete_5plus": "10393",
            "series_complete_5pluspop_pct": "50.8",
            "series_complete_12plus": "10293",
            "series_complete_12pluspop_pct": "56.5",
            "series_complete_18plus": "9767",
            "series_complete_18pluspop_pct": "59.8",
            "series_complete_65plus": "3057",
            "series_complete_65pluspop_pct": "86.6",
            "booster_doses": "3340",
            "booster_doses_vax_pct": "32.1",
            "booster_doses_12plus": "3340",
            "booster_doses_12plus_vax_pct": "32.4",
            "booster_doses_18plus": "3314",
            "booster_doses_18plus_vax_pct": "33.9",
            "booster_doses_50plus": "2533",
            "booster_doses_50plus_vax_pct": "43.3",
            "booster_doses_65plus": "1640",
            "booster_doses_65plus_vax_pct": "53.6",
            "svi_ctgy": "D",
            "series_complete_pop_pct_svi": "15",
            "series_complete_5pluspop_pct_svi": "16",
            "series_complete_12pluspop_pct_svi": "16",
            "series_complete_18pluspop_pct_svi": "16",
            "series_complete_65pluspop_pct_svi": "16",
            "metro_status": "Non-metro",
            "series_complete_pop_pct_ur_equity": "7",
            "series_complete_5pluspop_pct_ur_equity": "8",
            "series_complete_12pluspop_pct_ur_equity": "8",
            "series_complete_18pluspop_pct_ur_equity": "8",
            "series_complete_65pluspop_pct_ur_equity": "8",
            "census2019": "21886",
            "census2019_5pluspop": "20443",
            "census2019_12pluspop": "18211",
            "census2019_18pluspop": "16344",
            "census2019_65pluspop": "3531"
        },
        ...
    ]
    } 
 ```




## Fetch covid cases accroding to State

### Request

`GET /fetchStateNewData/:stateCounty`

Example:  `GET /fetchStateNewData/California`


### Response

```json
{
   "newData": [
       {
           "Province_State": "California",
           "1/22/20": "0",
           ......
       }
   ]
}

```



## Implement Details

- Util Folder
  Implemented the function that fetches CSV data from data process team and transform to json file asynchronously.
  Handles errors, like it should have message out when fetching invalid url.
- fetchData.js
  Here include all main functions that process data for APIs calls
- Index.js
  This file is where we produce the APIs, which utilizes express.js framework to create API Urls. 
