import { pick } from 'lodash'
import si from 'systeminformation'

export const info = async () => {
    return pick(await si.mem(), ['total', 'used', 'swaptotal', 'swapused'])
}