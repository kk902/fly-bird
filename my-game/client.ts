import { Client, Room } from "colyseus.js";
import { GameState } from "../shared/types";

async function testConnection() {
    const client = new Client("ws://localhost:2567");
    const Bird = document.querySelector(".bird") as HTMLDivElement;
    console.log(Bird);
    const obstaclesContainer = document.getElementById("obstacles");
    // 获取弹窗和按钮
    const gameOverScreen = document.getElementById("gameOverScreen");
    const restartBtn = document.getElementById("restartBtn");
    // 监听重试按钮，点击后刷新页面
    restartBtn.addEventListener("click", () => {
        location.reload(); // 重新加载页面
    });
    // 监听小鸟状态
    function checkBirdStatus(bird) {
        if (!bird.live) {  // 如果小鸟死亡
            gameOverScreen.style.display = "block";
            setTimeout(() => {
                gameOverScreen.classList.add("show"); // 添加淡入动画
            }, 50);
        }
    }

    try {
        const room = await client.joinOrCreate("game_room") as Room<GameState>;
        console.log("✅ 成功加入房间:", room.sessionId);
        document.addEventListener("keydown", function(event) {
            // 判断按下的键是否是回车键（键码为13）
            if (event.key === ' ') {
                console.log("Enter key pressed!");  
                room.send("jump")
                }
            });
        // 监听房间状态变化
        room.onStateChange((state: GameState) => {
            // 使用类型断言，明确告知 TypeScript state 是 GameState 类型
            const gameState = state as GameState;  // 或者直接指定 room.state 类型为 GameState
            // 获取当前玩家的小鸟状态
            const bird = gameState.birds.get(room.sessionId);
            if (bird) {
                checkBirdStatus(bird);
                Bird.style.top = `${bird.y}px`;
            }
            // // 清空现有障碍物
            obstaclesContainer.innerHTML = "";
            gameState.obstacles.forEach((obstacle, index) => {
                let x = 0;
                let gapHeight = 0;
                if (!obstacle) {
                    return;
                } else {
                    x = obstacle.x;
                    gapHeight = obstacle.gapHeight;
                }

                const li = document.createElement("li");
                li.style.left = `${x}px`; // 设置障碍物的 X 坐标

                // 创建顶部障碍物
                const topSpan = document.createElement("span");
                topSpan.className = "top";
                topSpan.style.setProperty("--top-height", `${gapHeight}px`);

                // 创建底部障碍物
                const bottomSpan = document.createElement("span");
                bottomSpan.className = "bottom";
                bottomSpan.style.setProperty("--bottom-height", `${400 - gapHeight}px`);

                // 组合
                li.appendChild(topSpan);
                li.appendChild(bottomSpan);
                obstaclesContainer.appendChild(li);
                // console.log(`障碍物 ${index} 位置: x=${obstacle.x}, gapHeight=${obstacle.gapHeight}`);
            }); 
        });

        // 监听断开连接
        room.onLeave(() => {
            console.log("🚪 离开房间");
        });

    } catch (error) {
        console.error("❌ 加入房间失败:", error);
    }
}

testConnection();
