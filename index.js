const http = require("http");

const port = Number(process.env.PORT) || 3000;

const page = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Deiscord — chamadas sem limites</title>
  <style>
    :root{--bg:#111214;--panel:#1e1f22;--panel2:#2b2d31;--panel3:#313338;--line:#3f4147;--text:#f2f3f5;--muted:#b5bac1;--brand:#5865f2;--green:#23a559;--yellow:#f0b232;--red:#f23f42}
    *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:14px system-ui,-apple-system,Segoe UI,sans-serif;overflow:hidden}
    button,input{font:inherit}button{border:0;color:inherit;cursor:pointer}
    .app{display:grid;grid-template-columns:72px 240px minmax(360px,1fr) 220px;height:100vh}
    .servers{background:#111214;padding:12px 10px;display:flex;flex-direction:column;align-items:center;gap:10px;overflow:auto}
    .server{width:50px;height:50px;border-radius:16px;background:var(--panel2);display:grid;place-items:center;font-weight:700;font-size:18px;transition:.15s;position:relative}
    .server:hover,.server.active{border-radius:14px;background:var(--brand)}.server.active:before{content:"";position:absolute;left:-10px;width:4px;height:32px;border-radius:4px;background:white}
    .server.add{color:var(--green);font-size:25px}.server.add:hover{background:var(--green);color:white}
    .rail-divider{height:1px;width:32px;background:var(--line)}
    .sidebar{background:var(--panel);display:flex;flex-direction:column;min-width:0}
    .server-head{height:52px;padding:0 16px;display:flex;align-items:center;justify-content:space-between;font-weight:700;border-bottom:1px solid #17181a;box-shadow:0 1px 2px #0004}
    .server-head button{background:transparent;font-size:20px;color:var(--muted)}.server-head button:hover{color:white}
    .channels{padding:14px 9px;overflow:auto;flex:1}.category{margin:10px 0 4px;color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;display:flex;justify-content:space-between;padding:0 7px}.category button{background:none;color:var(--muted);font-size:18px}
    .channel{height:34px;border-radius:4px;color:var(--muted);display:flex;gap:9px;align-items:center;padding:0 9px;margin:1px 0;font-size:15px;text-align:left;width:100%;background:transparent}.channel:hover{background:#35373c;color:var(--text)}.channel.active{background:#404249;color:white}.channel .type{font-size:20px;color:#949ba4}.channel small{margin-left:auto;color:#8b8f98}
    .account{height:54px;background:#232428;padding:7px 8px;display:flex;align-items:center;gap:8px}.avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#5865f2,#e35dab);display:grid;place-items:center;font-weight:700;flex:none;position:relative}.avatar:after{content:"";position:absolute;right:-1px;bottom:0;width:9px;height:9px;background:var(--green);border:2px solid #232428;border-radius:50%}.account .name{font-size:12px;font-weight:700}.account .tag{font-size:11px;color:var(--muted)}.account-actions{margin-left:auto;display:flex;gap:4px}.icon-btn{background:transparent;color:var(--muted);padding:5px;border-radius:4px}.icon-btn:hover{background:#3a3c43;color:white}
    .main{background:var(--panel3);display:flex;flex-direction:column;min-width:0}.topbar{height:52px;border-bottom:1px solid #202124;display:flex;align-items:center;padding:0 16px;gap:10px;box-shadow:0 1px 2px #0003}.hash{font-size:25px;color:var(--muted)}.topbar h2{font-size:16px;margin:0}.topic{color:var(--muted);border-left:1px solid var(--line);padding-left:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.top-actions{margin-left:auto;display:flex;gap:8px}.top-actions button{background:none;color:var(--muted);font-size:20px}.top-actions button:hover{color:white}
    .messages{flex:1;overflow:auto;padding:20px 18px}.welcome{border-bottom:1px solid var(--line);padding:20px 0 24px;margin-bottom:14px}.welcome h1{font-size:28px;margin:0 0 5px}.welcome p{color:var(--muted);margin:0}.message{display:flex;gap:12px;padding:7px 0;margin-top:3px}.message:hover{background:#2e3035;margin-left:-10px;margin-right:-10px;padding-left:10px}.message .avatar{width:40px;height:40px;font-size:15px}.message .avatar:after{display:none}.message-body{min-width:0}.message-meta{display:flex;align-items:baseline;gap:8px}.message-meta strong{font-size:15px}.message-meta time{font-size:11px;color:var(--muted)}.message p{margin:2px 0;color:#dbdee1;white-space:pre-wrap;word-break:break-word}.reactions{display:flex;gap:5px}.reaction{background:#2b2d31;border:1px solid #454850;border-radius:8px;padding:3px 7px;color:var(--muted)}
    .composer{padding:0 16px 22px}.composer-box{background:#383a40;border-radius:8px;display:flex;align-items:center;padding:0 12px}.composer input{background:none;border:0;outline:0;color:white;flex:1;padding:13px 9px}.composer button{background:none;color:var(--muted);font-size:20px}.composer button:hover{color:white}
    .members{background:var(--panel);padding:20px 12px;overflow:auto}.members h3{font-size:12px;text-transform:uppercase;color:var(--muted);margin:0 8px 10px}.member{display:flex;gap:10px;align-items:center;padding:7px 8px;border-radius:4px;color:var(--muted)}.member:hover{background:#35373c;color:white}.member .avatar{width:32px;height:32px}.member .avatar:after{display:none}.member-name{font-weight:600;color:inherit}.member-role{font-size:11px;color:var(--muted)}
    .call{position:fixed;right:236px;bottom:70px;width:min(680px,calc(100vw - 380px));min-height:210px;background:#0b0c0e;border:1px solid #444;border-radius:12px;box-shadow:0 15px 50px #0009;display:none;z-index:5;overflow:hidden}.call.open{display:block}.call-head{height:42px;padding:0 12px;display:flex;align-items:center;justify-content:space-between;background:#18191c}.call-head span{font-weight:700}.call-stage{min-height:145px;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;padding:10px}.tile{background:#202225;border-radius:8px;display:grid;place-items:center;min-height:120px;position:relative;overflow:hidden}.tile video{width:100%;height:100%;object-fit:cover}.tile label{position:absolute;bottom:6px;left:8px;background:#0009;padding:3px 6px;border-radius:4px;font-size:12px}.call-controls{height:52px;display:flex;justify-content:center;align-items:center;gap:8px}.call-controls button{background:#35373c;border-radius:50%;width:34px;height:34px}.call-controls button.danger{background:var(--red)}
    .modal-backdrop{position:fixed;inset:0;background:#0009;display:none;place-items:center;z-index:10}.modal-backdrop.open{display:grid}.modal{width:min(520px,calc(100vw - 30px));background:var(--panel);border-radius:8px;box-shadow:0 20px 60px #000b;overflow:hidden}.modal-cover{height:100px;background:linear-gradient(120deg,#5865f2,#eb459e)}.modal-content{padding:18px}.modal-content .avatar{width:76px;height:76px;font-size:26px;margin-top:-55px;border:6px solid var(--panel)}.modal h2{margin:6px 0 2px}.modal p{color:var(--muted)}.field{display:flex;flex-direction:column;gap:6px;margin:14px 0}.field label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase}.field input,.field textarea{background:#111214;border:1px solid #111;color:white;border-radius:4px;padding:10px;outline:0;resize:vertical}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}.primary{background:var(--brand);padding:9px 16px;border-radius:4px;font-weight:600}.secondary{background:#4e5058;padding:9px 16px;border-radius:4px}
    .toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%) translateY(20px);background:#111214;border:1px solid var(--line);padding:11px 17px;border-radius:6px;opacity:0;transition:.2s;z-index:20}.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
    @media(max-width:900px){.app{grid-template-columns:62px 205px minmax(300px,1fr)}.members{display:none}.call{right:15px;width:calc(100vw - 95px)}}@media(max-width:620px){.app{grid-template-columns:58px 1fr}.sidebar{display:none}.call{left:8px;right:8px;width:auto}.topbar .topic{display:none}}
  </style>
</head>
<body>
<div class="app">
  <aside class="servers" id="servers"></aside>
  <aside class="sidebar">
    <div class="server-head"><span id="serverName">Meu servidor</span><button id="serverMenu" title="Configurações">⌄</button></div>
    <div class="channels" id="channels"></div>
    <div class="account"><div class="avatar" id="accountAvatar">K</div><div><div class="name" id="accountName">kyraxzzx</div><div class="tag">online</div></div><div class="account-actions"><button class="icon-btn" id="muteBtn" title="Mudo">🎙</button><button class="icon-btn" id="profileBtn" title="Perfil">⚙</button></div></div>
  </aside>
  <main class="main">
    <header class="topbar"><span class="hash">#</span><h2 id="channelName">geral</h2><span class="topic" id="channelTopic">Converse com a sua comunidade</span><div class="top-actions"><button title="Iniciar chamada" id="callBtn">☎</button><button title="Notificações">🔔</button><button title="Fixadas">📌</button><button title="Membros" id="membersBtn">👥</button><button title="Pesquisar" id="searchBtn">⌕</button></div></header>
    <section class="messages" id="messages"></section>
    <form class="composer" id="composer"><div class="composer-box"><button type="button" id="attachBtn" title="Anexar arquivo">＋</button><input id="messageInput" autocomplete="off" placeholder="Enviar mensagem em #geral"><button type="button" title="GIF">GIF</button><button type="button" title="Emoji">☺</button></div></form>
  </main>
  <aside class="members" id="members"></aside>
</div>
<section class="call" id="call">
  <div class="call-head"><span>🔊 Sala de jogos</span><button class="icon-btn" id="closeCall">✕</button></div>
  <div class="call-stage" id="callStage"><div class="tile"><div class="avatar">K</div><label>kyraxzzx · Você</label></div></div>
  <div class="call-controls"><button id="micBtn" title="Microfone">🎙</button><button id="cameraBtn" title="Câmera">📹</button><button id="shareBtn" title="Compartilhar tela">🖥</button><button class="danger" id="hangBtn" title="Sair da chamada">☎</button></div>
</section>
<div class="modal-backdrop" id="modalBackdrop"><div class="modal" id="modal"></div></div>
<div class="toast" id="toast"></div>
<script>
(() => {
  const initial = {
    servers:[{id:"home",name:"Meu servidor",icon:"D",channels:[
      {id:"welcome",name:"boas-vindas",type:"text",topic:"Apresente-se para a comunidade"},
      {id:"general",name:"geral",type:"text",topic:"Converse com a sua comunidade"},
      {id:"games",name:"jogos",type:"text",topic:"Compartilhe o que você está jogando"},
      {id:"voice",name:"Sala de jogos",type:"voice",topic:"Voz, vídeo e compartilhamento de tela"}
    ]},{id:"friends",name:"Amigos",icon:"♡",channels:[{id:"friends",name:"lista-de-amigos",type:"text",topic:"Seus amigos estão aqui"}]}],
    messages:{general:[{user:"Luna",avatar:"L",time:"Hoje às 14:20",text:"Bem-vindo ao Deiscord! 🚀\\nAqui você pode conversar e entrar em call sem limites."},{user:"Rafa",avatar:"R",time:"Hoje às 14:22",text:"Finalmente um lugar para compartilhar a tela sem complicação 😄",reactions:["🔥 3","❤️ 2"]}],welcome:[{user:"Luna",avatar:"L",time:"Hoje às 14:19",text:"Fala, pessoal! Apresentem-se por aqui."}],games:[{user:"Rafa",avatar:"R",time:"Hoje às 14:23",text:"Alguém para jogar hoje à noite?"}],friends:[]}
  };
  const state = JSON.parse(localStorage.getItem("deiscord-state") || "null") || initial;
  let currentServer = state.servers[0], currentChannel = currentServer.channels[1], stream = null, micOn = true, cameraOn = false;
  const $ = id => document.getElementById(id);
  const save = () => localStorage.setItem("deiscord-state", JSON.stringify(state));
  const toast = text => { $("toast").textContent=text; $("toast").classList.add("show"); setTimeout(()=>$("toast").classList.remove("show"),2200); };
  function renderServers(){ $("servers").innerHTML=state.servers.map((s,i)=>'<button class="server '+(s.id===currentServer.id?"active":"")+'" data-server="'+s.id+'" title="'+s.name+'">'+s.icon+'</button>').join("")+'<div class="rail-divider"></div><button class="server add" id="addServer" title="Adicionar servidor">＋</button>'; document.querySelectorAll("[data-server]").forEach(b=>b.onclick=()=>{currentServer=state.servers.find(s=>s.id===b.dataset.server);currentChannel=currentServer.channels[0];renderAll()}); $("addServer").onclick=addServer; }
  function renderChannels(){ $("serverName").textContent=currentServer.name; $("channels").innerHTML='<div class="category">Informações <button data-add-channel>＋</button></div>'+currentServer.channels.filter(c=>c.type==="text").map(c=>channel(c)).join("")+'<div class="category">Voz <button data-add-channel>＋</button></div>'+currentServer.channels.filter(c=>c.type==="voice").map(c=>channel(c)).join(""); document.querySelectorAll("[data-channel]").forEach(b=>b.onclick=()=>{currentChannel=currentServer.channels.find(c=>c.id===b.dataset.channel);renderAll()}); document.querySelectorAll("[data-add-channel]").forEach(b=>b.onclick=addChannel); }
  function channel(c){return '<button class="channel '+(c.id===currentChannel.id?"active":"")+'" data-channel="'+c.id+'"><span class="type">'+(c.type==="voice"?"🔊":"#")+'</span>'+c.name+(c.type==="voice"?"<small>0</small>":"")+'</button>'}
  function renderMessages(){const list=state.messages[currentChannel.id]||[]; $("channelName").textContent=currentChannel.name; $("channelTopic").textContent=currentChannel.topic||""; $("messageInput").placeholder="Enviar mensagem em #"+currentChannel.name; $("messages").innerHTML='<div class="welcome"><h1># '+currentChannel.name+'</h1><p>'+currentChannel.topic+'</p></div>'+list.map(m=>'<article class="message"><div class="avatar">'+m.avatar+'</div><div class="message-body"><div class="message-meta"><strong>'+esc(m.user)+'</strong><time>'+m.time+'</time></div><p>'+esc(m.text)+'</p>'+(m.reactions?'<div class="reactions">'+m.reactions.map(r=>'<button class="reaction">'+r+'</button>').join("")+'</div>':"")+'</div></article>').join(""); $("messages").scrollTop=$("messages").scrollHeight}
  function renderMembers(){ $("members").innerHTML='<h3>Online — 3</h3>'+[["Luna","L","Admin"],["Rafa","R","Moderador"],["kyraxzzx","K","Você"]].map(m=>'<div class="member"><div class="avatar">'+m[1]+'</div><div><div class="member-name">'+m[0]+'</div><div class="member-role">'+m[2]+'</div></div></div>').join("")+'<h3 style="margin-top:25px">Offline — 1</h3><div class="member" style="opacity:.45"><div class="avatar">M</div><div><div class="member-name">Mika</div><div class="member-role">Membro</div></div></div>'}
  function renderAll(){renderServers();renderChannels();renderMessages();renderMembers()}
  function esc(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  $("composer").onsubmit=e=>{e.preventDefault();const input=$("messageInput"),text=input.value.trim();if(!text)return;(state.messages[currentChannel.id] ||= []).push({user:"kyraxzzx",avatar:"K",time:"Agora",text});input.value="";save();renderMessages()};
  $("callBtn").onclick=()=>{ $("call").classList.add("open"); toast("Você entrou na Sala de jogos"); };
  $("closeCall").onclick=$("hangBtn").onclick=()=>{stopStream();$("call").classList.remove("open")};
  $("micBtn").onclick=()=>{micOn=!micOn;$("micBtn").textContent=micOn?"🎙":"🔇";toast(micOn?"Microfone ativado":"Microfone silenciado")};
  $("cameraBtn").onclick=async()=>{cameraOn=!cameraOn;if(cameraOn){try{const s=await navigator.mediaDevices.getUserMedia({video:true,audio:false});const v=document.createElement("video");v.autoplay=true;v.srcObject=s;v.dataset.local="camera";const t=document.createElement("div");t.className="tile";t.id="cameraTile";t.append(v);t.insertAdjacentHTML("beforeend","<label>kyraxzzx · Câmera</label>");$("callStage").append(t);toast("Câmera ativada")}catch(e){cameraOn=false;toast("Permissão de câmera recusada")}}else{$("cameraTile")?.remove();toast("Câmera desligada")}};
  $("shareBtn").onclick=async()=>{if(!navigator.mediaDevices?.getDisplayMedia){toast("Seu navegador não suporta compartilhamento");return}try{stream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:true});const v=document.createElement("video");v.autoplay=true;v.srcObject=stream;const t=document.createElement("div");t.className="tile";t.id="shareTile";t.style.gridColumn="span 2";t.append(v);t.insertAdjacentHTML("beforeend","<label>kyraxzzx · Sua tela</label>");$("callStage").append(t);stream.getVideoTracks()[0].onended=stopStream;toast("Compartilhamento de tela iniciado")}catch(e){toast("Compartilhamento cancelado")}};
  function stopStream(){if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}$("shareTile")?.remove();$("cameraTile")?.remove();cameraOn=false}
  $("profileBtn").onclick=()=>{ $("modal").innerHTML='<div class="modal-cover"></div><div class="modal-content"><div class="avatar">K</div><h2>kyraxzzx</h2><p>online · jogando com os amigos</p><div class="field"><label>Nome de usuário</label><input id="profileName" value="kyraxzzx"></div><div class="field"><label>Sobre mim</label><textarea id="profileBio" rows="3">Construindo o Deiscord 2 🚀</textarea></div><div class="modal-actions"><button class="secondary" id="cancelModal">Cancelar</button><button class="primary" id="saveProfile">Salvar alterações</button></div></div>';openModal();$("cancelModal").onclick=closeModal;$("saveProfile").onclick=()=>{ $("accountName").textContent=$("profileName").value||"kyraxzzx";closeModal();toast("Perfil atualizado")}};
  $("membersBtn").onclick=()=>{ $("members").style.display=$("members").style.display==="none"?"":"block" };
  $("searchBtn").onclick=()=>{const q=prompt("Pesquisar mensagens");if(q){const hits=Object.values(state.messages).flat().filter(m=>m.text.toLowerCase().includes(q.toLowerCase())).length;toast(hits+" resultado(s) encontrado(s)")}};
  $("attachBtn").onclick=()=>toast("Upload de arquivos será conectado ao armazenamento do servidor");
  $("serverMenu").onclick=()=>toast("Configurações do servidor: cargos, canais, permissões e moderação");
  $("muteBtn").onclick=()=>toast("Preferências de voz abertas");
  function openModal(){$("modalBackdrop").classList.add("open")} function closeModal(){$("modalBackdrop").classList.remove("open")} $("modalBackdrop").onclick=e=>{if(e.target===$("modalBackdrop"))closeModal()};
  function addServer(){const name=prompt("Nome do novo servidor");if(!name)return;const id="s"+Date.now();state.servers.push({id,name,icon:name[0].toUpperCase(),channels:[{id:id+"-general",name:"geral",type:"text",topic:"Converse com a sua comunidade"},{id:id+"-voice",name:"Sala de voz",type:"voice",topic:"Entre para conversar"}]});state.messages[id+"-general"]=[];currentServer=state.servers[state.servers.length-1];currentChannel=currentServer.channels[0];save();renderAll();toast("Servidor criado")};
  function addChannel(){const name=prompt("Nome do canal");if(!name)return;const id="c"+Date.now();currentServer.channels.push({id,name,type:"text",topic:"Novo canal"});state.messages[id]=[];currentChannel=currentServer.channels.at(-1);save();renderAll();toast("Canal criado")};
  renderAll();
})();
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(page);
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(port, () => {
  console.log("Deiscord running at http://localhost:" + port);
});
