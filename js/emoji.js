// 이모지 초기화
var emojiInit = async function() {
    let emoji_frame
    // 이모지콘 / 키보드 아이콘 토글
    $(".ico_emoji").click(function() {
        $("div.emoji-wrap").show();
        try {
            emoji_frame = new Sly('.emoji_frame', {
                horizontal: 1,
                itemNav: 'centered', //basic , centered,
                speed: 300,
                smart: 1,
                mouseDragging: 1,
                touchDragging: 1,
                activateMiddle: 1,
                releaseSwing: 1,
            }).init();
        } catch (error) {
            console.warn('emoji exist')
        }
        $(this).removeClass("show");
        $(".ico_keyboard").addClass("show");
        chatHeightEdit();
    })
    $(".ico_keyboard").click(function() {
        emoji_frame.destroy()
        $("div.emoji-wrap").hide();
        $(".ico_emoji").addClass("show");
        $(this).removeClass("show");
        chatHeightEdit();
    })
    
    // 순차 이모지 생성
    await this.simpleCharInit()
    await this.simpleCharEvent('#content', '#subContent')
    await this.customEmojiInit()
    await this.customEmojiEvent()
    await this.emojiTabEvent()
}

// 기본 이모지 생성
var simpleCharInit = function(target) {
        // 이모지콘 넣기위해 기능이 있는지 확인
    if (!String.fromCodePoint)(function(stringFromCharCode) {
        var fromCodePoint = function(_) {
            var codeUnits = [],
                codeLen = 0,
                result = "";
            for (var index = 0, len = arguments.length; index !== len; ++index) {
                var codePoint = +arguments[index];
                // correctly handles all cases including `NaN`, `-Infinity`, `+Infinity`
                // The surrounding `!(...)` is required to correctly handle `NaN` cases
                // The (codePoint>>>0) === codePoint clause handles decimals and negatives
                if (!(codePoint < 0x10FFFF && (codePoint >>> 0) === codePoint))
                    throw RangeError("Invalid code point: " + codePoint);
                if (codePoint <= 0xFFFF) { // BMP code point
                    codeLen = codeUnits.push(codePoint);
                } else { // Astral code point; split in surrogate halves
                    // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    codePoint -= 0x10000;
                    codeLen = codeUnits.push(
                        (codePoint >> 10) + 0xD800, // highSurrogate
                        (codePoint % 0x400) + 0xDC00 // lowSurrogate
                    );
                }
                if (codeLen >= 0x3fff) {
                    result += stringFromCharCode.apply(null, codeUnits);
                    codeUnits.length = 0;
                }
            }
            return result + stringFromCharCode.apply(null, codeUnits);
        };
        try { // IE 8 only supports `Object.defineProperty` on DOM elements
            Object.defineProperty(String, "fromCodePoint", {
                "value": fromCodePoint,
                "configurable": true,
                "writable": true
            });
        } catch (e) {
            String.fromCodePoint = fromCodePoint;
        }
    }(String.fromCharCode));
    // tab 메뉴 추가
    var emoji_wrap = $(".chat_input .emoji-wrap").prepend($(`<!-- default emoji --><div class="emoji-subwrap current" id="tab-1"><div class="emoji-content"></div></div>`))
    $(".emoji-tab-wrap", emoji_wrap).append($(`<li class="tab-link current" data-tab="tab-1"><span class="emo-ico emo01"></span></li>`))
    
    var new_emoji_wrap = $(".newchat-emoji-wrap").prepend($(`<!-- default emoji --><div class="newchat-emoji-subwrap current" id="newchat-tab-1"><div class="newchat-emoji-content"></div></div></div>`))
    $(".newchat-emoji-tab-wrap", new_emoji_wrap).append($(`<li class="tab-link current" data-tab="newchat-tab-1"><span class="emo-ico emo01"></span></li>`))

    // 이모지를 밀어넣는 부분
    for (var i = 0; i < 80; i++) {
        var code = 0x1F600 + i;
        $('div.emoji-subwrap#tab-1 div.emoji-content').append($('<a>', { href: '#none' }).css({ 'font-size': '15px' }).html(String.fromCodePoint(code)));
        
        $('div.newchat-emoji-subwrap#newchat-tab-1 div.newchat-emoji-content').append($('<a>', { href: '#none' }).css({ 'font-size': '19px' }).html(String.fromCodePoint(code)));
    }
}

