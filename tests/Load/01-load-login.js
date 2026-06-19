import http from 'k6/http';
import { sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';
import { loginPayload } from '../../helpers/payloads.js';
import { checkLogin } from '../../helpers/checks.js';

export const options = {
    vus: 1,
    duration: '10s',
};

export default function () {

    const BASE_URL = CONFIG.BASE_URL;

    const params = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const res = http.post(

        `${BASE_URL}/auth/login`,

        loginPayload(),

        params
    );

    checkLogin(res);

    sleep(1);
}