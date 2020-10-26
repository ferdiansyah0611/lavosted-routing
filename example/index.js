import {
    Link,
    Routing,
    Core as C
} from '../src/routing.js'
import Home from './page/Home.js'
import About from './page/About.js'
import User from './page/User.js'
import Dashboard from './page/Dashboard.js'

let Errors = {}
Errors.Notfounds = () => {
    return ('Error 404')
}
class RouteTemplate {
    template() {
        document.body.setAttribute('style', "background-color: #efefef;font-family: 'Roboto', sans-serif !important")
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            });
        }
        return (
            `
            <nav class="navbar navbar-expand-lg navbar-light bg-white bg-gradient fixed-top shadow-sm">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Lavosted</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                ${Link(['class="nav-link" aria-current="page"']).to('', 'Home')}
                            </li>
                            <li class="nav-item">
                                ${Link(['class="nav-link"']).to('/about', 'About')}
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">Parameter</a>
                                <ul class="dropdown-menu shadow-sm border-0" aria-labelledby="navbarDropdown" style="margin-top: 10px;">
                                    <li>${Link(['class="dropdown-item"']).to('/1/index', 'Number 1', '/<Number>/index')}</li>
                                    <li>${Link(['class="dropdown-item"']).to('/2/index', 'Number 2', '/<Number>/index')}</li>
                                    <li>${Link(['class="dropdown-item"']).to('/dashboard/ferdiansyah', 'String 1', '/dashboard/<String>')}</li>
                                    <li>${Link(['class="dropdown-item"']).to('/dashboard/safina-sahda', 'String 2', '/dashboard/<String>')}</li>
                                </ul>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <button class="btn btn-primary" type="button">Login</button>
                            <button class="btn btn-primary ml-1" type="button">Register</button>
                        </div>
                    </div>
                </div>
            </nav>
            <section class="section" style="margin-top: 4rem!important;">
                <div class="container-sm">
		  	        <div class="row">
                        <app-routing></app-routing>
                    </div>
                </div>
            </section>
			`
        )
    }
}


var route = [{
    path: 'https://library.us/lavosted.routing',
    title: 'Home Title',
    name: 'app-home',
    template: (request) => new Home(request)
}, {
    path: 'https://library.us/lavosted.routing/about',
    title: 'About Title',
    name: 'app-about',
    template: (request) => new About(request)
}, {
    path: 'https://library.us/lavosted.routing/<Number>/index',
    title: 'Example Params',
    params: true,
    name: 'app-example',
    // beforeEach: (auth) => {
    //     return{to: '/dashboard'}
    // },
    template: (request) => new User(request)
}, {
    path: 'https://library.us/lavosted.routing/dashboard/<String>',
    title: 'Example Params',
    params: true,
    name: 'app-string',
    template: (request) => new Dashboard(request)
} ]

const app = new Routing(route, {
    BasePath: 'https://library.us/lavosted.routing',
    templateIntegratedRouting: new RouteTemplate(),
    AppName: 'app-lavosted',
    Mode: 'production',
    PageError: Errors.Notfounds(),
    extends: {
        Auth: true
    }
}).rendering('#app').dbprivate('YWRtaW4=')/*admin*/
window.app = app