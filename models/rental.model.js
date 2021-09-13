const db = require('../utils/db');

module.exports = {
    findAll(){
        return db('rental');
    },
    async findById(id){
        const rows = await db('rental').where('rental_id',id); 
        if(rows.length ===0){
            return null;
        }
        return rows[0];
    },
    add(rental){
        return db('rental').insert(rental);
    },
    delByCustomerId(id){
        return db('rental')
        .where('customer_id',id).del();
    },
    patch(id, rental){
        return db('rental')
        .where('rental_id',id).update(rental);
    }
}