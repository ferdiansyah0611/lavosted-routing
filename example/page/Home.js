import {
	Component
} from '../../src/routing.js'

class Home extends Component{
	constructor(request) {
		super({
			name: request.name,
			state: {}
		})
	}
	style(){
		return(`
			h5 > b{
				color: black,
				background: blue
			}
		`)
	}
	render() {
		return (
		`
		  	<div class="container-sm">
		  		<div class="row">
		  			<div class="col-12 col-lg-6 offset-lg-3 text-center p-2 shadow-sm bg-white">
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
		  `
		)
	}
}

export default Home;