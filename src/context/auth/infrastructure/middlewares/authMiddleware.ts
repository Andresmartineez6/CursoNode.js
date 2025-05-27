import {NextFunction, Request, Response } from "express";
import axios from 'axios';



export const authMiddleware =async (req:Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({error:'No token provided'});
    }

    const token = authHeader.split(' ')[1];

    try{

        const response = await axios.post('http://localhost:4000/auth/verify-token',{token});

        if(response.data.valid){

            res.locals.user = {
                id: response.data.user.id,
                role: response.data.user.role
            };

            return next();

        }else{

            res.status(401).json({error:'invalid token'});
        }

    
    }catch(error:any){

        res.status(401).json({error: 'Token verification failed'})
    }


}