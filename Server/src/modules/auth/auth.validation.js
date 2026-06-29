export const validateRegister = (body) => {
  const { firstName, lastName, email, password, role } = body;

  if (!firstName || !lastName || !email || !password || !role) {
    throw new Error("All fields are required.");
  }
};

export const validateLogin = (body) => {
  const { email, password } = body;

  if (!email || !password) {
    throw new Error("Email and Password are required.");
  }
};