import {
	Component,
	Link,
	Routing,
	SubComponent,
	Core
} from '../../src/routing.js'

class Doc extends Component{
	constructor(name) {
		super({
			name: name,
			state: {data: [],app: 3, single: 1}
		})
		this.name = name
		// set state with function callback
		super.setState(state => {
			return{
				'app' : '6',
				'data' : ['data 1']
			}
		})
	}
	// before mounted started
	beforeMount() {
		console.log('before mount')
	}
	// after mount
	componentWillmount() {
		console.log('wil mount')
	}
	// mounted
	componentDidMount() {
		console.log('mount')
		Lv.ajax({
			url: 'http://jsonplaceholder.typicode.com/posts',
			method: 'GET',
			success: (data) => {
				// super.setState(['data', data])
				/*super.setState(state => {
					return{
						'data' : data
					}
				})*/
			},
			error: (e) => {}
		})
		return new Promise((resolve, reject) => {
			resolve({data: () => {
			}})
		})
	}
	ready() {
		L('p').on('click', e => console.log(e))
		/*super.state()['data'].forEach(data => {
			var crt = document.createElement('div')
			crt.className = 'card col-sm-3'
			crt.innerHTML = '<p>' + data.id + '</p>' + '<p>' + data.body + '</p>'
			document.querySelector('.row').appendChild(crt)
		})*/
	}
	// template html
	render() {
		var example_system_templating = ""
		return (
		`<section class="section" style="margin-top: 4rem!important;">
		  	<div class="container-sm">
		  		<div class="row">
		  			<div class="col-12 p-2 shadow-lg bg-white">
			  			<div class="d-flex align-items-start">
  						<div class="nav flex-column nav-pills mr-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
  						  	<a class="nav-link active" id="v-pills-intro-tab" data-toggle="pill" href="#v-pills-intro" role="tab" aria-controls="v-pills-intro" aria-selected="true">Introduction</a>
  						  	<a class="nav-link" id="v-pills-router-tab" data-toggle="pill" href="#v-pills-router" role="tab" aria-controls="v-pills-router" aria-selected="false">Router</a>
  						  	<a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Component</a>
  						  	<a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Authenticate</a>
  						</div>
  						<div class="tab-content" style="overflow-y: auto;max-height: 500px;" id="v-pills-tabContent">
  						  	<div class="tab-pane fade show active" id="v-pills-intro" role="tabpanel" aria-labelledby="v-pills-intro-tab">
  						  		<h4>Introduction</h4>
  						  		<p>Lavosted Routing is a simple and lightweight one page application framework without any packages or libraries. A framework similar to vue js or react js with lifecycle and state management implementations</p>
  						  		<h4>Supported browsers</h4>
  						  		<table class="table">
								  	<thead>
								  	  	<tr>
								  	  	  	<th scope="col"></th>
								  	  	  	<th scope="col">Chrome</th>
								  	  	  	<th scope="col">Firefox</th>
								  	  	  	<th scope="col">Safari</th>
								  	  	  	<th scope="col">Android Browser &amp; WebView</th>
								  	  	</tr>
								  	</thead>
								  	<tbody>
								  	  	<tr>
								  	  	  	<th scope="row">Android</th>
								  	  	  	<td>Supported</td>
								  	  	  	<td>Supported</td>
								  	  	  	<td class="text-muted">—</td>
								  	  	  	<td>v6.0+</td>
								  	  	</tr>
								  	  	<tr>
								  	  	  	<th scope="row">iOS</th>
								  	  	  	<td>Supported</td>
								  	  	  	<td>Supported</td>
								  	  	  	<td>Supported</td>
								  	  	  	<td class="text-muted">—</td>
								  	  	</tr>
								  	</tbody>
								</table>
								<h4>Download</h4>
								<p>Download Lavosted Routing to get compiled or build with Typescript</p>
								<button class="btn btn-info text-white mb-2" onclick="window.location.href = 'https://github.com/ferdiansyah0611/lavosted-routing'">Download Source Code</button>
  						  		<h4>Contributing</h4>
  						  		<a href="https://github.com/ferdiansyah0611">
  						  			<img src="https://avatars2.githubusercontent.com/u/47508140?s=60&u=99c7e1d2602a5a31c17bd995a5db57e1c7f803cb&v=4" alt="image" />
  						  		</a>
  						  		</div>
  						  	<div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
  						  	<div class="tab-pane fade" id="v-pills-router" role="tabpanel" aria-labelledby="v-pills-router-tab">
  						  		<h4>Router</h4>
  						  		<p>Router is a class that defines all routing, configuration and extends features. Inside the router, there is a templating system to speed up the creation of web apps.</p>
  						  		<h5>System Templating</h5>
  						  		<p>In return, there must be a app-routing tag as the main container for changing pages and it must be empty.</p>
  						  		<pre class="shadow-sm p-1 bg-light bg-gradient"><code class="language-javascript">
class RouteTemplates{
	render() {
		return 'template in here'
	}
}
const app = new Routing(route, {
	templateIntegratedRouting: new RouteTemplates()
})</code>
								</pre>
  						  		<h5>Render</h5>
  						  		<p>The render must be one of the elements in your html tag or else an error occurs.</p>
  						  		<pre class="shadow-sm p-1 bg-light bg-gradient">
  						  		<code class="language-javascript">
const app = new Routing(route, {}).rendering('#app')</code>
  						  		</pre>
  						  		<h5>Example</h5>
  						  		<pre class="shadow-sm p-1 bg-light bg-gradient"><code class="language-javascript">
import {Component,Link,Routing,SubComponent} from 'lavosted-routing'
var route = [
  	{
	    path: 'https://library.us/lavosted.routing',
	    title: 'Home Title',
	    name: 'app-home',
	    template: (name) => new Doc(name)
	}
 ]
const app = new Routing(route, {
    BasePath: 'https://library.us/lavosted.routing',
    templateIntegratedRouting: new RouteTemplate(),
    AppName: 'app-lavosted',
    Type: 'development',
    PageError: Errors.Notfounds(),
    extends: {
        Auth: {
            name: 'auth example',
            middleware: ['administrator']
        }
    }
}).rendering('#app').dbprivate('YWRtaW4=')</code>
								</pre>
  						  	</div>
  						  	<div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
  						</div>
						</div>
		  			</div>
		  			</dv>
		  		</div>
		  	</div>
		  </section>
		  `
		)
	}
}
export default Doc;