import validator from 'validator';

const validateUsername = (username) => {
    if (!username) {
        return {
            valid: false,
            errors: 'Username is required.'
        }
    }

    // 3 to 16 characters, letters, numbers, underscores and hyphens
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    return {
        valid: usernameRegex.test(username),
        errors: 'Username must be 3 to 16 characters long and can only contain letters, numbers, underscores and hyphens.'
    }
}

const validatePassword = (password) => {
    if (!password) {
        return {
            valid: false,
            errors: 'Password is required.'
        }
    }

    // minimum 8 characters, at least one uppercase letter, one lowercase letter and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return {
        valid: passwordRegex.test(password),
        errors: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number.'
    }
}

const validateCommentText = (text) => {
    if (!text) {
        return {
            valid: false,
            errors: 'Text is required.'
        }
    }

    if (!validator.isLength(text, {min: 1, max: 250})) {
        return {
            valid: false,
            errors: 'Text must be between 1 and 250 characters.'
        }
    }

    return {valid: true};
}

const validateProductData = (data) => {
    const {video_id, name, price, product_link} = data;
    const errors = {};

    if (!video_id || !validator.isMongoId(video_id)) {
        errors.video_id = 'Invalid video_id.';
    }

    if (!name || !validator.isLength(name, {min: 1, max: 100})) {
        errors.name = 'Name is required and must be between 1 and 100 characters.';
    }

    if (!price || !validator.isFloat(price, {min: 0})) {
        errors.price = 'Invalid price.';
    }

    if (!product_link || !validator.isURL(product_link)) {
        errors.product_link = 'Invalid product_link.';
    }

    return {valid: Object.keys(errors).length === 0, errors};
}

const validateVideoTitle = (title) => {
    if (!title) {
        return {
            valid: false,
            errors: 'Title is required.'
        }
    }

    if (!validator.isLength(title, {min: 1, max: 50})) {
        return {
            valid: false,
            errors: 'Title must be between 1 and 50 characters.'
        }
    }

    return {valid: true};
}

export {validateUsername, validatePassword, validateCommentText, validateProductData, validateVideoTitle};
