import {
	Component,
	Link,
	Routing
} from '../src/routing'
import Home from './page/Home'
import About from './page/About'

let Errors = {}
Errors.Notfounds = () => {
	return ('Error 404')
}

var route = [
	{
		path: '/library/lavosted.routing',
		title: 'Home Title',
		template: () => new Home()
	},
	{
		path: '/library/lavosted.routing/about',
		title: 'About Title',
		template: () => new About()
	},
]
window.app = new Routing(route, {
	AppName: 'app-lavosted',
	Type: 'development',
	PageError: Errors.Notfounds(),
	Security: {
		CSRF: ''
	}
}).rendering('#app')