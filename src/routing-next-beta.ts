// file routing for next generation
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
	  	adoptedCallback() {}
	  	attributeChangedCallback(name, oldValue, newValue) {}
	}
	if(!customElements.get(NameElement)) {
		customElements.define(NameElement, Reactivty);
	}
}
Core.FindingData = (DataArray, DataFind, DataType) => {
	class Filtered {
		constructor($Array = [], Find = '', Type = '') {
			this.array = $Array
			this.find = Find
			this.type = Type
		}
		run() {
			return this.array.find((DataRoute, KeyRoute) => {
				// define variable detection typedata
				let Path 		= typeof DataRoute.path,
					Title 		= typeof DataRoute.title
					// same value
				if((DataRoute.path + '/').match(this.find)) {
					if(Path == 'string' && Title == 'string') {
						return true
					}
					else
						throw Error('please check type data in your routing')
				}
				if(this.type === 'parameter' && DataRoute.params) {
					DataRoute.params.find((dataParams, keyParams) => {
						if(DataRoute.params.length === 1) {
							if(DataRoute.path.match('<Number>') && dataParams === 'Number') {
								let stringdata = DataRoute.path,//string url 40
								number = '<Number>',//string number 6
								count = stringdata.length - stringdata.match(number)['index'] + (number.length),
								index = stringdata.match(number)['index'], //26
								resultingNumber = stringdata.slice(0, stringdata.match(number)['index']) + 1 + stringdata.slice(stringdata.match(number)['index'] + number.length, stringdata.length),
								filterNumber = resultingNumber.split('/').filter(data => data !== ''),
								filterFind = this.find.split('/').filter(data => data !== ''),
								arrayFound = '',
								// console.log(resultingNumber)
								research = filterFind.find((dataFilter, keyFilter) => {
									if(dataFilter.match('^[0-9]$') && filterFind.length === filterNumber.length) {
										filterNumber.find((numFilter, keyNum) => {
											if(keyFilter === keyNum && parseInt(dataFilter) !== NaN) {
												// console.log(DataRoute)
												// change
												// console.log(dataFilter)
												arrayFound = DataRoute
												arrayFound.path = stringdata.slice(0, stringdata.match(number)['index']) + parseInt(dataFilter) + stringdata.slice(stringdata.match(number)['index'] + number.length, stringdata.length)
												arrayFound.params = parseInt(dataFilter)
												return true;
											}
										})
									}
								})
								// console.log(arrayFound)
							}
						}
					})
				}
			})
		}
	}
	return new Filtered(DataArray, DataFind, DataType)
}
export const Link = (props = []) => {
	return{to: ($url, $string, type) => {
		if(type) {
			return `<a ${props} href="${$url}" lavosted="link" async="true">${$string}</a>`
		}else{
			return `<a ${props} href="${$url}" lavosted="link">${$string}</a>`
		}
	}}
}

var passworddb = ''

