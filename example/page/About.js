import {
	Component
} from '../../src/routing-next-beta.js'

class About extends Component{
	constructor(request) {
		super({
			name: request.name,
			state: {}
		})
	}
	render() {
		return (
			`
		  	<div class="col-12 col-lg-6 offset-lg-3 text-center p-2 shadow-sm bg-white">
				<p class="text-center" style="font-size: 20px;font-weight: 600;">About</p>
				<p>
					Lavosted is framework javascript using pure javascript and used to create web app without library or packages.
				</p>
				<p>Feedback issue and bug in <a href="">Github</a></p>
		  	</div>
			`
		)
	}
}

export default About;