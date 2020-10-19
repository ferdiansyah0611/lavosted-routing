import {
	Component,
	Link,
	Routing,
	SubComponent,
	Core
} from '../../src/routing.js'

class Home extends Component{
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
		return (
		`<section class="section" style="margin-top: 4rem!important;">
		  	<div class="container-sm">
		  		<div class="row">
		  			<div class="col-12 col-lg-6 offset-lg-3 text-center p-2 shadow-lg bg-white">
			  			<p class="text-center" style="font-size: 30px;font-weight: 600;">Lavosted Routing Framework</p>
			  			<p>
			  				<div class="d-flex justify-content-center">
			  				<div class="spinner-border text-primary" role="status">
							  	<span class="visually-hidden">Loading...</span>
							</div>
							</div>
			  			</p>
		  				<p>Create your first web app</p>
		  				<p>Open file index.js for creating</p>
		  			</div>
		  			</dv>
		  		</div>
		  	</div>
		  </section>
		  `
		)
	}
}

export default Home;

// function example() {
// 	return{
// 		data: e(
// 			{
// 				className: ['1', '2'],
// 				next: e({
// 					className: ['1', '2'],
// 					next: e({
						
// 					})
// 				})
// 			}
// 		)
// 	}
// }