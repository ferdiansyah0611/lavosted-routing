export let Core = {}
// create element
Core.CreateElement = (data) => {
	if(data.type.length === data.data.length) {
		let Create = document.createElement(data.name)
		for (var i = 0; i < data.type.length; i++) {
			Create[data.type[i]] = data.type[i]
		}
		Create[data.type] = data.data
		document.querySelector(data.query).appendChild(Create)
	}
}
// create component
Core.CreateComponent = (NameElement, ComponentDidMount, ComponentWillmount) => {
	class Reactivty extends HTMLElement {
		constructor() {
			super()
		}
		connectedCallback() {
	  	  ComponentDidMount()
	  	}
	  	disconnectedCallback() {
	  	  ComponentWillmount()
	  	}
	  	adoptedCallback() {
	  	  console.log('Custom square element moved to new page.');
	  	}
	  	attributeChangedCallback(name, oldValue, newValue) {
	  	  console.log('Custom square element attributes changed.');
	  	}
	}
	if(!customElements.get(NameElement)) {
		customElements.define(NameElement, Reactivty);
	}
}
Core.FindingData = (DataArray, DataFind) => {
	class Filtered {
		constructor($Array = [], Find = '') {
			this.array = $Array
			this.find = Find
		}
		run() {
			return this.array.find((DataRoute, KeyRoute) => {
				// define variable detection typedata
				let Path 		= typeof DataRoute.path,
					Title 		= typeof DataRoute.title,
					BeforeMount = typeof DataRoute.template().beforeMount,
					Mount 		= typeof DataRoute.template().componentDidMount,
					State 		= typeof DataRoute.template().state,
					Render 		= typeof DataRoute.template().render;
				if((DataRoute.path + '/').match(this.find)) {
					if(Path == 'string' && Title == 'string' && BeforeMount == 'function' && Mount == 'function' && State == 'object' && Render == 'function') {
						return true
					}
					else
						throw Error('please check type data in your routing')
				}
			})
		}
	}
	return new Filtered(DataArray, DataFind)
}

export class Link {
	constructor(props = []) {
		this.props = props
	}
	to($url, $string, type) {
		if(type) {
			return `<a ${this.props} href="${$url}" lavosted="link" async="true">${$string}</a>`
		}else{
			return `<a ${this.props} href="${$url}" lavosted="link">${$string}</a>`
		}
	}
}

export class Routing {
	constructor(DefineOwnRoute = [], ConfigRoute = {}) {
		this.DefineOwnRoute = DefineOwnRoute
		this.ConfigRoute = ConfigRoute
	}
	rendering(ElementApp) {
		let TemplateIntegrated = this.ConfigRoute.templateIntegratedRouting.template(),
			BaseUrl = window.location.origin, PathUrl = window.location.pathname,
			RenderElement = document.body.querySelector(ElementApp),
			FilterPathUrl = Core.FindingData(this.DefineOwnRoute, PathUrl).run(),
			CheckAppRouting = (OnTrue) => {
				if(document.querySelectorAll('app-routing').length === 1){
					OnTrue()
				}
				if(document.querySelectorAll('app-routing').length >= 2 || document.querySelectorAll('app-routing').length <= 0){
					RenderElement.remove()
					throw Error('query "app-routing" no more than 2 or more or nothing. Must be have 1 element.')
				}
			},
			Started = () => {
				// check object
				if(typeof FilterPathUrl === 'object') {
					let ComponentReady = FilterPathUrl.template(),
					EventClickChangePage = () => {
						document.querySelectorAll('a[lavosted="link').forEach(DataQuery => {
							DataQuery.addEventListener('click', e => {
								e.preventDefault()
								if(e.target.getAttribute('href') !== window.location.pathname) {
									OnChangePage(e);
								}
							})
						})
					},
					EventClickAsync = () => {
						document.querySelectorAll('a[lavosted="link"][async="true"]').forEach(DataQuery => {
							DataQuery.addEventListener('click', e => {
								e.preventDefault()
								if(e.target.getAttribute('href') !== window.location.pathname) {
									OnChangePage(e);
								}
							})
						})
					},
					// before loaded
					OnMount = window.addEventListener('DOMContentLoaded', event => {
						if(ComponentReady.DOMContentLoaded){
							ComponentReady.DOMContentLoaded()
						}
					}),
					// loaded
					MountStart = window.addEventListener('load', event => {
						let PushElement = RenderElement ? function(){
							ComponentReady.beforeMount()
							document.title = FilterPathUrl.title
							Core.CreateComponent('app-routing', () => {}, () => {})
							Core.CreateComponent(ComponentReady.name, () => ComponentReady.componentDidMount(), () => ComponentReady.componentWillmount())
							Core.CreateElement({
								name: 'div',
								type: ['innerHTML'],
								data: [TemplateIntegrated],
								query: ElementApp
							})
							CheckAppRouting(() => {
								Core.CreateElement({name: ComponentReady.name,type: ['innerHTML'],data: [ComponentReady.render()],query: ElementApp + ' app-routing'})
							})
						}: function(){
							throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)
						}
						PushElement()
						window.history.replaceState(ComponentReady.state,ComponentReady.title,window.location.href)
						EventClickChangePage();
					}),
					OnChangePage = (e) => {
						let UnMountUrlNow = Core.FindingData(this.DefineOwnRoute, window.location.pathname).run(),
							RunningClick = Core.FindingData(this.DefineOwnRoute, e.target.getAttribute('href') + '/').run(),
							StartedClick = () => {
								if(typeof RunningClick === 'object') {
									document.body.querySelector(ElementApp).querySelector(UnMountUrlNow.template().name).remove()
									let ComponentReadyClick = RunningClick.template(),
									OnMount = setTimeout(() => {
										ComponentReadyClick.beforeMount()
									}),
									MountStart = () => {
										window.history.pushState(ComponentReadyClick.state,ComponentReadyClick.title,e.target.getAttribute('href'))
										document.title = RunningClick.title;
										let PushElement = RenderElement ? function() {
											Core.CreateComponent(ComponentReadyClick.name, () => ComponentReadyClick.componentDidMount(), () => ComponentReadyClick.componentWillmount())
											CheckAppRouting(() => {
												Core.CreateElement({
													name: ComponentReadyClick.name,
													type: ['innerHTML'],
													data: [ComponentReadyClick.render()],
													query: ElementApp + ' app-routing'
												})	
											})
											EventClickAsync()
										}: function() {
											throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)
										}
										PushElement()
									}
									MountStart()
								}
							}
						StartedClick()
					}
				}
				if(typeof FilterPathUrl === 'undefined') {
					Core.CreateComponent('app-error', () => {}, () => {})
					Core.CreateElement({name: 'app-error',type: ['innerHTML'],data: [this.ConfigRoute.PageError],query: ElementApp})
					throw Error('the route not same with url now')
				}
			}
		Started()
	}
}

export class Component{
	constructor() {
	}
	setState(...state) {
		if(Array.isArray(state)) {
			state.forEach(value => {
				if(window.history.state[value[0]]) {
					window.history.state[value[0]] = value[1]
				}
			})
		}
	}
	state() {
		return window.history.state;
	}
}

export class SubComponent{
	constructor(NameComponent = '', ActionCallBack = {}){
		this.name = NameComponent
		this.ActionCallBack = ActionCallBack
		Core.CreateComponent(this.name, () => this.ActionCallBack.componentDidMount(), () => this.ActionCallBack.componentWillmount())
		this.start = this.ActionCallBack.render()
	}
}