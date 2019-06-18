(function () {

// add toolbar
    var skipPositionedChild = function (node, style) {
        if (this.offsetParent &&
            this.offsetParent.tagName !== 'BODY') return true;
        if (hasPositionedParent(node)) return true;
        return false;
    };

    var hasPositionedParent = function (node) {
        if (node.tagName === 'BODY') return false;
        var parent = node.parentNode;
        var position = getComputedStyle(parent).position;
        if (position !== 'static') {
            return true;
        }
        return hasPositionedParent(parent);
    };


    var addtoolbar = function () {
        var check = document.querySelector('#mchex-toolbar');
        if (check) {
            console.log('#mchex-toolbar already exist')
        } else {
            var height = '50px';
            var Children = document.body.getElementsByTagName("*");

            for (var i = 0; i < Children.length; i++) {

                if (Children[i].currentStyle) {
                    var x = Children[i].currentStyle["position"];
                    var y = Children[i].currentStyle["top"];
                    var z = Children[i].currentStyle["bottom"];
                    var q = Children[i].currentStyle["height"];
                } else if (window.getComputedStyle) {
                    var st = document.defaultView.getComputedStyle(Children[i], null);
                    var x = st.getPropertyValue("position");
                    var y = st.getPropertyValue("top");
                    var z = st.getPropertyValue("bottom");
                    var q = st.getPropertyValue("height");
                }

                if ((x == "absolute" || x == "fixed") && y !== 'auto') {
                    if (x === 'absolute' && skipPositionedChild(Children[i])) {
                    } else {
                        Children[i].setAttribute("data-mchex-toolbar", true);
                        Children[i].setAttribute("data-mchex-top", Children[i].style.top);
                        Children[i].style.top = parseInt(y, 10) + parseInt(height, 10) + "px";
                        // if "top" and "bottom" is 0 => then calc height
                        if (q != "auto" && (y == "0px" && z == "0px")) {
                            Children[i].setAttribute("data-mchex-height", q);
                            Children[i].style.height = "calc(100% - " + height + ")";
                        }

                    }
                }
            }

            // var Children = document.body.getElementsByTagName("*");
            //
            // for (var i = 0; i < Children.length; i++) {
            //
            //     if (Children[i].currentStyle) {
            //         var x = Children[i].currentStyle["position"];
            //         var y = Children[i].currentStyle["top"];
            //         var z = Children[i].currentStyle["bottom"];
            //         var q = Children[i].currentStyle["height"];
            //     } else if (window.getComputedStyle) {
            //         var st = document.defaultView.getComputedStyle(Children[i], null);
            //         var x = st.getPropertyValue("position");
            //         var y = st.getPropertyValue("top");
            //         var z = st.getPropertyValue("bottom");
            //         var q = st.getPropertyValue("height");
            //     }
            //
            //     if ((x == "absolute" || x == "fixed") && (parseInt(z, 10) < 60)) {
            //         if (x === 'absolute' && skipPositionedChild(Children[i])) {
            //         } else {
            //             Children[i].setAttribute("data-mchex-toolbar", true);
            //             Children[i].setAttribute("data-mchex-top", Children[i].style.bottom);
            //             Children[i].style.bottom = parseInt(z, 10) + parseInt(height, 10) + "px";
            //             // if "top" and "bottom" is 0 => then calc height
            //             if (q != "auto" && (y == "0px" && z == "0px")) {
            //                 Children[i].setAttribute("data-mchex-height", q);
            //                 Children[i].style.height = "calc(100% - " + height + ")";
            //             }
            //
            //         }
            //     }
            // }

            var toolbar = document.createElement("div");
            toolbar.setAttribute('id', 'mchex-toolbar');
            toolbar.classList.add("mchex-toolbar-mini");

            var frame = document.createElement("iframe");
            frame.setAttribute("src", "" + chrome.runtime.getURL('/html/toolbar-mini.html') + "");
            toolbar.appendChild(frame);
            document.body.insertBefore(toolbar, document.body.firstChild);

            var html = document.getElementsByTagName("HTML")[0];
            // html.style.marginTop = height;
            // html.style.paddingBottom = height;
        }
    };

// remove toolbar

    var removetoolbar = function () {
        var html = document.getElementsByTagName("HTML")[0];
        // // html.style.marginTop = 0
        // html.style.paddingBottom = 0
        var checkb = document.querySelector('#mchex-toolbar');
        if (checkb) {
            document.body.removeChild(checkb);

            var a = document.querySelectorAll('[data-mchex-toolbar]');

            var a = document.body.getElementsByTagName("*");
            for (var i = 0, len = a.length; i < len; i++) {
                if (a[i].hasAttribute("data-mchex-top")) {
                    a[i].style.top = a[i].getAttribute("data-mchex-top");
                }
                if (a[i].hasAttribute("data-mchex-height")) {
                    a[i].style.height = a[i].getAttribute("data-mchex-height");
                }
                a[i].setAttribute("data-mchex-toolbar", false);
            }
        }
    }

    // var removetoolbar = function () {
    //     var html = document.getElementsByTagName("HTML")[0];
    //     // // html.style.marginTop = 0
    //     // html.style.paddingBottom = 0
    //     var checkb = document.querySelector('#mchex-toolbar');
    //     if (checkb) {
    //         document.body.removeChild(checkb);
    //
    //         var a = document.querySelectorAll('[data-mchex-toolbar]');
    //
    //         var a = document.body.getElementsByTagName("*");
    //         for (var i = 0, len = a.length; i < len; i++) {
    //             if (a[i].hasAttribute("data-mchex-top")) {
    //                 a[i].style.bottom = a[i].getAttribute("data-mchex-top");
    //             }
    //             if (a[i].hasAttribute("data-mchex-height")) {
    //                 a[i].style.height = a[i].getAttribute("data-mchex-height");
    //             }
    //             a[i].setAttribute("data-mchex-toolbar", false);
    //         }
    //     }
    //     closeAllDivOnMainPage();
    // }



// toggle Toolbar

    var toggleToolbar = function (cond) {

        cond ? addtoolbar() : removetoolbar()
    }



// document onLoad

    document.addEventListener("DOMContentLoaded", function () {
        chrome.runtime.sendMessage({
            cmd: 'tab.ready-mmCrExt'
        }, function (response) {
            // console.log(response);
        });
    });


// on Message
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.cmd === 'toggleWidget-mmCrExt') {
                toggleToolbar(request.data);
            }
        });


// window.onscroll = function () {
    // var scrollTop = document.scrollingElement.scrollTop;
    // var html = document.getElementsByTagName("HTML")[0];
    // if (scrollTop < 50) {
    //     var mt = scrollTop - 50;
    //     html.style.marginTop = mt + "px";
    //     html.style.paddingTop = 50 + "px";
    //
    // }

// };
})();

