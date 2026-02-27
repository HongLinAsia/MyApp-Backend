import app from './app.js';
// import bcrypt from 'bcrypt';

// Example of hashing a password (not used in server startup)
// const password = '123456';
//
// const hashedPassword = await bcrypt.hash(password, 10);
// console.log(hashedPassword);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
