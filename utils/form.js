export const validPhone = (rule, value, callback) => {
    if (/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(value)) {
        callback();
    } else {
        callback(new Error('Nhập đúng đinh dạng số điện thoại'));
    }
};

export const validPassword = (rule, value, callback) => {
    if (/^[a-zA-Z0-9@$!%*#?&]{8,}$/.test(value)) {
        callback();
    } else {
        callback(new Error('Mật khẩu ít nhất 8 kí tự'));
    }
};

export const validEmail = (rule, value, callback) => {
    if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
        callback();
    } else {
        callback(new Error('Nhập đúng định dạng email!'));
    }
};
