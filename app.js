//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();


app.use(express.static("Public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
const name = req.body.name;
const sirname = req.body.sirname;
const mail = req.body.mail;
const data = {
  members:[
    {
      email_address: mail,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        LNAME: sirname,
      }
    }
  ]
};
const jsonData = JSON.stringify(data);
const url = "https://us19.api.mailchimp.com/3.0/lists/b6002160a4";
const options = {
  method: "POST",
  auth:"galpon:f6ac19293ff8e1ba53fc91334226bf2e-us19"
};
const request = https.request(url, options, function(response){
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/succes.html");
  } else {
    res.sendFile(__dirname + "/failure.html");

  }

});

request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server up");
});



// audience id b6002160a4
// api key f6ac19293ff8e1ba53fc91334226bf2e-us19
