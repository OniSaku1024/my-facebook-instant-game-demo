(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/FBGameServices.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f24ecCsEmFC4bJaktFzDf+n', 'FBGameServices', __filename);
// scripts/FBGameServices.js

'use strict';

// These services are based on the Facebook SDK for JavaScript.
// You should load https://connect.facebook.net/en_US/all.js before using the FB API.

cc.Class({
    extends: cc.Component,

    properties: {
        outTips: cc.Label
    },

    start: function start() {
        if (typeof FB === 'undefined') {
            cc.error('These services are based on the Facebook SDK for JavaScript. ' + 'You should load https://connect.facebook.net/en_US/all.js before using the FB API.');
        };
        FB.init({
            appId: '1901989576734054',
            autoLogAppEvents: true,
            status: true,
            xfbml: true,
            version: 'v2.9'
        });
    },
    onLogin: function onLogin() {
        var _this = this;

        if (typeof FB === 'undefined') return;
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    _this.outTips.string = 'Good to see you, ' + response.name + '.' + response.id;
                });
            } else {
                _this.outTips.string = 'User cancelled login or did not fully authorize.';
            }
        });
    },
    onLogout: function onLogout() {
        var _this2 = this;

        if (typeof FB === 'undefined') return;
        FB.logout(function (response) {
            _this2.outTips.string = 'logout';
            console.log(response);
        });
    },
    onShare: function onShare() {
        if (typeof FB === 'undefined') return;
        FB.ui({
            method: 'share',
            href: 'https://developers.facebook.com/docs/'
        }, function (response) {
            console.log(response);
        });
    },
    onAppRequests: function onAppRequests() {
        var _this3 = this;

        if (typeof FB === 'undefined') return;
        FB.ui({
            method: 'apprequests',
            message: 'Hello !!!'
        }, function (response) {
            _this3.outTips.string = JSON.stringify(response);
        });
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=FBGameServices.js.map
        