import http from 'k6/http';
import { check, sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';

export const options = {

    stages: [

        { duration: '30s', target: 10 },

        { duration: '1m', target: 10 },

        { duration: '30s', target: 30 },

        { duration: '30s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(95)<5000'],
        http_req_failed: ['rate<0.05']
    }
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

        "status login 200": (r) =>
            r.status === 200,

        "resposta retornada": (r) =>
            r.body.length > 0

    });

    sleep(1);
}