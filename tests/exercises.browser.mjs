// Run against built frontend assets with a Playwright Page and the Vite manifest.
// Only browser responses are mocked; no accounts or database records are created.
export default async function exerciseCatalogueTest(page, { manifest, origin = 'http://localhost:8000', screenshots }) {
    const assert = (condition, message) => {
        if (!condition) throw new Error(message)
    }
    const grammar = { id: 1, title: 'Граматика', slug: 'grammar' }
    const vocabulary = { id: 2, title: 'Лексика', slug: 'vocabulary' }
    const fixtures = [
        ['Дієслово być', grammar],
        ['Порядок слів у реченні', grammar],
        ['Знайомство польською', vocabulary],
        ['Особові займенники', grammar],
        ['Мій день', vocabulary],
        ['Запитання та відповіді', vocabulary],
    ].map(([title, tag], index) => ({ id: index + 1, title, slug: `exercise-${index + 1}`, is_active: true, tags: [tag] }))
    let exercises = [...fixtures, { id: 99, title: 'Прихована вправа', slug: 'hidden', is_active: false, tags: [{ id: 99, title: 'Прихована тема', slug: 'hidden' }] }]
    const errors = []
    const onError = error => errors.push(error.message)
    page.on('pageerror', onError)
    let logoutMethod = null
    const payload = (component, url, props = {}) => ({ component, url, props: { errors: {}, auth: { user: { id: 0, name: 'Preview', email: 'preview@example.test' } }, ...props }, version: null, clearHistory: false, encryptHistory: false })
    const html = data => `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${Object.values(manifest).filter(entry => entry.file.endsWith('.css')).map(entry => `<link rel="stylesheet" href="/build/${entry.file}">`).join('')}<script type="module" src="/build/${manifest['resources/js/app.tsx'].file}"></script></head><body class="font-sans antialiased"><script data-page="app" type="application/json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script><div id="app"></div></body></html>`
    const handler = async route => {
        const request = route.request()
        const url = new URL(request.url())
        if (!['/exercises', '/dashboard', '/logout'].includes(url.pathname)) return route.continue()
        if (url.pathname === '/logout') {
            logoutMethod = request.method()
            return route.fulfill({ status: 200, contentType: 'application/json', headers: { 'X-Inertia': 'true' }, body: JSON.stringify(payload('auth/login', '/login')) })
        }
        const data = url.pathname === '/exercises' ? payload('dashboard/exercises', '/exercises', { exercises }) : payload('dashboard/main', '/dashboard')
        return request.headers()['x-inertia']
            ? route.fulfill({ status: 200, contentType: 'application/json', headers: { 'X-Inertia': 'true' }, body: JSON.stringify(data) })
            : route.fulfill({ status: 200, contentType: 'text/html', body: html(data) })
    }
    await page.unrouteAll({ behavior: 'wait' })
    await page.route(`${origin}/**`, handler)
    const open = async () => {
        await page.goto(`${origin}/exercises`)
        await page.getByRole('heading', { name: 'Вправи', exact: true }).waitFor()
        await page.evaluate(() => document.fonts.ready)
    }
    const cards = () => page.getByRole('list', { name: 'Список вправ' }).getByRole('link')
    const count = async expected => {
        await page.waitForFunction(expected => document.querySelectorAll('ul[aria-label="Список вправ"] a').length === expected, expected)
    }
    const fitsViewport = async () => {
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'Horizontal overflow')
    }
    await page.setViewportSize({ width: 1487, height: 1058 })
    await open()
    await count(6)
    assert(await page.getByText('Прихована вправа').count() === 0, 'Inactive exercise exposed')
    assert(await page.getByRole('button', { name: 'Прихована тема' }).count() === 0, 'Inactive-only tag exposed')
    assert(await page.getByRole('link', { name: 'Вправи', exact: true }).getAttribute('aria-current') === 'page', 'Missing active navigation')
    assert(await cards().first().getAttribute('href') === '/exercises/exercise-1', 'Exercise route is wrong')
    if (screenshots) await page.screenshot({ path: `${screenshots}/exercises-desktop.png`, fullPage: false })
    const search = page.getByRole('searchbox', { name: 'Пошук вправ' })
    await search.fill('  BYĆ  ')
    await count(1)
    await search.fill('ГРАМАТИКА')
    await count(3)
    await page.getByRole('button', { name: 'Очистити пошук' }).click()
    await count(6)
    await page.getByRole('button', { name: 'Лексика', exact: true }).click()
    await count(3)
    await search.fill('знайомство')
    await count(1)
    await search.fill('немає такої вправи')
    await page.getByRole('heading', { name: 'Вправ не знайдено' }).waitFor()
    assert(await page.getByRole('button', { name: 'Скинути фільтри' }).count() === 0, 'Removed reset button is still visible')
    await page.getByRole('button', { name: 'Очистити пошук' }).click()
    await count(3)
    await page.getByRole('button', { name: 'Усі теми' }).click()
    await count(6)
    assert(await search.inputValue() === '', 'Reset did not clear query')
    assert(await page.getByRole('button', { name: 'Усі теми' }).getAttribute('aria-pressed') === 'true', 'Reset did not clear tag')
    await page.getByRole('button', { name: 'Лексика', exact: true }).focus()
    await page.keyboard.press('Enter')
    await count(3)
    await page.getByRole('button', { name: 'Усі теми' }).click()
    for (const width of [360, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 900 })
        await fitsViewport()
        if (screenshots && width === 390) await page.screenshot({ path: `${screenshots}/exercises-mobile.png`, fullPage: true })
    }
    await page.setViewportSize({ width: 390, height: 844 })
    await page.getByRole('button', { name: 'Відкрити меню' }).click()
    const dialog = page.getByRole('dialog', { name: 'Меню навчання' })
    await dialog.waitFor()
    if (screenshots) await page.screenshot({ path: `${screenshots}/exercises-menu.png` })
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    assert(await page.getByRole('button', { name: 'Відкрити меню' }).evaluate(element => element === document.activeElement), 'Menu did not return focus')
    await page.getByRole('button', { name: 'Відкрити меню' }).click()
    await page.setViewportSize({ width: 1280, height: 900 })
    await dialog.waitFor({ state: 'hidden' })
    await page.getByRole('link', { name: 'Головна', exact: true }).click()
    await page.getByRole('heading', { name: 'Кабінет' }).waitFor()
    await page.getByRole('link', { name: 'Вправи', exact: true }).click()
    await count(6)
    await page.getByRole('button', { name: 'Вийти', exact: true }).click()
    await page.waitForURL('**/login')
    assert(logoutMethod === 'POST', 'Logout must use POST')
    exercises = []
    await open()
    await page.getByRole('heading', { name: 'Вправи скоро з’являться' }).waitFor()
    assert(await search.count() === 0, 'Empty catalogue should not show irrelevant search')
    exercises = [{ ...fixtures[0], title: 'Надзвичайнодовгеназвання'.repeat(12), tags: [{ ...grammar, title: 'Довганазватеми'.repeat(10) }] }, { ...fixtures[1], tags: [] }]
    await page.setViewportSize({ width: 360, height: 844 })
    await open()
    await count(2)
    await fitsViewport()
    exercises = fixtures
    await page.setViewportSize({ width: 1487, height: 1058 })
    await open()
    await count(6)
    await page.unroute(`${origin}/**`, handler)
    page.off('pageerror', onError)
    assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`)
    return { passed: true, scenarios: ['active-only catalogue', 'search title and tags', 'combined filters', 'reset', 'keyboard filters', 'responsive widths', 'mobile menu and focus', 'resize open menu', 'navigation', 'POST logout', 'empty catalogue', 'long content'], screenshots, errors }
}