export class Routing {
	constructor(DefineOwnRoute = [], ConfigRoute = {}) {
		this.DefineOwnRoute = DefineOwnRoute
		this.ConfigRoute = ConfigRoute
	}
	rendering(ElementApp) {
		if(this.ConfigRoute.hasOwnProperty('templateIntegratedRouting') && this.ConfigRoute.hasOwnProperty('AppName') && this.ConfigRoute.hasOwnProperty('Type') && this.ConfigRoute.hasOwnProperty('PageError') && typeof ElementApp === 'string') {
			let TemplateIntegrated = this.ConfigRoute.templateIntegratedRouting.template(),
			BaseUrl = window.location.origin, PathUrl = window.location.pathname,
			RenderElement = document.body.querySelector(ElementApp),
			FilterPathUrl = ''
			if(PathUrl.match('1|2|3|4|5|6|7|8|9') || PathUrl.match('string')) {
				FilterPathUrl = Core.FindingData(this.DefineOwnRoute, PathUrl, 'parameter').run()
			}
			if(!PathUrl.match('1|2|3|4|5|6|7|8|9') || !PathUrl.match('string')) {
				FilterPathUrl = Core.FindingData(this.DefineOwnRoute, PathUrl).run()
			}
			// console.log(FilterPathUrl)
			let CheckAppRouting = (OnTrue) => {
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
					// params
					var componentReady = ''
					if(FilterPathUrl.params) {
						componentReady = FilterPathUrl.template(FilterPathUrl.name, FilterPathUrl.params)
					}
					if(!FilterPathUrl.params) {
						componentReady = FilterPathUrl.template(FilterPathUrl.name)
					}
					if(componentReady instanceof Component) {
						if(typeof componentReady.componentDidMount === 'function' && typeof componentReady.componentWillmount === 'function' && typeof componentReady.beforeMount === 'function' && typeof componentReady.render === 'function' && typeof componentReady.ready === 'function' && typeof componentReady.state === 'object') {
							let EventClickChangePage = () => {
								let linkRoute = document.querySelectorAll('a[lavosted="link');
								linkRoute.forEach(dataQuery => {
									dataQuery.addEventListener('click', e => {
										e.preventDefault()
										linkRoute.forEach(dataQuery2 => {
											if(dataQuery2.classList.contains('active')) {
												dataQuery2.classList.remove('active')
											}
										})
										e.target.classList.add('active')
										if(e.target.getAttribute('href') !== window.location.pathname) {
											OnChangePage(e);
										}
									})
								})
							},
							EventClickAsync = () => {
								let linkRoute = document.querySelectorAll('a[lavosted="link"][async="true"]');
								linkRoute.forEach(dataQuery => {
									dataQuery.addEventListener('click', e => {
										e.preventDefault()
										linkRoute.forEach(dataQuery2 => {
											if(dataQuery2.classList.contains('active')) {
												dataQuery2.classList.remove('active')
											}
										})
										if(e.target.getAttribute('href') !== window.location.pathname) {
											OnChangePage(e);
										}
									})
								})
							},
							// before loaded
							OnMount = window.addEventListener('DOMContentLoaded', event => {
								if(componentReady.DOMContentLoaded){
									componentReady.DOMContentLoaded()
								}
							}),
							// loaded
							MountStart = window.addEventListener('load', event => {
									window.history.replaceState(componentReady.state,componentReady.title,window.location.href)
									componentReady.beforeMount()
									document.title = FilterPathUrl.title
									let PushElement = RenderElement ? function(){
										Core.CreateComponent('app-routing', () => {}, () => {})
										var start = new Date().getMilliseconds()
										var mounted = componentReady.componentDidMount().then(result => result.data())
										Core.CreateComponent(componentReady.name, () => componentReady.ready(), () => componentReady.componentWillmount())
										Core.CreateElement({
											name: 'div',
											type: ['innerHTML'],
											data: [TemplateIntegrated],
											query: ElementApp
										})
										var end = new Date().getMilliseconds()
										setTimeout(() => {
											CheckAppRouting(() => {
												Core.CreateElement({name: componentReady.name,type: ['innerHTML'],data: [componentReady.render()],query: ElementApp + ' app-routing'})
											})
											EventClickChangePage();
										}, start + end)
									}: function(){
										throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)
									}
								PushElement()
							}),
							OnChangePage = (e) => {
								var componentReadyClick = '',
								methodCallClick = Core.FindingData(this.DefineOwnRoute, e.target.getAttribute('href') + '/').run()
								if(methodCallClick.params) {
									componentReadyClick = methodCallClick.template(methodCallClick.name, methodCallClick.params)
								}
								if(!methodCallClick.params) {
									componentReadyClick = methodCallClick.template(methodCallClick.name)
								}
								if(componentReadyClick instanceof Component){
									let UnMountUrlNow = Core.FindingData(this.DefineOwnRoute, window.location.pathname).run(),
										StartedClick = () => {
											if(typeof methodCallClick === 'object') {
												let removedBeforeElement = document.body.querySelector(ElementApp).querySelector(UnMountUrlNow.name).remove()
												OnMount = setTimeout(() => {
													componentReadyClick.beforeMount()
												}),
												MountStart = setTimeout(() => {
													window.history.pushState(componentReadyClick.state,methodCallClick.title,e.target.getAttribute('href'))
													document.title = methodCallClick.title;
													let PushElement = RenderElement ? function() {
														var start = new Date().getMilliseconds()
														componentReadyClick.componentDidMount().then(result => result.data())
														Core.CreateComponent(methodCallClick.name, () => componentReadyClick.ready(), () => componentReadyClick.componentWillmount())
														var end = new Date().getMilliseconds()
														setTimeout(() => {
															CheckAppRouting(() => {
																Core.CreateElement({
																	name: methodCallClick.name,
																	type: ['innerHTML'],
																	data: [componentReadyClick.render()],
																	query: ElementApp + ' app-routing'
																})
															})
															EventClickAsync()
														}, start + end)
													}: function() {
														throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)
													}
													PushElement()
												})
											}
										}
									StartedClick()

								}
							},
							OnHash = () => {
								let ListRoute = this.DefineOwnRoute
								window.addEventListener('popstate', function(event) {
									setTimeout(() => {
									  let RunPop = Core.FindingData(ListRoute, window.location.pathname).run()
									  if(typeof RunPop === 'object') {
									  	document.body.querySelector(ElementApp).querySelector('app-routing').innerHTML = ''
											let componentReadyPop = RunPop.template(),
											OnMount = setTimeout(() => {
												componentReadyPop.beforeMount()
											}),
											MountStart = setTimeout(() => {
												window.history.replaceState(componentReadyPop.state,componentReadyPop.title,null)
												document.title = RunPop.title;
												let PushElement = RenderElement ? function() {
													var start = new Date().getMilliseconds()
													componentReadyPop.componentDidMount().then(result => result.data())
													Core.CreateComponent(componentReadyPop.name, () => componentReadyPop.ready(), () => componentReadyPop.componentWillmount())
													var end = new Date().getMilliseconds()
													setTimeout(() => {
														CheckAppRouting(() => {
															Core.CreateElement({
																name: componentReadyPop.name,
																type: ['innerHTML'],
																data: [componentReadyPop.render()],
																query: ElementApp + ' app-routing'
															})	
														})
														EventClickAsync()
													}, start + end)
												}: function() {
													throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)
												}
												PushElement()
											})
									  }
									})
								}, false);
							}
							OnHash()
						}
						else{
							throw Error(`\nthe class ${componentReady.constructor.name} in a methods not type function or object or maybe nothing methods\nRequired methods => beforeMount, componentDidMount, ready, render, componentWillmount and state.`)
						}
					}
					else{
						Core.CreateComponent('app-error', () => {}, () => {})
						Core.CreateElement({
							name: 'app-error',
							type: ['innerHTML'],
							data: [`the class ${componentReady.constructor.name} is not inheritance of class Component`],
							query: ElementApp}
						)
						throw TypeError(`the class ${componentReady.constructor.name} is not inheritance of class Component`)
					}
				}
				if(typeof FilterPathUrl === 'undefined') {
					Core.CreateComponent('app-error', () => {}, () => {})
					Core.CreateElement({name: 'app-error',type: ['innerHTML'],data: [this.ConfigRoute.PageError],query: ElementApp})
					throw Error('the route not same with url now')
				}
			}
			Started()
			return {
				dbprivate: (pw) => {
					passworddb = pw
				}
			}
		} else {
			throw Error('Error configuration')
		}
	}
}

