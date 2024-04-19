let user_list = [],
    user_info = {},
    chat_bottom,
    setTid,
    animate,
    sub_user_list = [],
    sub_user_info = {},
    sub_chat_bottom,
    openGraph,
    fileUtil,
    trans,
    pre;

$(function () {

    // 채팅 쌓이는 최대 수 ( 나머지는 최근순으로 삭제 )
    chatLimit = 200;

    // 이모지 로딩
    emojiInit()

    /**
      * 번역기능 사용
      * targetTag: 번역할 태그 (해당 엘리먼트 우클릭 시 번역 창 보임)
      * trans: 번역 가능한 언어 목록
      * roomId: 채널 키 값
      * err: toaster.err 객체
      */
    trans = new Trans({
        targetSelector: '.comment',
        trans: ['ko', 'en', 'de', 'vi', 'es', 'fr', 'pt', 'tr', 'ar', 'it', 'id', 'ja', 'zh-CN', 'zh-TW', 'tl', 'th', 'hi', 'ru'],
        roomId: channelKey,
        err: toastr.error,
    });

    // 오픈그래픽 표현 (링크 미리보기)
    openGraph = new OpenGraph();

    // 스크롤 감지
    $('.chat div.chat_contents')
        .off('scroll')
        .scroll(function () {
            var scrollTop = $(this).scrollTop();
            var innerHeight = $(this).innerHeight();
            var scrollHeight = $(this).prop('scrollHeight');

            clearTimeout(setTid);
            if (Math.ceil(scrollTop) + innerHeight >= scrollHeight) {
                chat_bottom = true;
                $('.chat_scroll').hide();
            } else {
                chat_bottom = false;
                setTid = setTimeout(() => {
                    $('.chat_scroll').show();
                }, 100);
            }
        });

    // 스크롤 최하단 이동 이벤트
    $('.chat_scroll')
        .off('click')
        .click(function () {
            scrollBotton();
        });

    // 이모지 버튼
    $('div.bottom div.emoji a').click(function () {
        channel.sendMessage({
            message: $(this).text(),
            mimeType: 'emoji'
        });
    });

    // 글자수 제한
    $('#content').keyup(function (e) {
        if ($(this).text().length > 100) {
            openError("글자수는 100자로 이내로 제한됩니다.");
            $(this).text(($(this).text()).substring(0, 100));
        }
        $('#counter').html(($(this).text()).length + '/100');
    });
    $('#content').keyup();

    // 클릭 버튼
    $('#sendCounter')
        .off('click')
        .click(function (e) {
            chatHeight(false, true);
            channel.sendMessage({
                message: $('#content').text(),
                mimeType: "text"
            })
            $('#content').text('')
            $('#content').focus()
        })

    // 입력창 엔터
    $('#content').keydown(function (e) {
        if (e.keyCode == 13) {
            chatHeight(false, true)
            e.preventDefault();
            channel.sendMessage({
                message: $(this).text(),
                mimeType: "text"
            })
            $(this).text('');
        }
    })

    // 팝업 외 마우스 클릭 시 팝업 닫힘
    $(document).mouseup(function (e) {
        let container = $('.popupLayer');
        if (container.has(e.target).length === 0) {
            container.hide();
            $("#whisper").hide();
        }
    });

    
    // 도움말 팝업 열기
    $('.help')
        .off('click')
        .click(function () {
            $('.use_help').toggle();
        });

    // 도움말 팝업 닫기
    $('.btn_help_close')
        .off('click')
        .click(function () {
            $('.use_help').hide();
        });


    // 대화상대 목록에서 자동번역 ON/OFF시 html 변경
    $(document).on('change', '.chat-user-list-dim .chat-user .lang-btn', autoTranslateBtnHandler); // 일반

    // 자동 번역 선택 창 닫기
    $(document).on('click', '.chat-user-list-dim .select-lang-dim .select-lang-title p:last-child', autoTranslateWindowClose); // 일반

});


