import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.119.0';

const cfg = window.V2_CONFIG;
const supabase = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const apiUrl = cfg.API_URL;
const fallbackGreeting = "Welcome! I'm here to help with your experience enquiry. What would you like to know?";
const languages = ['en','es','fr','de','it','pt','nl'];
const labels = {
  en:{explore:'Explore experience',enquire:'Enquire about this event',ask:'Ask about this fan meeting',noEvents:'No new dates have been published at this time.',noFans:'No confirmed fan-meeting opportunities are currently published.',communityOk:'Your community request has been received.',send:'Send',placeholder:'Write your message…',management:'Speak to management'},
  es:{explore:'Explorar experiencia',enquire:'Consultar sobre este evento',ask:'Consultar sobre esta reunión de fans',noEvents:'No se han publicado nuevas fechas por el momento.',noFans:'No hay reuniones de fans confirmadas publicadas actualmente.',communityOk:'Hemos recibido tu solicitud para la comunidad.',send:'Enviar',placeholder:'Escribe tu mensaje…',management:'Contactar con administración'},
  fr:{explore:'Découvrir cette expérience',enquire:'Se renseigner sur cet événement',ask:'Se renseigner sur cette rencontre',noEvents:'Aucune nouvelle date n’a été publiée pour le moment.',noFans:'Aucune rencontre confirmée n’est actuellement publiée.',communityOk:'Votre demande pour la communauté a été reçue.',send:'Envoyer',placeholder:'Écrivez votre message…',management:'Contacter la direction'},
  de:{explore:'Erlebnis entdecken',enquire:'Zu dieser Veranstaltung anfragen',ask:'Dieses Fan-Treffen anfragen',noEvents:'Derzeit wurden keine neuen Termine veröffentlicht.',noFans:'Derzeit sind keine bestätigten Fan-Treffen veröffentlicht.',communityOk:'Deine Anfrage für die Community ist eingegangen.',send:'Senden',placeholder:'Nachricht schreiben…',management:'Management kontaktieren'},
  it:{explore:'Scopri l’esperienza',enquire:'Chiedi informazioni su questo evento',ask:'Chiedi informazioni su questo incontro',noEvents:'Al momento non sono state pubblicate nuove date.',noFans:'Al momento non sono pubblicati incontri confermati con i fan.',communityOk:'La richiesta per la community è stata ricevuta.',send:'Invia',placeholder:'Scrivi un messaggio…',management:'Contatta la gestione'},
  pt:{explore:'Explorar experiência',enquire:'Consultar este evento',ask:'Consultar este encontro de fãs',noEvents:'Nenhuma nova data foi publicada neste momento.',noFans:'Nenhum encontro confirmado com fãs está publicado neste momento.',communityOk:'O seu pedido para a comunidade foi recebido.',send:'Enviar',placeholder:'Escreva a sua mensagem…',management:'Falar com a gestão'},
  nl:{explore:'Ervaring bekijken',enquire:'Informeren over dit evenement',ask:'Informeren over deze fanontmoeting',noEvents:'Er zijn momenteel geen nieuwe data gepubliceerd.',noFans:'Er zijn momenteel geen bevestigde fanontmoetingen gepubliceerd.',communityOk:'Je aanvraag voor de community is ontvangen.',send:'Verzenden',placeholder:'Schrijf je bericht…',management:'Management spreken'}
};
const starterMedia = [
  {kind:'photo',title:'Meet & Greet feature',media_url:'https://sportal365images.com/process/smp-images-production/record.mx/16042026/c6b88c7d-8b94-4d99-af14-1afd79a7dfdc.jpg?format=webp&operations=autocrop%28960%3A540%29',source_url:'https://www.record.com.mx/historia/karely-ruiz-anuncia-meet-y-greet-en-mexico-fechas-y-ciudades-2026041621422146800',alt_text:'Published event feature'},
  {kind:'photo',title:'Public portrait',media_url:'https://sportal365images.com/process/smp-images-production/record.mx/16042026/fc9e7090-8bd2-49df-b8e2-4ba8d797bfec.jpg?format=webp&operations=fit%28960%3A540%29',source_url:'https://www.record.com.mx/historia/karely-ruiz-anuncia-meet-y-greet-en-mexico-fechas-y-ciudades-2026041621422146800',alt_text:'Published portrait'},
  {kind:'photo',title:'Editorial moment',media_url:'https://sportal365images.com/process/smp-images-production/record.mx/16042026/170fa5be-124e-4fc1-b429-f2b48c6120d5.jpg?format=webp&operations=fit%28960%3A540%29',source_url:'https://www.record.com.mx/historia/karely-ruiz-anuncia-meet-y-greet-en-mexico-fechas-y-ciudades-2026041621422146800',alt_text:'Published editorial image'},
  {kind:'photo',title:'Event appearance',media_url:'https://sportal365images.com/process/smp-images-production/record.mx/16042026/4ac75f37-ee7b-40b5-91f1-c4ce38bf65fb.jpg?format=webp&operations=fit%28960%3A540%29',source_url:'https://www.record.com.mx/historia/karely-ruiz-anuncia-meet-y-greet-en-mexico-fechas-y-ciudades-2026041621422146800',alt_text:'Published event image'},
  {kind:'photo',title:'Public dining feature',media_url:'https://tvazteca-veracruz-prod.web.arc-cdn.net/resizer/v2/X4B6PZ7LZFDVNLSIHJ6UBJYAFI.jpg?auth=b5b696ee663f603e669bdb6b9af3b4f34136edba35cbb8a34403b22c80e49867&height=675&smart=true&width=1200',source_url:'https://www.aztecaveracruz.com/espectaculos/karely-ruiz-sorprende-a-sus-seguidores-en-restaurante-veracruz/',alt_text:'Public restaurant feature'},
  {kind:'photo',title:'Mérida appearance feature',media_url:'https://tvazteca-yucatan-prod.web.arc-cdn.net/resizer/v2/YWFFNZMGKRD7BM7GMXT4HP53SE.jpg?auth=428bc4163a305188b4297205f514d94765eb1ae29c93859c9043ac9c05ad1d2c&height=1066&width=800',source_url:'https://www.aztecayucatan.com/espectaculos/karely-ruiz-en-merida-poso-como-nunca-antes-en-casona-el-minaret/',alt_text:'Publicly reported appearance feature'}
];
const imageBySlug = {
  'vip-meet-and-greet':starterMedia[0].media_url,
  'private-dinner':starterMedia[4].media_url,
  'vip-hangout':starterMedia[1].media_url,
  'vip-vacation':starterMedia[5].media_url,
  'private-appearance':starterMedia[3].media_url,
  'tour-enquiry':starterMedia[2].media_url,
  'meet-the-fans-tour-stop':starterMedia[1].media_url
};
const descriptions = {
  'vip-meet-and-greet':'A personal appearance enquiry for a special occasion.',
  'private-dinner':'Enquire about an intimate, hosted dining experience.',
  'vip-hangout':'Explore a relaxed VIP gathering request.',
  'vip-vacation':'Share a destination and dates for management review.',
  'private-appearance':'Send an event or appearance request for review.',
  'tour-enquiry':'Ask about a published tour date or event.',
  'meet-the-fans-tour-stop':'Enquire about a separately announced fan meeting.'
};
let language = languages.includes((navigator.language || 'en').slice(0,2).toLowerCase()) ? (navigator.language || 'en').slice(0,2).toLowerCase() : 'en';
let publicData = null;
let currentChat = null;
let currentFlow = [];
let pollTimer = null;
let sending = false;

