import http from 'k6/http';
import { sleep } from 'k6';
import { CONFIG } from '../../config/environments.js';
import { cadastroPayload } from '../../helpers/payloads.js';
import { checkCadastro } from '../../helpers/checks.js';

export const options = {
    vus: 1,

    iterations: 1
};

export default function () {

    const BASE_URL = CONFIG.BASE_URL;

    const params = {

        headers: {
            "Content-Type": "application/json"
        }
    };

    const res = http.post(

        `${BASE_URL}/usuarios`,

        cadastroPayload(),

        params
    );

    checkCadastro(res);

    sleep(1);
}