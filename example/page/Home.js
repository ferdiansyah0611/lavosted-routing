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
		this.event = this.event.bind(this)
	}
	// before mounted started
	beforeMount() {
		console.log('before mount')
	}
	// after mount
	componentWillmount() {
		console.log('change page')
	}
	// mounted
	componentDidMount() {
		super.setState(['data', 4], ['app', 7])
		console.log('mounted')
		console.log(super.state())
		console.log(window.history.state)
		L('p').on('click', e => this.event(e))
	}
	event(event) {
		console.log('click')
		return true;
	}
	// template html
	render() {
		return (
			`<h2>Halaman lavosted ${new Link(['class="bootstap"']).to('/library/lavosted.routing/about', 'To About Page')}</h2>
			<p>test event</p>
			<app-routing>
				apapa${new Link(['class="bootstap"']).to('/lavosted/sdd', 'Download')}
				
				${new SubComponent('example-component', {
					beforeMount: () => {

					},
					componentWillmount: () => {

					},
					componentDidMount: () => {
						console.log('mount sub-component')
					},
					render: () => {
						return ('<sub-component>sub component</sub-component>')
					}
				}).start}
			</app-routing/>
			`
		)
	}
}

export default Home;