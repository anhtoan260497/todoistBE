const getTime = (timestamp ) => {
    const date = new Date(timestamp)
    return {
        date : date.getDate(),
        month : date.getMonth() + 1,
        year : date.getFullYear()
    }
}

module.exports = getTime