
        function create(){
            var msg=document.getElementById('box-chat').innerHTML;
            console.log(msg);
        }
        (function() {
            const sendBtn = document.querySelector('#send');
            const messages =document.getElementById('box-chat');
            //const messages = document.querySelector('#box-chat');
            const messageBox = document.querySelector('#messageBox');
            const user=document.getElementById('username').textContent;
            
            let ws;
            
            function showMessage(message) {
                create();
                //console.log(messages.innerHTML);
                //messages.textContent += `\n\n${message}`;
                //messages.scrollTop = messages.scrollHeight;
                messageBox.value = '';
            }
        
            function init() {
                if (ws) {
                ws.onerror = ws.onopen = ws.onclose = null;
                ws.close();
                }
        
                ws = new WebSocket('ws://localhost:6969');
                ws.onopen = () => {
                console.log('Connection opened!');
                }
                ws.onmessage = ({ data }) => showMessage(data);
                ws.onclose = function() {
                ws = null;
                }
            }
        
            sendBtn.onclick = function() {
                if (!ws) {
                showMessage("No WebSocket connection :(");
                return ;
                }
                console.log("Button Clicked!");
                ws.send(messageBox.value);
                showMessage(messageBox.value);
            }
            init();
        })();
