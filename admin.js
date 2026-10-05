const PASSWORD="Ismail2025@";
let data=JSON.parse(localStorage.getItem("z4yroxData")||"null")||{teams:Array.from({length:36},(_,i)=>({name:`TEAM ${String(i+1).padStart(2,"0")}`,group:i<12?"A":i<24?"B":"C",pts:0,booyah:0}))};
const logged=sessionStorage.getItem("z4yroxAdmin")==="1";
function show(){document.getElementById("login").classList.add("hidden");document.getElementById("dashboard").classList.remove("hidden");render()}
if(logged)show();
document.getElementById("loginBtn").onclick=()=>{if(document.getElementById("password").value===PASSWORD){sessionStorage.setItem("z4yroxAdmin","1");show()}else document.getElementById("loginError").textContent="Incorrect password."};
document.getElementById("logoutBtn").onclick=()=>{sessionStorage.removeItem("z4yroxAdmin");location.reload()};
document.getElementById("saveAll").onclick=()=>{localStorage.setItem("z4yroxData",JSON.stringify(data));alert("Saved on this browser.")};
document.getElementById("addTeam").onclick=()=>{data.teams.push({name:"NEW TEAM",group:"A",pts:0,booyah:0});render()};
function render(){
 document.getElementById("teamCount").textContent=data.teams.length;
 document.getElementById("teamEditor").innerHTML=data.teams.map((t,i)=>`<div class="editor-grid">
 <input value="${esc(t.name)}" data-i="${i}" data-k="name"><select data-i="${i}" data-k="group"><option ${t.group==="A"?"selected":""}>A</option><option ${t.group==="B"?"selected":""}>B</option><option ${t.group==="C"?"selected":""}>C</option></select>
 <input type="number" value="${t.pts}" data-i="${i}" data-k="pts" min="0"><input type="number" value="${t.booyah}" data-i="${i}" data-k="booyah" min="0"></div>`).join("");
 document.querySelectorAll("[data-i]").forEach(e=>e.onchange=()=>{let i=+e.dataset.i,k=e.dataset.k;data.teams[i][k]=(k==="pts"||k==="booyah")?+e.value:e.value});
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
document.getElementById("langBtn").onclick=()=>{const ar=document.documentElement.lang!=="ar";document.documentElement.lang=ar?"ar":"en";document.getElementById("langBtn").textContent=ar?"English":"العربية";document.body.dir=ar?"rtl":"ltr"};
