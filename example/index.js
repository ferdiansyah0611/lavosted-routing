import {
    Component,
    Link,
    Routing,
    SubComponent
} from '../src/routing.js'
import Home from './page/Home.js'
import About from './page/About.js'
import User from './page/User.js'
import Doc from './page/Doc.js'

let Errors = {}
Errors.Notfounds = () => {
    return ('Error 404')
}
class RouteTemplate {
    template() {
        document.body.setAttribute('style', "background-color: #1a8dff;font-family: 'Roboto', sans-serif !important")
        const example = new SubComponent('app-nav', {
            beforeMount: () => {},
            componentWillmount: () => {},
            componentDidMount: () => {
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
            },
            render: () => {
                return (`
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
                                <li class="nav-item">
                                    ${Link(['class="nav-link"']).to('/docs', 'Documentation')}
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">Parameter</a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>${Link(['class="dropdown-item"']).to('/90000/index', 'With Number')}</li>
                                        <li>${Link(['class="dropdown-item"']).to('/90030/index', 'With Number 2')}</li>
                                        <li>${Link(['class="dropdown-item"'], true).to('/dashboard/ferdiansyah', 'With String')}</li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
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


var route = [{
    path: 'https://library.us/lavosted.routing',
    title: 'Home Title',
    name: 'app-home',
    template: (name) => new Doc(name)
}, {
    path: 'https://library.us/lavosted.routing/about',
    title: 'About Title',
    name: 'app-about',
    template: (name) => new About(name)
}, {
    path: 'https://library.us/lavosted.routing/<Number>/index',
    title: 'Example Params',
    params: ['Number'],
    name: 'app-example',
    beforeEach: (forward, next, auth) => {
        if(auth.middleware === 'admin'){
            next('/dashboard')
        }
    },
    template: (name, params) => new User(name, params)
}, {
    path: 'https://library.us/lavosted.routing/dashboard/<String>',
    title: 'Example Params',
    params: ['String'],
    name: 'app-string',
    template: (name, params) => new User(name, params)
},
{
    path: 'https://library.us/lavosted.routing/docs',
    title: 'Documentation of lavosted routing',
    name: 'app-documentation',
    template: (name, params) => new Doc(name)
} ]

const app = new Routing(route, {
    BasePath: 'https://library.us/lavosted.routing',
    templateIntegratedRouting: new RouteTemplate(),
    AppName: 'app-lavosted',
    Type: 'development',
    PageError: Errors.Notfounds(),
    extends: {
        Auth: {
            name: 'auth example',
            middleware: ['administrator'],
            url: {
                register: '',
                login: ''
            }
        }
    }
}).rendering('#app').dbprivate('YWRtaW4=')/*admin*/