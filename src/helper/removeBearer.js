const removeBearer = (token) => {
    return token.replace("Bearer ","")
};

module.exports = removeBearer;