async function authenticate({ username, password }) {
    if (username !== 'test' || password !== "testing123") {
        return false;
    }
    return true;
}

module.exports = {
    authenticate
};