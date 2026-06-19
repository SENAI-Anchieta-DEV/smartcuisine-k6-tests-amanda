import http from 'k6/http';


export function login(BASE_URL) {


    const payload = JSON.stringify({

        email: "amanda@email.com",

        senha: "1234567"

    });


    const response = http.post(

        `${BASE_URL}/auth/login`,

        payload,

        {

            headers: {

                "Content-Type": "application/json"

            }

        }

    );


    return response;

}