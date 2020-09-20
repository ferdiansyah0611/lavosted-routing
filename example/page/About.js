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
	}
	// template html
	render() {
		return (
			`<h2>Halaman index ${new Link(['class="bootstap"']).to('/library/lavosted.routing', 'To Home Page')}</h2>`
		)
	}
}

export default About;