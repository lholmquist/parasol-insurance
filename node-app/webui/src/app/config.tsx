const config = {
    backend_api_url: process.env.BACKEND_API_URL || window.location.protocol + '//' + window.location.host + '/api',
    backend_ws_url: process.env.BACKEND_WS_URL || window.location.protocol + '//' + window.location.host + '/api',
};

export default config;
