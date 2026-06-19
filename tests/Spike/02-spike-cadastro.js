import http from 'k6/http';
import { sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';
import { cadastroPayload } from '../../helpers/payloads.js';
import { checkCadastro } from '../../helpers/checks.js';

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

    const res = http.post(

        `${BASE_URL}/auth/cadastro`,

        cadastroPayload(),

        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    checkCadastro(res);

    sleep(1);
}