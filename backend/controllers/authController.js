// controllers/authController.js

export const register = (req, res) => {
    res.send("Register working");
};

export const login = (req, res) => {
    res.send("Login working");
};

export const setup2FA = (req, res) => {
    res.send("Setup 2FA working");
};

export const verify2FASetup = (req, res) => {
    res.send("Verify 2FA Setup working");
};

export const verify2FALogin = (req, res) => {
    res.send("Verify 2FA Login working");
};

export const forgotPassword = (req, res) => {
    res.send("Forgot Password working");
};

export const resetPassword = (req, res) => {
    res.send("Reset Password working");
};

export const changePassword = (req, res) => {
    res.send("Change Password working");
};