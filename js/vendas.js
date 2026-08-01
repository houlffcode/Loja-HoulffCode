"use strict";
const pageProgress=document.querySelector('#pageProgress');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;pageProgress.style.width=`${max?scrollY/max*100:0}%`},{passive:true});
const menu=document.querySelector('.menu-button'),mobileNav=document.querySelector('.mobile-nav');
menu?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('active');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('active');menu.setAttribute('aria-expanded','false')}));
document.querySelectorAll('.category-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.category-tabs button').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.catalog-panel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');document.querySelector(`#${btn.dataset.tab}`).classList.add('active')}));
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('details').forEach(o=>o!==d&&o.removeAttribute('open'))}));
const types={Site:['Ainda não sei','Landing page','One page','Institucional','Portfólio','Hotsite','Blog','E-commerce','Portal'],Sistema:['Ainda não sei','MicroMVP','MVP','SaaS','ERP','CRM','Portal B2B'],Aplicativo:['Ainda não sei','App institucional','Agendamento','Delivery e pedidos','Marketplace','Equipe em campo','Área de membros','Outro aplicativo']};
const category=document.querySelector('#categoria'),type=document.querySelector('#tipo');
category.addEventListener('change',()=>{type.innerHTML='<option value="">Selecione o tipo</option>';(types[category.value]||[]).forEach(v=>type.add(new Option(v,v)));type.disabled=!category.value});
const form=document.querySelector('#projectForm'),steps=[...document.querySelectorAll('.form-step')],links=[...document.querySelectorAll('[data-step-link]')],prev=document.querySelector('#prevStep'),next=document.querySelector('#nextStep'),send=document.querySelector('#sendOrder'),bar=document.querySelector('#formProgress'),summary=document.querySelector('#summary');let current=0;
function validateStep(){const fields=[...steps[current].querySelectorAll('[required]')];for(const field of fields){if(!field.checkValidity()){field.reportValidity();return false}}return true}
function values(){const data=new FormData(form),resources=data.getAll('recursos'),country=document.querySelector('#paisTelefone'),selected=country?.selectedOptions[0],countryCode=country?.value==='OTHER'?(data.get('codigoPaisManual')||''):(selected?.dataset.code||''),national=(data.get('telefone')||'').replace(/\D/g,'');return {nome:data.get('nome')||'',empresa:data.get('empresa')||'Não informado',email:data.get('email')||'',telefone:`+${countryCode}${national}`,paisTelefone:selected?.textContent||'',local:data.get('semEndereco')==='Sim'?'Sem endereço físico / negócio online':(data.get('local')||'Não informado'),segmento:data.get('segmento')||'Não informado',categoria:data.get('categoria')||'',tipo:data.get('tipo')||'',objetivo:data.get('objetivo')||'',descricao:data.get('descricao')||'',prazo:data.get('prazo')||'',orcamento:data.get('orcamento')||'',recursos:resources.length?resources.join(', '):'Não informado',referencias:data.get('referencias')||'Não informado'} }
function buildSummary(){const d=values(),rows=[['Contato',`${d.nome} — ${d.telefone}`],['Empresa',d.empresa],['Projeto',`${d.categoria} — ${d.tipo}`],['Objetivo',d.objetivo],['Prazo',d.prazo],['Investimento',d.orcamento],['Recursos',d.recursos],['Ideia',d.descricao]];summary.innerHTML=rows.map(([a,b])=>`<div><span>${a}</span><b>${String(b).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</b></div>`).join('')}
function render(){steps.forEach((s,i)=>s.classList.toggle('active',i===current));links.forEach((l,i)=>l.classList.toggle('active',i===current));prev.disabled=current===0;next.hidden=current===steps.length-1;send.hidden=current!==steps.length-1;bar.style.width=`${(current+1)/steps.length*100}%`;if(current===3)buildSummary();steps[current].scrollIntoView({behavior:'smooth',block:'start'})}
next.addEventListener('click',()=>{if(validateStep()&&current<3){current++;render()}});prev.addEventListener('click',()=>{if(current>0){current--;render()}});links.forEach((l,i)=>l.addEventListener('click',()=>{if(i<=current||validateStep()){current=i;render()}}));
form.addEventListener('submit',e=>{e.preventDefault();if(!validateStep())return;const d=values();const message=`Olá! Quero solicitar uma análise de projeto pela página da HoulffCode.\n\n*DADOS DO CONTATO*\nNome: ${d.nome}\nEmpresa: ${d.empresa}\nE-mail: ${d.email}\nTelefone: ${d.telefone} (${d.paisTelefone})\nLocal: ${d.local}\nSegmento: ${d.segmento}\n\n*PROJETO*\nCategoria: ${d.categoria}\nTipo: ${d.tipo}\nObjetivo: ${d.objetivo}\nPrazo: ${d.prazo}\nFaixa de investimento: ${d.orcamento}\nRecursos: ${d.recursos}\n\n*DESCRIÇÃO*\n${d.descricao}\n\n*REFERÊNCIAS/OBSERVAÇÕES*\n${d.referencias}\n\nGostaria de conversar para definir o escopo e receber o orçamento final.`;window.open(`https://wa.me/5551996566717?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer')});

// Form input protection and validation.
const emojiPattern=/[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F\u200D]/gu;
const stripEmoji=value=>value.replace(emojiPattern,'');
const nameInput=document.querySelector('#nome');
const phoneInput=document.querySelector('#telefone');
const countrySelect=document.querySelector('#paisTelefone');
const customCodeWrap=document.querySelector('#customCodeWrap');
const customCode=document.querySelector('#codigoPaisManual');
const phoneHelp=document.querySelector('#telefoneAjuda');
const phonePrefix=document.querySelector('#phonePrefix');
const addressInput=document.querySelector('#local');
const noAddress=document.querySelector('#semEndereco');
const addressHelp=document.querySelector('#localAjuda');
const descriptionInput=document.querySelector('#descricao');
const referencesInput=document.querySelector('#referencias');

// Remove emojis from every editable text field, including pasted content.
document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]),textarea').forEach(field=>{
  field.addEventListener('input',()=>{
    const clean=stripEmoji(field.value);
    if(field.value!==clean)field.value=clean;
  });
});

// Names accept Unicode letters, spaces, apostrophes and hyphens only.
nameInput?.addEventListener('input',()=>{
  nameInput.value=stripEmoji(nameInput.value).replace(/[^\p{L}\p{M}\s'’-]/gu,'').replace(/\s{2,}/g,' ').replace(/^\s+/,'');
  const valid=/^[\p{L}\p{M}]+(?:[\s'’-][\p{L}\p{M}]+)*$/u.test(nameInput.value.trim());
  nameInput.setCustomValidity(nameInput.value&& !valid?'Use somente letras, espaços, hífen ou apóstrofo.':'');
});

// Phone and manual country code accept digits only.
[phoneInput,customCode].forEach(field=>field?.addEventListener('input',()=>{field.value=field.value.replace(/\D/g,'')}));

function selectedPhoneConfig(){
  const option=countrySelect.options[countrySelect.selectedIndex];
  return {
    option,
    country:option.value,
    code:option.dataset.code||'',
    min:Number(option.dataset.min||7),
    max:Number(option.dataset.max||15),
    example:option.dataset.example||''
  };
}
function configurePhone(){
  const cfg=selectedPhoneConfig(),other=cfg.country==='OTHER';
  customCodeWrap.hidden=!other;
  customCode.required=other;
  if(!other)customCode.value='';
  phoneInput.minLength=cfg.min;
  phoneInput.maxLength=cfg.max;
  phoneInput.value=phoneInput.value.replace(/\D/g,'').slice(0,cfg.max);
  phonePrefix.textContent=other?`+${customCode.value}`:`+${cfg.code}`;
  phoneInput.placeholder=cfg.example||'Somente números';
  if(cfg.country==='BR'){
    phoneHelp.textContent='Digite DDD + celular iniciado em 9 + oito números. Ex.: 51999999999. O +55 já está incluído.';
  }else if(cfg.country==='AR'){
    phoneHelp.textContent='Para celular argentino, digite 9 + código de área + número, sem 0 e sem 15. O +54 já está incluído.';
  }else if(cfg.country==='US'||cfg.country==='CA'){
    phoneHelp.textContent=`Digite código de área + número (${cfg.example}), total de 10 dígitos. O +1 já está incluído.`;
  }else if(other){
    phoneHelp.textContent=`Digite o código internacional acima e o número completo com código de área (${cfg.min} a ${cfg.max} dígitos).`;
  }else{
    phoneHelp.textContent=`Digite o número com código de área de ${cfg.option.textContent}, sem repetir o código internacional (${cfg.min}${cfg.min!==cfg.max?` a ${cfg.max}`:''} dígitos).`;
  }
  validatePhone();
}
function validatePhone(){
  const cfg=selectedPhoneConfig(),digits=phoneInput.value.replace(/\D/g,'');
  let message='';
  if(digits.length<cfg.min||digits.length>cfg.max)message=`Informe ${cfg.min===cfg.max?cfg.min:`de ${cfg.min} a ${cfg.max}`} dígitos.`;
  if(cfg.country==='BR'&&digits.length===11&&!/^[1-9]{2}9\d{8}$/.test(digits))message='Use DDD válido + 9 + oito números.';
  if((cfg.country==='US'||cfg.country==='CA')&&digits.length===10&&!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits))message='Use código de área e número válidos, totalizando 10 dígitos.';
  if(cfg.country==='AR'&&digits.length>=10&&!/^9?\d{10}$/.test(digits))message='Informe o celular argentino com código de área, sem 0 e sem 15.';
  phoneInput.setCustomValidity(message);
  if(customCode.required){
    const codeOk=/^[1-9]\d{0,3}$/.test(customCode.value);
    customCode.setCustomValidity(codeOk?'':'Informe um código de país válido, sem o sinal +.');
  }else customCode.setCustomValidity('');
}
const syncPhoneCountry=()=>requestAnimationFrame(configurePhone);
countrySelect?.addEventListener('change',syncPhoneCountry);
countrySelect?.addEventListener('input',syncPhoneCountry);
phoneInput?.addEventListener('input',validatePhone);
customCode?.addEventListener('input',()=>{phonePrefix.textContent=`+${customCode.value}`;validatePhone()});
window.addEventListener('pageshow',configurePhone);
configurePhone();

noAddress?.addEventListener('change',()=>{
  const disabled=noAddress.checked;
  addressInput.disabled=disabled;
  addressInput.required=!disabled;
  addressInput.value=disabled?'':addressInput.value;
  addressInput.placeholder=disabled?'Não se aplica':'Ex.: Canoas, RS';
  addressHelp.textContent=disabled?'O pedido será identificado como negócio online, sem endereço físico.':'Informe a localização da empresa ou operação.';
});
addressInput.required=true;

function setupCounter(field,counter,limit){
  if(!field||!counter)return;
  const update=()=>{field.value=stripEmoji(field.value).slice(0,limit);counter.textContent=`${field.value.length}/${limit} caracteres`;counter.classList.toggle('near-limit',field.value.length>=limit*.9)};
  field.addEventListener('input',update);update();
}
setupCounter(descriptionInput,document.querySelector('#descricaoContador'),1000);
setupCounter(referencesInput,document.querySelector('#referenciasContador'),600);

render();

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
}),{threshold:.12,rootMargin:'0px 0px -45px'});
const observeReveals=()=>document.querySelectorAll('.reveal:not(.is-visible)').forEach(el=>revealObserver.observe(el));
observeReveals();
document.querySelectorAll('.category-tabs button').forEach(button=>button.addEventListener('click',()=>requestAnimationFrame(observeReveals)));
