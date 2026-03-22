let ecoPoints = 0;
let transactionHistory = [];

// Login Function
function loginUser(){
  const mobile = document.getElementById('mobileNumber').value;
  const region = document.getElementById('regionCode').value;
  if(!mobile || !region){ alert("সব তথ্য পূরণ করুন!"); return; }
  document.getElementById('userName').innerText = mobile;
  document.getElementById('showRegion').innerText = region;
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('appScreen').classList.remove('hidden');
}

// Navigation
function showSection(sectionId, btn=null){
  const sections = document.querySelectorAll('.content-card');
  sections.forEach(s => s.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
  if(btn){
    document.querySelectorAll('.bottom-nav .nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  }
}

// Redeem Points
document.getElementById('redeemPoints').addEventListener('input',calculateRedeemValue);
function calculateRedeemValue(){
  const points = parseFloat(document.getElementById('redeemPoints').value)||0;
  document.getElementById('redeemValue').innerText = (points*0.025).toFixed(2);
}

function redeemEcoPoints(){
  const points = parseFloat(document.getElementById('redeemPoints').value)||0;
  const agentNumber = document.getElementById('redeemAgentNumber').value;
  if(points>ecoPoints){ alert("Eco Points যথেষ্ট নেই!"); return; }
  if(points<=0){ alert("Send points দিতে হবে!"); return; }
  if(!agentNumber){ alert("Authorized Agent Number দিতে হবে!"); return; }

  ecoPoints -= points;
  document.getElementById('ecoPoints').innerText = ecoPoints.toFixed(1);
  transactionHistory.push({points, agentNumber, action:'redeem'});
  updateHistory();
  alert(`${points.toFixed(1)} Eco Points sent to ${agentNumber}!`);
  document.getElementById('redeemPoints').value='';
}

// Update Transaction History
function updateHistory(){
  const historyDiv = document.getElementById('historyList');
  historyDiv.innerHTML='';
  transactionHistory.slice().reverse().forEach(trx=>{
    const div = document.createElement('div');
    div.className='history-item';
    if(trx.action==='redeem') div.classList.add('redeem-item');
    div.innerHTML = `<div><h4>${trx.action==='redeem'?'Send Points':'Deposit Plastic'}</h4>
    <p>Agent/Number: ${trx.agentNumber||'N/A'}</p></div>
    <strong>${trx.action==='redeem'?'-'+trx.points: '+'+trx.points} EP</strong>`;
    historyDiv.appendChild(div);
  });
}
