import si from 'systeminformation'
import { pick } from 'lodash'

export const info = async () => {
    return pick(await si.osInfo(), ['platform', 'distro', 'codename', 'arch'])
}