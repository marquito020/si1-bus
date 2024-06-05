const pool = require('../db');

const InsertUser= (username ,password)=>{
    const newUser='INSERT INTO user (ussername,password) VALUES ($1,$2)';
    return newUser;
}


module.exports=
{ 'User':InsertUser};
  