import http from 'k6/http';
import { sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';
import { loginPayload } from '../../helpers/payloads.js';
import { checkLogin } from '../../helpers/checks.js';

export const options = {

    stages: [

        { duration: '1m', target: 30 },

        { duration: '10m', target: 30 },

        { duration: '1m', target: 0 }

    ],

    thresholds: {

        http_req_failed: ['rate<0.05'],

        http_req_duration: ['p(95)<5000']

    }
};

export default function () {

    const BASE_URL = CONFIG.BASE_URL;

    const loginResponse = http.post(

        `${BASE_URL}/auth/login`,

        loginPayload(),

        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    checkLogin(loginResponse);

    let token = "";

    try {

        token = loginResponse.json("token");

    } catch(e) {

        token = "";

    }
    if(token) {

        const response = http.get(

            `${BASE_URL}/dashboard`,

            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        check(response, {
            "acesso ao sistema":
                (r) => r.status === 200
        });
    }

    sleep(2);
}