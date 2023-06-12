import login from "../service/AuthService.js";
function loginController(req, res) {
    const { email, password } = req.body;

    login(email, password)
        .then(response => {
            const { error, user, token, statusCode } = response;

            if (error) {
                return res.status(statusCode).json({ error });
            }

            return res.status(statusCode).json({ user, token });
        })
        .catch(error => {
            return res.status(500).json({ error: `Đăng nhập thất bại: ${error.message}` });
        });
}

export default loginController;