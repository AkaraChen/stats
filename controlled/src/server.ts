import { WebSocketServer } from 'ws';
import { Agent } from './agent';

export const server = async () => {
    const info = await Agent.info()
    let connectCount = 0
    let update: NodeJS.Timer;
    Agent.update()
    const wss = new WebSocketServer({ port: 8080 })
    console.log("websocket is running on ws://localhost:8080")
    wss.on('connection', async (ws) => {
        if (connectCount === 0) update = setInterval(() => Agent.update(), 1000)
        connectCount += 1
        ws.send(JSON.stringify(info))
        setInterval(async () => ws.send(JSON.stringify(Agent.get())), 1000)
        ws.onclose = () => {
            connectCount -= 1
            if (connectCount === 0) clearInterval(update)
        }
    });
}