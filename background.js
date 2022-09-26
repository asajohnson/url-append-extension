var timeout;
let lifeline;

keepAlive();

chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

async function keepAlive() {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: 'keepAlive' }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}
// default state goes here
// this runs ONE TIME ONLY (unless the user reinstalls your extension)
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       files: ["./foreground.js"]
//     })
//       .then(() => {
//         console.log("INJECTED THE FOREGROUND SCRIPT.");
//       })
//       .catch(err => console.log(err));
//   }
// });

chrome.runtime.onInstalled.addListener(function () {

  function cleanURL(url) {
 
    var a = new URL(url);
 
    a.search = removeTrackingTags(a.search.replace(/^\?(.*)/, ''));
 
    a.hash = removeTrackingTags(a.hash.replace(/^#/, ''));
  
    return a
  }

  function removeTrackingTags(str) {
    return str
      .split('&')
      .filter(function (item) {
        return !/^(utm_|from=|_openstat)/.test(item);
      })
      .join('&');
  }
  function setBadgeText(text) {
    chrome.action.setBadgeText({
      text: text  
    });
  }
  function copy_tab(tab, raw_url) {


    console.log(raw_url)
    chrome.storage.sync.get(['user_input'], function (result) {
      const new_tracking_id = result.user_input;
      const url = cleanURL(raw_url);
      // console.log("orginal url: " + url.toString())
      
      url.searchParams.set("wt.mc_id", new_tracking_id);
      // console.log("new url: " + url.toString())

      chrome.storage.sync.set({
        url: url.toString(),
      }, function () {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['addToClipboard.js']
        });
        setBadgeText('OK!');
        clearTimeout(timeout);
        timeout = setTimeout(setBadgeText.bind(null, ''), 1000);
      });
    });
    // chrome.action.setIcon({
    //   path: 'icon/LearnAppenderIcon128.png'
    // });

  }
  chrome.action.onClicked.addListener((tab) => copy_tab(tab, tab.url));
  chrome.contextMenus.create({
    'id': 'copy-page-url',
    'title': 'Copy URL and add tracking',
    'contexts': [
      'page',
      'selection',
      'link',
      'editable',
      'image',
      'video',
      'audio'
    ]
  });
  chrome.contextMenus.onClicked.addListener(
    (info, tab) => copy_tab(tab, info.pageUrl),
  )
});