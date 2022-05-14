(function(){var t={2584:function(t,e,s){"use strict";var n=s(9963),i=s(6252),o=s(3577);const a={class:"container"},r=(0,i._)("h1",null,"Band Cues🎧",-1),c={class:"row mb-5"},l={class:"col-auto"},u=(0,i._)("label",{for:"bpm",class:"form-label"},[(0,i.Uk)("BPM "),(0,i._)("i",{class:"bi bi-speedometer"})],-1),d={class:"form-check form-switch"},b=(0,i._)("label",{class:"form-check-label",for:"doubleTime"},"Double Time Click",-1),p={class:"col-auto"},f=(0,i._)("label",{for:"beatsPerBar",class:"form-label"},"Beats per Bar",-1),m={class:"col-auto"},h=(0,i._)("label",{for:"firstOscFrequency",class:"form-label"},"First Click Tone [hz]",-1),v={class:"col-auto"},w=(0,i._)("label",{for:"oscFrequency",class:"form-label"},"Click Tone [hz]",-1),g={class:"col-auto"},y=(0,i._)("label",{for:"fileFormat",class:"form-label"},"File Format",-1),_={key:0},k={key:1},x={class:"mb-4"},O={class:"row mb-2"},B={class:"col-auto",style:{"min-width":"390px"}},C={class:"list-group"},S={class:"list-group-item"},T={class:"row align-items-end"},D=(0,i._)("div",{class:"col-auto",style:{"max-width":"160px"}},[(0,i._)("label",{for:"preBarsSection",class:"form-label"},"Section"),(0,i._)("input",{type:"text",class:"form-control",value:"Prebars",id:"preBarsSection",readonly:""})],-1),P={class:"col-auto",style:{"max-width":"80px"}},U=(0,i._)("label",{for:"numberOfPreBars",class:"form-label"},"Bars",-1),F={class:"row align-items-end"},q={class:"col-auto",style:{"max-width":"160px"}},R=["for"],V=["onUpdate:modelValue","id"],L={class:"col-auto",style:{"max-width":"80px"}},I=["for"],j=["id","onUpdate:modelValue"],A={class:"col-auto"},M=["onClick"],E=(0,i._)("i",{class:"bi bi-clipboard-plus"},null,-1),K=(0,i.Uk)(" Duplicate "),N=[E,K],W={class:"d-sm-none mb-1"},z=["onClick"],H=(0,i._)("i",{class:"bi bi-clipboard-plus"},null,-1),Y=[H],J=["onClick"],G=(0,i._)("i",{class:"bi bi-chevron-up"},null,-1),Q=[G],Z={class:"d-sm-none"},X=["onClick"],$=(0,i._)("i",{class:"bi bi-trash"},null,-1),tt=[$],et=["onClick"],st=(0,i._)("i",{class:"bi bi-chevron-down"},null,-1),nt=[st],it={class:"col-auto d-none d-sm-block"},ot=["onClick"],at=(0,i._)("i",{class:"bi bi-trash"},null,-1),rt=(0,i.Uk)(" Delete "),ct=[at,rt],lt={class:"col-auto d-none d-sm-block"},ut={class:"mb-1"},dt=["onClick"],bt=(0,i._)("i",{class:"bi bi-chevron-up"},null,-1),pt=[bt],ft=["onClick"],mt=(0,i._)("i",{class:"bi bi-chevron-down"},null,-1),ht=[mt],vt={key:0,class:"alert alert-secondary mb-2",role:"alert"},wt={class:"mb-2"},gt=(0,i._)("i",{class:"bi bi-plus-lg"},null,-1),yt=(0,i.Uk)(" Add Section "),_t=[gt,yt],kt={class:"mb-3"},xt=["disabled"],Ot=(0,i._)("i",{class:"bi bi-play-circle"},null,-1),Bt=(0,i.Uk)(" Generate"),Ct=[Ot,Bt],St=(0,i._)("i",{class:"bi bi-clipboard"},null,-1),Tt=(0,i.Uk)(" Copy Cue URL"),Dt=[St,Tt],Pt={key:0},Ut=(0,i._)("i",{class:"bi bi-hourglass-split"},null,-1),Ft=[Ut],qt={key:1},Rt=(0,i._)("i",{class:"bi bi-check"},null,-1),Vt=[Rt],Lt={key:2},It=(0,i._)("i",{class:"bi bi-x"},null,-1),jt=[It],At={key:0},Mt=(0,i._)("div",{class:"spinner-border text-primary"},[(0,i._)("span",{class:"visually-hidden"},"Loading...")],-1),Et=(0,i._)("small",{class:"text-primary"},"This migth take up to a minute..",-1),Kt=[Mt,Et],Nt={key:1,class:"row align-items-center"},Wt={class:"col-auto"},zt=["src"],Ht={class:"col-auto"},Yt=["href"],Jt=(0,i._)("i",{class:"bi bi-download"},null,-1),Gt=[Jt],Qt=(0,i._)("div",{class:"w-100"},null,-1),Zt=(0,i._)("div",{class:"col-auto"},[(0,i._)("small",null,[(0,i.Uk)(" Cues🎧 from "),(0,i._)("a",{href:"https://worshiptutorials.com/product/clicks-and-cues/"},"WorshipTutorials")])],-1);function Xt(t,e,s,E,K,H){return(0,i.wg)(),(0,i.iD)("div",a,[r,(0,i._)("form",{onSubmit:e[9]||(e[9]=(0,n.iM)((t=>H.generate()),["prevent"]))},[(0,i._)("div",c,[(0,i._)("div",l,[u,(0,i.wy)((0,i._)("input",{type:"number",class:"form-control",id:"bpm","onUpdate:modelValue":e[0]||(e[0]=t=>K.settings.bpm=t),min:"1",max:"300"},null,512),[[n.nr,K.settings.bpm]]),(0,i._)("div",d,[(0,i.wy)((0,i._)("input",{class:"form-check-input",type:"checkbox",id:"doubleTime","onUpdate:modelValue":e[1]||(e[1]=t=>K.settings.doubleTime=t)},null,512),[[n.e8,K.settings.doubleTime]]),b])]),(0,i._)("div",p,[f,(0,i.wy)((0,i._)("input",{type:"number",class:"form-control",id:"beatsPerBar",min:"2",max:"8","onUpdate:modelValue":e[2]||(e[2]=t=>K.settings.beatsPerBar=t)},null,512),[[n.nr,K.settings.beatsPerBar]])]),(0,i._)("div",m,[h,(0,i.wy)((0,i._)("input",{type:"number",class:"form-control",id:"firstOscFrequency",min:"20",max:"20000","onUpdate:modelValue":e[3]||(e[3]=t=>K.settings.firstOscFrequency=t)},null,512),[[n.nr,K.settings.firstOscFrequency]])]),(0,i._)("div",v,[w,(0,i.wy)((0,i._)("input",{type:"number",class:"form-control",id:"oscFrequency",min:"20",max:"20000","onUpdate:modelValue":e[4]||(e[4]=t=>K.settings.oscFrequency=t)},null,512),[[n.nr,K.settings.oscFrequency]])]),(0,i._)("div",g,[y,(0,i.wy)((0,i._)("select",{class:"form-select","onUpdate:modelValue":e[5]||(e[5]=t=>K.settings.fileFormat=t),id:"fileFormat"},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(K.fileFormats,(t=>((0,i.wg)(),(0,i.iD)("option",{key:t},(0,o.zw)(t),1)))),128))],512),[[n.bM,K.settings.fileFormat]])]),"mp3"===K.settings.fileFormat?((0,i.wg)(),(0,i.iD)("small",_,"ℹ Converting to MP3 takes signifigantly longer than WAV")):(0,i.kq)("",!0),6===K.settings.beatsPerBar?((0,i.wg)(),(0,i.iD)("small",k,"ℹ Consider Double Time Click and 3 Beats per Bar")):(0,i.kq)("",!0)]),(0,i._)("div",x,[(0,i._)("div",O,[(0,i._)("div",B,[(0,i._)("ul",C,[(0,i._)("li",S,[(0,i._)("div",T,[D,(0,i._)("div",P,[U,(0,i.wy)((0,i._)("input",{type:"number",class:"form-control",min:"1",id:"numberOfPreBars","onUpdate:modelValue":e[6]||(e[6]=t=>K.settings.numberOfPreBars=t)},null,512),[[n.nr,K.settings.numberOfPreBars]])])])]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(K.sections,((t,e)=>((0,i.wg)(),(0,i.iD)("li",{class:"list-group-item",key:e},[(0,i._)("div",F,[(0,i._)("div",q,[(0,i._)("label",{for:e+"section",class:"form-label"},"Section",8,R),(0,i.wy)((0,i._)("select",{class:"form-select","onUpdate:modelValue":e=>t.type=e,id:e+"section"},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(K.cueTypes,(t=>((0,i.wg)(),(0,i.iD)("option",{key:t},(0,o.zw)(t),1)))),128))],8,V),[[n.bM,t.type]])]),(0,i._)("div",L,[(0,i._)("label",{for:e+"numberOfBars",class:"form-label"},"Bars",8,I),(0,i.wy)((0,i._)("input",{type:"number",class:"form-control",min:"1",id:e+"numberOfBars","onUpdate:modelValue":e=>t.numberOfBars=e},null,8,j),[[n.nr,t.numberOfBars]])]),(0,i._)("div",A,[(0,i._)("button",{type:"button",class:"btn btn-outline-secondary d-none d-sm-block",onClick:e=>H.duplicateSection(t)},N,8,M),(0,i._)("div",W,[(0,i._)("button",{type:"button",class:"btn btn-outline-secondary me-2",onClick:e=>H.duplicateSection(t)},Y,8,z),K.sections.indexOf(t)>0?((0,i.wg)(),(0,i.iD)("button",{key:0,type:"button",class:"btn btn-outline-secondary",onClick:e=>H.moveSectionUp(t)},Q,8,J)):(0,i.kq)("",!0)]),(0,i._)("div",Z,[(0,i._)("button",{type:"button",class:"btn btn-outline-danger me-2",onClick:e=>H.deleteSection(t)},tt,8,X),K.sections.indexOf(t)<K.sections.length-1?((0,i.wg)(),(0,i.iD)("button",{key:0,type:"button",class:"btn btn-outline-secondary",onClick:e=>H.moveSectionDown(t)},nt,8,et)):(0,i.kq)("",!0)])]),(0,i._)("div",it,[(0,i._)("button",{type:"button",class:"btn btn-outline-danger",onClick:e=>H.deleteSection(t)},ct,8,ot)]),(0,i._)("div",lt,[(0,i._)("div",ut,[K.sections.indexOf(t)>0?((0,i.wg)(),(0,i.iD)("button",{key:0,type:"button",class:"btn btn-outline-secondary",onClick:e=>H.moveSectionUp(t)},pt,8,dt)):(0,i.kq)("",!0)]),(0,i._)("div",null,[K.sections.indexOf(t)<K.sections.length-1?((0,i.wg)(),(0,i.iD)("button",{key:0,type:"button",class:"btn btn-outline-secondary",onClick:e=>H.moveSectionDown(t)},ht,8,ft)):(0,i.kq)("",!0)])])])])))),128))])])]),0===K.sections.length?((0,i.wg)(),(0,i.iD)("div",vt,"No Section defined.")):(0,i.kq)("",!0),(0,i._)("div",wt,[(0,i._)("button",{type:"button",class:"btn btn-secondary",onClick:e[7]||(e[7]=t=>H.addSection())},_t)])]),(0,i._)("div",kt,[(0,i._)("button",{type:"submit",class:"btn btn-primary",disabled:K.isLoading||!H.inputCorrect()},Ct,8,xt),(0,i._)("button",{type:"button",class:"ms-2 me-2 btn btn-outline-secondary",onClick:e[8]||(e[8]=t=>H.cueToUrl())},Dt),1===K.clipboardState?((0,i.wg)(),(0,i.iD)("span",Pt,Ft)):2===K.clipboardState?((0,i.wg)(),(0,i.iD)("span",qt,Vt)):-1===K.clipboardState?((0,i.wg)(),(0,i.iD)("span",Lt,jt)):(0,i.kq)("",!0)]),K.isLoading?((0,i.wg)(),(0,i.iD)("div",At,Kt)):(0,i.kq)("",!0),""===K.cueTrack||K.isLoading?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",Nt,[(0,i._)("div",Wt,[(0,i._)("audio",{controls:"",src:K.cueTrack},null,8,zt)]),(0,i._)("div",Ht,[(0,i._)("a",{type:"button",class:"btn btn-secondary",href:K.cueTrack,download:"band cues"},Gt,8,Yt)]),Qt,Zt]))],32)])}s(8675),s(3462);var $t=s(2123),te=s(5644),ee={name:"App",components:{},data(){return{cueTypes:["AcaPella","Band","Break","Bridge","Chorus","Count","End","Instrumental","Intro","KeyChange","Outro","PreChorus","Ready","Riff","Solo","Tag","Turn","Verse"],oscTypes:["sine","sawtooth","square","triangle"],fileFormats:["mp3","wav"],cueTrack:"",isLoading:!1,clipboardState:0,settings:{fileFormat:"wav",oscFrequency:440,firstOscFrequency:600,bpm:120,beatsPerBar:4,numberOfPreBars:4,doubleTime:!1},sections:[{type:"Intro",numberOfBars:4}]}},methods:{cueToUrl(){this.clipboardState=1;var t=window.location.origin+"/?";t+=new URLSearchParams(this.settings).toString();var e="";for(const s of this.sections)e=e+"&sections="+encodeURIComponent('{"type":"'+s.type+'","numberOfBars":'+s.numberOfBars+"}");t+=e,console.log(t),window.isSecureContext?navigator.clipboard.writeText(t).then((function(){this.clipboardState=2}),(function(t){this.clipboardState=-1,console.log(t)})):this.clipboardState=-1},urlToCue(){const t=new URLSearchParams(window.location.search),e=[];for(const n of t.getAll("sections"))e.push(JSON.parse(n));e.length>0&&(this.sections=e);const s=Object.keys(this.settings);for(const n of s){const e=t.get(n);null!==e&&(isNaN(e)?this.settings[n]="true"===e||"false"!==e&&e:this.settings[n]=+e)}},moveSectionDown(t){const e=this.sections.indexOf(t);if(-1!==e&&e<this.sections.length-1){var s=this.sections[e];this.sections[e]=this.sections[e+1],this.sections[e+1]=s}},moveSectionUp(t){const e=this.sections.indexOf(t);if(e>0){var s=this.sections[e];this.sections[e]=this.sections[e-1],this.sections[e-1]=s}},addSection(){this.sections.push({type:"Intro",numberOfBars:4})},duplicateSection(t){const e={};Object.assign(e,t);const s=this.sections.indexOf(t);-1!==s&&this.sections.splice(s,0,e)},deleteSection(t){const e=this.sections.indexOf(t);-1!==e&&this.sections.splice(e,1)},getSection(t){for(var e=0,s=0;s<this.sections.length;s++){var n=e+1===t;if(e+=this.settings.beatsPerBar*this.sections[s].numberOfBars,t<=e)return{section:this.sections[s],isFirstBeatOfSection:n}}return{section:null,isFirstBeatOfSection:!1}},inputCorrect(){return this.settings.beatsPerBar<=8&&this.settings.beatsPerBar>=2&&this.sections.length>0},async generate(){if(console.log(this.sections),console.log(this.settings),!this.inputCorrect())return"";this.isLoading=!0;var t=this.settings.numberOfPreBars;for(const s of this.sections)t+=s.numberOfBars;const e=Math.ceil(60/this.settings.bpm*this.settings.beatsPerBar*t),n=await $t.B6((async({transport:e})=>{const n=new $t.D_(this.settings.oscFrequency,this.oscTypes[0]).toDestination(),i=new $t.D_(this.settings.firstOscFrequency,this.oscTypes[0]).toDestination(),o=$t.Y3(),a={};for(var r=0;r<this.sections.length;r++)a[this.sections[r].type]=(new $t.J5).connect(o),await a[this.sections[r].type].load(s(3938)("./"+this.sections[r].type+".wav"));for(r=2;r<=this.settings.beatsPerBar;r++)a[r.toString()]=(new $t.J5).connect(o),await a[r.toString()].load(s(3938)("./"+r.toString()+".wav"));e.bpm.value=this.settings.bpm;var c=0,l=!1;e.scheduleRepeat((s=>{if(++c>t*this.settings.beatsPerBar)e.stop();else if(c%this.settings.beatsPerBar===1){l=!1,i.start(s).stop(s+.05);var o=c-(this.settings.numberOfPreBars-1)*this.settings.beatsPerBar;if(o>=0){const t=this.getSection(o);t.isFirstBeatOfSection&&(a[t.section.type].start(s),l=!0)}}else n.start(s).stop(s+.05),l&&a[((c-1)%this.settings.beatsPerBar+1).toString()].start(s)}),"4n"),this.settings.doubleTime&&e.scheduleRepeat((t=>{n.start(t).stop(t+.05)}),"4n","8n"),e.start()}),e,1);"wav"===this.settings.fileFormat?this.cueTrack=URL.createObjectURL(new Blob([this.bufferToWave(n.get())],{type:"audio/wav"})):"mp3"===this.settings.fileFormat&&(this.cueTrack=URL.createObjectURL(new Blob(this.wave2mp3(this.bufferToWave(n.get())),{type:"audio/mp3"}))),this.isLoading=!1,clearInterval(this.progressIntervall)},bufferToWave(t){var e,s,n=t.numberOfChannels,i=t.length*n*2+44,o=new ArrayBuffer(i),a=new DataView(o),r=[],c=0,l=0;for(d(1179011410),d(i-8),d(1163280727),d(544501094),d(16),u(1),u(n),d(t.sampleRate),d(2*t.sampleRate*n),u(2*n),u(16),d(1635017060),d(i-l-4),e=0;e<t.numberOfChannels;e++)r.push(t.getChannelData(e));while(l<i){for(e=0;e<n;e++)s=Math.max(-1,Math.min(1,r[e][c])),s=0|(.5+s<0?32768*s:32767*s),a.setInt16(l,s,!0),l+=2;c++}return o;function u(t){a.setUint16(l,t,!0),l+=2}function d(t){a.setUint32(l,t,!0),l+=4}},wave2mp3(t){const e=128,s=1152,n=te.Q.readHeader(new DataView(t)),i=new Int16Array(t,n.dataOffset,n.dataLen/2),o=new te.d(n.channels,n.sampleRate,e);for(var a=[],r=0;r<i.length;r+=s){var c=i.subarray(r,r+s),l=o.encodeBuffer(c);l.length>0&&a.push(l)}return l=o.flush(),l.length>0&&a.push(new Int8Array(l)),a}},beforeMount(){this.urlToCue()}},se=s(3744);const ne=(0,se.Z)(ee,[["render",Xt]]);var ie=ne;(0,n.ri)(ie).mount("#app")},3938:function(t,e,s){var n={"./1.wav":4254,"./2.wav":3537,"./3.wav":9336,"./4.wav":2234,"./5.wav":5312,"./6.wav":3346,"./7.wav":8602,"./AcaPella.wav":8610,"./Band.wav":7094,"./Break.wav":3921,"./Bridge.wav":4244,"./Chorus.wav":3415,"./Count.wav":8841,"./End.wav":8764,"./Instrumental.wav":7616,"./Intro.wav":9327,"./KeyChange.wav":9839,"./Outro.wav":1325,"./PreChorus.wav":3069,"./Ready.wav":3500,"./Riff.wav":4525,"./Solo.wav":5611,"./Tag.wav":6155,"./Turn.wav":3727,"./Verse.wav":5173};function i(t){var e=o(t);return s(e)}function o(t){if(!s.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}i.keys=function(){return Object.keys(n)},i.resolve=o,t.exports=i,i.id=3938},4254:function(t,e,s){"use strict";t.exports=s.p+"media/1.e4444bad.wav"},3537:function(t,e,s){"use strict";t.exports=s.p+"media/2.97498402.wav"},9336:function(t,e,s){"use strict";t.exports=s.p+"media/3.19a2f263.wav"},2234:function(t,e,s){"use strict";t.exports=s.p+"media/4.6a8cf081.wav"},5312:function(t,e,s){"use strict";t.exports=s.p+"media/5.8d45786b.wav"},3346:function(t,e,s){"use strict";t.exports=s.p+"media/6.77e946a8.wav"},8602:function(t,e,s){"use strict";t.exports=s.p+"media/7.88952e25.wav"},8610:function(t,e,s){"use strict";t.exports=s.p+"media/AcaPella.4ecbaab3.wav"},7094:function(t,e,s){"use strict";t.exports=s.p+"media/Band.30171753.wav"},3921:function(t,e,s){"use strict";t.exports=s.p+"media/Break.b424870b.wav"},4244:function(t,e,s){"use strict";t.exports=s.p+"media/Bridge.33db1a07.wav"},3415:function(t,e,s){"use strict";t.exports=s.p+"media/Chorus.be568e17.wav"},8841:function(t,e,s){"use strict";t.exports=s.p+"media/Count.e01df81b.wav"},8764:function(t,e,s){"use strict";t.exports=s.p+"media/End.908e8b17.wav"},7616:function(t,e,s){"use strict";t.exports=s.p+"media/Instrumental.598bef82.wav"},9327:function(t,e,s){"use strict";t.exports=s.p+"media/Intro.bf5136b2.wav"},9839:function(t,e,s){"use strict";t.exports=s.p+"media/KeyChange.23e0ac59.wav"},1325:function(t,e,s){"use strict";t.exports=s.p+"media/Outro.cdb4a14f.wav"},3069:function(t,e,s){"use strict";t.exports=s.p+"media/PreChorus.f106bdf4.wav"},3500:function(t,e,s){"use strict";t.exports=s.p+"media/Ready.63a5060b.wav"},4525:function(t,e,s){"use strict";t.exports=s.p+"media/Riff.6e6b8fab.wav"},5611:function(t,e,s){"use strict";t.exports=s.p+"media/Solo.fe9eb034.wav"},6155:function(t,e,s){"use strict";t.exports=s.p+"media/Tag.6c3b18a4.wav"},3727:function(t,e,s){"use strict";t.exports=s.p+"media/Turn.e2130b65.wav"},5173:function(t,e,s){"use strict";t.exports=s.p+"media/Verse.3a0ff240.wav"}},e={};function s(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n].call(o.exports,o,o.exports,s),o.exports}s.m=t,function(){var t=[];s.O=function(e,n,i,o){if(!n){var a=1/0;for(u=0;u<t.length;u++){n=t[u][0],i=t[u][1],o=t[u][2];for(var r=!0,c=0;c<n.length;c++)(!1&o||a>=o)&&Object.keys(s.O).every((function(t){return s.O[t](n[c])}))?n.splice(c--,1):(r=!1,o<a&&(a=o));if(r){t.splice(u--,1);var l=i();void 0!==l&&(e=l)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[n,i,o]}}(),function(){s.d=function(t,e){for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.p="/band-cues/"}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,n){var i,o,a=n[0],r=n[1],c=n[2],l=0;if(a.some((function(e){return 0!==t[e]}))){for(i in r)s.o(r,i)&&(s.m[i]=r[i]);if(c)var u=c(s)}for(e&&e(n);l<a.length;l++)o=a[l],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(u)},n=self["webpackChunkband_cues"]=self["webpackChunkband_cues"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(2584)}));n=s.O(n)})();
//# sourceMappingURL=app.6ba86a4f.js.map