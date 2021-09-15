import { NavLink } from "react-router-dom"
import s from "./Nav.module.css"
import React from "react"
import packs from "../common/images/packs.png"
import profile from "../common/images/profile.png"

export function Nav() {
	return (
		<div className={s.nav}>
			<div className={s.item + s.head}>
				<NavLink to='/profile'>
					<h1>It-incubator</h1>
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/packslist' activeClassName={s.active}>
					<img src={packs} alt='' />
					Packs list
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/profile' activeClassName={s.active}>
					<img src={profile} alt='' />
					Profile
				</NavLink>
			</div>
		</div>
	)
}
