export let Core = {}
var base = '', routeUrl = {}
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
		constructor() {super()}
		connectedCallback() {ComponentDidMount()}
	  	disconnectedCallback() {ComponentWillmount()}
	  	adoptedCallback() {}
	  	attributeChangedCallback(name, oldValue, newValue) {}
	}
	if(!customElements.get(NameElement)) {customElements.define(NameElement, Reactivty);}
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
					// var numeric = [...DataRoute.path.matchAll('<Number>')],
					// stringtag = [...DataRoute.path.matchAll('<String>')]
					// var next = () => {
					// 	// numeric and string
					// 	// if(numeric.length >= 1 && stringtag.length >= 1) {
					// 	// 	console.log(numeric)
					// 	// 	console.log(stringtag)
					// 	// }
					// 	// numeric
					// 	var nf = ''
					// 	if(this.type === 'parameter' && DataRoute.params && DataRoute.params.length >= 1) {
					// 		// if(DataRoute.params.includes('Number')) {
					// 		// 	if(DataRoute.params.length === 1) {

					// 		// 	}
					// 		// }
					// 		DataRoute.params.filter((dataParams, keyParams) => {
					// 			console.log(dataParams)
					// 		})
					// 		DataRoute.params.find((dataParams, keyParams) => {
					// 			var matchfind = [...this.find.matchAll('[0-9]+')]
					// 			if(dataParams == 'Number' && DataRoute.params.length === numeric.length && stringtag.length === 0) {
					// 				var maybe = ''
					// 				var countnumber = '<Number>'
					// 				var urlpush = [],
					// 				pathmatchall = [...DataRoute.path.matchAll('<Number>')]
					// 				if(pathmatchall.length === matchfind.length) {
					// 					matchfind.find((numdata, nummatch) => {
					// 						pathmatchall.find(dataroutmatch => {
					// 							if(pathmatchall.length === 1) {
					// 								if(numdata.index === dataroutmatch.index ) {
					// 									console.log('sama')
					// 									console.log(dataroutmatch)
					// 									nf = dataroutmatch
					// 								}
					// 							}
					// 						})
					// 						// console.log(numdata.input.split('/').filter(data => data !== 'https:' && data !== ''))
					// 						var indexs = numdata.index,
					// 						foundNumber = numdata[0],
					// 						inputSearch = numdata.input
					// 						urlpush.push(numdata.input.split(foundNumber).join('<Number>'))
					// 						console.log(numdata)
					// 						console.log(numdata.input.split(foundNumber).join('<Number>'))
					// 					})
					// 					console.log(matchfind)
					// 					console.log(urlpush)
					// 				}
					// 			}
					// 		})
					// 	}
					// 	console.log(nf)
					// 	return nf;
					// 	// numeric
					// 	// if(numeric.length == 0 && stringtag.length >= 0) {
					// 	// 	console.log(stringtag)
					// 	// }
					// }
					// next()
				if((DataRoute.path + '/').match(this.find)) {
					if(Path == 'string' && Title == 'string') {return true}
					else throw Error('please check type data in your routing')
				}
				if(this.type === 'parameter' && Array.isArray(DataRoute.params)) {
					// console.log(DataRoute)
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
								research = filterFind.find((dataFilter, keyFilter) => {
									if(dataFilter.match('[0-9]+') && filterFind.length === filterNumber.length) {
										filterNumber.find((numFilter, keyNum) => {
											if(keyFilter === keyNum && parseInt(dataFilter) !== NaN) {
												console.log(DataRoute)
												// change
												
												arrayFound = DataRoute
												arrayFound.path = stringdata.split('<Number>').join(parseInt(dataFilter))
												// arrayFound.path = stringdata.slice(0, stringdata.match(number)['index']) + parseInt(dataFilter) + stringdata.slice(stringdata.match(number)['index'] + number.length, stringdata.length)
												arrayFound.params = parseInt(dataFilter)
												console.log(arrayFound)
												return true;
											}
										})
									}
								})
								// console.log(filterFind)
								// console.log(resultingNumber)
								// console.log(filterNumber)
								// console.log(arrayFound)
							}
							if(DataRoute.path.match('<String>') && dataParams === 'String') {
								console.log(DataRoute)
								let stringdata = DataRoute.path,//string url 40
								number = '<String>',//string number 6
								count = stringdata.length - stringdata.match(number)['index'] + (number.length),
								index = stringdata.match(number)['index'], //26
								resultingNumber = stringdata.slice(0, stringdata.match(number)['index']) + 1 + stringdata.slice(stringdata.match(number)['index'] + number.length, stringdata.length),
								filterNumber = resultingNumber.split('/').filter(data => data !== ''),
								filterFind = this.find.split('/').filter(data => data !== ''),
								arrayFound = '',
								research = filterFind.find((dataFilter, keyFilter) => {
									if(dataFilter.match('[a-z]') && filterFind.length === filterNumber.length) {
										filterNumber.find((numFilter, keyNum) => {
											if(keyFilter === keyNum && dataFilter.toString()) {
												// console.log(DataRoute)
												// change
												console.log(dataFilter.toString())
												arrayFound = DataRoute
												arrayFound.path = stringdata.split('<Number>').join(dataFilter.toString())
												// arrayFound.path = stringdata.slice(0, stringdata.match(number)['index']) + dataFilter.toString() + stringdata.slice(stringdata.match(number)['index'] + number.length, stringdata.length)
												arrayFound.params = dataFilter.toString()
												return true;
											}
										})
									}
								})
								// console.log(filterFind)
								// console.log(resultingNumber)
								// console.log(filterNumber)
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

var namemiddleware = []

export const useAuth = () => {

}

class Auth{
	constructor(token = '', userdata = {}) {
		this.token = token
		this.user = userdata
	}
	register(){
		window.localStorage.setItem('user-account', userdata)
	}
	login(){

	}
}

var passworddb = ''

export class Routing {
	constructor(DefineOwnRoute = [], ConfigRoute = {}) {
		this.DefineOwnRoute = DefineOwnRoute
		this.ConfigRoute = ConfigRoute
		base = ConfigRoute.BasePath
		DefineOwnRoute.forEach(routelist => {
			routeUrl[routelist.name] = routelist.path
		})
	}
	rendering(ElementApp) {
		if(this.ConfigRoute.hasOwnProperty('BasePath') && this.ConfigRoute.hasOwnProperty('templateIntegratedRouting') && this.ConfigRoute.hasOwnProperty('AppName') && this.ConfigRoute.hasOwnProperty('Type') && this.ConfigRoute.hasOwnProperty('PageError') && typeof ElementApp === 'string') {
			if(this.ConfigRoute.hasOwnProperty('extends')) {
				if(this.ConfigRoute.extends.Auth) {
					var authExtends = this.ConfigRoute.extends.Auth;
					authExtends.middleware.forEach(dataMiddleware => {
						namemiddleware.push(dataMiddleware)
					})
				}
			}
			let TemplateIntegrated = this.ConfigRoute.templateIntegratedRouting.template(),
			BaseUrl = window.location.origin, PathUrl = window.location.pathname,
			RenderElement = document.body.querySelector(ElementApp),
			FilterPathUrl = '',
			componentReady = '',
			UIError = (append) => {
			Core.CreateComponent('app-error', () => {}, () => {})
			Core.CreateElement({name: 'app-error',type: ['innerHTML'],data: [append],query: ElementApp})
			throw TypeError(`the class ${componentReady.constructor.name} is not inheritance of class Component`)
			},
			filterCustom = (searchUrl, Success, Errors) => {
				FilterPathUrl = ''
				console.log(searchUrl)
				if(searchUrl.match('[0-9]+') || searchUrl.match('<String>')) {
					FilterPathUrl = Core.FindingData(this.DefineOwnRoute, searchUrl, 'parameter').run()
				}
				if(!searchUrl.match('[0-9]+') || !searchUrl.match('<String>')) {
					FilterPathUrl = Core.FindingData(this.DefineOwnRoute, searchUrl).run()
				}
				if(typeof FilterPathUrl === 'object') {
					componentReady = ''
					if(typeof FilterPathUrl.beforeEach === 'function') {
						var forward, next, auth
						FilterPathUrl.beforeEach(
							forward = (url) => {
	
							}, next = (url) => {
								console.log(url)
							}, auth = {middleware: 'admin'})
					}
					if(FilterPathUrl.params) {
						componentReady = FilterPathUrl.template(FilterPathUrl.name, FilterPathUrl.params)
					}
					if(!FilterPathUrl.params) {
						componentReady = FilterPathUrl.template(FilterPathUrl.name)
					}
					if(typeof componentReady === 'object' && componentReady instanceof Component){
						if(typeof componentReady.componentDidMount === 'function' && typeof componentReady.componentWillmount === 'function' && typeof componentReady.beforeMount === 'function' && typeof componentReady.render === 'function' && typeof componentReady.ready === 'function') {Success()}
						else if(typeof componentReady.componentDidMount !== 'function'){UIError(`new ${componentReady.constructor.name}().componentDidMount is not a function`);throw TypeError(`new ${componentReady.constructor.name}().componentDidMount is not a function`);}
						else if(typeof componentReady.componentWillmount !== 'function'){UIError(`new ${componentReady.constructor.name}().componentWillmount is not a function`);throw TypeError(`new ${componentReady.constructor.name}().componentWillmount is not a function`);}
						else if(typeof componentReady.beforeMount !== 'function'){UIError(`new ${componentReady.constructor.name}().beforeMount is not a function`);throw TypeError(`new ${componentReady.constructor.name}().beforeMount is not a function`);}
						else if(typeof componentReady.render !== 'function'){UIError(`new ${componentReady.constructor.name}().render is not a function`);throw TypeError(`new ${componentReady.constructor.name}().render is not a function`);}
						else if(typeof componentReady.ready !== 'function'){UIError(`new ${componentReady.constructor.name}().ready is not a function`);throw TypeError(`new ${componentReady.constructor.name}().ready is not a function`);}
					}
					if(typeof componentReady !== 'object' && !componentReady instanceof Component){UIError(`the class ${componentReady.constructor.name} is not inheritance of class Component`)}
				}else{throw Error('Not Found')}
			}
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
				filterCustom(window.location.pathname, () => {
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
						window.history.replaceState({},componentReady.title,window.location.href)
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
							}, start + end + 1000)
						}: function(){
							throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)
						}
						PushElement()
					}),
					// chaneg page
					OnChangePage = (e) => {
						filterCustom(e.target.getAttribute('href') + '/', () => {
							let UnMountUrlNow = Core.FindingData(this.DefineOwnRoute, window.location.pathname).run(),
							StartedClick = () => {
								// let removedBeforeElement = document.body.querySelector(ElementApp).querySelector(UnMountUrlNow.name).remove()
								let removedBeforeElement = document.body.querySelector(ElementApp).querySelector('app-routing').innerHTML = ''
								OnMount = setTimeout(() => {
									componentReady.beforeMount()
								}),
								MountStart = setTimeout(() => {
									window.history.pushState({},FilterPathUrl.title,e.target.getAttribute('href'))
									document.title = FilterPathUrl.title;
									let PushElement = RenderElement ? function() {
										var start = new Date().getMilliseconds()
										componentReady.componentDidMount().then(result => result.data())
										Core.CreateComponent(FilterPathUrl.name, () => componentReady.ready(), () => componentReady.componentWillmount())
										var end = new Date().getMilliseconds()
										setTimeout(() => {
											CheckAppRouting(() => {
												Core.CreateElement({
													name: FilterPathUrl.name,
													type: ['innerHTML'],
													data: [componentReady.render()],
													query: ElementApp + ' app-routing'
												})
											})
											EventClickAsync()
										}, start + end + 1000)
									}: function() {
										throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)
									}
									PushElement()
								})
							}
							StartedClick()
						})
					},
					// state change (back url)
					OnHash = () => {
						let ListRoute = this.DefineOwnRoute
						window.addEventListener('popstate', function(event) {
							filterCustom(window.location.pathname, () => {
								setTimeout(() => {
									document.body.querySelector(ElementApp).querySelector('app-routing').innerHTML = ''
									OnMount = setTimeout(() => {
										componentReady.beforeMount()
									}),
									MountStart = setTimeout(() => {
										window.history.replaceState({},FilterPathUrl.title,null)
										document.title = FilterPathUrl.title;
										let PushElement = RenderElement ? function() {
											var start = new Date().getMilliseconds()
											componentReady.componentDidMount().then(result => result.data())
											Core.CreateComponent(FilterPathUrl.name, () => componentReady.ready(), () => componentReady.componentWillmount())
											var end = new Date().getMilliseconds()
											setTimeout(() => {
												CheckAppRouting(() => {
													Core.CreateElement({
														name: FilterPathUrl.name,
														type: ['innerHTML'],
														data: [componentReady.render()],
														query: ElementApp + ' app-routing'
													})	
												})
												EventClickAsync()
											}, start + end + 1000)
										}: function() {
											throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)
										}
										PushElement()
									})
								})
							})
						}, false);
					}
					OnHash()
				})
			}
			Started()
			return {dbprivate: (pw) => passworddb = pw}
		}else{throw Error('Error configuration')}
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
		this.nameStateOfComponent = options.name.split('-').join('')
		if(options.hasOwnProperty('name') && options.hasOwnProperty('state')) {
			if(Object.defineProperty.hasOwnProperty(this.nameStateOfComponent)){dbprivate[this.nameStateOfComponent] = {state: options.state, created_at: this.NowDated, updated_at: this.NowDated}}
			else{dbprivate[this.nameStateOfComponent] = {state: options.state, created_at: this.NowDated, updated_at: this.NowDated}}
		}else{throw TypeError(`property at path ${this.path} incompleted`)}
	}
	get NowDated() {
		var dated = new Date()
		return parseInt(dated.getFullYear() + dated.getDay().toLocaleString() + dated.getHours().toLocaleString() + dated.getMinutes().toLocaleString() + dated.getSeconds().toLocaleString())
	}
	setState(stateChange) {
		if(typeof stateChange === 'function') {
			var ada = stateChange(dbprivate[this.nameStateOfComponent])
			dbprivate[this.nameStateOfComponent] = {state: ada, created_at: this.NowDated, updated_at: this.NowDated}
		}
		else if(Array.isArray(stateChange)) {

		}else{
			throw TypeError('setState in parameter 1 not type function / array.')
		}
		// if(Array.isArray(state)) {
		// 	state.forEach(value => {
		// 		if(window.history.state[value[0]]) {
		// 			window.history.state[value[0]] = value[1]
		// 		}
		// 	})
		// }
	}
	state() {
		return dbprivate[this.nameStateOfComponent].state;
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

export const Link = (props = [], params = '') => {
	return{to: ($url, $string, type) => {
		if(typeof $url === 'object') {
			if(type) {
				return `<a ${props} href="${routeUrl[$url]}" lavosted="link" async="true">${$string}</a>`
			}
			if(params){
				return `<a ${props} href="${routeUrl[$url]}" lavosted="link" async="true" params="true">${$string}</a>`
			}else{
				return `<a ${props} href="${routeUrl[$url]}" lavosted="link">${$string}</a>`
			}
		}
		if(typeof $url === 'string') {
			if(type) {
				return `<a ${props} href="${base+ $url}" lavosted="link" async="true">${$string}</a>`
			}
			if(params){
				return `<a ${props} href="${base+ $url}" lavosted="link" async="true" params="true">${$string}</a>`
			}else{
				return `<a ${props} href="${base+ $url}" lavosted="link">${$string}</a>`
			}
		}
	}}
}

export class Middleware{

}