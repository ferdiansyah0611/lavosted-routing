## Lavosted Routing
Lavosted Routing is a lightweight single page application framework to speed up frontend work. Built using javascript and typescript makes this framework modern and there are service workers to cache resources
### Lifecycle
- beforeMount : in action before the component is rendered
- componentWillmount : occurs when the component is removed / replaced in dom
- componentDidMount : run when the component is append to routing
- render : html data to display to the routing page
- style : to store css based on components
### State Management
store data that must begin with an object
```javascript
class Home extends Component{
    constructor(request){
        super({
            name: request.name,
            state: {

            }
        })
    }
}
export default Home;
```
### Customization Errors 404
displays a customized error page when the page is not found
```javascript
const app = new Routing(route, {
    BasePath: 'https://library.us/lavosted.routing',
    templateIntegratedRouting: new RouteTemplate(),
    AppName: 'app-lavosted',
    Mode: 'production',
    PageError: Errors.Notfounds()
}).rendering('#app').dbprivate('YWRtaW4=')/*admin*/
window.app = app
```
### Core
- CreateElement : to create a new element with append directly
```javascript
Core.CreateElement({
  name: 'div',
  type: ['innerHTML'],
  data: ['<p>Hello Word</p>'],
  query: '#app'
})
```
- CreateComponent : to create a new componen with append directly
```javascript
Core.CreateComponent('app-error',
() => {/*mount*/},() => {/*mount*/})
```
- Write : Debug console
```javascript
Core.write('debug')
```