// ============================================================
// Google Apps Script — Cole este código no Apps Script
// ============================================================
// Este script recebe dados do formulário e salva na planilha.
// Também envia um e-mail de notificação para você.
//
// INSTRUÇÕES DE SETUP:
// 1. Acesse https://sheets.google.com e crie uma nova planilha
// 2. Na primeira linha (cabeçalho), escreva nas colunas:
//    A1: Data | B1: Nome | C1: Email | D1: WhatsApp | E1: Tipo de Orador
// 3. Renomeie a aba para "Leads" (clique duplo no nome da aba)
// 4. Vá em Extensões > Apps Script
// 5. Apague o código existente e cole todo este código
// 6. ALTERE o email na linha abaixo para o seu email:

var EMAIL_NOTIFICACAO = "rafaeljesusoratoria@gmail.com";  // <-- ALTERE AQUI

function createJsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
}

// 7. Clique em "Implantar" > "Nova implantação"
// 8. Tipo: "App da Web"
// 9. Executar como: "Eu" (sua conta)
// 10. Quem tem acesso: "Qualquer pessoa"
// 11. Clique em "Implantar" e copie a URL gerada
// 12. Cole a URL no arquivo main.js do seu site (variável GOOGLE_SCRIPT_URL)
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheetName = data.tipo === 'Mentoria' ? 'Mentoria' : 'Leads';
    var sheet;

    if (sheetName === 'Mentoria') {
      sheet = getOrCreateSheetByName(sheetName, [
        'Data',
        'Nome',
        'Email',
        'WhatsApp',
        'Área',
        'Dificuldade',
        'Objetivo',
        'Disponibilidade',
        'Tipo'
      ]);
      sheet.appendRow([
        new Date().toLocaleString('pt-BR'),
        data.nome || '',
        data.email || '',
        data.whatsapp || '',
        data.area || '',
        data.dificuldade || '',
        data.objetivo || '',
        data.disponibilidade || '',
        data.tipo || 'Mentoria'
      ]);
    } else {
      sheet = getOrCreateSheetByName(sheetName, [
        'Data',
        'Nome',
        'Email',
        'WhatsApp',
        'Tipo de Orador'
      ]);
      sheet.appendRow([
        new Date().toLocaleString('pt-BR'),
        data.nome || data.name || '',
        data.email || '',
        data.whatsapp || data.phone || '',
        data.tipo || 'Ainda não fez o quiz'
      ]);
    }

    // Envia notificação por email
    if (EMAIL_NOTIFICACAO && EMAIL_NOTIFICACAO !== "rafaeljesusoratoria@gmail.com") {
      var assunto = "🎤 Novo Lead - Oratória com Rafa";
      var corpo = "Novo lead capturado!\n\n" +
        "Nome: " + (data.nome || "Não informado") + "\n" +
        "Email: " + (data.email || "Não informado") + "\n" +
        "WhatsApp: " + (data.whatsapp || "Não informado") + "\n" +
        "Data: " + new Date().toLocaleString("pt-BR");

      MailApp.sendEmail(EMAIL_NOTIFICACAO, assunto, corpo);
    }

    return createJsonResponse({ status: "success" });

  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

function getOrCreateSheetByName(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

// Necessário para responder com CORS habilitado
function doGet(e) {
  return createJsonResponse({ status: "ok", message: "API ativa" });
}
