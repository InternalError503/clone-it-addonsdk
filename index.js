(function(global){
	
	var buttons = require('sdk/ui/button/action');
	var tabs = require("sdk/tabs");
	var _l10n = require("sdk/l10n").get;

	// Don't copy about uri's.
	var blacklist = /^about:(accounts|addons|app-manager|blank|buildconfig|cache|config|customizing|downloads|home|newtab|license|logo|memory|networking|newaddon|permissions|plugins|preferences|privatebrowsing|rights|sessionrestore|support|serviceworkers|welcomeback)/i;

	// Clone to new tab.
	var button_tab = buttons.ActionButton({
	  id: "cloneit_button_cloneNewTab",
	  label: _l10n("clonecurrenttab"),
	  icon: {
		"16": "./images/tab-icon-16.png",
		"32": "./images/tab-icon-32.png",
		"64": "./images/tab-icon-64.png"
	  },
	  onClick: function(){
		try{
				if (!blacklist.test(tabs.activeTab.url)) {
					var { getMostRecentBrowserWindow } = require('sdk/window/utils');
					var browser = getMostRecentBrowserWindow().gBrowser;
					// Open cloned tab next to current tab.
					browser.selectedTab = browser.loadOneTab(tabs.activeTab.url, {relatedToCurrent: true});
				}
			}catch(e){}
		  }		
	});

	// Clone to new window.
	var button_window = buttons.ActionButton({
	  id: "cloneit_button_cloneNewWindow",
	  label: _l10n("clonecurrentwindow"),
	  icon: {
		"16": "./images/window-icon-16.png",
		"32": "./images/window-icon-32.png",
		"64": "./images/window-icon-64.png"
	  },
	  onClick: function(){
		try{
			if (!blacklist.test(tabs.activeTab.url)) {
				tabs.open({
					url: tabs.activeTab.url, 
					inNewWindow: true
				});
			}
		}catch(e){}
	  }
	});
	
}(this));