var dbprivate = {}
window.db = () => {
	if(window.prompt('input the password of database privated') === atob(passworddb)){
		console.info('the password is confirmed\n')
		return dbprivate
	}else{
		console.error('the password is wrong.')
	}
}

export class Component{
	constructor(options = {}) {
		this.options = options
		if(options.hasOwnProperty('name') && options.hasOwnProperty('state')) {
			var dated = new Date(),
			NowDated = parseInt(dated.getFullYear() + dated.getDay().toLocaleString() + dated.getHours().toLocaleString() + dated.getMinutes().toLocaleString() + dated.getSeconds().toLocaleString())
			if(Object.defineProperty.hasOwnProperty(options.name.split('-').join(''))){
				dbprivate[options.name.split('-').join('')] = {state: options.state, created_at: NowDated}
			}
			else{
				dbprivate[options.name.split('-').join('')] = {state: options.state, created_at: NowDated}
			}
		}else{
			throw TypeError(`property at path ${this.path} tidak lengkap`)
		}
	}
	setState(...state) {
		console.log(...state)
		// if(Array.isArray(state)) {
		// 	state.forEach(value => {
		// 		if(window.history.state[value[0]]) {
		// 			window.history.state[value[0]] = value[1]
		// 		}
		// 	})
		// }
	}
	state() {
		return dbprivate[this.options.name.split('-').join('')].state;
	}
}

export class SubComponent{
	constructor(NameComponent = '', ActionCallBack = {}){
		this.name = NameComponent
		this.ActionCallBack = ActionCallBack
		Core.CreateComponent(this.name, () => this.ActionCallBack.componentDidMount(), () => this.ActionCallBack.componentWillmount())
		this.start = `<${this.name}>` + this.ActionCallBack.render() + `</${this.name}>`
	}
}