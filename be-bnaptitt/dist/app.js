"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./repository/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from TypeScript backend!');
// });
// Email routes
// app.use('/api/v1/', emailRoutes);
// Connect to MongoDB
(0, db_1.connectDB)();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
