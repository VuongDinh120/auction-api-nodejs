const db = require('../utils/db');

module.exports = {
    findAll(){
        return db('actor');
    },
    async findById(id){
        const rows = await db('actor').where('actor_id',id); 
        if(rows.length ===0){
            return null;
        }
        return rows[0];
    },
    add(actor){
        return db('actor').insert(actor);
    },
    del(id){
        return db('actor')
        .where('actor_id',id).del();
    },
    patch(id, actor){
        return db('actor')
        .where('actor_id',id).update(actor);
    }
}