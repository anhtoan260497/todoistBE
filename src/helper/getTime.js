const getTime = (timestamp ) => {
    const date = new Date(timestamp)
    return {
        date : date.getDate(),
        month : date.getMonth(),
        year : date.getFullYear()
    }
}

module.exports = getTime