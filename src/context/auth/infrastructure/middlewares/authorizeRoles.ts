import {UserRole} from '../../domain/UserRole';
import { NextFunction,Request,Response } from 'express';



export const authorizeRoles = (allowedRoles: UserRole[]) => 
    (_:Request,res:Response,next:NextFunction) => {
        const user = res.locals.user;

        if(!user){
            res.status(401).json({error:'Not authenticated'});
            return;
        }

        if(!allowedRoles.includes(user.role)){
            res.status(403).json({error:'Access denied'});
            return;
        }
        next();
    };
