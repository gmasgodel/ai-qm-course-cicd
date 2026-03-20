export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder("Username");
        this.passwordField = page.getByPlaceholder("Password");
        this.submitLoginButton = page.getByText('Login');
        this.rememberMe = page.getByTestId('remember-me');
        this.errorMessageBox = page.getByTestId('error-button');
    }

    async fillUsername(username) {
        const usernameField = this.usernameField;
        await usernameField.fill(username);
    }

    async fillPassword(password) {
        const passwordField = this.passwordField;
        await passwordField.fill(password);
    }

    async login(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
    }

    async errorMessageIsVisible() {
        const errorMessageBox = this.errorMessageBox;
        return await errorMessageBox.isVisible();
    }

    async submitLogin() {
        const submitLoginButton = this.submitLoginButton;
        await submitLoginButton.click();
    }

    rememberMeCheckbox() {
        return this.rememberMe;
    }
}