function openPopup(msg, callback, option) {
    let p = $('div.custompopup').hide();
    $('p:nth-child(1)', p).text(msg);
    $('a:nth-child(2)', p).off().click(function () { p.hide(); if (typeof callback == 'function') { callback("확인") } });
    if (option) {
        $('a:nth-child(3)', p).hide();
    } else {
        $('a:nth-child(3)', p).show();
        $('a:nth-child(3)', p).off().click(function () { p.hide(); if (typeof callback == 'function') { callback("취소") } });
    }
    p.show();
}

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '{': '&#x7b;', // hex코드로 적어둠
    '}': '&#x7d;'
}; // hex코드로 적어둠

//태그 제한
function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) { return entityMap[s]; });
}

// 채팅 입력
function write(msg, tp, pre, sub) {

    sub = false

    let cl = $('div.chat_contents div#content1');
    let cc;

    switch (tp) {
        case 'join':
            /*cc = $('<div>', { class: 'entery' });
            cc.append($('<span>').html('<b>' + escapeHtml(msg.nickName) + '</b>님이 입장하셨습니다.'));*/
            break;
        case 'leave':
            /*cc = $('<div>', { class: 'chatout' });
            cc.append($('<span>').html('<b>' + escapeHtml(msg.nickName) + '</b>님이 나가셨습니다.'));*/
            break;
        case 'notice':
            cc = $('<p>', { class: 'livenotice' });
            cc.append($('<span>').html(typeof msg == 'string' ? msg : msg.message));
            break;
        case 'market':
            cc = $('<p>', { class: 'marketer' });
            cc.append($('<span>').html(typeof msg == 'string' ? msg : msg.message));
            break;
        case 'html':
            cc = $('<P>').css({ "text-align": "center" });
            cc.append($('<span class="name">').html(msg));
            break;
        case 'ManagerWhisper':
            cc = $('<p class="admin_livecommerce">');
            cc.append($('<span class="name">').text(msg.nickName)); /* 0630 추가 */
            cc.append($('<span class="adm_whisper">').text("님의 귓속말"));
            cc.append(escapeHtml(msg.message));
            break;
        case 'allExit':
            cc = $('<div>', { class: 'entery' });
            cc.append($('<span>').html('<b>채팅방을 종료합니다.</b>'));
            break;
        case 'userManager':
            cc = $('<ul class="admin_livecommerce">');
            cc.append($('<li>', { class: 'live_chat_profile' }))
            cc.find('.live_chat_profile').append($('<div>', { class: 'profile-img profile-admin' }))
            if (typeof msg == 'string') {
                cc.find('.live_chat_profile').append($('<div>').text(''));
                cc.append($('<li>', { class: 'comment' }).html(escapeHtml(msg)))
            } else if (typeof msg == 'object' && msg.message) {
                cc.find('.live_chat_profile').append($('<div>').text(msg.nickName)); /* 0630 추가 */
                cc.append($('<li>', { class: 'comment' }).html(escapeHtml(msg.message)))
            }
            break;
        default:
            cc = $('<ul>', { class: 'contents' });
            cc.append($('<li>', { class: 'live_chat_profile' }))
            if (typeof msg == 'string') {
                let _msg = $(`<input value='${msg}' />`).val()
                cc.find('.live_chat_profile').append($('<div>', { class: 'profile-img profile-1' }))
                    .append($('<div>', { class: 'name' }).text(''));
                // cc.append($('<span class="name" href="#!">').text(''));
                cc.find('.live_chat_profile').append($('<li>', { class: 'comment' }).html(escapeHtml(_msg)));
            } else if (typeof msg == 'object' && msg.message) {
                let _msg = $(`<input value='${msg.message}' />`).val()
                let profile = msg?.userInfo?.profile ?? 'profile-1';
                cc.find('.live_chat_profile').append($('<div>', { class: `profile-img profile-${profile}` }))
                    .append($('<div>', { class: 'name' }).text(msg.nickName)); /* 0630 추가 */
                if (msg.mimeType == 'emoji_img') {
                    var html = $('<li>', { class: 'comment' });
                    imgAppend(
                        msg.message,
                        function (_img) {
                            $(html.append(_img)).find('img').css('margin-left', '0px')
                            cc.append(html.append(_img));
                            chatHeight(sub, pre);
                        },
                        function () { }
                    );
                } else {
                    cc.append($('<li>', { class: 'comment' }).html(escapeHtml(_msg)));
                    // 텍스트에 url 정보가 있는지 체크이후 정보 요청
                    openGraph.getOpenGraph(msg.message, function (ogHtml, url, data) {
                        cc.append(ogHtml)
                            .children('div')
                            .on('click', function () {
                                // window.open(target);
                                window.open(url);
                            });
                        chatHeight(sub, pre);
                    });
                }
            }
    };
    if (pre) {
        cl.prepend(cc);
        this.scrollBotton();
    } else {
        cl.append(cc);
        this.chatHeightEdit(true);
    }
    $('div.chat_contents').scrollTop(cl.height());

    // 대화내용이 너무 많은경우 삭제처리
    if (sub) {
        if ($('.newchat-comment-wrap, .entery, .chatout, .notice, .whisper, .content', $('.newchat-chat-contents')).length > chatLimit) {
            $('.newchat-comment-wrap, .entery, .chatout, .notice, .whisper, .content', $('.newchat-chat-contents'))[0].remove();
        }
    } else {
        if ($('.entery, .chatout, .notice, .whisper, .content', $('#content1')).length > chatLimit) {
            $('.entery, .chatout, .notice, .whisper, .content', $('#content1'))[0].remove();
        }
    }
}

