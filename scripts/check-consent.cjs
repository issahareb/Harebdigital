const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ts=require(process.cwd()+'/node_modules/typescript');
function run(dnt=false){
 const data=new Map(),listeners={},scripts=[],events=[];let reloads=0,disabled=0;
 const localStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 const window={localStorage,location:{reload:()=>reloads++},dispatchEvent:e=>(listeners[e.type]||[]).forEach(f=>f(e)),addEventListener:(n,f)=>(listeners[n]??=[]).push(f),removeEventListener:()=>{}};
 const document={cookie:'',getElementById:id=>scripts.find(s=>s.id===id),createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}};
 const context={window,localStorage,document,navigator:{doNotTrack:dnt?'1':'0'},location:{hostname:'hareb.digital'},Event:class{constructor(type){this.type=type}},CustomEvent:class{constructor(type,args){this.type=type;this.detail=args.detail}},Date,HTMLFormElement:class{},WeakSet};
 function load(file,imports={}){const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,{...context,exports,require:n=>imports[n]});return exports}
 const consent=load('lib/consent.ts'),tiktok=load('lib/tiktok-consent.ts');
 load('components/tiktok-enquiry-tracking.tsx',{'react':{useEffect:f=>f()},'@/lib/tiktok-consent':tiktok}).TikTokEnquiryTracking();
 assert.equal(scripts.length,0,'no TikTok before consent');
 consent.setConsent('analytics',true);assert.equal(scripts.length,0,'analytics does not allow advertising');
 tiktok.setTikTokConsent(true);
 assert.equal(scripts.length,dnt?0:1,'pixel only with advertising permission');
 if(dnt){assert.equal(tiktok.decision(),false);return}
 window.ttq={track:e=>events.push(e),disableCookie:()=>disabled++};
 const form=new context.HTMLFormElement();form.dataset={trackId:'project-enquiry'};
 window.dispatchEvent({type:'hd-form-result',detail:{form,ok:false}});assert.equal(events.length,0);
 window.dispatchEvent({type:'hd-form-result',detail:{form,ok:true}});window.dispatchEvent({type:'hd-form-result',detail:{form,ok:true}});assert.equal(events.length,1);
 consent.setConsent('analytics',false);tiktok.setTikTokConsent(false);assert.equal(tiktok.decision(),false);assert.equal(disabled,1);assert.equal(reloads,1);assert.equal(consent.hasConsent('analytics'),false);
 window.dispatchEvent({type:'hd-form-result',detail:{form:new context.HTMLFormElement(),ok:true}});assert.equal(events.length,1,'no events after revocation');
}
run();run(true);console.log('PASS: default-off, separate categories, successful submission only, deduplication, revocation, Do Not Track');
