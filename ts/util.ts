import crypto from 'crypto'

const util= {
    generateSalt: (): string => {
        return crypto.randomBytes(16).toString('hex')
    }
}

export default util