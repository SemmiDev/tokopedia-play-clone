const validator = {
    validateUsername(username) {
        if (!username) {
            return {
                valid: false,
                message: 'Username is required.'
            }
        }

        // 3 to 16 characters, letters, numbers, underscores and hyphens
        const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
        return {
            valid: usernameRegex.test(username),
            message: 'Username must be 3 to 16 characters long and can only contain letters, numbers, underscores and hyphens.'
        }
    },

    validatePassword(password) {
        if (!password) {
            return {
                valid: false,
                message: 'Password is required.'
            }
        }

        // minimum 8 characters, at least one uppercase letter, one lowercase letter and one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return {
            valid: passwordRegex.test(password),
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number.'
        }
    }
}

export default validator;
