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
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
			},
			render: () => {
				return (`
					<nav class="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    ${new Link(['class="navbar-item"']).to('/library/lavosted.routing', 'Home')}
    ${new Link(['class="navbar-item"']).to('/library/lavosted.routing/about', 'Documentation')}
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
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
		path: '/library/lavosted.routing/{number}/params',
		title: 'Example Params',
		params: ['number'],
		template: () => new About()
	},
]

console.log(route[2].template().isPrototypeOf('Component'))

window.app = new Routing(route, {
	templateIntegratedRouting: new RouteTemplate(),
	AppName: 'app-lavosted',
	Type: 'development',
	PageError: Errors.Notfounds()
}).rendering('#app')