class s{_messageId=0;_messagesMap=new Map;constructor(){}on(s,e,t=null,a=0,o=!1){const l={id:""+ ++this._messageId,callback:e,target:t,order:a,once:o},c=this._messagesMap.get(s);return c?(c.push(l),c.sort(((s,e)=>s.order-e.order))):this._messagesMap.set(s,[l]),l.id}once(s,e,t=null,a=0){return this.on(s,e,t,a,!0)}off(s,e,t=null){const a=this._messagesMap.get(s);if(a)for(let s=a.length-1;s>=0;s--)a[s].callback===e&&a[s].target==t&&a.splice(s,1)}offById(s,e){const t=this._messagesMap.get(s);if(t)for(let s=t.length-1;s>=0;s--)t[s].id===e&&t.splice(s,1)}offAll(s){this._messagesMap.has(s)&&this._messagesMap.delete(s)}emit(s,...e){const t=this._messagesMap.get(s);if(t){const s=[];for(const a of t)a.target?a.callback.call(a.target,...e):a.callback(...e),a.once&&s.push(a);if(s.length>0)for(const e of s){const s=t.indexOf(e);-1!==s&&t.splice(s,1)}}}}export{s as YXPubSub};
//# sourceMappingURL=index.js.map
