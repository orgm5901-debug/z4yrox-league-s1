const seedTeams = Array.from({length:36},(_,i)=>({name:`TEAM ${String(i+1).padStart(2,"0")}`,group:i<12?"A":i<24?"B":"C",pts:0,booyah:0}));
const state = JSON.parse(localStorage.getItem("z4yroxData")||"null") || {teams:seedTeams};
function render(){
  ["A","B","C"].forEach(g=>{
    const el=document.getElementById("group"+g);
    el.innerHTML=state.teams.filter(t=>t.group===g).map((t,i)=>`<div class="team-row"><span>${i+1}. ${esc(t.name)}</span><span>${t.pts} pts</span></div>`).join("");
  });
  const top=[...state.teams].sort((a,b)=>b.pts-a.pts||b.booyah-a.booyah).slice(0,12);
  document.getElementById("leaderboardBody").innerHTML=top.map((t,i)=>`<tr><td>${i+1}</td><td>${esc(t.name)}</td><td>${t.pts}</td><td>${t.booyah}</td></tr>`).join("");
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
document.getElementById("langBtn").onclick=()=>{
  const ar=document.documentElement.lang!=="ar"; document.documentElement.lang=ar?"ar":"en";
  document.getElementById("langBtn").textContent=ar?"English":"العربية";
  document.querySelectorAll("[data-en]").forEach(e=>e.textContent=ar?e.dataset.ar:e.dataset.en);
  document.body.dir=ar?"rtl":"ltr";
};
render();