import {
	Component
} from '../../src/routing-next-beta.js'

class User extends Component{
	constructor(request) {
		super({
			name: request.name,
			params: request.params,
			state: {
				users: {}
			}
		})
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users/' + super.params[0])
        .then(response => response.json())
        .then(data => {
			super.setState(setState => {
				return{
					users: data
				}
			})
		})
        return new Promise((res, rej) => {
            res({data: () => {}})
        })
	}
	// template html
	render() {
		var user = super.state().users
		return (
		`
		  	<div class="col-12 col-lg-6 offset-lg-3 p-2 shadow-sm bg-white">
				<p class="text-center" style="font-size: 20px;font-weight: 600;">Response API Example</p>
				<ul class="list-group">
  					<li class="list-group-item" aria-current="true">${user.id}</li>
  					<li class="list-group-item">${user.name}</li>
  					<li class="list-group-item">${user.username}</li>
  					<li class="list-group-item">${user.email}</li>
  					<li class="list-group-item">${user.phone}</li>
				</ul>
		  	</div>
		  `
		)
	}
}

export default User;