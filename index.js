const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializa cliente com autenticação persistente
const client = new Client({
    authStrategy: new LocalAuth()
});

// Exibe QR Code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Confirma conexão
client.on('ready', () => {
    console.log('✅ Bot conectado ao WhatsApp!');
});

// Lista de comandos e respostas
const comandos = {
    'olá': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'oi': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'olá': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'Oi': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'Olá': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'bom dia': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'boa tarde': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'boa noite': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'gostaria de saber mais': 'Olá! 👋 Bem-vindo(a) ao Salão Beleza SP! Como posso te ajudar hoje? escreva uma das opções a seguir para tirar suas dúvidas (horário, serviços, preço, agendar, localização, contato, forma de pagamento, pix',
    'horário': 'Nosso horário de funcionamento é de segunda a sábado, das 9h às 19h.',
    'serviços': 'Oferecemos cortes, coloração, escova, manicure, pedicure, sobrancelha e hidratação capilar.',
    'preço': 'Nossos preços variam conforme o serviço. Corte: R$ 60, Escova: R$ 50, Manicure: R$ 35, Coloração: a partir de R$ 100.',
    'agendar': 'Para agendar, por favor envie: *nome completo*, *serviço desejado* e *data/hora*. Entraremos em contato para confirmar.',
    'localização': 'Estamos localizados na Rua das Flores, 123, São Paulo - SP. 📍 https://goo.gl/maps/abc123',
    'contato': 'Você pode falar conosco pelo WhatsApp ou ligar para (11) 94679-0596.',
    'forma de pagamento': 'Aceitamos PIX, cartão de débito/crédito e dinheiro.',
    'pix': 'Chave PIX: salao.beleza@gmail.com',
    'obrigado': 'Agradecemos o seu contato! 💇‍♀️ Esperamos te ver em breve!',
};

// Função com delay para responder mensagens
function responderComDelay(chat, resposta, delay = 3000) {
    setTimeout(() => {
        chat.sendMessage(resposta);
    }, delay);
}

// Listener de mensagens
client.on('message', async (msg) => {
    const mensagem = msg.body.toLowerCase().trim();
    const chat = await msg.getChat();

    console.log(`📨 Mensagem recebida de ${msg.from}: "${mensagem}"`);

    // Verifica se a mensagem corresponde a algum comando
    const resposta = Object.entries(comandos).find(([chave]) =>
        mensagem.includes(chave)
    );

    if (resposta) {
        responderComDelay(chat, resposta[1]);
    } else {
        responderComDelay(chat,
            'Desculpe, não entendi 🤔. Digite uma das opções como: "horário", "serviços", "preço", "agendar", "localização", "pix"...'
        );
    }
});

// Inicializa o bot
client.initialize();
