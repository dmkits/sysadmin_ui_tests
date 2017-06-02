//>>built
define("dojox/data/OpmlStore","dojo/_base/declare dojo/_base/lang dojo/_base/xhr dojo/data/util/simpleFetch dojo/data/util/filter dojo/_base/kernel".split(" "),function(h,l,m,q,n,g){h=h("dojox.data.OpmlStore",null,{constructor:function(a){this._xmlData=null;this._arrayOfTopLevelItems=[];this._arrayOfAllItems=[];this._metadataNodes=null;this._loadFinished=!1;this.url=a.url;this._opmlData=a.data;a.label&&(this.label=a.label);this._loadInProgress=!1;this._queuedFetches=[];this._identityMap={};this._identCount=
0;this._idProp="_I";a&&"urlPreventCache"in a&&(this.urlPreventCache=a.urlPreventCache?!0:!1)},label:"text",url:"",urlPreventCache:!1,_assertIsItem:function(a){if(!this.isItem(a))throw Error("dojo.data.OpmlStore: a function was passed an item argument that was not an item");},_assertIsAttribute:function(a){if(!l.isString(a))throw Error("dojox.data.OpmlStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string");},_removeChildNodesThatAreNotElementNodes:function(a,
c){var b=a.childNodes;if(0!==b.length){var d=[],e,f;for(e=0;e<b.length;++e)f=b[e],1!=f.nodeType&&d.push(f);for(e=0;e<d.length;++e)f=d[e],a.removeChild(f);if(c)for(e=0;e<b.length;++e)f=b[e],this._removeChildNodesThatAreNotElementNodes(f,c)}},_processRawXmlTree:function(a){this._loadFinished=!0;this._xmlData=a;var c=a.getElementsByTagName("head")[0];c&&(this._removeChildNodesThatAreNotElementNodes(c),this._metadataNodes=c.childNodes);a=a.getElementsByTagName("body");if(c=a[0])for(this._removeChildNodesThatAreNotElementNodes(c,
!0),a=a[0].childNodes,c=0;c<a.length;++c){var b=a[c];"outline"==b.tagName&&(this._identityMap[this._identCount]=b,this._identCount++,this._arrayOfTopLevelItems.push(b),this._arrayOfAllItems.push(b),this._checkChildNodes(b))}},_checkChildNodes:function(a){if(a.firstChild)for(var c=0;c<a.childNodes.length;c++){var b=a.childNodes[c];"outline"==b.tagName&&(this._identityMap[this._identCount]=b,this._identCount++,this._arrayOfAllItems.push(b),this._checkChildNodes(b))}},_getItemsArray:function(a){return a&&
a.deep?this._arrayOfAllItems:this._arrayOfTopLevelItems},getValue:function(a,c,b){this._assertIsItem(a);this._assertIsAttribute(c);if("children"==c)return a.firstChild||b;a=a.getAttribute(c);return void 0!==a?a:b},getValues:function(a,c){this._assertIsItem(a);this._assertIsAttribute(c);var b=[];if("children"==c)for(var d=0;d<a.childNodes.length;++d)b.push(a.childNodes[d]);else null!==a.getAttribute(c)&&b.push(a.getAttribute(c));return b},getAttributes:function(a){this._assertIsItem(a);for(var c=[],
b=a.attributes,d=0;d<b.length;++d){var e=b.item(d);c.push(e.nodeName)}0<a.childNodes.length&&c.push("children");return c},hasAttribute:function(a,c){return 0<this.getValues(a,c).length},containsValue:function(a,c,b){var d=void 0;"string"===typeof b&&(d=n.patternToRegExp(b,!1));return this._containsValue(a,c,b,d)},_containsValue:function(a,c,b,d){a=this.getValues(a,c);for(c=0;c<a.length;++c){var e=a[c];if("string"===typeof e&&d)return null!==e.match(d);if(b===e)return!0}return!1},isItem:function(a){return a&&
1==a.nodeType&&"outline"==a.tagName&&a.ownerDocument===this._xmlData},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){},getLabel:function(a){if(this.isItem(a))return this.getValue(a,this.label)},getLabelAttributes:function(a){return[this.label]},_fetchItems:function(a,c,b){var d=this,e=function(a,b){var e=null;if(a.query){var e=[],f=a.queryOptions?a.queryOptions.ignoreCase:!1,h={},k;for(k in a.query){var g=a.query[k];"string"===typeof g&&(h[k]=n.patternToRegExp(g,f))}for(f=0;f<
b.length;++f){var p=!0,l=b[f];for(k in a.query)g=a.query[k],d._containsValue(l,k,g,h[k])||(p=!1);p&&e.push(l)}}else 0<b.length&&(e=b.slice(0,b.length));c(e,a)};if(this._loadFinished)e(a,this._getItemsArray(a.queryOptions));else if(this._loadInProgress)this._queuedFetches.push({args:a,filter:e});else if(""!==this.url)this._loadInProgress=!0,b=m.get({url:d.url,handleAs:"xml",preventCache:d.urlPreventCache}),b.addCallback(function(b){d._processRawXmlTree(b);e(a,d._getItemsArray(a.queryOptions));d._handleQueuedFetches()}),
b.addErrback(function(a){throw a;});else if(this._opmlData)this._processRawXmlTree(this._opmlData),this._opmlData=null,e(a,this._getItemsArray(a.queryOptions));else throw Error("dojox.data.OpmlStore: No OPML source data was provided as either URL or XML data input.");},getFeatures:function(){return{"dojo.data.api.Read":!0,"dojo.data.api.Identity":!0}},getIdentity:function(a){if(this.isItem(a))for(var c in this._identityMap)if(this._identityMap[c]===a)return c;return null},fetchItemByIdentity:function(a){if(this._loadFinished)b=
this._identityMap[a.identity],this.isItem(b)||(b=null),a.onItem&&(d=a.scope?a.scope:g.global,a.onItem.call(d,b));else{var c=this;if(""!==this.url)this._loadInProgress?this._queuedFetches.push({args:a}):(this._loadInProgress=!0,b=m.get({url:c.url,handleAs:"xml"}),b.addCallback(function(b){var e=a.scope?a.scope:g.global;try{c._processRawXmlTree(b);var d=c._identityMap[a.identity];c.isItem(d)||(d=null);a.onItem&&a.onItem.call(e,d);c._handleQueuedFetches()}catch(r){a.onError&&a.onError.call(e,r)}}),b.addErrback(function(b){this._loadInProgress=
!1;a.onError&&a.onError.call(a.scope?a.scope:g.global,b)}));else if(this._opmlData){this._processRawXmlTree(this._opmlData);this._opmlData=null;var b=this._identityMap[a.identity];c.isItem(b)||(b=null);if(a.onItem){var d=a.scope?a.scope:g.global;a.onItem.call(d,b)}}}},getIdentityAttributes:function(a){return null},_handleQueuedFetches:function(){if(0<this._queuedFetches.length){for(var a=0;a<this._queuedFetches.length;a++){var c=this._queuedFetches[a],b=c.args;(c=c.filter)?c(b,this._getItemsArray(b.queryOptions)):
this.fetchItemByIdentity(b)}this._queuedFetches=[]}},close:function(a){}});l.extend(h,q);return h});
//# sourceMappingURL=OpmlStore.js.map