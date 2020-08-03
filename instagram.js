const puppeteer = require('puppeteer')

const BASE_URL = 'https://instagram.com'
const TAG_URL = (tag) => { return `https://www.instagram.com/explore/tags/${tag}/` }
const instagram = {
    browser: null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false
        })
        instagram.page = await instagram.browser.newPage()
    },

    login: async (username, password) => {
        await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' })
        await instagram.page.waitFor(1000)
        // Writing the username and password
        await instagram.page.type('input[name="username"]', username, { delay: 50 })
        await instagram.page.type('input[name="password"]', password, { delay: 50 })

        // click on the login button
        let loginButton = await instagram.page.$x('//*[@id="react-root"]/section/main/article/div[2]/div[1]/div/form/div[4]/button')
        await loginButton[0].click()

        await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' })
        // click save info button
        let saveInfoButton = await instagram.page.$x('//*[@id="react-root"]/section/main/div/div/div/div/button')
        await saveInfoButton[0].click()

        await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' })
        // click turn on notifications button
        let NotificationButton = await instagram.page.$x('/html/body/div[4]/div/div/div/div[3]/button[2]')
        await NotificationButton[0].click()

        await instagram.page.waitForXPath('//*[@id="react-root"]/section/nav/div[2]/div/div/div[3]/div/div[5]/span')
    },

    likeTagsProcess: async (tags = []) => {
        for (let tag of tags) {
            // go to the tag page
            await instagram.page.goto(TAG_URL(tag), { waitUntil: 'networkidle2' })
            await instagram.page.waitFor(1000)

            let posts = await instagram.page.$$('article > div:nth-child(3) img')

            for (let i = 0; i < 3; i++) {
                let post = posts[i]
                // click on the post
                await post.click()

                // wait for the modal to appear
                await instagram.page.waitForFunction('document.querySelector("body").style.overflow == "hidden"')
                await instagram.page.waitFor(2000)

                let isLikeable = await instagram.page.$('svg[aria-label="Like"]')

                if (isLikeable) {
                    await instagram.page.click('svg[aria-label="Like"]')
                }
                await instagram.page.waitFor(3000)

                // Close the modal
                debugger
                let closeModalButton = await instagram.page.$x('/html/body/div[4]/div[3]/button')
                // using xpath selector yields an array that can be selected by index zero. Using $ selector cannot make the button clickable
                await closeModalButton[0].click()
                await instagram.page.waitFor(1000)
            }
            await instagram.page.waitFor(15000)
        }
        await instagram.browser.close()
    }
}

module.exports = instagram