// 채팅 유저 목록 html 만들기
function chatUserListItem(clientKey, userInfo, nickName, isPrivate) {
    isPrivate = false
    let html = `
    <li class="chat-user" data-client-key="${clientKey}">
        <div class="user-profile-img profile-${userInfo?.profile}"></div>
        <div class="user-name">${nickName}</div>
        <div class="language">${userInfo?.lang && userInfo.lang !== 'none' ? trans.getLanguageName(userInfo.lang) : '번역안함'}</div>
        <div class="lang-btn-wrap">
          <input type="checkbox" class="lang-btn" id="${isPrivate === true ? 'private_' : ''}switch_${clientKey}" ${userInfo?.lang && userInfo?.lang !== 'none' ? 'checked' : ''
        }/>
          <label for="${isPrivate === true ? 'private_' : ''}switch_${clientKey}" class="switch_label">
            <span class="onf_btn"></span>
          </label>
        </div>
    </li>
    `;
    return $(html);
}


// 자동번역 스위치 ON 핸들러
function autoTranslateBtnHandler(e, isPrivate) {
    isPrivate = false
    if (e.target.tagName === 'INPUT') {
        const input = $(e.target);
        const clientKey = input.parent().parent().data('clientKey');
        const { userInfo } = isPrivate === true ? sub_user_info[clientKey] : user_info[clientKey];
        let userListWindow, langWindow, submitBtn, selectedInputRadio;
        if (input.is(':checked')) {
            if (!isPrivate) {
                userListWindow = '.chat-user-list-dim .select-lang-dim';
                langWindow = '.chat-user-list-dim .select-lang-dim .select-lang-list';
                submitBtn = '.chat-user-list-dim .select-lang-dim .select-lang-btn';
                selectedInputRadio = `.chat-user-list-dim .select-lang-dim input[name="target-lang"]:checked`;
            } else {
                userListWindow = '.newchat-popup-wrap .select-lang-dim';
                langWindow = '.newchat-popup-wrap .select-lang-dim .select-lang-list';
                submitBtn = '.newchat-popup-wrap .select-lang-dim .select-lang-btn';
                selectedInputRadio = `.newchat-popup-wrap .select-lang-dim input[name="target-lang"]:checked`;
            }
            // 언어 선택창 초기화
            $(userListWindow).toggleClass('active');
            $(langWindow).html(trans.makeLangHtml(userInfo?.lang));
            // 자동번역 언어 선택 후 등록 버튼
            $(submitBtn)
                .off()
                .on('click', function () {
                    userInfo.lang = $(selectedInputRadio).val();
                    allUserListUpdate(isPrivate);
                    $(userListWindow).removeClass('active');
                });
        } else {
            userInfo.lang = 'none';
            input.parent().parent().children('.language').html(`번역안함`);
        }
    }
}

// 번역 언어 선택창 닫기
function autoTranslateWindowClose(e, isPrivate) {
    isPrivate = false
    const x = $(e.target)
    x.parent().parent().parent().parent().removeClass('active')
    allUserListUpdate(isPrivate)
}

