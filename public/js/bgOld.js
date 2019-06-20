


(function () {

    // Settings

    var settings = {
        enableToolbar: false,
        toolbarPosition: 'top',
        isEnableProxy: true,
        newsFilter: [],
        toolbarFilter: [],
        iconSrc: './img/icon128.png',
        iconGraySrc: './img/icon128_gray.png',
    };

    var icon = './img/icon128.png';
    var iconGray = './img/icon128_gray.png';
    var animation = new iconAnimator(icon);


    // init Settings
    var initSettings = function () {
        chrome.storage.local.get('mmCrExtSettings', function (data) {
            data.mmCrExtSettings && (settings = data.mmCrExtSettings);
        });

    };

    var setSettings = function (settings) {
        chrome.storage.local.set({'mmCrExtSettings': settings});
    };

    // init messaging

    var initMessaging = function () {
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                var cmd = request.cmd;
                var data = request.data;
                var tabId = (sender.tab || {}).id;
                switch (cmd) {

                    case 'tab.ready-mmCrExt':
                        chrome.tabs.sendMessage(tabId,
                            {
                                cmd: 'toggleWidget-mmCrExt',
                                data: settings.enableToolbar
                            });
                        break;

                    case "toggleWidget-mmCrExt":
                        toolbarToggle();
                        break;

                    default:
                        return
                }
            });
    };

    //icon

    var setIcon = function (isOn, tabId) {
        var path = iconGray;
        if (isOn) path = icon;
        animation.flipHorizontalChange(path);
    };

    var setBadge = function () {
        var badgeColor = settings.isEnableProxy ? '#008b00' : '#aaaaaa';
        chrome.browserAction.setBadgeText({text: 'P'});
        chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
    }

    // toolbar Toggle

    var toolbarToggle = function (tab) {
        settings.enableToolbar = !settings.enableToolbar;
        setIcon(settings.enableToolbar);
        setSettings(settings);

        chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id,
                    {
                        cmd: 'toggleWidget-mmCrExt',
                        data: settings.enableToolbar
                    });
            }
        });
    };

    // Listeners

    chrome.runtime.onInstalled.addListener(function (details) {
        setSettings(settings);
    });




    // init

    var init = function () {
        initSettings();
        initMessaging();
        setBadge();
        animation.set();
    };

    init();


// animation.rotate();
// animation.flipHorizontal();
// animation.flipVertical();
// animation.pulse();
// animation.flipHorizontalChange("/img/icon128_gray.png");

    // chrome.browserAction.setTitle({
    //     title:'it works!'
    //     });


})();


