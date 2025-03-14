// shared/types.ts
import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";

// 小鸟状态
export class Bird extends Schema {
    @type("number") x: number = 50;
    @type("number") y: number = 0;
    @type("boolean") live: boolean = true;
}

// 障碍物状态
export class Obstacle extends Schema {
    @type("number") x: number = 0;
    @type("number") gapHeight: number = 0;
}

// 游戏房间状态
export class GameState extends Schema {
    @type({ map: Bird }) birds = new MapSchema<Bird>(); // 存储所有小鸟的状态
    @type([Obstacle]) obstacles = new ArraySchema<Obstacle>(); // 存储所有障碍物的状态
    @type("number") gameTime: number = 0;

    constructor() {
        super();
        this.obstacles = new ArraySchema<Obstacle>(); // 确保初始化
    }
}
