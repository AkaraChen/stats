import os from 'os';
import si from 'systeminformation'
import { sleep } from './util'
import { pick } from 'lodash'


export const info = async () => {
    return pick(await si.cpu(), ['manufucturer', 'brand', 'cores', 'physicalCores'])
}

export const status = async () => {
    return {
        usage: await getCPUUsage()
    }
}

const getCPUUsage = async () => {
    const t1 = getCPUInfo()

    await sleep(1000)

    const t2 = getCPUInfo()
    const idle = t2.idle - t1.idle
    const total = t2.total - t1.total
    let usage = 1 - idle / total

    return (usage * 100.0).toFixed(2) + "%"
}

const getCPUInfo = () => {
    const cpus = os.cpus()
    let user = 0, nice = 0, sys = 0, idle = 0, irq = 0, total = 0

    for (let cpu in cpus) {
        const times = cpus[cpu].times
        user += times.user
        nice += times.nice
        sys += times.sys
        idle += times.idle
        irq += times.irq
    }

    total += user + nice + sys + idle + irq

    return {
        user,
        sys,
        idle,
        total,
    }
}