import {
	Component,
	Link,
	Routing
} from '../../src/routing'

class About extends Component{
	constructor(name/*params*/) {
		super({
			name: name,
			state: {
				data: [
					{id: 1},
					{id: 2}
				]
			}
		})
		this.state = {
			data: [
				{id: 1},
				{id: 2}
			]
		}
		super.state()
		this.name = name
		console.log(super.state())
		/*this.params = params*/
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
		console.log(this)
		return new Promise((resolve, reject) => {
			console.log('mounted')
			resolve({data: () => {}})
		})
	}
	ready() {

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
							${Link(['class="nav-link"']).to('/library/lavosted.routing', 'Home', true)}
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