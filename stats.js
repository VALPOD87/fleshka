/* Счётчик Флешки: пишет события в Google Таблицу «Флешка — статистика».
   Цифры видит только владелец таблицы, на сайте их нет.
   Личных данных не собираем: только случайный номер браузера, тип устройства и откуда пришли.
   Свои заходы не считать: открыть страницу один раз с #notrack (вернуть — #track). */
(function(){
 var U='https://script.google.com/macros/s/AKfycbziZZTjSePNLm9HRAg7bGHU63QlD1eND0hZsj3TgywnQgn28Gg5fZtx2U0eW8Uup7GPtw/exec';
 function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}
 if(location.hash==='#notrack'){ls('vpf-notrack','1');history.replaceState(null,'',location.pathname)}
 if(location.hash==='#track'){ls('vpf-notrack',null);history.replaceState(null,'',location.pathname)}
 var off=ls('vpf-notrack')==='1';
 var vid=ls('vpf-vid');if(!vid){vid=Math.random().toString(36).slice(2,10);ls('vpf-vid',vid)}
 var dev=/Mobi|Android|iPhone/i.test(navigator.userAgent)?'mobile':'desktop';
 var ref='';try{ref=document.referrer?new URL(document.referrer).hostname:''}catch(e){}
 if(/Instagram/i.test(navigator.userAgent))ref=ref||'instagram-app';
 if(/Telegram/i.test(navigator.userAgent))ref=ref||'telegram-app';
 window.vpfTrack=function(e,i){
  if(off)return;
  var d=JSON.stringify({e:e,i:i||'',v:vid,d:dev,r:ref,p:location.pathname});
  try{if(navigator.sendBeacon&&navigator.sendBeacon(U,d))return}catch(x){}
  try{fetch(U,{method:'POST',body:d,mode:'no-cors',keepalive:true})}catch(x){}
 };
 vpfTrack('visit');
})();
