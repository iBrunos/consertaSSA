import bcrypt from 'bcrypt'
import { loginService, generateToken } from '../services/auth.service.js';

const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await loginService(email);
    
        if (!user){
            return res.status(404).send({message: "Email or Password not found"})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        

        if (!passwordIsValid){
            return res.status(400).send({message: "Password not found"})
        }

        const token = generateToken(user.id)
        
        return res.json({
            message: "Login realizado com sucesso.",
            token,
            id: user.id,
            username: user.username,
            email: user.email,
            level: user.level,
            store: user.store
          });
    }catch(err){
        res.status(500).send(err.message)
    }

}

export {login};