// 유저 정보 가져옴
function getUserInfo(clientKey, isPrivate) {
    isPrivate = false
    try {
        return isPrivate && isPrivate === true ? sub_user_info[clientKey]?.userInfo : user_info[clientKey]?.userInfo;
    } catch (error) {
        return undefined;
    }
}

function chatInit() {

    // 룸이름 입력
    $('#roomNm').html(
        `<span class="live_ico">Live</span><span class="live_title">${channel.roomName}</span> (<a class="chat-user-list_btn"><i class="fas fa-user"></i>01</a>)`
    );

    // 유저리스트 팝업
    $('.chat-user-list_btn')
        .off('click')
        .on('click', function () {
            $('.chat-user-list-dim', $('.channel-popup-dim').addClass('active')).addClass('active');
            $('div.channel-popup-dim > div.chat-user-list-dim > div > div.chat-user-list-title > p:nth-child(2)')
                .off('click')
                .on('click', function () {
                    $('.chat-user-list-dim', $('.channel-popup-dim').removeClass('active')).removeClass('active');
                    // event_trigger(false);
                });
        });

    // 입력창 포커스
    $('#content').focus();
    allUserListUpdate();

    // 신규 메시지 이벤트
    channel.onNotifyMessage = async function (event) {
        if (event.grade == 'userManager') {
            write(event, 'userManager')
        } else {
            if (getUserInfo(event.clientKey)?.lang && getUserInfo(event.clientKey).lang !== 'none') {
                // console.log('need translate >>>', getUserInfo(event.clientKey)?.lang, event.message);
                const result = await trans.translate(event.message, getUserInfo(event.clientKey).lang, channel.roomId);
                event.message = result.data || event.message;
                // console.log('translated >>>', getUserInfo(event.clientKey)?.lang, result.data);
            }
            write(event)
        }
    }

    // 개인 귓속말 메시지 이벤트
    channel.onPersonalWhisper = function (event) {
        if (event.grade == 'userManager') {
            write(event, 'ManagerWhisper')
        } else {
            // write(event, 'whisper')
        }
    }

    // 중복 로그인시 이벤트
    channel.onPersonalDuplicateUser = function (event) {
        vChatCloud.disconnect();
        openError("중복 로그인으로 인해 로그아웃합니다.", function () {
            $('div.enterypopup').show();
            $('div.chat_field').hide();
        });
    }

    // 글쓰기 제한 이벤트
    channel.onPersonalMuteUser = function (event) {
        openError("글쓰기가 제한되었습니다.")
    }

    // 글쓰기 제한 해제 이벤트
    channel.onPersonalUnmuteUser = function (event) {
        openError("글쓰기 제한이 해제되었습니다.")
    }

    // 공지사항 메시지
    channel.onNotifyNotice = function (event) {
        write(event, 'notice')
    }

    // 유저 입장
    channel.onNotifyJoinUser = function (event) {
        if (channel.clientKey != event.clientKey) {
            write(event, 'join');
        } else {
            scrollBotton();
        }
        allUserListUpdate();
    }

    // 유저 나감
    channel.onNotifyLeaveUser = function (event) {
        write(event, 'leave');
        allUserListUpdate();
    }

    // 유저 추방
    channel.onNotifyKickUser = function (event) {
        write("'<font color='blue'><b>" + event.nickName + "</b></font>' 님이 채팅방에서 추방되었습니다.", "html");
    }

    // 유저 추방 해제
    channel.onNotifyUnkickUser = function (event) {
        write("'<font color='blue'><b>" + event.nickName + "</b></font>' 님이 채팅방에서 추방 해제되었습니다.", "html");
    }

    // 글쓰기 제한
    channel.onNotifyMuteUser = function (event) {
        write("'<font color='blue'><b>" + event.nickName + "</b></font>' 님의 글쓰기가 제한되었습니다.", "html");
    }

    // 글쓰기 제한 해제
    channel.onNotifyUnmuteUser = function (event) {
        write("'<font color='blue'><b>" + event.nickName + "</b></font>' 님의 글쓰기가 제한 해제되었습니다.", "html");
    }

    // 커스텀 메시지
    channel.onNotifyCustom = function (event) {
        let custom = JSON.parse(event.message)
        if (custom.type == "allExit") {
            vChatCloud.disconnect() // 클라이언트에서 채팅방을 나갈수 있도록 한다.
            write(event, 'allExit')
            return;
        }
        try {
            if (event.type == "profile") {
                //profileJson[event.clientKey] = custom.profile
                return;
            }
            if (custom.type == "popup") {
                openPopup(custom.msg, function (val) {
                    console.log(val)
                }, false);
            } else if (custom.type == "market") {
                write(custom.msg, 'market')
            } else {
                openPopup(JSON.stringify(custom), function (val) {
                    console.log(val)
                }, true);
            }
        } catch (e) {
            openPopup(JSON.stringify(event.message), function (val) {
                console.log(val)
            }, true);
        }
    };
}

