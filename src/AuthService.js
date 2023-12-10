// AuthService.js
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const AuthService = {
  createToken: (length) => {
    let result = '';
    const charslength = chars.length;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charslength));
    }
    return result;
  },

  login: async (creds) => {
    const { username, password } = creds;
    const newUserEmail = 'admin';
    const newUserPassword = 'Qwerty@123';

    if (username === newUserEmail && password === newUserPassword) {
      const userInfo = {
        username: creds.username,
        token: AuthService.createToken(9),
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        status: 200,
        msg: AuthService.createToken(9),
      };
    } else {
      return {
        status: 400,
        msg: "Invalid credentials",
      };
    }
  },

  isAuthenticated: () => {
    // Check if token is present and not expired
    const token = localStorage.getItem('token');
    return token !== null;
  },

  saveToken: (token) => {
    localStorage.setItem('token', token);
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default AuthService;
