import {
	Component,
	Link,
	Routing
} from '../../src/routing.js'

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
			`<section class="section" style="margin-top: 4rem!important;">
		  	<div class="container-sm">
		  		<div class="row">
		  			<div class="col-12 col-lg-6 offset-lg-3 text-center p-2 shadow-lg bg-white">
			  			<p class="text-center" style="font-size: 20px;font-weight: 600;">About</p>
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

export default About;