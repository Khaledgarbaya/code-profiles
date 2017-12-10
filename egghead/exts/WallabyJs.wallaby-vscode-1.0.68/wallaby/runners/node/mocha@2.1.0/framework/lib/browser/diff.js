/*
 * Wallaby.js - v1.0.529
 * http://wallabyjs.com
 * Copyright (c) 2014-2017 Wallaby.js - All Rights Reserved.
 *
 * This source code file is a part of Wallaby.js and is a proprietary (closed source) software.

 * IMPORTANT:
 * Wallaby.js is a tool made by software developers for software developers with passion and love for what we do.
 * Pirating the tool is not only illegal and just morally wrong,
 * it is also unfair to other fellow programmers who are using it legally,
 * and very harmful for the tool and its future.
 */
var JsDiff=function(){function e(e){return{newPos:e.newPos,components:e.components.slice(0)}}function t(e){for(var t=[],n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t}function n(e){var t=e;return t=t.replace(/&/g,"&amp;"),t=t.replace(/</g,"&lt;"),t=t.replace(/>/g,"&gt;"),t=t.replace(/"/g,"&quot;")}var i=function(e){this.ignoreWhitespace=e};i.prototype={diff:function(t,n){if(n===t)return[{value:n}];if(!n)return[{value:t,removed:!0}];if(!t)return[{value:n,added:!0}];n=this.tokenize(n),t=this.tokenize(t);var i=n.length,r=t.length,s=i+r,o=[{newPos:-1,components:[]}],a=this.extractCommon(o[0],n,t,0);if(o[0].newPos+1>=i&&a+1>=r)return o[0].components;for(var l=1;s>=l;l++)for(var c=-1*l;l>=c;c+=2){var u,d=o[c-1],h=o[c+1];a=(h?h.newPos:0)-c,d&&(o[c-1]=void 0);var p=d&&d.newPos+1<i,f=h&&a>=0&&r>a;if(p||f){!p||f&&d.newPos<h.newPos?(u=e(h),this.pushComponent(u.components,t[a],void 0,!0)):(u=e(d),u.newPos++,this.pushComponent(u.components,n[u.newPos],!0,void 0));var a=this.extractCommon(u,n,t,c);if(u.newPos+1>=i&&a+1>=r)return u.components;o[c]=u}else o[c]=void 0}},pushComponent:function(e,t,n,i){var r=e[e.length-1];r&&r.added===n&&r.removed===i?e[e.length-1]={value:this.join(r.value,t),added:n,removed:i}:e.push({value:t,added:n,removed:i})},extractCommon:function(e,t,n,i){for(var r=t.length,s=n.length,o=e.newPos,a=o-i;r>o+1&&s>a+1&&this.equals(t[o+1],n[a+1]);)o++,a++,this.pushComponent(e.components,t[o],void 0,void 0);return e.newPos=o,a},equals:function(e,t){var n=/\S/;return!this.ignoreWhitespace||n.test(e)||n.test(t)?e===t:!0},join:function(e,t){return e+t},tokenize:function(e){return e}};var r=new i,s=new i(!0),o=new i;s.tokenize=o.tokenize=function(e){return t(e.split(/(\s+|\b)/))};var a=new i(!0);a.tokenize=function(e){return t(e.split(/([{}:;,]|\s+)/))};var l=new i;return l.tokenize=function(e){for(var t=[],n=e.split(/^/m),i=0;i<n.length;i++){var r=n[i],s=n[i-1];"\n"==r&&s&&"\r"===s[s.length-1]?t[t.length-1]+="\n":r&&t.push(r)}return t},{Diff:i,diffChars:function(e,t){return r.diff(e,t)},diffWords:function(e,t){return s.diff(e,t)},diffWordsWithSpace:function(e,t){return o.diff(e,t)},diffLines:function(e,t){return l.diff(e,t)},diffCss:function(e,t){return a.diff(e,t)},createPatch:function(e,t,n,i,r){function s(e){return e.map(function(e){return" "+e})}function o(e,t,n){var i=c[c.length-2],r=t===c.length-2,s=t===c.length-3&&(n.added!==i.added||n.removed!==i.removed);/\n$/.test(n.value)||!r&&!s||e.push("\\ No newline at end of file")}var a=[];a.push("Index: "+e),a.push("==================================================================="),a.push("--- "+e+("undefined"==typeof i?"":"	"+i)),a.push("+++ "+e+("undefined"==typeof r?"":"	"+r));var c=l.diff(t,n);c[c.length-1].value||c.pop(),c.push({value:"",lines:[]});for(var u=0,d=0,h=[],p=1,f=1,_=0;_<c.length;_++){var y=c[_],g=y.lines||y.value.replace(/\n$/,"").split("\n");if(y.lines=g,y.added||y.removed){if(!u){var v=c[_-1];u=p,d=f,v&&(h=s(v.lines.slice(-4)),u-=h.length,d-=h.length)}h.push.apply(h,g.map(function(e){return(y.added?"+":"-")+e})),o(h,_,y),y.added?f+=g.length:p+=g.length}else{if(u)if(g.length<=8&&_<c.length-2)h.push.apply(h,s(g));else{var m=Math.min(g.length,4);a.push("@@ -"+u+","+(p-u+m)+" +"+d+","+(f-d+m)+" @@"),a.push.apply(a,h),a.push.apply(a,s(g.slice(0,m))),g.length<=4&&o(a,_,y),u=0,d=0,h=[]}p+=g.length,f+=g.length}}return a.join("\n")+"\n"},applyPatch:function(e,t){for(var n=t.split("\n"),i=[],r=!1,s=!1,o="I"===n[0][0]?4:0;o<n.length;o++)if("@"===n[o][0]){var a=n[o].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);i.unshift({start:a[3],oldlength:a[2],oldlines:[],newlength:a[4],newlines:[]})}else"+"===n[o][0]?i[0].newlines.push(n[o].substr(1)):"-"===n[o][0]?i[0].oldlines.push(n[o].substr(1)):" "===n[o][0]?(i[0].newlines.push(n[o].substr(1)),i[0].oldlines.push(n[o].substr(1))):"\\"===n[o][0]&&("+"===n[o-1][0]?r=!0:"-"===n[o-1][0]&&(s=!0));for(var l=e.split("\n"),o=i.length-1;o>=0;o--){for(var c=i[o],u=0;u<c.oldlength;u++)if(l[c.start-1+u]!==c.oldlines[u])return!1;Array.prototype.splice.apply(l,[c.start-1,+c.oldlength].concat(c.newlines))}if(r)for(;!l[l.length-1];)l.pop();else s&&l.push("");return l.join("\n")},convertChangesToXML:function(e){for(var t=[],i=0;i<e.length;i++){var r=e[i];r.added?t.push("<ins>"):r.removed&&t.push("<del>"),t.push(n(r.value)),r.added?t.push("</ins>"):r.removed&&t.push("</del>")}return t.join("")},convertChangesToDMP:function(e){for(var t,n=[],i=0;i<e.length;i++)t=e[i],n.push([t.added?1:t.removed?-1:0,t.value]);return n}}}();"undefined"!=typeof module&&(module.exports=JsDiff);