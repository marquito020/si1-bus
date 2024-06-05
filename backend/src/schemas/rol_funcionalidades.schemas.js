const  {z}= require('zod');

const createRol_FuncionalidadesSchema=z.object({
    Id_Funcionalidad:z.number({
        required_error:"Id_Funcionalidad Invalido",
    }),
    Id_Rol:z.number({
        required_error:"Id_Rol Invalido"
    }),

});


module.exports={
    createRol_FuncionalidadesSchema
}