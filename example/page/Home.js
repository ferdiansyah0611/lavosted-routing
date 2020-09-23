import {
	Component,
	Link,
	Routing,
	SubComponent,
	Core
} from '../../src/routing'

class Home extends Component{
	constructor() {
		super()
		this.state = {data: [],app: 3, single: 1}
		this.name = 'app-home'
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
		console.log('mounted')
		L('p').on('click', e => this.event(e))
		this.exampleapi()
		return true;
	}
	event(event) {
		console.log('click')
	}
	async exampleapi() {
		return await Lv.ajax({
			url: 'http://jsonplaceholder.typicode.com/posts',
			method: 'GET',
			success: (data) => {
				super.setState(['data', data])
				this.state['data'] = data
				return data
			},
			error: (e) => {}
		})

	}
	// template html
	render() {
		return (
		`<section class="section mt-3">
  			<div class="container">
  				<h1 class="title">
  				  Hello World
  				</h1>
  				<p class="subtitle">
  				  My first website with <strong>Bulma</strong>!
  				</p>
  				<div class="columns">
  				${super.state().data.map((data, key) => {
  					return (`
  						<div class="column is-one-quarter">
  						<div class="card">
						  <div class="card-image">
						    <figure class="image is-4by3">
						      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
						    </figure>
						  </div>
						  <div class="card-content">
						    <div class="media">
						      <div class="media-left">
						        <figure class="image is-48x48">
						          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
						        </figure>
						      </div>
						      <div class="media-content">
						        <p class="title is-4">Ferdiansyah</p>
						        <p class="subtitle is-6">@ferdiansyah0611</p>
						      </div>
						    </div>
						
						    <div class="content">
						      ${data.body}
						      <br>
						      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
						    </div>
						  </div>
						</div>
						</div>`)
  				})}
  				</div>
  			</div>
  		</section>
  		`
		)
	}
}

export default Home;