const express = require("express");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

app.post("/api/inquiry", async (req,res)=>{

  const { businessType, resultAmount, region } = req.body;

  const text =
`NEW INQUIRY

Business: ${businessType}
Result: ${resultAmount}
Region: ${region || "Not provided"}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try{

    await fetch(url,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text
      })
    });

    res.json({ok:true});

  }catch(err){
    console.error(err);
    res.status(500).json({error:true});
  }
});

app.listen(3000,()=>{
  console.log("Server running on 3000");
});