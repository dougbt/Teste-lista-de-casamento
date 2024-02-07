// Importe o Firebase SDK
const firebase = require('firebase/app');
require('firebase/database');

// Configure o Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0BH_7CX0QNsNVW29tJVOj8tIWyeZ7iQ0",
  authDomain: "casamentodoli.firebaseapp.com",
  projectId: "casamentodoli",
  storageBucket: "casamentodoli.appspot.com",
  messagingSenderId: "211898762076",
  appId: "1:211898762076:web:1b570f0552624e3e743799"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Obtenha uma referência ao Realtime Database
var database = firebase.database();

// Quando o formulário for enviado
document.getElementById("pixForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário

  // Obtenha os valores do formulário
  var valor = document.getElementById("valor").value;
  var mensagem = document.getElementById("mensagem").value;

  // Salve os dados no Realtime Database
  database.ref('mensagens').push({
    valor: valor,
    mensagem: mensagem
  }).then(function() {
    // Limpe o formulário ou exiba uma mensagem de confirmação
    console.log("Mensagem salva com sucesso no banco de dados!");
    document.getElementById("pixForm").reset();
  }).catch(function(error) {
    console.error("Erro ao salvar mensagem:", error);
  });
});
