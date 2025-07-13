"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const db_1 = require("./repository/db");
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Hello from TypeScript backend!');
});
// Email routes
app.use('/api/v1/', emailRoutes_1.default);
// Error middleware
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'Kích cỡ file hơi lớn, mỗi file chỉ dưới 25MB, tham vừa thôi má -.-',
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                message: 'File này không hỗ trợ, xin thông cảm vì xài hàng free =(((',
            });
        }
    }
    return res.status(500).json({
        success: false,
        message: err.message,
    });
});
// Connect to MongoDB
(0, db_1.connectDB)();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
