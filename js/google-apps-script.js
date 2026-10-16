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
// Se você preferir, cole o ID da planilha aqui para garantir que o script abra
// sempre a planilha correta, mesmo se o projeto for standalone.
// Exemplo de ID: 1a2B3cD4eF5GhIj6K... (parte da URL da planilha)
var SPREADSHEET_ID = "1eefVr2EocpWY6ashak9C0M7GVRb5mVx40JCOdSxZ228"; // <-- Cole o ID da sua planilha aqui (opcional)

function createJsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
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
    // Mapear tipo para a aba desejada. Ajuste os nomes conforme suas abas.
    var tipo = (data.tipo || '').toString();
    var sheetName = 'Leads';
    if (tipo.toLowerCase() === 'mentoria') {
      sheetName = 'Mentoria';
    } else if (tipo.toLowerCase() === 'empresa' || tipo.toLowerCase() === 'empresas' || tipo.toLowerCase() === 'empresa') {
      // A aba na sua planilha se chama 'Empresa' (singular)
      sheetName = 'Empresa';
    }

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
        'Investimento',
        'Tipo',
        'Status'
      ]);
      sheet.appendRow([
        new Date().toLocaleString('pt-BR'),
        data.nome || '',
        data.email || '',
        data.whatsapp || '',
        data.area || '',
        data.dificuldade || '',
        data.objetivo || '',
        data.investimento || data.disponibilidade || '',
        data.tipo || 'Mentoria',
        'Novo'
      ]);
    } else if (sheetName === 'Empresa') {
      // Campos esperados do formulário 'Para Empresas'
      sheet = getOrCreateSheetByName(sheetName, [
        'Data',
        'Nome',
        'Empresa',
        'Email',
        'WhatsApp',
        'Tamanho da Equipe',
        'Mensagem',
        'Tipo'
      ]);
      sheet.appendRow([
        new Date().toLocaleString('pt-BR'),
        data.name || data.nome || '',
        data.company || '',
        data.email || '',
        data.phone || data.whatsapp || '',
        data.team_size || '',
        data.message || '',
        data.tipo || 'Empresa'
      ]);
    } else {
      // Default: Leads (quiz / lead capture)
      sheet = getOrCreateSheetByName(sheetName, [
        'Data',
        'Nome',
        'Email',
        'WhatsApp',
        'Tipo de Orador'
      ]);

      var emailToFind = (data.email || '').toString().trim().toLowerCase();
      var existingRowIndex = -1;

      if (emailToFind) {
        var dataRange = sheet.getDataRange();
        var values = dataRange.getValues();
        // A coluna C (índice 2) contém o Email
        for (var i = 1; i < values.length; i++) {
          var rowEmail = (values[i][2] || '').toString().trim().toLowerCase();
          if (rowEmail === emailToFind) {
            existingRowIndex = i + 1; // Linha correspondente (1-indexed)
            break;
          }
        }
      }

      if (existingRowIndex > -1) {
        // Atualiza a linha existente
        if (data.nome || data.name) {
          sheet.getRange(existingRowIndex, 2).setValue(data.nome || data.name);
        }
        if (data.whatsapp || data.phone) {
          sheet.getRange(existingRowIndex, 4).setValue(data.whatsapp || data.phone);
        }
        if (data.tipo) {
          sheet.getRange(existingRowIndex, 5).setValue(data.tipo);
        }
        sheet.getRange(existingRowIndex, 1).setValue(new Date().toLocaleString('pt-BR'));
      } else {
        // Adiciona nova linha
        sheet.appendRow([
          new Date().toLocaleString('pt-BR'),
          data.nome || data.name || '',
          data.email || '',
          data.whatsapp || data.phone || '',
          data.tipo || 'Ainda não fez o quiz'
        ]);
      }
    }

    // Envia notificação por email. Se o envio do email falhar (ex.: limite diário do Gmail),
    // os dados já foram salvos na planilha, então não devolvemos erro para o site.
    if (EMAIL_NOTIFICACAO) {
      try {
        enviarNotificacao(sheetName, data);
      } catch (mailError) {
        console.error('Falha ao enviar email de notificação: ' + mailError);
      }
    }

    // Retornar também o nome da aba para facilitar debug no front-end
    return createJsonResponse({ status: "success", sheet: sheetName });

  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

function enviarNotificacao(sheetName, data) {
  var linhas;
  var assunto;
  if (sheetName === 'Mentoria') {
    assunto = "🎤 Nova candidatura à Mentoria - " + (data.nome || "");
    linhas = [
      "Nome: " + (data.nome || "Não informado"),
      "Email: " + (data.email || "Não informado"),
      "WhatsApp: " + (data.whatsapp || "Não informado"),
      "Área: " + (data.area || "Não informado"),
      "Dificuldade: " + (data.dificuldade || "Não informado"),
      "Objetivo: " + (data.objetivo || "Não informado"),
      "Investimento cabe? " + (data.investimento || data.disponibilidade || "Não informado")
    ];
  } else if (sheetName === 'Empresa') {
    assunto = "🏢 Novo pedido de proposta - " + (data.company || "Empresa");
    linhas = [
      "Nome: " + (data.name || data.nome || "Não informado"),
      "Empresa: " + (data.company || "Não informado"),
      "Email: " + (data.email || "Não informado"),
      "WhatsApp: " + (data.phone || data.whatsapp || "Não informado"),
      "Tamanho da equipe: " + (data.team_size || "Não informado"),
      "Mensagem: " + (data.message || "Não informado")
    ];
  } else {
    assunto = "🎤 Novo Lead do Quiz - " + (data.nome || "");
    linhas = [
      "Nome: " + (data.nome || "Não informado"),
      "Email: " + (data.email || "Não informado"),
      "WhatsApp: " + (data.whatsapp || "Não informado"),
      "Tipo de Orador: " + (data.tipo || "Não informado")
    ];
  }
  linhas.push("Data: " + new Date().toLocaleString("pt-BR"));
  var corpo = "Novo contato pelo site (aba " + sheetName + "):\n\n" + linhas.join("\n");
  MailApp.sendEmail({ to: EMAIL_NOTIFICACAO, subject: assunto, body: corpo, replyTo: data.email || EMAIL_NOTIFICACAO });
}

// Rode esta função uma vez no editor do Apps Script (botão "Executar") para autorizar
// o envio de emails e confirmar que a notificação chega na sua caixa de entrada.
function testarNotificacao() {
  enviarNotificacao('Leads', { nome: 'Teste', email: EMAIL_NOTIFICACAO, tipo: 'Teste de notificação' });
}

function getOrCreateSheetByName(name, headers) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    // Busca case-insensitive para evitar duplicação caso a aba já exista com outra capitalização
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getName().toLowerCase() === name.toLowerCase()) {
        sheet = sheets[i];
        break;
      }
    }
  }
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

// Retorna a planilha ativa ou abre pelo ID se fornecido
function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.length > 5) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

// Necessário para responder com CORS habilitado
function doGet(e) {
  return createJsonResponse({ status: "ok", message: "API ativa" });
}
