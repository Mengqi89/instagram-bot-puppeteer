const ig = require('./instagram')

const instagram = async () => {
    await ig.initialize()
    await ig.login('asdfasf', 'sdfasfad')

}

instagram()