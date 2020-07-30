const puppeteer = require('puppeteer')

const BASE_URL = 'https://instagram.com'

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

        let loginButton = await instagram.page.$x('//*[@id="react-root"]/section/main/article/div[2]/div[1]/div/form/div[4]/button')

        // click on the login url button
        // await loginButton[0].click()
        await instagram.page.waitFor(1000)
        // Writing the username and password
        await instagram.page.type('input[name="username"]', username, { delay: 50 })
        await instagram.page.type('input[name="password"]', password, { delay: 50 })

        debugger
    }
}

module.exports = instagram