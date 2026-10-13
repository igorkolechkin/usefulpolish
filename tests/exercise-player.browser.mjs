// Browser-only fixtures exercise the production React bundle without database writes.
export default async function exercisePlayerTest(page, { manifest, origin = 'http://localhost:8000', screenshots }) {
    const assert = (condition, message) => { if (!condition) throw new Error(message) }
    const items = [
        { type: 'choose_word', sentence: 'Ja ___ z Polski.', options: ['jestem', 'jesteś', 'jest', 'są'], correct_answer: 'jestem' },
        { type: 'choose_word', sentence: 'Ty ___ z Polski.', options: ['jestem', 'jesteś', 'jest', 'są'], correct_answer: 'jesteś' },
        { type: 'arrange_words', sentence: 'To mój dom.' },
        { type: 'arrange_words', sentence: 'to to dom' },
    ]
    let exercise = { title: 'Дієслово być', data: { items } }
    const errors = []
    const onError = error => errors.push(error.message)
    page.on('pageerror', onError)
    const handler = route => {
        const data = { component: 'dashboard/exercise', props: { errors: {}, exercise }, url: '/exercises/preview', version: null, clearHistory: false, encryptHistory: false }
        return route.fulfill({ status: 200, contentType: 'text/html', body: `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${Object.values(manifest).filter(entry => entry.file.endsWith('.css')).map(entry => `<link rel="stylesheet" href="/build/${entry.file}">`).join('')}<script type="module" src="/build/${manifest['resources/js/app.tsx'].file}"></script></head><body class="font-sans antialiased"><script data-page="app" type="application/json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script><div id="app"></div></body></html>` })
    }
    await page.unrouteAll({ behavior: 'wait' })
    await page.route(`${origin}/exercises/preview`, handler)
    const open = async () => {
        await page.goto(`${origin}/exercises/preview`)
        await page.getByRole('heading', { name: exercise.title, exact: true }).waitFor()
        await page.evaluate(() => document.fonts.ready)
    }
    const check = () => page.getByRole('button', { name: 'Перевірити', exact: true })
    const options = () => page.getByRole('group', { name: 'Варіанти відповіді' })
    const progress = async expected => {
        assert(await page.getByRole('progressbar').getAttribute('aria-valuenow') === String(expected), `Wrong progress ${expected}`)
        assert(await page.getByRole('progressbar').locator('div').evaluate(element => element.style.width) === `${expected}%`, 'Progress bar disagrees with percentage')
        await page.getByText(`${expected}% завершено`, { exact: true }).waitFor()
        await page.waitForFunction(expected => {
            const bar = document.querySelector('[role="progressbar"]')
            return Math.abs(bar.firstElementChild.getBoundingClientRect().width - bar.getBoundingClientRect().width * expected / 100) < 1
        }, expected)
    }
    const screenshot = async name => {
        if (screenshots) await page.screenshot({ path: `${screenshots}/${name}.png`, fullPage: true, animations: 'disabled' })
    }
    await page.setViewportSize({ width: 1440, height: 1000 })
    await open()
    await progress(0)
    assert(await check().isDisabled(), 'Check should initially be disabled')
    assert(await page.getByRole('link', { name: 'До всіх вправ' }).getAttribute('href') === '/exercises', 'Back link should return to catalogue')
    await screenshot('player-choice')
    await options().getByRole('button', { name: 'jesteś', exact: true }).click()
    await check().click()
    await page.getByRole('alert').waitFor()
    await progress(0)
    await screenshot('player-error')
    await options().getByRole('button', { name: 'jestem', exact: true }).click()
    assert(await page.getByRole('alert').count() === 0, 'Selecting a new answer should clear error')
    await check().click()
    await page.getByText('Завдання 2 з 4', { exact: true }).waitFor()
    await progress(25)
    assert(await check().isDisabled(), 'Answer leaked into consecutive choice question')
    await options().getByRole('button', { name: 'jesteś', exact: true }).focus()
    await page.keyboard.press('Enter')
    await check().click()
    await page.getByRole('heading', { name: 'Оберіть слова у правильному порядку' }).waitFor()
    await progress(50)
    const available = () => page.getByRole('group', { name: 'Доступні слова' })
    const selected = () => page.getByRole('group', { name: 'Ваше речення' })
    await screenshot('player-arrange')
    await available().getByRole('button', { name: 'dom.', exact: true }).click()
    await check().click()
    await page.getByRole('alert').waitFor()
    await selected().getByRole('button', { name: 'Прибрати слово: dom.', exact: true }).click()
    assert(await page.getByRole('alert').count() === 0, 'Removing a word should clear error')
    for (const word of ['To', 'mój', 'dom.']) await available().getByRole('button', { name: word, exact: true }).click()
    await check().click()
    await page.getByText('Завдання 4 з 4', { exact: true }).waitFor()
    await progress(75)
    assert(await selected().getByRole('button').count() === 0, 'Words leaked into consecutive arrange question')
    for (const word of ['to', 'to', 'dom']) await available().getByRole('button', { name: word, exact: true }).first().click()
    await check().click()
    await page.getByText('Вправу завершено!', { exact: true }).waitFor()
    await progress(100)
    await screenshot('player-completed')
    await page.getByRole('button', { name: 'Пройти ще раз' }).click()
    await progress(0)
    assert(await check().isDisabled(), 'Restart should clear selection')
    for (const width of [360, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 900 })
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`)
        if (width === 390) await screenshot('player-mobile')
    }
    exercise = { title: 'Порожня вправа', data: { items: [] } }
    await open()
    await page.getByRole('heading', { name: 'Завдання скоро з’являться' }).waitFor()
    assert(await page.getByRole('progressbar').count() === 0, 'Empty exercise must not show fake progress')
    exercise = { title: 'Дієслово być', data: { items } }
    await page.setViewportSize({ width: 1440, height: 1000 })
    await open()
    await page.unroute(`${origin}/exercises/preview`, handler)
    page.off('pageerror', onError)
    assert(errors.length === 0, errors.join('; '))
    return { passed: true, errors, scenarios: ['choice wrong/correct', 'keyboard choice', 'consecutive choices reset', 'arrange wrong/correct/remove', 'consecutive arrange reset', 'duplicate words', 'progress consistency 0–100', 'completion/restart', 'responsive widths', 'empty exercise'] }
}
