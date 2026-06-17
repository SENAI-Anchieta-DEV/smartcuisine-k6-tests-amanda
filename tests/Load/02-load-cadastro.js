import http from 'k6/http';
import { check, sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';

export const options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    const BASE_URL = CONFIG.BASE_URL;

    const payload = JSON.stringify({
        nome: "Usuario Teste k6",
        email: `teste${Date.now()}@email.com`,
        senha: "senha_segura_123",
        tipo: "GERENTE"
    });

    const params = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const res = http.post(
        `${BASE_URL}/usuarios`,
        payload,
        params
    );

    check(res, {
        "cadastro realizado": (r) => r.status === 201 || r.status === 200,
        "retornou resposta": (r) => r.body.length > 0
    });

    sleep(1);
}