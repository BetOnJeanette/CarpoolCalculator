import{_ as w,F as R,a as I,b as T,c as a,m as h,u as V,d as y,s as F,e as q,f as M,g as L,P as O,h as H,i as B,j as K,k as j,l as U,n as k,o as S,p as $,q as J,r as Q,t as W,v as X,w as Y,x as _,A as x,C as Z,y as ee,B as te,L as re}from"./index-5633b241.js";class v{static defaultName="Default Name";static defaultGroupSize=1;id;name;peopleCount;location;constructor(t,n,s,r){[this.id,this.name,this.peopleCount,this.location]=[t,n,s,r]}GetRequestJob(t){return{id:t,description:this.name,location:this.location.GetCoordinates(),pickup:[this.peopleCount]}}}var ne={};w(ne,{Description:()=>R,ErrorMessage:()=>I,Input:()=>z,Label:()=>T,Root:()=>N,TextArea:()=>D,TextField:()=>C});var E=W();function G(){const e=X(E);if(e===void 0)throw new Error("[kobalte]: `useTextFieldContext` must be used within a `TextField` component");return e}function z(e){return a(A,h({type:"text"},e))}function A(e){const t=V(),n=G(),s=y({id:n.generateId("input")},e),[r,l,u]=F(s,["onInput"],q),{fieldProps:o}=M(l);return a(O,h({as:"input",get id(){return o.id()},get name(){return t.name()},get value(){return n.value()},get required(){return t.isRequired()},get disabled(){return t.isDisabled()},get readonly(){return t.isReadOnly()},get"aria-label"(){return o.ariaLabel()},get"aria-labelledby"(){return o.ariaLabelledBy()},get"aria-describedby"(){return o.ariaDescribedBy()},get"aria-invalid"(){return t.validationState()==="invalid"||void 0},get"aria-required"(){return t.isRequired()||void 0},get"aria-disabled"(){return t.isDisabled()||void 0},get"aria-readonly"(){return t.isReadOnly()||void 0},get onInput(){return L([r.onInput,n.onInput])}},()=>t.dataset(),u))}function N(e){let t;const n=`textfield-${H()}`,s=y({id:n},e),[r,l,u]=F(s,["ref","value","defaultValue","onChange"],B),o=r.value,[i,d]=K({value:()=>o===void 0?void 0:r.value??"",defaultValue:()=>r.defaultValue,onChange:c=>r.onChange?.(c)}),{formControlContext:f}=j(l);U(()=>t,()=>d(r.defaultValue??""));const m=c=>{if(f.isReadOnly()||f.isDisabled())return;const p=c.target;d(p.value),p.value=i()??""},P={value:i,generateId:Y(()=>S(l.id)),onInput:m};return a($.Provider,{value:f,get children(){return a(E.Provider,{value:P,get children(){return a(O,h({as:"div",ref(c){var p=k(g=>t=g,r.ref);typeof p=="function"&&p(c)},role:"group",get id(){return S(l.id)}},()=>f.dataset(),u))}})}})}function D(e){let t;const n=G(),s=y({id:n.generateId("textarea")},e),[r,l]=F(s,["ref","autoResize","submitOnEnter","onKeyPress"]);J(Q([()=>t,()=>r.autoResize,()=>n.value()],([o,i])=>{!o||!i||oe(o)}));const u=o=>{t&&r.submitOnEnter&&o.key==="Enter"&&!o.shiftKey&&t.form&&(t.form.requestSubmit(),o.preventDefault())};return a(A,h({as:"textarea",get"aria-multiline"(){return r.submitOnEnter?"false":void 0},get onKeyPress(){return L([r.onKeyPress,u])},ref(o){var i=k(d=>t=d,r.ref);typeof i=="function"&&i(o)}},l))}function oe(e){const t=e.style.alignSelf,n=e.style.overflow;"MozAppearance"in e.style||(e.style.overflow="hidden"),e.style.alignSelf="start",e.style.height="auto",e.style.height=`${e.scrollHeight+(e.offsetHeight-e.clientHeight)}px`,e.style.overflow=n,e.style.alignSelf=t}var C=Object.assign(N,{Description:R,ErrorMessage:I,Input:z,Label:T,TextArea:D});const ae="_collapsibleCard_ierxt_1",ie="_addressPicker_ierxt_9",se="_namePicker_ierxt_13",le="_groupSize_ierxt_20",ue="_inputLabel_ierxt_24",de="_groupSubmit_ierxt_28",b={collapsibleCard:ae,addressPicker:ie,namePicker:se,groupSize:le,inputLabel:ue,groupSubmit:de};function ce({existingData:e,key:t,onChange:n,onRemove:s}){const[r,l]=_(e?.name||v.defaultName),[u,o]=_(e?.peopleCount||v.defaultGroupSize),[i,d]=_();e!==void 0&&d(e.location);function f(){return i()!==void 0}function m(){if(f())return new v(t(),r(),u(),i())}function P(g){l(g),n(m())}function c(g){o(g),n(m())}function p(g){d(g),n(m())}return a(x.Item,{class:"collapsibleContainer",get value(){return t().toString()},get children(){return[a(x.Header,{class:"header",get children(){return a(x.Trigger,{class:"trigger",get children(){return r()}})}}),a(x.Content,{get class(){return[b.collapsibleCard,"collapsible"].join(" ")},get children(){return[a(C,{get defaultValue(){return r()||v.defaultName},onChange:P,get class(){return b.namePicker},get children(){return[a(C.Label,{get class(){return b.inputLabel},children:"Group Name"}),a(C.Input,{class:"input"})]}}),a(Z,{onChange:c,get defaultValue(){return u()},get className(){return b.groupSize},label:"Group Size"}),a(ee,{updateAddress:p,get classNames(){return b.addressPicker},get defaultText(){return i()?.label}}),a(te,{onClick:s,class:"button",children:"Remove Group"})]}})]}})}function ge({onBack:e,onSubmit:t,existingGroups:n}){return a(re,{existingData:n,onSubmit:t,addText:"Add group",onBack:e,ListElements:ce})}export{ge as default};
