"use strict";
cc._RF.push(module, '9f70da7xStCNa/QiU/YPhzE', 'FBInstantGames');
// scripts/FBInstantGames.js

'use strict';

// Facebook 官方 API 传送门：https://developers.facebook.com/docs/games/instant-games/sdk
// 使用 Instant Games API 自定义组件（通常用户会自己自身需求去使用 API）
// 目前这里只是用了以下基础 API
// 玩家信息
// 1. FBInstant.player.getName
// 2. FBInstant.player.getID
// 3. FBInstant.player.getPhoto
// 其他信息
// 1. FBInstant.context.getID
// 2. FBInstant.context.getType
// 3. FBInstant.getLocale
// 4. FBInstant.getPlatform
// 4. FBInstant.getSDKVersion
// 退出，分享功能
// 1. FBInstant.quit
// 2. FBInstant.shareAsync
cc.Class({
    extends: cc.Component,
    properties: {
        avatar: cc.Sprite, // 头像
        nick_name: cc.Label, // 昵称
        id: cc.Label, // ID
        info: cc.Label, // 其他信息
        log: cc.Label, //LOG内容 
        pointTip: cc.Label //分数提示
    },

    point: 0, //分数
    userid: '',
    start: function start() {
        var _this = this;

        this.point = 0;
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }

        // 显示玩家信息
        this.userid = FBInstant.player.getID();

        // 设置昵称
        this.nick_name.string = 'Name:' + FBInstant.player.getName();
        // 设置 ID
        this.id.string = 'ID:' + FBInstant.player.getID();
        // 设置头像
        var photoUrl = FBInstant.player.getPhoto();
        cc.loader.load(photoUrl, function (err, texture) {
            _this.avatar.spriteFrame = new cc.SpriteFrame(texture);
        });
        // 设置其他信息
        var info = {
            contextID: FBInstant.context.getID(), // 游戏 ID
            contextType: FBInstant.context.getType(), // 游戏类型
            locale: FBInstant.getLocale(), // 地区
            platform: FBInstant.getPlatform(), // 平台
            sdkVersion: FBInstant.getSDKVersion() // SDK 版本号
        };
        this.info.string = 'Context ID: ' + info.contextID + '\n' + 'Context Type: ' + info.contextType + '\n' + 'Locale: ' + info.locale + '\n' + 'Platform: ' + info.platform + '\n' + 'SDKVersion: ' + info.sdkVersion;
    },


    // 退出游戏
    onQuitGame: function onQuitGame() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }

        FBInstant.quit();
    },


    // 分享功能
    onShareGame: function onShareGame() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }

        FBInstant.shareAsync({
            intent: 'SHARE',
            image: this.getImgBase64(),
            text: 'X is asking for your help!',
            data: { myReplayData: '...' }
        }).then(function () {
            // continue with the game.
            self.ShowLog("share successed");
        });
    },

    //choose功能
    onChooseAsyncTest: function onChooseAsyncTest() {
        var _this2 = this;

        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }

        FBInstant.context.chooseAsync().then(function () {
            // continue with the game.
            self.ShowLog(FBInstant.context.getID());
            FBInstant.updateAsync({
                action: 'CUSTOM',
                cta: 'Join The Fight',
                image: _this2.getImgBase64(),
                text: {
                    default: 'X just invaded Y\'s village!',
                    localizations: {
                        ar_AR: 'X \u0641\u0642\u0637 \u063A\u0632\u062A ' + '\u0642\u0631\u064A\u0629 Y!',
                        en_US: 'X just invaded Y\'s village!',
                        es_LA: '\xA1X acaba de invadir el pueblo de Y!'
                    }
                },
                template: 'VILLAGE_INVASION',
                data: { myReplayData: '...' },
                strategy: 'IMMEDIATE',
                notification: 'NO_PUSH'
            }).then(function () {
                self.ShowLog("update test succeed!");
            }).catch(function (reason) {
                self.ShowLog("update failed. CODE:" + reason.code + " Message:" + reason.message);
            });;
        }).catch(function (reason) {
            self.ShowLog("choose failed. CODE:" + reason.code + " Message:" + reason.message);
        });
    },

    //Interstitial Ad测试
    onInterstitialAdTest: function onInterstitialAdTest() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }

        var ad = null;

        FBInstant.getInterstitialAdAsync('1825071287585077_1841418182617054' // Your Ad Placement Id
        ).then(function (interstitial) {
            // Load the Ad asynchronously
            ad = interstitial;
            self.ShowLog('placementId:' + ad.getPlacementID());
            return ad.loadAsync();
        }).then(function () {
            self.ShowLog('Interstitial ad preloaded');
            return ad.showAsync();
        }).then(function () {
            self.ShowLog('Interstitial ad show');
        }).catch(function (reason) {
            self.ShowLog("Interstitial ad failed. CODE:" + reason.code + " Message:" + reason.message);
        });
    },

    //Rewarded Video测试
    onRewardedVideoTest: function onRewardedVideoTest() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }

        var preloadedInterstitial = null;

        FBInstant.getRewardedVideoAsync('1825071287585077_1841418182617054' // Your Ad Placement Id
        ).then(function (interstitial) {
            // Load the Ad asynchronously
            preloadedInterstitial = interstitial;
            self.ShowLog('placementId:' + preloadedInterstitial.getPlacementID());
            return preloadedInterstitial.loadAsync();
        }).then(function () {
            self.ShowLog('Rewarded Video preloaded');
            return preloadedInterstitial.showAsync();
        }).then(function () {
            self.ShowLog('Rewarded Video show');
        }).catch(function (reason) {
            self.ShowLog("Rewarded Video failed. CODE:" + reason.code + " Message:" + reason.message);
        });
    },

    //获取排行榜
    onLeaderboardCountTest: function onLeaderboardCountTest() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }
        var leaderboardID = this.getLeaderboardID();
        FBInstant.getLeaderboardAsync(leaderboardID).then(function (leaderboard) {
            return leaderboard.getEntryCountAsync();
        }).then(function (count) {
            self.ShowLog("Leaderboard Count: " + count);
            //update更新，因为回调的this不指向这个脚本，因此重写一遍
            return FBInstant.updateAsync({
                action: 'LEADERBOARD',
                name: leaderboardID
            });
        }).then(function () {
            console.log('Update Posted');
        }).catch(function (reason) {
            self.ShowLog("Get Leaderboard count failed. CODE:" + reason.code + " Message:" + reason.message);
        });
    },

    //获取排行榜上所有的分数
    onGetAllScoreTest: function onGetAllScoreTest() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }
        var leaderboardID = this.getLeaderboardID();
        FBInstant.getLeaderboardAsync(leaderboardID).then(function (leaderboard) {
            return leaderboard.getEntriesAsync();
        }).then(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                var log = entries[i].getRank() + '. ' + entries[i].getPlayer().getName() + ': ' + entries[i].getScore();

                self.ShowLog(log);
            }

            //update更新，因为回调的this不指向这个脚本，因此重写一遍
            return FBInstant.updateAsync({
                action: 'LEADERBOARD',
                name: leaderboardID
            });
        }).then(function () {
            console.log('Update Posted');
        }).catch(function (reason) {
            self.ShowLog("Get all score failed. CODE:" + reason.code + " Message:" + reason.message);
        });
    },

    //获取排行榜上自己的分数
    onGetPlayerScoreTest: function onGetPlayerScoreTest() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }
        var leaderboardID = this.getLeaderboardID();

        FBInstant.getLeaderboardAsync(leaderboardID).then(function (leaderboard) {
            return leaderboard.getPlayerEntryAsync();
        }).then(function (entry) {
            var log = entry.getRank() + '. ' + entry.getPlayer().getName() + ': ' + entry.getScore();

            self.ShowLog(log);

            //update更新，因为回调的this不指向这个脚本，因此重写一遍
            return FBInstant.updateAsync({
                action: 'LEADERBOARD',
                name: leaderboardID
            });
        }).then(function () {
            console.log('Update Posted');
        }).catch(function (reason) {
            self.ShowLog("Get player score failed. CODE:" + reason.code + " Message:" + reason.message);
        });
    },

    //向排行榜上传自己的分数
    onSetPlayerScoreTest: function onSetPlayerScoreTest() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }
        var score = this.point;
        var leaderboardID = this.getLeaderboardID();
        FBInstant.getLeaderboardAsync(leaderboardID).then(function (leaderboard) {
            return leaderboard.setScoreAsync(score, '{race: "elf", level: 3}');
        }).then(function (entry) {
            self.ShowLog(entry.getScore());
            self.ShowLog(entry.getExtraData());

            //update更新，因为回调的this不指向这个脚本，因此重写一遍
            return FBInstant.updateAsync({
                action: 'LEADERBOARD',
                name: leaderboardID
            });
        }).then(function () {
            console.log('Update Posted');
        }).catch(function (reason) {
            self.ShowLog("Set player score failed. CODE:" + reason.code + " Message:" + reason.message);
        });
    },
    onGetConnectedPlayersTest: function onGetConnectedPlayersTest() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }
        var score = this.point;
        var leaderboardID = this.getLeaderboardID();
        FBInstant.getLeaderboardAsync(leaderboardID).then(function (leaderboard) {
            return leaderboard.getConnectedPlayerEntriesAsync();
        }).then(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                var log = entries[i].getRank() + '. ' + entries[i].getPlayer().getName() + ': ' + entries[i].getScore();

                self.ShowLog(log);
            }
            //update更新，因为回调的this不指向这个脚本，因此重写一遍
            return FBInstant.updateAsync({
                action: 'LEADERBOARD',
                name: leaderboardID
            });
        }).then(function () {
            console.log('Update Posted');
        }).catch(function (reason) {
            self.ShowLog("Get connected players failed. CODE:" + reason.code + " Message:" + reason.message);
        });
    },
    onSetSessionDataTest: function onSetSessionDataTest() {
        var self = this;
        if (typeof FBInstant === 'undefined') {
            self.ShowLog('no sdk');
            return;
        }

        if (FBInstant.context.getID()) {
            FBInstant.setSessionData({ myScore: this.point });
        } else {
            self.ShowLog('current context id is null');
        }
    },

    //jssdk graph api friend list
    onJSGetFriendListTest: function onJSGetFriendListTest() {
        var self = this;
        if (typeof FB === 'undefined') {
            self.ShowLog('no jssdk');
            return;
        }

        // access token
        // FB.getLoginStatus(function(response) {
        //     if (response.status === 'connected') {
        //         var accessToken = response.authResponse.accessToken;

        //     } 
        // });

        /* make the API call */
        FB.api("/" + this.userid + "/friends", function (response) {
            if (response && !response.error) {
                /* handle the result */
                console.log("find user data");
            }
            if (response.error) {
                console.log("get user data failed. CODE:" + response.error.code + " Message:" + response.error.message);
            }
        });
    },

    // 截屏返回 iamge base6，用于 Share
    getImgBase64: function getImgBase64() {
        var sp = cc.find('Canvas/New Sprite(Splash)').getComponent(cc.Sprite);

        var target = cc.find('Canvas');
        var width = 960,
            height = 640;
        var renderTexture = new cc.RenderTexture(width, height);
        renderTexture.begin();
        target._sgNode.visit();
        renderTexture.end();
        //
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            var texture = renderTexture.getSprite().getTexture();
            var image = texture.getHtmlElementObj();
            ctx.drawImage(image, 0, 0);
        } else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            var buffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
            var _texture = renderTexture.getSprite().getTexture()._glID;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, _texture, 0);
            var data = new Uint8Array(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            var rowBytes = width * 4;
            for (var row = 0; row < height; row++) {
                var srow = height - 1 - row;
                var data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
                var imageData = new ImageData(data2, width, 1);
                ctx.putImageData(imageData, 0, row);
            }
        }
        return canvas.toDataURL('image/png');
    },
    getPointTest: function getPointTest() {
        this.point += 1;
        this.pointTip.string = "当前分数是：" + this.point;
    },
    ShowLog: function ShowLog(value) {
        // var date = new Date();
        var oldLog = this.log.string;
        this.log.string = /* date.getTime() + " " + */value + "\n" + oldLog;
    },
    onLeaderboardUpdate: function onLeaderboardUpdate() {
        var self = this;
        FBInstant.updateAsync({
            action: 'LEADERBOARD',
            name: this.getLeaderboardID()
        }).then(function () {
            return console.log('Update Posted');
        }).catch(function (error) {
            return console.error(error);
        });
    },
    getLeaderboardID: function getLeaderboardID() {
        if (FBInstant.context.getID()) {
            return '51 Test Leaderboards.' + FBInstant.context.getID();
        } else {
            return '51 Global Leaderboard 1';
            // return '51 Test Leaderboards.1612523208877149';
        }
    }
});

cc._RF.pop();