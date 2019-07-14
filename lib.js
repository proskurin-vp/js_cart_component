 /* Библиотека вспомогательных функций */

 // Функция кроссплатформенно добавляет обработчик события
 function addEvent(elem /*элемент, которому добавляется обратчик*/, 
    type /*тип обрабатываемого события (имя события)*/,
    handler /*метод обработки события*/){
        if(elem.addEventListener){
            elem.addEventListener(type, handler, false/*обработка событий на фазе всплытия*/);
        }
        else{ // для IE
            elem.attachEvent('on' + type, function(){
                handler.call(elem);
            })
        }
}

// Функция устанавливает сообщение textBegin для элемента elem.
// Сообщение появляется с задержкой delay ms, остаётся видимым duration ms.
// После этого отображается сообщение textEnd.
function setMessage(elem, textBegin, textEnd = '', delay = 500, duration = 3000){
    setTimeout(function(){       
        elem.style.display = 'inline-block';
        elem.innerHTML = textBegin;
        setTimeout(function(){
            elem.innerHTML = textEnd;
            elem.style.display = 'none';
        }, duration);
    }, delay);
}

 // Функция проверки объекта на пустоту
 function isEmpty(obj){ 
    for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
            return false;
        }
    }
    return true;
}


function testBrowser(){
    // Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 71
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


var output = 'Detecting browsers by ducktyping:<hr>';
output += 'isFirefox: ' + isFirefox + '<br>';
output += 'isChrome: ' + isChrome + '<br>';
output += 'isSafari: ' + isSafari + '<br>';
output += 'isOpera: ' + isOpera + '<br>';
output += 'isIE: ' + isIE + '<br>';
output += 'isEdge: ' + isEdge + '<br>';
output += 'isBlink: ' + isBlink + '<br>';

return output;
}
