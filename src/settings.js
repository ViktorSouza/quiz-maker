import { SelectTheme } from './select-theme'
import { themes, changeTheme } from './themes/themes.js'
import React from 'react'
export const Settings = ({closeSettings})=>{
    return (
		<div className='settings'>
				<h1>Settings</h1>
				<i className='bi bi-x normal-icon close-settings' onClick={()=>closeSettings(false)}></i>
			<SelectTheme></SelectTheme>
		</div>
	)
}