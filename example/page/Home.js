import {
	Component,
	Link,
	Routing,
	SubComponent,
	Core
} from '../../src/routing'
console.log(Core)
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
				<div class="card">
					<div class="card-body">
						<p class="h1">Page Home 
						${new Link(['class="nav-link"']).to('/library/lavosted.routing/about', 'Page', true)}
						</p>
					</div>
				</div>
			</div>
			</div>
			`
		)
	}
}

export default Home;