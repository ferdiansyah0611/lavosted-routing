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
		this.state = {data:2,app: 3, single: 1}
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
	}
	event(event) {
		console.log('click')
	}
	// template html
	render() {
		return (
			`
			<div class="col-12 mt-4">
			<div class="col-md-6 offset-3">
				<div class="card shadow-sm border border-primary">
					<div class="card-body">
						<p class="h4 text-center">Lavosted Routing
						${new Link(['class="nav-link"']).to('/library/lavosted.routing/about', 'Page', true)}
						</p>
						<div class="text-center">
							<div class="spinner-border text-primary" role="status">
							  	<span class="sr-only">Loading...</span>
							</div>
							<p>Change routing in index.js</p>
						</div>
					</div>
				</div>
			</div>
			</div>
			`
		)
	}
}

export default Home;