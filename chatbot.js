// DOM 요소 선택
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// API 엔드포인트 URL (실제 URL로 변경해야 함)
const API_URL = '';

// 메시지 추가 함수
function addMessage(content, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'grandma-message');
    messageElement.textContent = content;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// API 요청 함수
async function fetchResponse(message) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error('API 응답이 올바르지 않습니다.');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        return '죄송합니다. 지금은 대답하기가 어렵네요.';
    }
}

// 메시지 전송 처리 함수
async function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        userInput.focus();

        // 로딩 메시지 표시
        const loadingMessage = document.createElement('div');
        loadingMessage.classList.add('message', 'grandma-message');
        loadingMessage.textContent = '할머니가 생각 중...';
        chatMessages.appendChild(loadingMessage);

        // API 응답 대기
        const response = await fetchResponse(message);

        // 로딩 메시지 제거
        chatMessages.removeChild(loadingMessage);

        // 할머니의 응답 표시
        addMessage(response, false);
    }
}

// 이벤트 리스너 추가
sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// 초기 메시지 표시
addMessage('안녕하냐, 이 녀석아! 뭘 물어볼 텐가?', false);