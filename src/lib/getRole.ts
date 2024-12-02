import React from 'react'
import { validateRequest } from '@/lib/auth';

const getRole = async() => {

    const { user } = await validateRequest();
    if(user){
        console.log(user.role);
        return user.role;
    }
}

export default getRole
