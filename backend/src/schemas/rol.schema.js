const  {z}= require('zod');

const createRolSchema=z.object({
    nombre:z.string({
        required_error:"Nombre is required",
    })


});


module.exports={
    createRolSchema
}