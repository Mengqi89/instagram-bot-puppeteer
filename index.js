const ig = require('./instagram')

const instagram = async () => {
    await ig.initialize()
    await ig.login('mrwangdli', 'linguistics')
    await ig.likeTagsProcess(['hiking'])
}

instagram()