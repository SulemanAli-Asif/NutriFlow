const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const database = require('./database/database'); 
const User = require('./modal/userModal')
const cors = require('cors');

app.use(cors({    
  origin: 'http://localhost:5173',  // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true  // Allow cookies and authorization headers
}));
// const cookieParser = require('cookie-parser')....
const fileUpload = require("express-fileupload");
// app.use(cookieParser())
app.use(express.json());

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

app.use(fileUpload());
app.use(express.static("public"));

const ytdl = require("ytdl-core");
const YOUR_API_TOKEN = process.env.AUDIO_PROCESSOR_KEY;
const transcriptEndpoint = "https://api.assemblyai.com/v2/transcript";
const headers = {
  Authorization: `Bearer ${YOUR_API_TOKEN}`,
  "Content-Type": "application/json",
};

app.post("/start-transcription", async (req, res) => {
  console.log("Received transcription request:", req.body);
  const { videoURL } = req.body;

  if (!videoURL) {
    return res.status(400).json({ error: "Video URL is required" });
  }

  try {
    const info = await ytdl.getInfo(videoURL);

    if (!info || !info.formats || info.formats.length === 0) {
      return res.status(400).json({ error: "No valid video formats found" });
    }

    const audioFormat = info.formats.find((format) => format.itag === 140);

    if (!audioFormat) {
      return res.status(400).json({ error: "No valid audio format found" });
    }

    const audioURL = audioFormat.url;
    console.log("Found audio stream URL:", audioURL);

    // Submit the audio for transcription
    const data = {
      audio_url: audioURL,
    };

    const response = await axios.post(transcriptEndpoint, data, { headers });
    const transcriptionId = response.data.id;

    res.json({ transcriptionId });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
app.get("/get-nutritional-data/:transcriptionId", async (req, res) => {
  const transcriptionId = req.params.transcriptionId;
  console.log(
    "Received /check-transcription-status transcription ID:",
    transcriptionId
  );
  if (!transcriptionId) {
    return res.status(400).json({ error: "Transcription ID is required" });
  }

  try {
    const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptionId}`;

    while (true) {
      const pollingResponse = await axios.get(pollingEndpoint, { headers });
      const transcriptionResult = pollingResponse.data;

      if (transcriptionResult.status === "completed") {
        const nutritionalData = await analyzeText(transcriptionResult);
        return res.json({
          status: "completed",
          result: transcriptionResult.text,
          nutritionalData,
        });
      } else if (transcriptionResult.status === "failed") {
        return res.json({ status: "failed" });
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

const analyzeText = async (transcriptionResult) => {
  const { words } = transcriptionResult;

  const foodNames = extractFoodNames(transcriptionResult.text);

  console.log("Extracted Food Names:", foodNames);

  if (foodNames.length === 0) {
    console.log(
      "No food entities found in the text:",
      transcriptionResult.text
    );
    return { status: "No food entities found" };
  }

  const nutritionalDataPromises = foodNames.map((foodName) =>
    fetchNutritionalData(foodName, appId, appKey)
  );

  console.log("Nutritional Data Promises:", nutritionalDataPromises);

  const nutritionalDataArray = await Promise.all(nutritionalDataPromises);

  console.log("Nutritional Data Array:", nutritionalDataArray);

  const combinedNutritionalData = nutritionalDataArray.reduce(
    (result, data) => {
      result[data.foodName] = {
        calories: data.calories,
        protein: data.protein,
        carbohydrates: data.carbohydrates,
        fat: data.fat,
        total_fat: data.total_fat,
        potassium: data.potassium,
        sugars: data.sugars,
        dietaryFiber: data.dietaryFiber,
        
      };
      return result;
    },
    {}
  );

  console.log("Combined Nutritional Data:", combinedNutritionalData);
  return combinedNutritionalData;
};

const extractFoodNames = (text) => {
  const foodNameRegex =
    /\b(?:bread|meatsoy|tomato sauce|sauce|yogurt|cheese|soda|sour cream|rice|chicken|roasted chicken|fruits|fruit salad|vegetables|chocolate|pasta|pizza|french fries|coffee|tea|green tea|jam|butter|margarine|peanut butter|fresh juice|honey|biscuits|cake|ice cream|fish|olive oil|omelet|cornflakes|donut|salmon|shrimp|lobster|steak|pancakes|waffles|bacon|sausage|eggs|lasagna|tacos|sushi|quinoa|avocado|smoothie|curry|spaghetti|tomatoes|onions|garlic|parmesan cheese|cream|salt|pepper|herbs|basil|oregano)\b/gi;
  const matches = text.match(foodNameRegex) || [];
  const foodNames = [...new Set(matches.map((name) => name.toLowerCase()))];
  console.log("Final Food Names:", foodNames);
  return foodNames;
};

const appId = process.env.NUTRITION_ID;
const appKey = process.env.NUTRITION_API_KEY;

const fetchNutritionalData = async (foodName, appId, appKey) => {
  try {
    const apiEndpoint = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const headers = {
      "x-app-id": appId,
      "x-app-key": appKey,
      "Content-Type": "application/json",
    };

    const data = {
      query: foodName,
    };

    const response = await axios.post(apiEndpoint, data, { headers });
    const itemData = response.data.foods[0];
    console.log("food data", itemData)
    return {
      foodName,
      total_fat: itemData.nf_total_fat || 0,
      calories: itemData.nf_calories || 0,
      protein: itemData.nf_protein || 0,
      carbohydrates: itemData.nf_total_carbohydrate || 0,
      fat: itemData.nf_total_fat || 0,
      potassium: itemData.nf_potassium || 0,
      sugars: itemData.nf_sugars || 0,
      dietaryFiber: itemData.nf_dietary_fiber || 0,
    };
  } catch (error) {
    console.error(`Error fetching nutritional data for ${foodName}:`, error);
    return {
      foodName,
      total_fat: itemData.nf_total_fat || 0,
      calories: itemData.nf_calories || 0,
      protein: itemData.nf_protein || 0,
      carbohydrates: itemData.nf_total_carbohydrate || 0,
      fat: itemData.nf_total_fat || 0,
      potassium: itemData.nf_potassium || 0,
      sugars: itemData.nf_sugars || 0,
      dietaryFiber: itemData.nf_dietary_fiber || 0,
    };
  }
};

app.post('/api/initiate-payment',async (req,res)=>{
  const { user, plan } = req.body;

  if (!user) {
    return res.status(400).json({ error: 'User data is required' });
  }

  try{

    var userData = await User.findOne({ email: user.email });
    console.log(userData)

    if (!userData) {
      userData = new User({
        fullName: user.fullName,
        email: user.email,
        user_id: user.userId,
        plan: plan,
        isPaid: false // Assuming payment is not completed yet
      });
      await userData.save();
  }
  else {
    userData.plan = plan;
    userData.isPaid = false; // Reset payment status
    await userData.save();
  }

  console.log('User data saved:', userData);
  res.redirect('/payment');
}

 catch (error) { 
console.error('Error saving user data:', error);
res.status(500).json({ error: 'An error occurred while saving user data' });

} 
console.log('User data received:', userData);
  console.log('Selected plan:', plan);

})

app.get('/payment', (req, res) => {
  console.log('redirected to payment')
  res.redirect('https://razorpay.me/@nutriflowai');
})


database();

// all router
const userRouter = require("./router/user");
const errorHandeler = require("./utilities/errorHendeler");
app.use("/api/v1/user", userRouter);
app.use("/", (req, res) => {
  res.send("hellw world");
});

app.use(errorHandeler);

module.exports = app;
