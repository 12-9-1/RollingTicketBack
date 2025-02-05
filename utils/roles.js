//roles.js
import Role from '../models/role.model.js';

export const createRole = async () => {
    try{
        const count = await Role.estimatedDocumentCount();
        console.log({count})
        if(count > 0) return;

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'admin'}).save()
        ]);
        console.log({values})
    }
    catch(err){
        console.log(err)
    }
}


  