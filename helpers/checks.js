import { check } from 'k6';


export function checkLogin(response) {

    return check(response, {

        "login efetuado":
            (r) => r.status === 200,


        "recebeu token":
            (r) => r.body.includes("token")

    });

}



export function checkCadastro(response) {

    return check(response, {

        "cadastro realizado":
            (r) => r.status === 201 || r.status === 200,


        "retornou resposta":
            (r) => r.body.length > 0

    });

}

export function checkDashboard(response) {

    return check(response, {

        "acesso ao sistema":
            (r) => r.status === 200

    });

}