function iconAnimator(strPath) {
    var icon = document.createElement("img");
    icon.setAttribute('src', strPath);
    var canvas = document.createElement("canvas");
    canvas.setAttribute('width', '19');
    canvas.setAttribute('height', '19');
    var canvasContext = canvas.getContext('2d');
    var time = 0;

    this.set = function () {
        chrome.browserAction.setIcon({path: {"19": strPath}});
    }

    function ease(x) {
        return (1 - Math.sin(Math.PI / 2 + x * Math.PI)) / 2;
    }

    this.rotate = function () {
        var rotation = -2;
        var animationFrames = 120;
        var animationSpeed = 5;

        function drawIconAtRotation() {
            var width = canvas.width - 2;
            var height = canvas.height - 2;
            canvasContext.save();
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
            canvasContext.rotate(2 * Math.PI * ease(rotation));
            canvasContext.drawImage(icon, -Math.ceil(width / 2), -Math.ceil(height / 2), width, height);
            canvasContext.restore();
            chrome.browserAction.setIcon({imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
        }

        function Do() {
            rotation += 1 / animationFrames;
            drawIconAtRotation();
            if (rotation <= 1) {
                setTimeout(Do, animationSpeed);
            } else {
                rotation = 0;
                chrome.browserAction.setIcon({path: {"19": icon.src}});
            }
        }

        Do();
    };

    this.flipHorizontal = function () {
        var rotation = -6;
        var animationFrames = 60;
        var animationSpeed = 1;

        function drawIconAtRotation() {
            canvasContext.save();
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
            canvasContext.scale(ease(rotation), 1);
            canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
            canvasContext.restore();
            chrome.browserAction.setIcon({imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
        }

        function Do() {
            rotation += 1 / animationFrames;
            drawIconAtRotation();
            if (rotation <= 1) {
                setTimeout(Do, animationSpeed);
            } else {
                rotation = -2;
                chrome.browserAction.setIcon({path: {"19": icon.src}});
            }
        }

        Do();
    };
    this.flipVertical = function () {
        var rotation = -6;
        var animationFrames = 60;
        var animationSpeed = 1;

        function drawIconAtRotation() {
            canvasContext.save();
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
            canvasContext.scale(1, ease(rotation));
            canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
            canvasContext.restore();
            chrome.browserAction.setIcon({imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
        }

        function Do() {
            rotation += 1 / animationFrames;
            drawIconAtRotation();
            if (rotation <= 1) {
                setTimeout(Do, animationSpeed);
            } else {
                rotation = -2;
                chrome.browserAction.setIcon({path: {"19": icon.src}});
            }
        }

        Do();
    };
    this.pulse = function () {
        var rotation = -5;
        var animationFrames = 60;
        var animationSpeed = 2;

        function drawIconAtRotation() {
            canvasContext.save();
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
            canvasContext.scale(ease(rotation), ease(rotation));
            canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
            canvasContext.restore();
            chrome.browserAction.setIcon({imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
        }

        function Do() {
            rotation += 1 / animationFrames;
            drawIconAtRotation();
            if (rotation <= 1) {
                setTimeout(Do, animationSpeed);
            } else {
                rotation = -3;
                chrome.browserAction.setIcon({path: {"19": icon.src}});
            }
        }

        Do();
    };

    this.flipHorizontalChange = function (Icon) {
        var rotation = -1;
        var animationFrames = 35;
        var animationSpeed = 7;
        var i = 0;


        var newIcon = document.createElement("img");
        newIcon.setAttribute('src', Icon);

        function drawIconAtRotation() {
            canvasContext.save();
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));

            canvasContext.scale(rotation, 1);

            if (rotation > 0)
                canvasContext.drawImage(newIcon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
            else
                canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);

            canvasContext.restore();
            chrome.browserAction.setIcon({imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
        }

        function Do() {
            rotation += 1 / animationFrames;
            //console.log(i + " - " +rotation);
            drawIconAtRotation();
            i++;
            if (rotation <= 1) {
                setTimeout(Do, animationSpeed);
            } else {
                rotation = -1;
                chrome.browserAction.setIcon({path: {"19": newIcon.src}});
                icon = newIcon;
            }
        }

        Do();
    };

    this.slideRightChange = function (Icon) {
        var rotation = 0;
        var animationFrames = 60;
        var animationSpeed = 10;

        var newIcon = document.createElement("img");
        newIcon.setAttribute('src', Icon);

        function drawIconAtRotation() {
            canvasContext.save();
            canvasContext.clearRect(0, 0, canvas.width + canvas.width, canvas.height);
            var position = canvas.width * rotation;
            canvasContext.translate(position, 0);
            canvasContext.drawImage(icon, 0, 0, canvas.width, canvas.height);
            canvasContext.drawImage(newIcon, -canvas.width, 0, canvas.width, canvas.height);
            canvasContext.restore();
            chrome.browserAction.setIcon({imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
        }

        function Do() {
            drawIconAtRotation();
            rotation += 1 / animationFrames;
            if (rotation <= 1) {
                setTimeout(Do, animationSpeed);
            } else {
                rotation = 0;
                chrome.browserAction.setIcon({path: {"19": newIcon.src}});
                icon = newIcon;
            }
        }

        Do();
    };

    this.slideLeftChange = function (Icon) {
        var rotation = 0;
        var animationFrames = 60;
        var animationSpeed = 10;

        var newIcon = document.createElement("img");
        newIcon.setAttribute('src', Icon);

        function drawIconAtRotation() {
            canvasContext.save();
            canvasContext.clearRect(0, 0, canvas.width + canvas.width, canvas.height);
            var position = canvas.width * rotation;
            canvasContext.translate(position, 0);
            canvasContext.drawImage(icon, 0, 0, canvas.width, canvas.height);
            canvasContext.drawImage(newIcon, canvas.width, 0, canvas.width, canvas.height);
            canvasContext.restore();
            chrome.browserAction.setIcon({imageData: canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
        }

        function Do() {
            drawIconAtRotation();
            rotation -= 1 / animationFrames;
            if (rotation >= -1) {
                setTimeout(Do, animationSpeed);
            } else {
                rotation = 0;
                chrome.browserAction.setIcon({path: {"19": newIcon.src}});
                icon = newIcon;
            }
        }

        Do();
    };
}

