const zod = require("zod");

const validationUser = zod.object({
  title: zod.string(),
  
});

const signupValidation = zod.object({
  userName: zod.string(),
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
});
const loginValidation = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

module.exports = { validationUser, signupValidation, loginValidation };
