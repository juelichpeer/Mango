const tg = window.Telegram.WebApp;
tg.expand();

const btn = document.getElementById("submit");
const status = document.getElementById("status");

btn.onclick = async () => {

  const businessType = document.getElementById("business").value.trim();
  const resultAmount = Number(document.getElementById("amount").value);
  const regionRaw = document.getElementById("region").value.trim();

  if(!businessType || !resultAmount){
    alert("Fill required fields");
    return;
  }

  btn.disabled = true;
  status.textContent = "";

  try{

    await fetch("/api/inquiry",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        businessType,
        resultAmount,
        region: regionRaw || null,
        initData: tg.initData || ""
      })
    });

    status.textContent = "Sent";

  }catch(e){
    alert("Failed");
    btn.disabled=false;
  }
};