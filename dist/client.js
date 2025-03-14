"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var colyseus_js_1 = require("colyseus.js");
console.log("Hello, Colyseus!");
var cannon = document.querySelector(".game_room");
var bird = document.querySelector(".bird");
function testConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var client, room_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new colyseus_js_1.Client("ws://localhost:2567");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.joinOrCreate("game_room")];
                case 2:
                    room_1 = _a.sent();
                    console.log("✅ 成功加入房间:", room_1.sessionId);
                    // 监听房间状态变化
                    room_1.onStateChange(function (state) {
                        console.log("📡 房间状态更新:", state);
                        // 使用类型断言，明确告知 TypeScript state 是 GameState 类型
                        var gameState = state; // 或者直接指定 room.state 类型为 GameState
                        // 获取当前玩家的小鸟状态
                        var bird = gameState.birds.get(room_1.sessionId);
                        if (bird) {
                            console.log("\uD83D\uDC26 \u5C0F\u9E1F\u4F4D\u7F6E: (".concat(bird.x, ", ").concat(bird.y, ")"));
                        }
                    });
                    // 监听房间消息
                    room_1.onMessage("message", function (message) {
                        console.log("📩 收到消息:", message);
                    });
                    // 监听断开连接
                    room_1.onLeave(function () {
                        console.log("🚪 离开房间");
                    });
                    // 示例：每秒更新小鸟的速度（模拟控制）
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var bird;
                        return __generator(this, function (_a) {
                            bird = room_1.state.birds.get(room_1.sessionId);
                            if (bird) {
                                console.log("🚀 小鸟状态");
                                console.log(bird);
                            }
                            return [2 /*return*/];
                        });
                    }); }, 1000);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("❌ 加入房间失败:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
testConnection();
