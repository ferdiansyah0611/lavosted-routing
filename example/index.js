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
class RouteTemplate {
    template() {
        document.body.style.backgroundColor = 'var(--bs-indigo)'
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
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Lavosted</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    ${Link(['class="nav-link" aria-current="page"']).to('/library/lavosted.routing', 'Home')}
                                </li>
                                <li class="nav-item">
                                    ${Link(['class="nav-link"']).to('/library/lavosted.routing/about', 'About')}
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">Dropdown</a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                                </li>
                            </ul>
                            <form class="d-flex">
                                <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search">
                                <button class="btn btn-outline-success" type="submit">Search</button>
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


var route = [{
    path: '/library/lavosted.routing',
    title: 'Home Title',
    name: 'app-home',
    template: (name) => new Home(name)
}, {
    path: '/library/lavosted.routing/about',
    title: 'About Title',
    name: 'app-about',
    template: (name) => new About(name)
}, {
    path: '/library/lavosted.routing/<Number>/index',
    title: 'Example Params',
    params: ['Number'],
    name: 'app-about',
    template: (name, params) => new About(params)
}, {
    path: '/library/lavosted.routing/<Number>/index/app',
    title: 'Example Params',
    params: ['Number'],
    name: 'app-about',
    template: (name, params) => new About(params)
}, ]

const app = new Routing(route, {
    templateIntegratedRouting: new RouteTemplate(),
    AppName: 'app-lavosted',
    Type: 'development',
    PageError: Errors.Notfounds()
}).rendering('#app').dbprivate('YWRtaW4=')/*admin*/