//  입장 유저 단위 변환
function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['', '천', '백만', '십억', '조'];
    let dmSize = '1'
    for (let i = 0; i < dm; i++) {
        dmSize += "0"
    }
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const number = Math.abs(bytes / Math.pow(k, i))
    const temp = number * Number(dmSize)
    const temp2 = Math.floor(temp)
    const result = temp2 / Number(dmSize)

    return result + sizes[i];
}

// 오브젝트 체크
function objectCheck(val) {
    if (typeof val === 'object') {
        return val;
    } else if (typeof val === 'string') {
        let _temp = val.replace(/{/g, '').replace(/}/g, '');
        let result = {};
        _temp = _temp.split(',');
        for (target in _temp) {
            result[_temp[target].split('=')[0]] = _temp[target].split('=')[1];
        }
        return result;
    } else {
        return null;
    }
}

// 채팅 인원 업데이트
function allUserListUpdate() {
    let new_user_info = {};
    user_list = [];
    channel.getAllUserList(function (err, list) {
        user_list = list;
        let count = 0;
        let el = $('div.chat-user-list-wrap div ul.chat-user-list').empty();
        user_list.forEach((val) => {
            if (user_info[val.clientKey]) Object.assign(val, user_info[val.clientKey]);
            new_user_info[val.clientKey] = val;
            let userInfo = objectCheck(val.userInfo);
            if (userInfo) {
                ++count;
                if (channel.clientKey != val.clientKey) {
                    // 채팅 대화상대 목록 그리기
                    let html = chatUserListItem(val.clientKey, userInfo, val.nickName);
                    el.append(html);
                }
            }
        });
        [user_info, new_user_info] = [new_user_info, null];
        let cnt = formatBytes(count, 1)
        $('#roomNm > a.chat-user-list_btn').html(`<i class="fas fa-user" aria-hidden="true"></i>${cnt.toString().padStart(2, '0')}`);
    });
}

// 이미지 로딩 (url, load, error)
function imgAppend(src, onload, error) {
    var _img = new Image();
    _img.onload = function (e) {
        onload(_img, e);
    };
    _img.onerror = function (e) {
        error(e);
    };
    _img.src = src;
}

// 채팅창 높이 조절
function chatHeight(sub, pre) {
    if (sub) {
        subChatHeightEdit();
        if (pre) {
            subScrollBotton();
        }
    } else {
        chatHeightEdit();
        if (pre) {
            scrollBotton();
        }
    }
}

// 채팅창 높이 조절
function chatHeightEdit(flag) {
    $('.chat_contents').css(
        'max-height',
        $('.chat_field').innerHeight() -
        // $('.chat_field .chat_name').innerHeight() -
        // $('.chat_field .chat_input_btn').innerHeight() -
        $('.chat_input').innerHeight() -
        10
    );
    if (chat_bottom || animate) {
        scrollBotton(flag);
    }
}
function subChatHeightEdit(flag) {
    $('.newchat-popup-contents').css(
        'max-height',
        $('#draggable').innerHeight() -
        $('.newchat-popup-title').innerHeight() -
        $('.newchat-popup-input').innerHeight() -
        // $('.newchat-popup-input-btn').innerHeight() -
        10
    );
    if (chat_bottom || animate) {
        subScrollBotton(flag);
    }
}


// 스크롤 최하단으로 이동
function scrollBotton(flag) {
    if (flag) {
        animate = true;
        $('.chat_contents')
            .stop(true)
            .animate({ scrollTop: $('div#content1').height() }, 380, function () {
                animate = false;
            });
    } else {
        $('.chat_contents').scrollTop($('div#content1').height());
    }
}