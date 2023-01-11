const env = require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mailgun = require("mailgun-js");
const fileUpload = require("express-fileupload");
const axios = require("axios");
const twilio = require("twilio");
const { MessagingResponse } = require("twilio").twiml;
const { ReminderSurvey , urlShortner} = require("./JS/BEHelper.js");

// SMS
const accountSid = env.parsed.TWILIO_ACCOUNT_SID;
const authToken = env.parsed.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./build"));
app.use(cors());
app.use(fileUpload());

const BaseURL =
  process.env.ENVIRONMENT === "prod"
    ? "https://curorx.life"
    : process.env.ENVIRONMENT === "beta"
    ? "https://curo-frontend-beta.azurewebsites.net"
    : "http://localhost:8080";

async function main(name, data) {
  console.log("Azure Blob storage v12 - JavaScript quickstart sample");

  // Quick start code goes here
  const AZURE_STORAGE_CONNECTION_STRING =
    env.parsed.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }

  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );

  // Create a unique name for the container
  const containerName = "curorxcon";

  console.log("\nCreating container...");
  console.log("\t", containerName);

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create a unique name for the blob
  const blobName = `${Date.now()}_${name}`;
  // "https://curorx.blob.core.windows.net/curorxcon/AdobeStock_196187539.jpeg"
  // "https://curorx.blob.core.windows.net/curorxcon/AdobeStock_290877314_Preview.jpeg"
  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log("\nUploading to Azure storage as blob:\n\t", blobName);

  // Upload data to the blob

  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log(
    "Blob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );

  let url = `https://curorx.blob.core.windows.net/curorxcon/${blobName}`;
  return url;
}

// This middleware is available in Express v4.16.0 onwards
app.use(express.json());

