const db = require('../utils/db');

module.exports = {
    async findByUsername(id){
        const rows = await db('user').where('username',id); 
        if(rows.length ===0){
            return null;
        }
        return rows[0];
    },
    add(user){
        return db('user').insert(user);
    }
}