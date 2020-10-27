import {
	Component
} from '../../src/routing-next-beta.js'

class Dashboard extends Component{
    constructor(request) {
        super({
            name: request.name,
            params: request.params,
            state: {}
        })
    }
    render() {
        return `
            <div class="col-12 p-2">
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <p class="mb-0">Welcome to dashboard <b>${super.params[0]}</b></p>
                    </div>
                </div>
            </div>
        `
    }
}

export default Dashboard;