async function post(action, payload = {}, extraHeaders = {}) {
  const response = await fetch(apiUrl, {
    method:'POST', headers:{'Content-Type':'application/json','apikey':cfg.SUPABASE_PUBLISHABLE_KEY,...extraHeaders},
    body:JSON.stringify({action,...payload})
  });
  const data = await response.json().catch(()=>({}));
  if (!response.ok) throw new Error(data.error || 'The request could not be completed.');
  return data;
}
async function getConversation(id, token) {
  const url = `${apiUrl}?action=conversation&id=${encodeURIComponent(id)}`;
  const response = await fetch(url,{headers:{'apikey':cfg.SUPABASE_PUBLISHABLE_KEY,'x-visitor-token':token}});
  const data = await response.json().catch(()=>({}));
  if (!response.ok) throw new Error(data.error || 'Unable to refresh this conversation.');
  return data;
}
function t(key){return labels[language]?.[key] ?? labels.en[key] ?? key}
function safeHttpUrl(value){try{const u=new URL(String(value||''),location.href);return ['http:','https:'].includes(u.protocol)?u.href:null}catch{return null}}
function formatDate(value){if(!value)return 'Date to be announced';const d=new Date(value);if(Number.isNaN(d.getTime()))return escapeHtml(value);return new Intl.DateTimeFormat(language,{dateStyle:'medium',timeStyle:'short'}).format(d)}
function setMessage(el,text,type=''){el.textContent=text;el.className=`form-message ${type}`.trim()}
function setLanguage(next){language=languages.includes(next)?next:'en';document.documentElement.lang=language;$('#siteLanguage').value=language;loadPublicData().catch(()=>{});if(currentChat){currentChat.language=language}}
function renderExperienceCards(){
  const items=publicData?.experiences ?? [];
  $('#experienceGrid').innerHTML=items.map((e,i)=>{
    const image=imageBySlug[e.slug]; const img=image?`<img src="${image}" alt="${escapeHtml(e.title)}" loading="lazy">`:'';
    const desc=e.short_description || descriptions[e.slug] || 'Start a guided enquiry for management review.';
    return `<article class="experience-card"><button class="exp-image" data-open-experience="${escapeHtml(e.slug)}" aria-label="Open ${escapeHtml(e.title)} enquiry">${img}<span class="image-arrow">↗</span></button><div class="exp-meta"><span>${String(i+1).padStart(2,'0')} / ENQUIRY</span><span>EXPERIENCE</span></div><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml(desc)}</p><button class="inline-action" data-open-experience="${escapeHtml(e.slug)}">${escapeHtml(t('explore'))} ↗</button></article>`;
  }).join('') || '<div class="empty-state">Experience enquiries are being updated.</div>';
}
function renderEvents(){
  const events=publicData?.events ?? [];
  if(!events.length){$('#eventsGrid').innerHTML=`<div class="empty-state">${escapeHtml(t('noEvents'))}</div>`;return}
  $('#eventsGrid').innerHTML=events.map(e=>`<article class="listing-card"><div class="listing-meta"><span>${escapeHtml(e.event_type?.replaceAll('_',' ') || 'Event')}</span><span>${escapeHtml(e.status)}</span></div><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml([e.city,e.country,e.venue].filter(Boolean).join(' · '))}${e.starts_at?`<br>${escapeHtml(formatDate(e.starts_at))}`:''}<br>${escapeHtml(e.description || '')}</p>${safeHttpUrl(e.source_url)?`<a class="text-link" href="${escapeHtml(safeHttpUrl(e.source_url))}" target="_blank" rel="noopener noreferrer">Event source ↗</a>`:''}<button class="listing-action" data-event-id="${escapeHtml(e.id)}" ${e.ticket_enquiry_enabled?'':'disabled'}>${escapeHtml(e.ticket_enquiry_label || t('enquire'))} ↗</button></article>`).join('');
}
function renderFanStops(){
  const items=publicData?.fanStops ?? [];
  if(!items.length){$('#fanStopsGrid').innerHTML=`<div class="empty-state">${escapeHtml(t('noFans'))}</div>`;return}
  $('#fanStopsGrid').innerHTML=items.map(s=>`<article class="fan-stop-card"><div><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml([s.city,s.country,s.venue].filter(Boolean).join(' · '))} ${s.starts_at?`· ${escapeHtml(formatDate(s.starts_at))}`:''}<br>${escapeHtml(s.meeting_details || '')}</p>${safeHttpUrl(s.source_url)?`<a class="text-link" href="${escapeHtml(safeHttpUrl(s.source_url))}" target="_blank" rel="noopener noreferrer">Published details ↗</a>`:''}</div><button data-fan-stop-id="${escapeHtml(s.id)}" ${s.enquiry_enabled?'':'disabled'}>${escapeHtml(s.enquiry_button_label || t('ask'))} ↗</button></article>`).join('');
}
function safeVideoEmbed(url){
  try{const u=new URL(url);if(['www.youtube.com','youtube.com'].includes(u.hostname)){const id=u.searchParams.get('v');if(id)return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;if(u.pathname.startsWith('/embed/'))return `https://www.youtube-nocookie.com${u.pathname}`;}if(u.hostname==='youtu.be'){return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(u.pathname.slice(1))}`;}if(u.hostname==='player.vimeo.com'&&u.pathname.startsWith('/video/'))return url;}catch{}return null;
}
function renderGallery(filter='all'){
  const managed=publicData?.media ?? [];
  const combined=[...managed,...starterMedia];
  const seen=new Set(); const unique=combined.filter(item=>{const k=item.media_url;if(!k||seen.has(k))return false;seen.add(k);return true;}).filter(item=>filter==='all'||item.kind===filter);
  $('#galleryGrid').innerHTML=unique.map((item,i)=>{
    const href=safeHttpUrl(item.source_url)||safeHttpUrl(item.media_url); const mediaUrl=safeHttpUrl(item.media_url); const thumb=safeHttpUrl(item.thumbnail_url)||mediaUrl; const embed=item.kind==='video'?safeVideoEmbed(mediaUrl):null;
    if(!href||!mediaUrl)return '';
    let visual=item.kind==='photo'?`<img src="${escapeHtml(thumb)}" alt="${escapeHtml(item.alt_text || item.title)}" loading="lazy">`:(embed?`<iframe src="${embed}" title="${escapeHtml(item.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`:`<div class="gallery-video-tile"><div><span class="play">▶</span><small>${escapeHtml(item.title || 'PUBLIC VIDEO')}</small></div></div>`);
    return `<a class="gallery-item ${i===0?'large':''}" data-kind="${escapeHtml(item.kind)}" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${visual}<span class="gallery-play">↗</span></a>`;
  }).join('') || '<div class="empty-state">No media is currently published in this category.</div>';
}
function renderGlobalMessages(){
  const messages=(publicData?.globalMessages ?? []).filter(m=>['sitewide','homepage'].includes(m.placement)&&m.audience==='all_visitors');
  const el=$('#announcement');if(!messages.length){el.hidden=true;el.textContent=''}else{const m=messages[0];el.textContent=m.title?`${m.title} — ${m.body}`:m.body;el.hidden=false}
  const tour=(publicData?.globalMessages??[]).filter(m=>m.placement==='tour_page'&&['all_visitors','tour_visitors'].includes(m.audience));
  const tourEl=$('#tourAnnouncement'); if(tourEl){tourEl.hidden=!tour.length;tourEl.textContent=tour.map(m=>m.title?`${m.title} — ${m.body}`:m.body).join(' · ')}
  const community=(publicData?.globalMessages??[]).filter(m=>m.placement==='community'&&['all_visitors','community_visitors'].includes(m.audience));
  const communityEl=$('#communityAnnouncement'); if(communityEl){communityEl.hidden=!community.length;communityEl.textContent=community.map(m=>m.title?`${m.title} — ${m.body}`:m.body).join(' · ')}
}
async function loadPublicData(){
  publicData=await post('public_config',{language});
  const room=publicData.chatRoom||{};
  $('#chatAssistantName').textContent=room.assistant_display_name||'GUEST EXPERIENCE ASSISTANT';
  $('#chatAvatar').textContent=(room.assistant_display_name||'KR').trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
  const chatRoom=$('.experience-chat-room');
  chatRoom.style.setProperty('--chat-bg',room.chat_background_color||'#151513');
  chatRoom.style.setProperty('--chat-accent',room.accent_color||'#C6A56B');
  chatRoom.style.setProperty('--chat-visitor',room.visitor_bubble_color||'#C6A56B');
  chatRoom.style.setProperty('--chat-assistant',room.assistant_bubble_color||'#24231F');
  const bg=safeHttpUrl(room.chat_background_image_url)||'';
  chatRoom.style.backgroundImage=bg?`linear-gradient(rgba(16,16,15,.84),rgba(16,16,15,.92)),url("${bg}")`:'';
  chatRoom.dataset.bubbleStyle=room.bubble_style||'rounded';
  chatRoom.dataset.theme=room.theme_mode||'dark';
  $('#chatAvatar').hidden=room.show_assistant_avatar===false;
  $('#expChatInput').placeholder=room.input_placeholder||t('placeholder');
  $('#chatSendButton').textContent=room.send_button_label||t('send');
  $('#requestManagement').textContent=room.management_button_label||t('management');
  $('#managementContactPrompt').textContent=room.management_email_prompt||'Tell us who we should contact when management reviews your request.';
  renderGlobalMessages();renderExperienceCards();renderEvents();renderFanStops();renderGallery();
}
function openChatOverlay(){const el=$('#experienceChat');el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeChatOverlay(){const el=$('#experienceChat');el.classList.remove('open');el.setAttribute('aria-hidden','true');document.body.style.overflow='';if(pollTimer)clearInterval(pollTimer);pollTimer=null;currentChat=null;currentFlow=[];$('#managementContact').hidden=true;$('#expChatForm').hidden=false}
function chatBubble(message){const wrap=document.createElement('div');wrap.className=`chat-bubble ${message.sender_type==='visitor'?'visitor':message.sender_type==='management'?'management':'assistant'}`;const body=document.createElement('div');body.textContent=message.body||'';wrap.appendChild(body);if(publicData?.chatRoom?.show_timestamps!==false){const time=document.createElement('div');time.className='chat-meta';time.textContent=new Intl.DateTimeFormat(language,{hour:'numeric',minute:'2-digit'}).format(new Date(message.created_at));wrap.appendChild(time)}return wrap}
function renderQuickReplies(flowStep=0,completed=false){
  const container=$('#expChatQuick');container.innerHTML='';if(completed||!currentFlow[flowStep])return;
  const step=currentFlow[flowStep];const options=[...(step.options||[])];if(step.required===false)options.push('Skip this');
  options.forEach(label=>{const b=document.createElement('button');b.type='button';b.textContent=label;container.appendChild(b)});
}
async function refreshConversation(){
  if(!currentChat)return;const d=await getConversation(currentChat.id,currentChat.token);const box=$('#expChatMessages');box.innerHTML='';const introMessages=(publicData?.globalMessages??[]).filter(m=>m.placement==='chat_intro'&&['all_visitors','chat_visitors'].includes(m.audience));introMessages.slice(0,3).forEach(m=>{const note=document.createElement('div');note.className='chat-global-note';note.textContent=m.title?`${m.title} — ${m.body}`:m.body;box.appendChild(note)});d.messages.forEach(m=>box.appendChild(chatBubble(m)));box.scrollTop=box.scrollHeight;currentChat.status=d.conversation.status;renderQuickReplies(d.conversation.flowStep,d.conversation.flowCompleted);
}
async function openExperienceChat(slug,eventId=null,fanStopId=null,title=null){
  const experience=publicData?.experiences?.find(e=>e.slug===slug);
  const room=publicData?.chatRoom||{};$('#expChatTitle').textContent=room.header_title||title||experience?.title||'Experience enquiry';$('#expChatContext').textContent=[title||experience?.title,experience?.short_description,room.header_subtitle].filter(Boolean).join(' · ')||'Your selected enquiry';
  $('#expChatMessages').innerHTML='<div class="chat-loading">Opening your conversation…</div>';$('#managementContact').hidden=true;$('#expChatForm').hidden=false;openChatOverlay();
  try{
    const opened=await post('create_conversation',{experienceSlug:slug,eventId,fanStopId,language});
    currentChat={id:opened.conversationId,token:opened.visitorToken,status:opened.status,language};currentFlow=opened.flow||[];
    localStorage.setItem('kr_v2_chat_session',JSON.stringify({id:currentChat.id,token:currentChat.token}));
    await refreshConversation();if(pollTimer)clearInterval(pollTimer);pollTimer=setInterval(()=>refreshConversation().catch(()=>{}),3500);$('#expChatInput').focus();
  }catch(e){$('#expChatMessages').innerHTML=`<div class="chat-bubble assistant">${escapeHtml(e.message)}</div>`}
}
async function sendChatMessage(text){
  if(!currentChat||sending)return;const value=(text??$('#expChatInput').value).trim();if(!value)return;sending=true;$('#chatSendButton').disabled=true;$('#expChatInput').disabled=true;$('#expChatInput').value='';
  try{await post('visitor_send',{conversationId:currentChat.id,message:value},{'x-visitor-token':currentChat.token});await refreshConversation()}
  catch(e){const box=$('#expChatMessages');const b=document.createElement('div');b.className='chat-bubble assistant';b.textContent=e.message;box.appendChild(b);box.scrollTop=box.scrollHeight}
  finally{sending=false;$('#chatSendButton').disabled=false;$('#expChatInput').disabled=false;$('#expChatInput').focus()}
}
async function submitHandover(event){
  event.preventDefault();if(!currentChat)return;const name=$('#handoverName').value.trim(),email=$('#handoverEmail').value.trim();
  try{await post('request_management',{conversationId:currentChat.id,name,email},{'x-visitor-token':currentChat.token});$('#managementContact').hidden=true;$('#expChatForm').hidden=false;$('#managementContactForm').reset();await refreshConversation()}
  catch(e){alert(e.message)}
}

$('#menuToggle').addEventListener('click',()=>{const nav=$('#mainNav');const open=nav.classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(open));$('#menuToggle').textContent=open?'×':'☰'});
$('#mainNav').addEventListener('click',e=>{if(e.target.closest('a')){$('#mainNav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');$('#menuToggle').textContent='☰'}});
$('#siteLanguage').value=language;$('#siteLanguage').addEventListener('change',e=>setLanguage(e.target.value));
$('#experienceGrid').addEventListener('click',e=>{const b=e.target.closest('[data-open-experience]');if(b)openExperienceChat(b.dataset.openExperience)});
$('#eventsGrid').addEventListener('click',e=>{const b=e.target.closest('[data-event-id]');if(!b||b.disabled)return;const item=publicData.events.find(x=>x.id===b.dataset.eventId);openExperienceChat('tour-enquiry',item.id,null,item.title)});
$('#fanStopsGrid').addEventListener('click',e=>{const b=e.target.closest('[data-fan-stop-id]');if(!b||b.disabled)return;const item=publicData.fanStops.find(x=>x.id===b.dataset.fanStopId);openExperienceChat('meet-the-fans-tour-stop',null,item.id,item.title)});
$$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.toggle('active',x===b));renderGallery(b.dataset.filter)}));
$('#generalEnquiry').addEventListener('click',()=>openExperienceChat('vip-meet-and-greet',null,null,'General enquiry'));
$('#closeExperienceChat').addEventListener('click',closeChatOverlay);$('#experienceChat').addEventListener('click',e=>{if(e.target===$('#experienceChat'))closeChatOverlay()});
$('#expChatForm').addEventListener('submit',e=>{e.preventDefault();sendChatMessage()});
$('#expChatQuick').addEventListener('click',e=>{const b=e.target.closest('button');if(b)sendChatMessage(b.textContent)});
$('#requestManagement').addEventListener('click',()=>{$('#managementContact').hidden=false;$('#expChatForm').hidden=true;$('#handoverName').focus()});
$('#cancelHandover').addEventListener('click',()=>{$('#managementContact').hidden=true;$('#expChatForm').hidden=false});
$('#managementContactForm').addEventListener('submit',submitHandover);
$('#communityForm').addEventListener('submit',async e=>{e.preventDefault();const submit=$('button[type="submit"]',e.currentTarget);submit.disabled=true;setMessage($('#communityMessage'),'Sending your request…');try{await post('community_request',{name:$('#communityName').value.trim(),email:$('#communityEmail').value.trim(),country:$('#communityCountry').value.trim(),language,consent:$('#communityConsent').checked});e.currentTarget.reset();setMessage($('#communityMessage'),t('communityOk'),'success')}catch(err){setMessage($('#communityMessage'),err.message,'error')}finally{submit.disabled=false}});
$('#cookieAccept').addEventListener('click',()=>{localStorage.setItem('kr_v2_cookie_choice','accepted');$('#cookieNotice').hidden=true});
$('#cookieReject').addEventListener('click',()=>{localStorage.setItem('kr_v2_cookie_choice','essential');$('#cookieNotice').hidden=true});
$('#year').textContent=new Date().getFullYear();
if(!localStorage.getItem('kr_v2_cookie_choice'))$('#cookieNotice').hidden=false;
loadPublicData().catch(err=>{console.error(err);$('#experienceGrid').innerHTML=`<div class="empty-state">The experience list could not be loaded. Please refresh this page or try again later.</div>`;$('#eventsGrid').innerHTML='<div class="empty-state">Event information is temporarily unavailable.</div>';$('#fanStopsGrid').innerHTML='<div class="empty-state">Fan-meeting information is temporarily unavailable.</div>'});
