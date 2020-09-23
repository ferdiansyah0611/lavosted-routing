import {
	Component,
	Link,
	Routing
} from '../../src/routing'

class About extends Component{
	constructor() {
		super()
		this.state = {
			data: [
				{id: 1},
				{id: 2}
			]
		}
		this.name = 'app-about'
	}
	// before mounted started
	beforeMount() {
		return 'before mount'
	}
	// after mount
	componentWillmount() {
		console.log('change page')
	}
	// mounted
	componentDidMount() {
		console.log('mounted')
		return true;
	}
	// template html
	render() {
		return (
			`
			<section class="section mt-3">
  			<div class="container">
				<div class="col-md-6 offset-3">
					<div class="card">
						<div class="card-body">
							<p class="h1">Page About
							${new Link(['class="nav-link"']).to('/library/lavosted.routing', 'Home', true)}
							</p>
						</div>
					</div>
				</div>
			</div>
			</section>
			`
		)
	}
}

export default About;