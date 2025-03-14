import { Server, Room, Client } from "colyseus";
import { createServer } from "http";
import { Bird, GameState, Obstacle } from "./shared/types";
class GameRoom extends Room<GameState> {
    onCreate() {
        console.log("✅ GameRoom created");
        this.state = new GameState();
        this.setSimulationInterval(() => this.update(), 1000/60);
        this.onMessage("jump", (client) => {
            const bird = this.state.birds.get(client.sessionId);
            if(bird.y > 0) {
                bird.y -= 50;
            }
            if(bird.y <  0) {
                bird.y = 0;
            }
        });
    }

    onJoin(client: Client) {
        console.log(`🔵 玩家加入l: ${client.sessionId}`);
        this.state.birds.set(client.sessionId, new Bird());
    }

    onLeave(client: Client) {
        console.log(`🔴 玩家离开: ${client.sessionId}`);
        this.state.birds.delete(client.sessionId);
    }

    update() {
        this.state.gameTime += 1;
        this.state.birds.forEach((bird, sessionId) => {
            if(bird.y < 550) {
                bird.y += 2
            }

            for (let i = this.state.obstacles.length - 1; i >= 0; i--) {
                const obstacle = this.state.obstacles[i];
                if(bird.x > obstacle.x && bird.x < obstacle.x + 50) {
                    if(bird.y < obstacle.gapHeight || bird.y > obstacle.gapHeight + 200) {
                        bird.live = false;
                        //console.log(`🚨 玩家 ${sessionId} 撞到障碍物, 小鸟位置${bird.x},${bird.y}, 障碍物位置 ${obstacle.x} ${obstacle.gapHeight}`);
                        
                    }
                }
            }
        });
        
        if(Math.random() > 0.98) {
            if(this.state.obstacles.length && this.state.obstacles[this.state.obstacles.length - 1].x > 520) {
                return;
            }
            const obstacle = new Obstacle(); 
            obstacle.x = 800;
            obstacle.gapHeight = Math.random() * 400;
            this.state.obstacles.push(obstacle);
        }

        for (let i = this.state.obstacles.length - 1; i >= 0; i--) {
            this.state.obstacles[i].x -= 2;
        }  

        while(this.state.obstacles.length > 0 && this.state.obstacles[0].x < -50) {
            this.state.obstacles.shift();
        }   
    }
}

const port = 2567;
const server = createServer();
const gameServer = new Server({ server });

// 注册房间
gameServer.define("game_room", GameRoom);

gameServer.listen(port);
console.log(`🚀 Server running at ws://localhost:${port}`);
function ArraySchema<T>() {
    throw new Error("Function not implemented.");
}

