const environments = {
    local: {
        BASE_URL: 'http://localhost:8080',
    },
    production: {
        BASE_URL: 'https://abcgjl-smartcusine-backend-api.onrender.com',
    }
};

const currentEnv = __ENV.ENV || 'production';

export const CONFIG = environments[currentEnv];