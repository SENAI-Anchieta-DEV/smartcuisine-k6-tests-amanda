export function cadastroPayload() {

    return JSON.stringify({

        nome: "Usuario Teste k6",

        email: `teste${Date.now()}@email.com`,

        senha: "senha_segura_123",

        tipo: "GERENTE"

    });

}


export function loginPayload() {

    return JSON.stringify({

        email: "amanda@email.com",

        senha: "1234567"

    });

}