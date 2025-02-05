//protect-data.js
import bcrypt from 'bcryptjs'


export const encryptedPassword = async (password) => {
   const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}


export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

