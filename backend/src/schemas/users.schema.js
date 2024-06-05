const  {z}= require('zod');

const createUserSchema=z.object({
    nombre:z.string({
        required_error:"Nombre is requerido"
    }).max(35,{
        message:'El nombre exede el numero de 35 caracteres'
    }),
    apellido:z.string({
        required_error:"Apellido is requerido"
    }).max(35,{
        message:'El Apellido exede el numero de 35 caracteres'
    }),
    ci:z.number({
        required_error:"El carnet de Ientidad es requerido"
    }),
    telefono:z.string().max(20,{
        message:'El Numero de telefono exede los 20 digitos'
    }).optional(),
    fecha_nacimiento:z.string({
        required_error:"La fecha de nacimiento es requerida"
    }).min(10,{
        message:'Escribir en formato YYYY-MM-DD'
    }),
    username:z.string({
        required_error:"Username is required",
    }),
    password:z.string({
        required_error:"Password is required"
    }).min(6,{
        message:'La contraseña debe tener al menos 6 caracteres'
    }),
    id_rol:z.number({
        required_error:"El Id de Rol es Requerido"
    }),
    direccion:z.string().optional(),
    activo:z.boolean({
        required_error:"El activo es requerido"
    })
});

module.exports={
    createUserSchema
}