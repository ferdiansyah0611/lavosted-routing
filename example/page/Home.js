import {
	Component,
	Link,
	Routing,
	SubComponent,
	Core
} from '../../src/routing'

class Home extends Component{
	constructor(name) {
		super({
			name: name,
			state: {data: [],app: 3, single: 1}
		})
		this.state = {data: [],app: 3, single: 1}
		this.name = name
		console.log(super.state())
		super.setState(state => {
			return{
				'app' : '6'
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
				super.setState(['data', data])
				this.state['data'] = data
				console.log(data)
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
		console.log('ready')
	}
	// template html
	render() {
		return (
		`<section class="section mt-3">
		  	<div class="container-sm">
		  	<p>Click</p>
		  		<div class="row">
		  		</div>
		  	</div>
		  </section>
		  `
		)
	}
}

export default Home;