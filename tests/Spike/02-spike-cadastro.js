import http from 'k6/http';
import { check, sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';

export const options = {

    stages: [
        { duration: '30s', target: 10 },

        { duration: '5s', target: 200 },

        { duration: '30s', target: 200 },

        { duration: '10s', target: 0 }
    ],

    thresholds: {
        http_req_failed: ['rate<0.10'],
        http_req_duration: ['p(95)<5000']
    }
};

export default function () {
    const BASE_URL = CONFIG.BASE_URL;

    const payload = JSON.stringify({
        nome: "Usuario Spike k6",
        email: `spike${Date.now()}@teste.com`,
        senha: "1234567"
    });

    const res = http.post(
        `${BASE_URL}/auth/cadastro`,
        payload,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    check(res, {
        "cadastro respondeu":
            (r) => r.status === 201
    });

    sleep(1);
}