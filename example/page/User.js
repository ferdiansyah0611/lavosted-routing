import {
	Component,
	Link,
	Routing,
	SubComponent,
	Core
} from '../../src/routing.js'

class User extends Component{
	constructor(name, params) {
		super({
			name: name,
			params: params,
			state: {data: [],app: 3, single: 1}
		})
		this.name = name
		this.params = params
		console.log(super.options)
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
		return new Promise((resolve, reject) => {
			resolve({data: () => {
			}})
		})
	}
	ready() {
		L('p').on('click', e => console.log(e))
	}
	// template html
	render() {
		return (
		`
		<section class="section" style="margin-top: 4rem!important;">
		  	<div class="container-sm">
		  		<div class="row">
		  			<div class="col-12 col-lg-6 offset-lg-3 text-center p-2 shadow-lg bg-white">
			  			<p class="text-center" style="font-size: 20px;font-weight: 600;">User ${this.params}</p>
			  			<p>
			  				Lavosted is framework javascript using pure javascript and used to create web app without library or packages.
			  			</p>
			  			<p>Feedback issue and bug in <a href="">Github</a></p>
		  			</div>
		  			</dv>
		  		</div>
		  	</div>
		  </section>
		  `
		)
	}
}

export default User;