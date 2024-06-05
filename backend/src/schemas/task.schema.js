const  {z}= require('zod');

const createTaskSchema=z.object({
    title:z.string({
        required_error:"Title is required",
    }),
    description:z.string({
        required_error:"Description must be a string"
    }),
    fecha:z.string().optional(),

});


module.exports={
    createTaskSchema
}