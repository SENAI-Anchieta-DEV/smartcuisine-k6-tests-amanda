import http from 'k6/http';
import { check, sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';

export const options = {
    vus: 1,
    duration: '10s',
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