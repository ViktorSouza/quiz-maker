if (localStorage.getItem('theme') === null) {localStorage.setItem('theme', 'Light theme')}
const themeLocalStorage = localStorage.getItem('theme')
export const themes = [
	{
		name: 'Dark theme',
		mainColor: '#4ad9e4',
		mainTextColor: '#e9f1f7',
		background: '#101114',
		background2: '#1c1d23',
		background3: '#23252c',
		background4: '#2d2f38',
		choosedOption: '#4ad9e4',
		error: '#e22d2d',
		right: '#58de5a',
	},
	{
		name: 'Light theme',
		mainColor: '#0084c2',
		mainTextColor: '#1f2325',
		background: '#dcdee9',
		background2: '#e6e9f5',
		background3: '#eff2ff',
		background4: '#eff2ff',
		choosedOption: '#0084c2',
		error: '#e22d2d',
		right: '#58de5a',
	},
	{
		name: 'Nord theme',
		mainColor: '#00e1ff',
		mainTextColor: '#d5e6ff',
		background: '#0d1327',
		background2: '#131c39',
		background3: '#192243',
		background4: '#202c57',
		choosedOption: '#00e1ff',
		error: '#e22d2d',
		right: '#58de5a',
	},
	{
		name: 'Solarize theme',
		mainColor: '#fffbe9',
		mainTextColor: '#fffbe7',
		background: '#062c33',
		background2: '#083d46',
		background3: '#094651',
		background4: '#094651',
		choosedOption: '#1fe297',
		error: '#e22d2d',
		right: '#58de5a',
	},
	{
		name: 'Retro theme',
		mainColor: '#1d1b17',
		mainTextColor: '#1d1b17',
		background: '#dad3c1',
		background2: '#e2dac7',
		background3: '#e9e0ca',
		background4: '#e9e0ca',
		choosedOption: '#1a13e4',
		error: '#e22d2d',
		right: '#58de5a',
	},
	{
		name: 'Matrix theme',
		mainColor: '#0df237',
		mainTextColor: '#0df237',
		background: '#0a0a0a',
		background2: '#18181d',
		background3: '#16181f',
		background4: '#16181f',
		choosedOption: '#f2cc0d',
		error: '#e22d2d',
		right: '#58de5a',
	},
	{
		name: 'Aurora theme',
		mainColor: '#00e8b0',
		mainTextColor: '#a8efdf',
		background: '#011926',
		background2: '#032937',
		background3: '#022f48',
		background4: '#022f48',
		choosedOption: '#00e8b0',
		error: '#e22d2d',
		right: '#58de5a',
	},
	{
		name: 'Darling theme',
		mainColor: '#c02a2a',
		mainTextColor: '#121212',
		background: '#fec8cd',
		background2: '#ffd2d7',
		background3: '#ffdee2',
		background4: '#ffdee2',
		choosedOption: '#c02a2a',
		error: '#e22d2d',
		right: '#58de5a',
	},
]

changeTheme(themes.findIndex((theme) => theme.name === themeLocalStorage))

export function changeTheme(theme) {
	var root = document.querySelector(':root')
	root.style.setProperty('--main-color', themes[theme].mainColor)
	root.style.setProperty('--main-color-low-opacity', themes[theme].mainColor + '22')
	root.style.setProperty('--main-text-color', themes[theme].mainTextColor)
	root.style.setProperty('--background1', themes[theme].background)
	root.style.setProperty('--background2', themes[theme].background2)
	root.style.setProperty('--background3', themes[theme].background3)
	root.style.setProperty('--background4', themes[theme].background4)
	root.style.setProperty('--choosed-option', themes[theme].choosedOption)
	root.style.setProperty('--error', themes[theme].error)
	root.style.setProperty('--red-low-opacity', themes[theme].error + '77')
	root.style.setProperty('--right', themes[theme].right)
	localStorage.setItem('theme', themes[theme].name)
}