// 기본 이모지 이벤트
var simpleCharEvent = function(target, newTarget) {
    $('#tab-1 .emoji-content a').click(function() {
        sendEmojiMsg(target, $(this).text())
    });
    $('#newchat-tab-1 .newchat-emoji-content a').click(function() {
        newSendEmojiMsg(newTarget, $(this).text())
    });
}

// 커스텀 이모지 생성
var customEmojiInit = function() {
    let emo_ico = [
        { tabId: 2, fileId: 1, start: 1, end: 20 },
        { tabId: 3, fileId: 2, start: 1, end: 18 },
        { tabId: 4, fileId: 3, start: 1, end: 12 },
        { tabId: 5, fileId: 4, start: 1, end: 20 },
        { tabId: 6, fileId: 5, start: 1, end: 18 },
        { tabId: 7, fileId: 6, start: 1, end: 10 },
        { tabId: 8, fileId: 7, start: 1, end: 24 },
    ]
    for (var i = 0; i < emo_ico.length; i++) {
        let item = emo_ico[i]

        // tab 메뉴 추가
        $(".emoji-wrap .emoji-tab-wrap").append($(`<li class="tab-link" data-tab="tab-${item.tabId}"><span class="emo-ico emo0${item.tabId}"></span></li>`))
        $(".chat_input .emoji-wrap").prepend($(`<!-- emoticon 0${item.tabId} --><div class="emoji-subwrap" id="tab-${item.tabId}"><div class="emoticon-content"></div></div>`))
        
        $(".newchat-emoji-wrap .newchat-emoji-tab-wrap").append($(`<li class="tab-link" data-tab="newchat-tab-${item.tabId}"><span class="emo-ico emo0${item.tabId}"></span></li>`))
        $(".newchat-emoji-wrap").prepend($(`<!-- emoticon 0${item.tabId} --><div class="newchat-emoji-subwrap" id="newchat-tab-${item.tabId}"><div class="emoticon-content"></div></div>`))
        
        // 이모지를 밀어넣는 부분
        for (var j = item.start; j < item.end; j++) {
            $(`#tab-${item.tabId} .emoticon-content`).append($(`<a href="#none"><img src="img/emoticon/emo0${item.fileId}/emo0${item.fileId}_${j.toString().padStart(3, '0')}.png" emoji="img/emoticon/emo0${item.fileId}/emo0${item.fileId}_${j.toString().padStart(3, '0')}.png" width="100%"></a>`))
            
            $(`#newchat-tab-${item.tabId} .emoticon-content`).append($(`<a href="#none"><img src="img/emoticon/emo0${item.fileId}/emo0${item.fileId}_${j.toString().padStart(3, '0')}.png" emoji="img/emoticon/emo0${item.fileId}/emo0${item.fileId}_${j.toString().padStart(3, '0')}.png" width="100%"></a>`))
        }
    }
}

// 커스텀 이모지이벤트
var customEmojiEvent = function() {
    $('.emoji-subwrap .emoticon-content a').click(function() {
        sendEmojiMsg(null, $("img", this).attr('emoji') )
    });
    $('.newchat-emoji-subwrap .emoticon-content a').click(function() {
        newSendEmojiMsg(null, $("img", this).attr('emoji') )
    });
    
}

// 이모지 탭 이벤트
var emojiTabEvent = function() {

    $('.emoji-tab-wrap li.tab-link').click(function() {
        // 초기화
        $('.emoji-tab-wrap li.tab-link, .emoji-subwrap').removeClass('current');

        // 대상 선택
        $("#" + $(this).addClass('current').attr('data-tab')).addClass('current');
        chatHeightEdit()
    })
}

// 메시지 전송 ( 이모지 포함 )
var sendEmojiMsg = function(target, emoji) {
    if (target) {
        $(target).text($(target).text() + emoji)
        $(target).focus()
    } else {
        chatHeight(false, true)
        channel.sendMessage({
            message: emoji,
            messageType: JSON.stringify({ profile: res.profile }),
            mimeType: 'emoji_img'
        });
    }
}
