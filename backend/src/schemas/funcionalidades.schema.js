const  {z}= require('zod');

const createFuncionalidadSchema=z.object({
    nombre:z.string({
        required_error:"Nombre is required",
    }),
    descripcion:z.string({
        required_error:"Description must be a string"
    }).optional(),
    activo:z.boolean({
        required_error:"Activo Invalido"
    }),

});


module.exports={
    createFuncionalidadSchema
}