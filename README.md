# 💳 Payment Node Proxy

Servidor simples e seguro em **Node.js** que protege a tua **API Key** e faz requisições seguras para a [PayMoz](https://paymoz.tech/).  
Desenvolvido por: [Helioz Dev](https://api.whatsapp.com/send/?phone=258842834889&text&type=phone_number&app_absent=0&wame_ctl=1)

---

## 🧠 Introdução
O **Payment Node Proxy** atua como intermediário entre o teu **aplicativo, site ou sistema** e a **API PayMoz**, garantindo que a tua `API_KEY` nunca seja exposta publicamente.

Ideal para:
- 🌐 Aplicações **web** (React, Vue, etc.)
- 📱 Aplicativos **Android / Flutter**
- ⚙️ Servidores backend que precisam de segurança adicional

---

## 🌍 Base URL
> Substitui o domínio abaixo pelo nome do teu serviço no Render:

```
https://payment-node.onrender.com/payments
```

---

## ⚙️ Autenticação
Nenhum token é necessário do lado do cliente.  
A autenticação é feita automaticamente pelo servidor Render usando a variável de ambiente:

```
Authorization: ApiKey [SUA_CHAVE_API]
```

---

## 📤 Endpoint `/payments`

### Método: `POST`  
### Descrição:
Envia um pedido de pagamento para a PayMoz via proxy seguro.

---

### 📦 Corpo da requisição (JSON)
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|------------|
| `metodo` | string | ✅ | Método de pagamento (`mpesa`, `emola`, etc.) |
| `valor` | string | ✅ | Valor do pagamento em MZN |
| `numero_celular` | string | ✅ | Número do cliente (ex: `852233065`) |

---

### 🧩 Exemplo de requisição

#### JavaScript (fetch)
```js
fetch("https://payment-node.onrender.com/payments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    metodo: "mpesa",
    valor: "10.00",
    numero_celular: "852233065"
  })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
```

#### cURL
```bash
curl -X POST https://payment-node.onrender.com/payments \
  -H "Content-Type: application/json" \
  -d '{
    "metodo": "mpesa",
    "valor": "10.00",
    "numero_celular": "852233065"
  }'
```

---

## 📥 Respostas da API

### ✅ Sucesso (200)
```json
{
  "sucesso": true,
  "mensagem": "Pagamento processado com sucesso.",
  "dados": {
    "output_ResponseCode": "INS-0",
    "output_ResponseDesc": "Request processed successfully",
    "output_TransactionID": "7m2swkzme9y9",
    "output_ConversationID": "8afbf904889f4e88a35e22ae7df796a7",
    "output_ThirdPartyReference": "PAYMOZOAXCGF"
  }
}
```

### ❌ Erro (400 Bad Request)
Ocorre quando faltam parâmetros obrigatórios ou os dados enviados são inválidos.
```json
{
  "erro": "Os campos metodo, valor e numero_celular são obrigatórios."
}
```
Também pode ocorrer em caso de falha de comunicação com o provedor de pagamento (ex: timeout).
```json
{
  "sucesso": false,
  "erro": "Falha na comunicação com o M-Pesa (Erro 408)."
}
```

### ❌ Erro (401 Unauthorized)
Ocorre quando a API Key não é fornecida ou é inválida.
```json
{
  "detail": "API Key inválida ou não encontrada."
}
```

### ❌ Erro (403 Forbidden)
Ocorre se o utilizador autenticado não tiver permissão para realizar a ação (ex: plano expirado).
```json
{
  "detail": "Você não tem permissão para realizar esta ação."
}
```

### ❌ Erro (500 Internal Server)
Ocorre quando vem do lado da plataforma inteira da Paymoz. A equipe é notificada automaticamente, mas se o problema persistir, por favor, entre em contacto com o suporte.
```json
{
  "erro": "Ocorreu um erro interno inesperado."
}
```
---

## 🧠 Como funciona no Render

### 1️⃣ Código hospedado no Render
O Render identifica automaticamente o ambiente Node.js e instala as dependências do `package.json`.

### 2️⃣ Variáveis de ambiente
Adiciona a tua chave no painel Render:
```
Key: API_KEY
Value: TUA_CHAVE_DA_PAYMOZ
```
> 🔒 Fica guardada de forma segura no servidor, nunca visível no código.

### 3️⃣ Comando de execução
```
npm start
```

---

## 🧩 Como fazer deploy no Render

1. Cria um repositório no GitHub com os arquivos:
   - `server.js`
   - `package.json`
   - `README.md`
2. Vai em [https://render.com](https://render.com)
3. Clica em **New + → Web Service**
4. Escolhe **Deploy from GitHub**
5. Liga ao teu repositório (`payment-node`)
6. Define:
   - **Start Command:** `npm start`
   - **Environment Variable:** `API_KEY = tua chave PayMoz`
7. Clica **Deploy Web Service**

Após o deploy, a URL pública será algo como:
```
https://payment-node.onrender.com/payments
```

---

## 🧩 Testar o endpoint

```bash
curl -X POST https://payment-node.onrender.com/payments \
  -H "Content-Type: application/json" \
  -d '{"metodo":"mpesa","valor":"5.00","numero_celular":"852233065"}'
```

Se receberes uma resposta JSON da PayMoz, o proxy está funcional ✅

---

## 🧱 Tecnologias utilizadas
- **Node.js**  
- **Express.js**  
- **CORS**  
- **node-fetch**  
- **Render** (para deploy)

---

## 🔒 Benefícios
- Protege tua **API Key** no servidor
- Permite uso direto por apps e sites
- Habilitado para **CORS**
- Hospedagem gratuita e simples no **Render**
- Totalmente **open source**

---

## 👨‍💻 Desenvolvido por
[Helioz Dev](https://api.whatsapp.com/send/?phone=258842834889&text&type=phone_number&app_absent=0&wame_ctl=1) — soluções práticas e seguras para integração com PayMoz.  
> 💡 Personaliza livremente e integra facilmente nos teus próprios sistemas.
