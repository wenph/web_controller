/**
 * @class Ext.app.Portal
 * @extends Object
 * A sample portal layout application class.
 */

Ext.define('Ext.app.Portal', {

    extend: 'Ext.container.Viewport',
    requires: ['Ext.app.PortalPanel', 'Ext.app.PortalColumn', 'Ext.app.GridPortlet', 'Ext.app.ChartPortlet'],

    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, header, tool){
                var portlet = header.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },

    initComponent: function(){
        var content = '<div class="portlet-content">'+Ext.example.shortBogusMarkup+'</div>';

        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 5 5 5' // pad the layout from the window edges
            },
            items: [{
                id: 'app-header',
                xtype: 'box',
                region: 'north',
                height: 40,
                html: '<span class="title-info-bar">'+ title_info_bar +'</span>' +
                      '<span class="user-info-bar">您好，'+ current_username +'</span>'
            },{
                xtype: 'container',
                region: 'center',
                layout: 'border',
                items: [{
                    id: 'app-options',
                    title: '导航栏',
                    region: 'west',
                    animCollapse: true,
                    width: 200,
                    minWidth: 150,
                    maxWidth: 400,
                    split: true,
                    collapsible: true,
                    layout:{
                        type: 'accordion',
                        animate: true
                    },
                    items: [{
                        xtype: 'xtree',
                        title:'example 1',
                        border: false,
                        autoScroll: true,
                        iconCls: 'nav',
                        url: '/example1/example1_menu_tree/',
                        listeners:{
                            itemclick: function(self, store_record, html_element, node_index, event){
                                if(store_record.data.leaf){
                                    var id = store_record.data.id;
                                    var text = store_record.data.text;
                                    var tabId = 'tab-public-dns-' + id;
                                    var title = 'Public DNS-' + text;
                                    var mainPanel = Ext.getCmp('mainPanel');
                                    var html = genIframeTag((function(id){
                                        switch(id){
                                            case "leaf1":
                                                return "/example1/example1_graph_view";
                                        }
                                        return "";
                                    })(id));
                                    addTab(mainPanel, tabId, title, '', html);
                                }
                            }
                        }
                    },{
                        xtype: 'xtree',
                        title:'example 2',
                        border: false,
                        autoScroll: true,
                        iconCls: 'nav',
                        url: '',
                        listeners:{
                            itemclick: function(self, store_record, html_element, node_index, event){
                                if(store_record.data.leaf){
                                    var mainPanel = Ext.getCmp('mainPanel');
                                    var id = store_record.data.id;
                                    var text = store_record.data.text;
                                    var tabId = 'tab-example2-' + id;
                                    var title = 'example 2' + text;
                                    var html = genIframeTag((function(id){
                                        switch(id){
                                        }
                                        return "";
                                    })(id));
                                    addTab(mainPanel, tabId, title, '', html);
                                }
                            }
                        }
                    },{
                        xtype: 'xtree',
                        title:'example 3',
                        border: false,
                        autoScroll: true,
                        iconCls: 'nav',
                        url: '',
                        listeners:{
                            itemclick: function(self, store_record, html_element, node_index, event){
                                if(store_record.data.leaf){
                                    var mainPanel = Ext.getCmp('mainPanel');
                                    var id = store_record.data.id;
                                    var text = store_record.data.text;
                                    var tabId = 'tab-example3-' + id;
                                    var title = 'example 3' + text;
                                    var html = genIframeTag((function(id){
                                        switch(id){
                                        }
                                        return "";
                                    })(id));
                                    addTab(mainPanel, tabId, title, '', html);
                                }
                            }
                        }
                    }]
                },{
                    id: 'mainPanel',
                    xtype: 'tabpanel',
                    region: 'center',
                    items: []
                },
                {
                    xtype: 'box',
                    id: 'footer',
                    region: 'south',
                    html: '<center>@2015 建议使用Chrome/Firefox浏览器访问</center>',
                    height: 20
                }]
            }]
        });
        this.callParent(arguments);
    },

    onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '" was removed');
    },

    showMsg: function(msg) {
        var el = Ext.get('app-msg'),
            msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },

    clearMsg: function(msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
});

function iframeLoadComplete(){
	var loadMask = Ext.getCmp('loadMask');
	if(loadMask)
		loadMask.hide();
}


function genIframeTag(src){
	return  '<iframe src="'+src+'" width="100%" height="100%"  border=0 frameborder=0 onload="iframeLoadComplete()"></iframe>';
}

function addTab(mainPanel,tabId,title,subTitle,html) {
//    console.log(html);
	var loadMask = Ext.getCmp('loadMask');
	if(!loadMask){
		loadMask = new Ext.LoadMask(mainPanel, {
			id: 'loadMask',
			msg:'正在加载...'
		});
	}
	loadMask.show();
	var find = Ext.getCmp(tabId);
	if(find){
		mainPanel.remove(find);
	}
    var tab;
    if(subTitle!=''){
	    tab = mainPanel.add({
	    	id: tabId,
	        title: title,
	        html: html,
	        closable: true,
	        tbar: [{ xtype: 'tbtext',id:tabId+'-tbtext',text: subTitle}]
	    });
	}
	else{
		tab = mainPanel.add({
	    	id: tabId,
	        title: title,
	        html: html,
	        closable: true
	    });
	}
    activeTabHTML = html;
    mainPanel.setActiveTab(tab);
    tab.update(html);//修复chrome高版本，第一次加载iframe height 100%失效的问题
}