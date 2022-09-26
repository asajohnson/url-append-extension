# Microsoft Learn URL Appender browser extension

This is a Chrome/Edge extension that allows you to do a one-time configuration to save a desired tracking parameter you would like appended to Microsoft Learn URLs, then easily copy the URL for any Microsoft Learn page, with previous tracking parameters replaced with your desired one.

## Installation

This extension is not yet available in the Chrome and Edge extension stores, so will have to be side-loaded. 

* [Here is a CNET article](https://www.cnet.com/tech/services-and-software/how-to-install-chrome-extensions-manually/) that explains how to sideload it into Chrome.
* [Here is a Microsoft Learn article](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading) that explains how to side load into Edge.

## How to use

**To use the extension:**
 
1. Sideload the extension into Chrome or Edge
1. Pin the extension to the URL bar
1. Right-click the extension icon
1. Input your desired tracking parameter to append (or any text for testing)
1. Click Save
1. Browse to any Microsoft Learn page (ex: [Azure developer documentation](https://learn.microsoft.com/en-us/azure/developer/))
1. Click the extension icon (or, right-click anywhere on the page and select 'Copy URL and add tracking')
1. Paste the URL somewhere and validate that it has your desired parameter appended

**Test other scenarios:**

1. Go to a [Learn page that already has a tracking parameter added](https://learn.microsoft.com/en-us/azure/developer/?wt.mc_id=test) and use the extension. (It should strip out the existing tracking parameter and add yours instead.)
1. Input a blank parameter in the options. (It should copy the URL as-is.)
1. Copy the URL from the browser bar without using the extension. (It should copy the URL as-is.)
1. Change the desired tracking parameter in the input options. (It should now do the expected copy behaviors, but with the new tracking parameter.)
## Privacy and Permissions

There are no specific permissions you have to authorize for the extension to run, but the application itself uses the following [Chrome extension permissions](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/):

* **clipboardWrite** - Allows the extension to put the URL into clipboard
* **contextMenus** - Allows the extension to add 'Copy Page URL' and 'Copy Frame URL' items to the context menu
* **scripting** - Allows the background service worker to access the "addToClipboard" script
* **storage** - Allows the extension to store extension settings in the browser storage

After clicking on the extension icon in the browser UI, or selecting the copy option in a right-click context menu, the extension obtains the URL of a currently viewed webpage or a webpage frame, optionally removes some parts of the URL, and places the URL into the clipboard. The extension does not handle the URL in any other way, and does not handle any other user data.

## Release notes

* **v1.0:** Released initial Chrome manifest v3 version. 

## Roadmap

* Submit to Chrome/Edge extension libraries.
* Allow for multiple inputs; and picker to easily toggle for which one they want.
* Add validation to not have it work on non-Learn sites.
* Strip locale during copy

## License

Code: [MIT](LICENSE)