app.post("/api/createFile", (req, res) => {
  // console.log(req.body)

  let file = req.files.file;
  console.log(req.files.file);
  console.log("/////////////////////////////");
  console.log(file);
  // res.json({test: "test"})
  main(file.name, file.data)
    .then((r) => {
      console.log(r, "res here");
      // return res
      res.json({ url: r });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

app.post("/api/npi", (req, res) => {
  console.log(req.body);
  axios
    .get(
      `https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${req.body.npi}&first_name=${req.body.fname}&last_name=${req.body.lname}`
    )
    .then((r) => {
      console.log(r.data.results);
      res.json(r.data.results);
    })
    .catch((err) => {
      res.json(err);
      console.log(`PROBLEM, err=${err}`);
    });
});

const DOMAIN = "mailgun.nextehealth.com";
const mg = mailgun({ apiKey: env.parsed.MAILGUN_API, domain: DOMAIN });

app.post("/api/resetpassword", (req, res) => {
  console.log(req.body.email);

  const msg = {
    to: req.body.email, // Change to your recipient
    from: "admin@nextehealth.com", // Change to your verified sender
    subject: "Password Reset",
    text: "and easy to do anywhere, even with Node.js",
    html: `Please use the following password to login for only one time <strong>${req.body.TempPassword}</strong>`,
  };
  // `Please use the following password to login for only one time <strong>${req.body.TempPassword}</strong>`
  mg.messages().send(msg, function (error, body) {
    if (body) {
      console.log(body);
      res.json({ msg: body });
    }

    if (error) {
      res.json({ msg: error });
    }
  });
});

app.post("/api/contactus", (req, res) => {
  console.log(req.body.email);

  const msg = {
    to: "support@nextehealth.com", // Change to your recipient
    from: "admin@nextehealth.com", // Change to your verified sender

    text: `Sender Email ${req.body.email}`,
    html: req.body.message,
    subject: `${req.body.subject} From ${req.body.name} Email Address ${req.body.email}`,
  };
  // `Please use the following password to login for only one time <strong>${req.body.TempPassword}</strong>`
  mg.messages().send(msg, function (error, body) {
    if (body) {
      console.log("here");
      res.json({ msg: body });
    }

    if (error) {
      res.json({ msg: error });
    }
  });
});

app.post("/api/sms", (req, res) => {
  console.log(
    `${BaseURL}/applesssms/?id=${req.body.channel_id}&s=${req.body.sender}&r=${req.body.receiver}`
  );
  let url = `${BaseURL}/applesssms/?id=${req.body.channel_id}&s=${req.body.sender}&r=${req.body.receiver}`;
urlShortner(`${BaseURL}/applesssms/?id=${req.body.channel_id}&s=${req.body.sender}&r=${req.body.receiver}`, axios).then((r) => {
        console.log(r)
        console.log(`https://${r}`)

      client.messages
        .create({
          body: `New message from REPharmacy : ((${req.body.message})).
_________________________________
-To reply please click on the link below:
https://${r}`,
            from: '+18647345830',
            to: req.body.number,

        })
        .then(message => {console.log(message.sid, "message.sid"); 

    }).catch(err =>{console.log(err)})
    
}).catch(er => {
    console.log(er)
    client.messages
    .create({
        body:`New message from REPharmacy : ((${req.body.message})).
_________________________________
-To reply please click on the link below:
${BaseURL}/applesssms/?id=${req.body.channel_id}&s=${req.body.sender}&r=${req.body.receiver}`,
        from: '+18647345830',
        to: req.body.number,

    })
    .then(message => {console.log(message.sid, "message.sid"); 
}
   
    ).catch(e =>{console.log(e)});

})

});

////////////////// Start Mass Text //////////////////////
app.post("/api/mass-text", (req, res) => {
  client.messages
    .create({
      body: `${req.body.message}`,
      from: "+18647345830",
      to: req.body.phone,
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(err.status).json(err.message);
    });
});

////////////////// END Mass Text //////////////////////

app.post("/api/sendemail", (req, res) => {
  console.log(req.body.email);
  const msg = {
    to: req.body.email, // Change to your recipient
    from: "admin@nextehealth.com", // Change to your verified sender
    html: req.body.message,
    subject: `New message from REPharmacy`,
  };

  mg.messages().send(msg, function (error, body) {
    if (body) {
      console.log("here");
      // res.json({ msg: body })
    }

    if (error) {
      // res.json({ msg: error })
    }
  });
});

app.post("/api/surveyemail", (req, res) => {
  console.log(req.body.email);
  const msg = {
    to: req.body.email, // Change to your recipient
    from: "admin@curorx.life", // Change to your verified sender
    html: req.body.message,
    subject: `New survey from REPharmacy`,
  };

  mg.messages().send(msg, function (error, body) {
    if (body) {
      console.log("here");
      res.json({ msg: body });
    }

    if (error) {
      res.json({ msg: error });
    }
  });
});

app.post("/api/surveysms", (req, res) => {
  client.messages
    .create({
      body: req.body.message,
      from: "+18647345830",
      to: req.body.number,
    })
    .then((message) => {
      console.log(message.sid, "message.sid");
      res.json({ msg: "done" });
    })
    .catch((err) => console.log(err));
});

app.post("/smsres", (req, res) => {
  const twiml = new MessagingResponse();
  console.log(req.body, "req.body.Body");
  //     twiml.message('The Robots are coming! Head for the hills!');
  //     console.log(twiml, "Ay 7aga");
  //   console.log(twiml.toString(), "twiml.toString()");
  //     res.type('text/xml').send(twiml.toString());
});

app.post("/savefiles", (req, res) => {
  try {
    console.log(req.files.file);

    main(req.files.file.name, req.files.file.data).then((r) => {
      console.log(r, "res here");
      // return res
      res.send({ url: r });
    });

    // res.send({ msg: "done" })
  } catch (err) {
    console.log(err);
  }
});

setInterval(() => {
  // Helpers
  ReminderSurvey(client, axios);
}, 1000 * 60 * 60 * 24);

// Helpers
ReminderSurvey(client, axios);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
// [END app]

module.exports = app;
