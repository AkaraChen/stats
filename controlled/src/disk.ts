import { pick } from 'lodash'
import si from 'systeminformation'

export const info = async () => {
    const data = await si.diskLayout()
    const result: any = []
    data.forEach((item, index) => result[index] = pick(item, ['device', 'type', 'name', 'size']))
    return result
}

export const status = async () => {
    const data = await si.fsSize()
    let all = 0;
    let used = 0;
    data.forEach(item => {
        all += item.size
        used += item.used
    })
    return { all, used }
}