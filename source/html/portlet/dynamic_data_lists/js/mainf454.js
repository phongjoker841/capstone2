AUI.add("liferay-portlet-dynamic-data-lists",function(e){var d=e.Array;var f=e.DataType.DateMath;var g=e.Lang;var j=e.JSON;var c=e.Lang.emptyFn;var i="";var h=e.Component.create({NAME:"document-library-file-entry-cell-editor",EXTENDS:e.BaseCellEditor,prototype:{ELEMENT_TEMPLATE:'<input type="hidden" />',initializer:function(){var k=this;window[Liferay.Util.getPortletNamespace("166")+"selectDocumentLibrary"]=e.bind("_selectFileEntry",k)},getElementsValue:function(){var k=this;return k.get("value")},_defInitToolbarFn:function(){var k=this;h.superclass._defInitToolbarFn.apply(k,arguments);k.toolbar.add({on:{click:e.bind("_onClickChoose",k)},label:'\u0043\u0068\u006f\u006f\u0073\u0065'},1)},_onClickChoose:function(){var k=this;var l=Liferay.PortletURL.createURL(themeDisplay.getURLControlPanel());l.setParameter("groupId",themeDisplay.getScopeGroupId());l.setParameter("struts_action","/dynamic_data_mapping/select_document_library");l.setPortletId("166");l.setWindowState("pop_up");Liferay.Util.openWindow({id:"selectDocumentLibrary",title:'\u0044\u006f\u0063\u0075\u006d\u0065\u006e\u0074\u0073\u0020\u0061\u006e\u0064\u0020\u004d\u0065\u0064\u0069\u0061',uri:l.toString()})},_selectFileEntry:function(m,o,n,p,l){var k=this;k.selectedTitle=p;k.selectedURL=m;k.set("value",j.stringify({groupId:n,title:p,uuid:o,version:l}))},_syncFileLabel:function(o,n){var k=this;var m=k.get("contentBox");var l=m.one("a");if(!l){l=e.Node.create("<a></a>");m.prepend(l)}l.setAttribute("href",n);l.setContent(o)},_uiSetValue:function(n){var k=this;if(n){var m=k.selectedTitle;var l=k.selectedURL;if(m&&l){k._syncFileLabel(m,l)}else{b.Util.getFileEntry(n,function(p){var o=b.Util.getFileEntryURL(p);k._syncFileLabel(p.title,o)})}}else{k._syncFileLabel(i,i);n=i}k.elements.val(n)}}});var b=e.Component.create({ATTRS:{portletNamespace:{validator:g.isString,value:i},recordsetId:{validator:g.isNumber,value:0},structure:{validator:g.isArray,value:[]}},CSS_PREFIX:"table",DATATYPE_VALIDATOR:{date:"date","double":"number",integer:"digits","long":"digits"},EXTENDS:e.DataTable,NAME:e.DataTable.Base.NAME,TYPE_EDITOR:{checkbox:e.CheckboxCellEditor,"ddm-date":e.DateCellEditor,"ddm-decimal":e.TextCellEditor,"ddm-integer":e.TextCellEditor,"ddm-number":e.TextCellEditor,radio:e.RadioCellEditor,select:e.DropDownCellEditor,text:e.TextCellEditor,textarea:e.TextAreaCellEditor},prototype:{initializer:function(){var k=this;k._setDataStableSort(k.get("data"));k.on("dataChange",k._onDataChange);k.on("model:change",k._onRecordUpdate)},addEmptyRows:function(l){var k=this;var m=k.get("columns");var o=k.get("data");var n=d.map(m,function(q,p,r){return q.key});o.add(b.buildEmptyRecords(l,n))},updateMinDisplayRows:function(m,n){var k=this;n=(n&&e.bind(n,k))||c;var l=k.get("recordsetId");Liferay.Service("/ddlrecordset/update-min-display-rows",{recordSetId:l,minDisplayRows:m,serviceContext:j.stringify({scopeGroupId:themeDisplay.getScopeGroupId(),userId:themeDisplay.getUserId()})},n)},_normalizeRecordData:function(m){var k=this;var l=k.get("structure");var n={};e.each(l,function(q,o,s){var p=q.type;var r=m.get(q.name);if((p==="radio")||(p==="select")){if(!g.isArray(r)){r=d(r)}r=j.stringify(r)}n[q.name]=k._normalizeValue(r)});delete n.displayIndex;delete n.recordId;return n},_normalizeValue:function(l){var k=this;return String(l)},_onDataChange:function(l){var k=this;k._setDataStableSort(l.newVal)},_onEditCell:function(k){var t=this;b.superclass._onEditCell.apply(t,arguments);var p=t.get("activeCell");var l=k.alignNode||p;var o=t.getColumn(l);var r=t.getRecord(l);var q=t.get("data");var m=t.get("recordsetId");var n=t.get("structure");var s=t.getEditor(r,o);if(s){s.setAttrs({data:q,record:r,recordsetId:m,structure:n,zIndex:Liferay.zIndex.OVERLAY})}},_onRecordUpdate:function(p){var k=this;if(!e.Object.owns(p.changed,"recordId")){var q=k.get("data");var o=k.get("recordsetId");var l=p.target;var n=l.get("recordId");var r=k._normalizeRecordData(l);var m=q.indexOf(l);if(n>0){b.updateRecord(n,m,r,true)}else{b.addRecord(o,m,r,function(s){if(s.recordId>0){l.set("recordId",s.recordId,{silent:true})}})}}},_setDataStableSort:function(l){var k=this;l.sort=function(m){if(this.comparator){m=m||{};var o=this._items.concat();e.ArraySort.stableSort(o,e.bind(this._sort,this));var n=e.merge(m,{models:o,src:"sort"});if(m.silent){this._defResetFn(n)}else{this.fire("reset",n)}}return this}}},addRecord:function(m,l,o,n){var k=this;n=(n&&e.bind(n,k))||c;Liferay.Service("/ddlrecord/add-record",{groupId:themeDisplay.getScopeGroupId(),recordSetId:m,displayIndex:l,fieldsMap:j.stringify(o),serviceContext:j.stringify({scopeGroupId:themeDisplay.getScopeGroupId(),userId:themeDisplay.getUserId(),workflowAction:Liferay.Workflow.ACTION_PUBLISH})},n)},buildDataTableColumns:function(n,l,m){var k=this;d.each(n,function(y,t,s){var x=y.dataType;var o=y.name;var v=y.type;y.key=o;var z=k.TYPE_EDITOR[v]||e.TextCellEditor;var p={elementName:o,validator:{rules:{}}};var u=y.required;var w;if(u){y.label+=" ("+'\u0052\u0065\u0071\u0075\u0069\u0072\u0065\u0064'+")"}if(v==="checkbox"){p.options={"true":'\u0054\u0072\u0075\u0065'};p.inputFormatter=function(C){return String(C.length>0)};y.formatter=function(E){var D=E.data;var C=D[o];if(C==="true"){C='\u0054\u0072\u0075\u0065'}else{if(C==="false"){C='\u0046\u0061\u006c\u0073\u0065'}}return C}}else{if(v==="ddm-date"){p.inputFormatter=function(C){return d.map(C,function(E,D,F){return E.getTime()})};p.outputFormatter=function(C){return d.map(C,function(F,E,G){var D=new Date(g.toInt(F));D=f.add(D,f.MINUTES,D.getTimezoneOffset());return D})};y.formatter=function(F){var E=F.data;var D=E[o];if(D!==i){var C=new Date(g.toInt(D));C=f.add(C,f.MINUTES,C.getTimezoneOffset());D=e.DataType.Date.format(C)}return D}}else{if((v==="ddm-decimal")||(v==="ddm-integer")||(v==="ddm-number")){p.outputFormatter=function(D){var C=e.DataType.Number.parse(D);var E=i;if(g.isNumber(C)){E=C}return E};y.formatter=function(E){var D=E.data;var C=e.DataType.Number.parse(D[o]);if(!g.isNumber(C)){C=i}return C}}else{if(v==="ddm-documentlibrary"){y.formatter=function(G){var F=G.data;var D=i;var E=F[o];if(E!==i){var C=b.Util.parseJSON(E);if(C.title){D=C.title}}return D}}else{if((v==="radio")||(v==="select")){w=k.findStructureFieldByAttribute(l,"name",o);var B=e.DataType.Boolean.parse(w.multiple);var A=k.getCellEditorOptions(w.options);y.formatter=function(F){var E=F.data;var C=[];var D=E[o];d.each(D,function(G,I,H){C.push(A[G])});return C.join(", ")};p.inputFormatter=d;p.multiple=B;p.options=A}}}}}var r=k.DATATYPE_VALIDATOR[x];var q=p.validator.rules;q[o]=e.mix({required:u},q[o]);if(r){q[o][r]=true}if(m&&y.editable){y.editor=new z(p)}});return n},buildEmptyRecords:function(l,n){var k=this;var o=[];for(var m=0;m<l;m++){o.push(k.getRecordModel(n))}return o},findStructureFieldByAttribute:function(k,l,m){var n=null;d.some(k,function(p,o,q){n=p;return(n[l]===m)});return n},getCellEditorOptions:function(k){var l={};d.each(k,function(n,m,o){l[n.value]=n.label});return l},getRecordModel:function(m){var k=this;var l={};d.each(m,function(o,n,p){l[o]=i});return l},updateRecord:function(m,l,p,o,n){var k=this;n=(n&&e.bind(n,k))||c;Liferay.Service("/ddlrecord/update-record",{recordId:m,displayIndex:l,fieldsMap:j.stringify(p),mergeFields:o,serviceContext:j.stringify({scopeGroupId:themeDisplay.getScopeGroupId(),userId:themeDisplay.getUserId(),workflowAction:Liferay.Workflow.ACTION_PUBLISH})},n)}});b.Util={getFileEntry:function(l,m){var k=this;l=k.parseJSON(l);Liferay.Service("/dlapp/get-file-entry-by-uuid-and-group-id",{uuid:l.uuid,groupId:l.groupId},m)},getFileEntryURL:function(m){var k=this;var l=[themeDisplay.getPathContext(),"documents",m.groupId,m.folderId,encodeURIComponent(m.title)];return l.join("/")},parseJSON:function(m){var k=this;var l={};try{l=j.parse(m)}catch(n){}return l}};b.TYPE_EDITOR["ddm-documentlibrary"]=h;Liferay.SpreadSheet=b;var a={previewDialog:null,openPreviewDialog:function(m){var k=this;var l=k.previewDialog;if(!l){l=Liferay.Util.Window.getWindow({dialog:{bodyContent:m},title:'\u0050\u0072\u0065\u0076\u0069\u0065\u0077'});k.previewDialog=l}else{l.show();l.set("bodyContent",m)}}};Liferay.DDLUtil=a},"",{requires:["aui-arraysort","aui-datatable","datatable-sort","json","liferay-portlet-url","liferay-util-window"]});