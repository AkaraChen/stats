import { info as CPUinfo, status as CPUstatus } from "./cpu"
import { info as OSinfo } from "./system"
import { info as Memoryinfo } from "./memory"
import { info as Diskinfo, status as Diskstatus } from './disk'

export class Agent {
    static info = async () => {
        return {
            CPU: await CPUinfo(),
            OS: await OSinfo(),
            Memory: await Memoryinfo(),
            Disk: await Diskinfo(),
        }
    }

    static status: status = {
        CPU: undefined,
        Memory: undefined,
        Disk: undefined
    }

    static get = () => this.status

    static async update() {
        this.status.CPU = await CPUstatus()
        this.status.Memory = await Memoryinfo()
        this.status.Disk = await Diskstatus()
    }
}

type status = {
    CPU: any,
    Memory: any,
    Disk: any
}