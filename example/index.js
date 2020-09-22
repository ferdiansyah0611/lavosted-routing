import {
	Component,
	Link,
	Routing,
	SubComponent
} from '../src/routing'
import Home from './page/Home'
import About from './page/About'

let Errors = {}
Errors.Notfounds = () => {
	return ('Error 404')
}
class RouteTemplate{
	template() {
		document.body.style.backgroundColor = 'var(--bs-indigo)'
		const example = new SubComponent('app-nav', {
			beforeMount: () => {
			},
			componentWillmount: () => {
			},
			componentDidMount: () => {
			},
			render: () => {
				return (`
					<nav class="navbar navbar-expand-lg navbar-light bg-white">
  					<div class="container-fluid">
  					  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
  					    <span class="navbar-toggler-icon"></span>
  					  </button>
  					  <a class="navbar-brand" href="#">Lavosted</a>
  					  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
  					    <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
  					      <li class="nav-item">
  					        ${new Link(['class="nav-link"']).to('/library/lavosted.routing', 'Home')}
  					      </li>
  					      <li class="nav-item">
  					        ${new Link(['class="nav-link"']).to('/library/lavosted.routing/about', 'Docs')}
  					      </li>
  					    </ul>
  					    <form class="d-flex">
  					      <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search">
  					      <button class="btn btn-outline-primary" type="submit">Search</button>
  					    </form>
  					  </div>
  					</div>
					</nav>
				`)
			}
		}).start
		return (
			`${example}
			<app-routing></app-routing>
			`
		)
	}
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
	{
		path: '/library/lavosted.routing/about2',
		title: 'About Title',
		template: () => new About()
	},
]

window.app = new Routing(route, {
	templateIntegratedRouting: new RouteTemplate(),
	AppName: 'app-lavosted',
	Type: 'development',
	PageError: Errors.Notfounds(),
	Security: {
		CSRF: ''
	}
}).rendering('#app')