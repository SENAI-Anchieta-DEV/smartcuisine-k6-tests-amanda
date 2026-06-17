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
        email: "amanda@email.com",
        senha: "1234567"
    });

    const params = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const res = http.post(
        `${BASE_URL}/auth/login`,
        payload,
        params
    );

    check(res, {
        "login efetuado": (r) => r.status === 200,
        "recebeu token": (r) => r.body.includes("token")
    });

    sleep(1);
}