"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./utils/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/ping', (_request, response) => {
    console.log('ping was received');
    response.send('pong');
});
app.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT} 🛰`);
});
