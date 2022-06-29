import { themes, changeTheme } from './themes/themes'
import React from 'react'
export const SelectTheme = () => {
	return (
		<>
			<details>
				<summary className='title'>
					Themes
				</summary>
				<ul>
					{themes.map((theme, index) => {
						return (
							<li
								className='theme'
								key={theme.name}
								onClick={() => changeTheme(index)}
							>
								{theme.name}
							</li>
						)
					})}
				</ul>
			</details>
		</>
	)
}
