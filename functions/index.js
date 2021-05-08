const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
var cors = require('cors')


const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const keys = require('./token.json');

const express = require('express')
const app = express()
const port = 3001

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

let gsapi;

client.authorize((err,tokens)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connected')
        gsapi = google.sheets({"version":'v4',auth:client});
    }
})

app.use(cors())

app.get('/stocksRecommendation', async (req, res) => {
    let data = await gsapi.spreadsheets.values.get({
        spreadsheetId:"1ykjV5Fk4mLIoiVcxjPcqHU8yyhnODgfdVTZUrB2_K-Q",
        range:"Stocks2!A:V"
    })
    // console.log(data.data.values);
    res.json(data.data.values)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

exports.app = functions.https.onRequest(app);