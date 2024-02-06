const nodemailer = require('nodemailer');

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'servidorcasamento20@gmail.com', // Seu e-mail
        pass: 'Casamento20!' // Sua senha
    }
});

// Função para enviar o e-mail
const enviarEmail = async (valor, mensagem) => {
    try {
        // Opções do e-mail
        const mailOptions = {
            from: 'servidorcasamento20@gmail.com', // Seu e-mail
            to: 'dougbt97@gmail.com', // Seu e-mail (ou o e-mail de destino)
            subject: 'Nova mensagem da Lista de Casamento',
            text: `Valor: R$${valor},00\n\nMensagem: ${mensagem}`
        };

        // Envia o e-mail
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', info.messageId);
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
    }
};

module.exports = enviarEmail;

const express = require('express');
const enviarEmail = require('./enviar_email');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/enviar-email', (req, res) => {
    const { valor, mensagem } = req.body;
    enviarEmail(valor, mensagem);
    res.json({ message: 'E-mail enviado com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Função para enviar os dados para o servidor Node.js
const enviarDados = async (nome, valor, mensagem) => {
    try {
        const response = await fetch('http://localhost:3000/enviar-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, valor, mensagem })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }
};


// Recupera o valor, mensagem e nome do formulário
const urlParams = new URLSearchParams(window.location.search);
const valor = urlParams.get('valor');
const mensagem = document.getElementById('mensagem').value;
const nome = document.getElementById('nome').value;

// Envia os dados para o servidor Node.js
enviarDados(nome, valor, mensagem);
