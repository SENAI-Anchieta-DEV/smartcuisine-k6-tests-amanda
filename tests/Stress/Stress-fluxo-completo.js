import http from 'k6/http';
import { check, sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';

export const options = {

    stages: [

        { duration: '30s', target: 50 },

        { duration: '1m', target: 100 },

        { duration: '30s', target: 200 },

        { duration: '30s', target: 0 }

    ],

    thresholds: {
        http_req_failed: ['rate<0.10'],
        http_req_duration: ['p(95)<5000']
    }
};

export default function () {
    const BASE_URL = CONFIG.BASE_URL;

    const loginPayload = JSON.stringify({
        email: "amanda@email.com",
        senha: "1234567"
    });

    const login = http.post(

        `${BASE_URL}/auth/login`,

        loginPayload,

        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    check(login, {
        "login realizado":
            (r) => r.status === 200
    });

    sleep(1);

    let token = "";

    try {
        token = login.json("token");
    } catch (e) {
        token = "";
    }

    if (token) {

        const resposta = http.get(

            `${BASE_URL}/dashboard`,

            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        check(resposta, {
            "dashboard acessado":
                (r) => r.status === 200
        });
    }

    sleep(1);
}