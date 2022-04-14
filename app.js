window.onload = function () {
    //Buscar a referencia de elementos do front-end
    const form = document.getElementById("input-form");
    const messageField = document.getElementById("message");
    const messageList = document.getElementById("messages");
    const socketStatus = document.getElementById("status");
    const closeBtn = document.getElementById("close");

    // Cria um novo socket.
    const socket = new WebSocket("ws://echo.websocket.events");

    //Funçào para tratar erros
    socket.onerror = function(error) {
        console.log("WebSocket Error: " + error);
    }

    //Função chamada no momento da conexão do cliente-servidor
    socket.onopen = (evt) => {
        socketStatus.innerHTML = "Conectado ao servidor " + evt.currentTarget.url;
        socketStatus.className = "open";
    }

    // Função para tratar mensagens enviados pelo servidor
    socket.onmessage = (evt) => {
        let message = evt.data;
        console.log(message);
        messageList.innerHTML += '<li class="received"><span>Recebido:</span>' + message + '</li>';
    }

    // Função chamada no momento da desconexão do servidor com o cliente
    socket.onclose = (evt) => {
        socketStatus.innerHTML = "Websocket desconectado.";
        socketStatus.className = "closed";
    }
``
    //Função que envia mensagens para o servidor através da conexão WebSocket
    form.onsubmit = (e) => {
        e.preventDefault();

        //Pega a mensagem digitado no campo de texto do formulario
        let message = messageField.value;

        //Envia a mensagem atraves do WebSocket
        socket.send(message);

        //Adiciona a mensagem enviada na tela
        messageList.innerHTML += '<li class="sent"><span>Enviado:</span>' + message + '</li>';

        //Limpar o campo de mensagem
        messageField.value = "";

        return false;
    };

    // Função que fecha a conexão do WebSocket
    closeBtn.onclick = (e) => {
        e.preventDefault();

        socket.close();
        
        return false;
    };

}