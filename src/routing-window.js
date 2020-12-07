/**
 * @name Lavosted Routing
 * @description Lightweight Library Single Page Application With Javascript. No Library or Packages Required.
 * @file routing.js
 * @version 1.0-beta
 * @author ferdiansyah0611
 * @license MIT License
 */

/**
 * @exports Core
 */
let Core = Object.create(null)
var base = '', routeUrl = {}, passworddb = '', viewHisory = []
Core.Element = (name, attr = []) => {
	if(typeof name === 'string' && Array.isArray(attr)){
		var cr = document.createElement(name)
		if(attr){
			attr.forEach(data => {
				cr[data[0]] = data[1]
			})
		}
		return cr
	}else{
		throw Error('Core.Element(?: string, []?: Array)')
	}
}
Core.write = (msg) => {console.log(msg)}
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
Core.CreateComponent = (NameElement, ComponentDidMount, ComponentWillmount) => {
	class Reactivty extends HTMLElement {
		constructor() {super()}
		connectedCallback() {ComponentDidMount()}
	  	disconnectedCallback() {ComponentWillmount()}
	  	adoptedCallback() {}
	  	attributeChangedCallback(name, old, newv) {}
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
				if(typeof this.find === 'object'){
					if(DataRoute.path === base + this.find.path){
						var matchNumber = [...DataRoute.path.matchAll('<Number>')],
							matchString = [...DataRoute.path.matchAll('<String>')]
						// <Number> and <String> more than or with 1 length
						if(matchNumber.length >= 1 || matchString.length >= 1){
							if(matchNumber.length === 1 || matchString.length === 1){
								var urlsplit = this.find.url.split('/'),
									pathsplit = (DataRoute.path + '/').split('/')
								pathsplit.find((findNumber, keyfindNumber) => {
									// number
									if(matchNumber.length ===  1 && findNumber === '<Number>' && matchString.length === 0){
										pathsplit[keyfindNumber] = urlsplit[keyfindNumber]
										DataRoute.data = [urlsplit[keyfindNumber]]
									}
									// string
									if(matchString.length ===  1 && findNumber === '<String>'  && matchNumber.length === 0){
										pathsplit[keyfindNumber] = urlsplit[keyfindNumber]
										DataRoute.data = [urlsplit[keyfindNumber]]
									}
								})
								return true
							}
						}else{
							console.log('sama')
						}
					}
				}else{
					if((DataRoute.path + '/').match(this.find)) {
						if(Path == 'string' && Title == 'string') {return true}
						else throw Error('please check type data in your routing')
					}
				}
			})
		}
	}
	return new Filtered(DataArray, DataFind, DataType)
}
/**
 * Routing
 */
class Routing {
	constructor(DefineOwnRoute = [], ConfigRoute = {}) {
		this.DefineOwnRoute = DefineOwnRoute
		this.ConfigRoute = ConfigRoute
		base = ConfigRoute.BasePath
		DefineOwnRoute.forEach(routelist => {
			routeUrl[routelist.name] = routelist.path
		})
	}
	rendering(ElementApp) {
		if(this.ConfigRoute.hasOwnProperty('BasePath') && this.ConfigRoute.hasOwnProperty('templateIntegratedRouting') && this.ConfigRoute.hasOwnProperty('AppName') && this.ConfigRoute.hasOwnProperty('Mode') && this.ConfigRoute.hasOwnProperty('PageError') && typeof ElementApp === 'string') {
			let TemplateIntegrated = this.ConfigRoute.templateIntegratedRouting.template(),
			BaseUrl = window.location.origin, PathUrl = window.location.pathname,
			RenderElement = document.body.querySelector(ElementApp),
			FilterPathUrl = '',
			componentReady = '',
			dataDebug = [],
			configInherit = this.ConfigRoute,
			debug = () => {
				if(this.ConfigRoute.Mode === 'development'){console.groupCollapsed('request');dataDebug.forEach(dataDebug => {Core.write('> [' + new Date().getUTCHours() + ':' + new Date().getUTCMinutes() + ':' + new Date().getUTCSeconds() + '] ' + dataDebug.msg)});console.groupEnd()}
			},
			UIError = (append) => {
				Core.CreateComponent('app-error', () => {}, () => {})
				Core.CreateElement({name: 'app-error',type: ['innerHTML'],data: [append],query: ElementApp})
				throw TypeError(`the class ${componentReady.constructor.name} is not inheritance of class Component`)
			},
			filterCustom = (searchUrl, Success, Errors) => {
				FilterPathUrl = ''
				if(typeof searchUrl === 'object'){
					FilterPathUrl = Core.FindingData(this.DefineOwnRoute, searchUrl).run()
					FilterPathUrl ? dataDebug.push({type: 'log', msg: 'request to ' + searchUrl.url + ' [200]'}): dataDebug.push({type: 'log', msg: 'request to ' + searchUrl.url + ' [404]'})
				}
				if(typeof searchUrl === 'string'){
					if(searchUrl.match('[0-9]+') || searchUrl.match('<String>')) {
						FilterPathUrl = Core.FindingData(this.DefineOwnRoute, searchUrl, 'parameter').run()
					}
					if(!searchUrl.match('[0-9]+') || !searchUrl.match('<String>')) {
						FilterPathUrl = Core.FindingData(this.DefineOwnRoute, searchUrl).run()
					}
					FilterPathUrl ? dataDebug.push({type: 'log', msg: 'request to ' + searchUrl + ' [200]'}): dataDebug.push({type: 'log', msg: 'request to ' + searchUrl + ' [404]'})
				}
				if(typeof FilterPathUrl === 'object') {
					componentReady = ''
					if(this.ConfigRoute.extends.Auth) {
						FilterPathUrl.__proto__['Auth'] = () => {
							return{
								register: (data, token) => {
									if(window.localStorage.getItem('user-account')) {window.localStorage.removeItem('user-account')}
									window.localStorage.setItem('user-account', JSON.stringify({token: token,data: data}))
									return true;
								},
								check: () => {if(window.localStorage.getItem('user-account')) {return true}else{return false}},
								data: () => {if(window.localStorage.getItem('user-account')) {return JSON.parse(window.localStorage.getItem('user-account'))}else{return false}}
							}
						}
					}
					if(FilterPathUrl.params) {
						componentReady = FilterPathUrl.template({name: FilterPathUrl.name, params: FilterPathUrl.data})
					}
					if(!FilterPathUrl.params) {
						componentReady = FilterPathUrl.template({name: FilterPathUrl.name})
					}
					if(typeof componentReady === 'object' && componentReady instanceof Component){
						if(typeof componentReady.render === 'function') {Success()}
						else{
							UIError(`new ${componentReady.constructor.name}().render is not a function`);throw TypeError(`new ${componentReady.constructor.name}().render is not a function`);
						}
					}
					if(typeof componentReady !== 'object' && !componentReady instanceof Component){UIError(`the class ${componentReady.constructor.name} is not inheritance of class Component`)}
				}
			}
			let Started = () => {
				let EventClickChangePage = () => {
					let linkRoute = document.querySelectorAll('a[lavosted="link'), wait = false;
					linkRoute.forEach(dataQuery => {
						dataQuery.addEventListener('click', e => {e.preventDefault()
							linkRoute.forEach(dataQuery2 => {if(dataQuery2.classList.contains('active')) {dataQuery2.classList.remove('active')}})
							e.target.classList.add('active');if(e.target.getAttribute('href') !== window.location.pathname){OnChangePage(e);}
						})
					})
				},
				EventClickAsync = () => {
					let linkRoute = document.querySelectorAll('a[lavosted="link"][async="true"]');
					linkRoute.forEach(dataQuery => {
						dataQuery.addEventListener('click', e => {e.preventDefault();linkRoute.forEach(dataQuery2 => {if(dataQuery2.classList.contains('active')){dataQuery2.classList.remove('active')}});if(e.target.getAttribute('href') !== window.location.pathname) {OnChangePage(e);}})
					})
				},
				detectElement = (callback) => {
					let PushElement = RenderElement ? function() {callback()}: function() {throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)};PushElement()
				},
				filterCustomAction = (searchfilter, hashStatus) => {
					viewHisory.push(searchfilter)
					filterCustom(searchfilter, () => {
						var statusRun = false, statusModel = false;;
						function runnerApp(){
							statusRun = true;
							let removedBeforeElement = document.body.querySelector(ElementApp).querySelector('app-routing').innerHTML = '';
							if(configInherit.Mode === 'production') {
								statusModel = true
							}
							// beforeMount
							componentReady.beforeMount ? componentReady.beforeMount(): statusModel ? '': Core.write('before mount')
							// MountStart
							if(!hashStatus){
								if(typeof searchfilter === 'object'){
									window.history.pushState({},FilterPathUrl.title,searchfilter.url)
								}else{
									window.history.pushState({},FilterPathUrl.title,searchfilter)
								}
							}
							document.title = FilterPathUrl.title;
							detectElement(() => {
								var start = new Date().getMilliseconds()
								componentReady.componentDidMount ? componentReady.componentDidMount().then(result => result.data()): statusModel ? '': Core.write('mounted class ' + componentReady.constructor.name)
								document.querySelectorAll('style').forEach(dataStyle => {
									if(dataStyle.dataset.component){
										dataStyle.remove()
									}
								})
								var runstyle = componentReady.style ? () => {
									var style = document.createElement('style')
									style.textContent = componentReady.style().replace(',', ';').replace(' ', '')
									style.dataset.component = componentReady.constructor.name
									document.head.appendChild(style)
								}: () => {}
								runstyle()
								Core.CreateComponent(FilterPathUrl.name, () => componentReady.ready ? componentReady.ready(): statusModel ? '': Core.write('ready event'), () => componentReady.componentWillmount ? componentReady.componentWillmount(): statusModel ? '': Core.write('willmount'))
								var end = new Date().getMilliseconds()
								setTimeout(() => {
									if(document.querySelectorAll('app-routing').length === 1){
										Core.CreateElement({
											name: FilterPathUrl.name,
											type: ['innerHTML'],
											data: [componentReady.render()],
											query: ElementApp + ' app-routing'
										})
									}
									if(document.querySelectorAll('app-routing').length >= 2 || document.querySelectorAll('app-routing').length <= 0){
										RenderElement.remove();
										throw TypeError('document.querySelectorAll("app-routing").length !== 1')
									}
									EventClickAsync()
								}, start + end + 1000)
							})
						}
						if(typeof FilterPathUrl.beforeEach === 'function') {
							var beforeEach = FilterPathUrl.beforeEach(auth = () => {if(window.localStorage.getItem('user-account')) {return JSON.parse(window.localStorage.getItem('user-account'))}else{return false}})
							if(beforeEach.hasOwnProperty('to') && !beforeEach.hasOwnProperty('next')){
								statusRun = true
								filterCustomAction(this.ConfigRoute.BasePath + beforeEach.to + '/')
							}
							if(!beforeEach.hasOwnProperty('to') && beforeEach.hasOwnProperty('next')){
								statusRun = true
								runnerApp()
							}
						}else if(typeof FilterPathUrl.beforeEach !== 'function'){runnerApp();}debug()
					});
				},
				OnChangePage = (e) => {
					if(e.target.getAttribute('path') !== 'undefined'){
						filterCustomAction({url: e.target.getAttribute('href') + '/', path: e.target.getAttribute('path')})
					}else{
						filterCustomAction(e.target.getAttribute('href') + '/')
					}
				}
				// first load app
				detectElement(() => {
					Core.CreateComponent('app-routing', () => {}, () => {})
					Core.CreateElement({
						name: 'div',
						type: ['innerHTML'],
						data: [TemplateIntegrated],
						query: ElementApp
					})
				})
				filterCustomAction(window.location.pathname);EventClickChangePage();
				// state change (back/next url)
				window.addEventListener('popstate', function(event) {
					viewHisory.find(dataHistory => {
						if(typeof dataHistory === 'object'){
							if(dataHistory.url === window.location.href){
								if(dataHistory.path.match('<Number>') || dataHistory.path.match('<String>')){
									filterCustomAction({url: dataHistory.url, path: dataHistory.path}, true)
								}else{
									filterCustomAction(window.location.pathname, true)
								}
								return true
							}
						}
						if(typeof dataHistory === 'string' && dataHistory === window.location.pathname || dataHistory === window.location.href){
							filterCustomAction(window.location.pathname, true)
							return true
						}
					})
				});
			}
			Core.write(`Lavosted Routing running in mode ${this.ConfigRoute.Mode}.\nRead documentation in https://github.com/ferdiansyah0611/lavosted-routing`)
			Started()
			return {dbprivate: (pw) => {
				passworddb = pw
				return{
					Component: this.DefineOwnRoute,
					Config: this.ConfigRoute
				}
			}}
		}else{throw Error('Error configuration')}
	}
}

/**
 * @instance window
 */
var dbprivate = {}
window.db = () => {
	if(window.prompt('input the password of database privated') === atob(passworddb)){
		return dbprivate
	}else{
		if(confirm('password wrong. try again ?')){
			db()
		}
	}
}
/**
 * @exports Component
 */
class Component{
	constructor(options = {}) {
		this.options = options
		this.nameStateOfComponent = options.name.split('-').join('')
		if(options.hasOwnProperty('name') && options.hasOwnProperty('state')) {
			if(Object.defineProperty.hasOwnProperty(this.nameStateOfComponent)){dbprivate[this.nameStateOfComponent] = {state: options.state, created_at: this.NowDated, updated_at: this.NowDated}}
			else{dbprivate[this.nameStateOfComponent] = {state: options.state, created_at: Component.NowDated, updated_at: Component.NowDated}}
		}else{throw TypeError(`property at path ${this.path} incompleted`)}
	}
	static get NowDated() {
		var dated = new Date()
		return parseInt(dated.getFullYear() + dated.getDay().toLocaleString() + dated.getHours().toLocaleString() + dated.getMinutes().toLocaleString() + dated.getSeconds().toLocaleString())
	}
	get params(){
		return this.options.params
	}
	setState(stateChange) {
		if(typeof stateChange === 'function') {
			var ada = stateChange(dbprivate[this.nameStateOfComponent])
			dbprivate[this.nameStateOfComponent] = {state: ada, created_at: Component.NowDated, updated_at: Component.NowDated}
		}
		else if(Array.isArray(stateChange)) {
			stateChange.forEach(value => {
				if(stateChange[value[0]]) {
					dbprivate[value[0]] = value[1]
				}
			})
		}else{
			throw TypeError('setState in parameter 1 not type function / array.')
		}
	}
	state() {
		return dbprivate[this.nameStateOfComponent].state;
	}
}
/**
 * @exports Link
 * @param {*} props 
 * @param {*} params 
 */
const Link = (props = [], params = '') => {
	return{to: ($url, $string, $path, $type) => {
		if(typeof $url === 'object') {
			if($type) {
				return `<a ${props} href="${routeUrl[$url]}" lavosted="link" path='${$path}' async="true">${$string}</a>`
			}
			if(params){
				return `<a ${props} href="${routeUrl[$url]}" lavosted="link" path='${$path}' async="true" params="true">${$string}</a>`
			}else{
				return `<a ${props} href="${routeUrl[$url]}" lavosted="link" path='${$path}'>${$string}</a>`
			}
		}
		if(typeof $url === 'string') {
			if($type) {
				return `<a ${props} href="${base+ $url}" lavosted="link" path='${$path}' async="true">${$string}</a>`
			}
			if(params){
				return `<a ${props} href="${base+ $url}" lavosted="link" path='${$path}' async="true" params="true">${$string}</a>`
			}else{
				return `<a ${props} href="${base+ $url}" lavosted="link" path='${$path}'>${$string}</a>`
			}
		}
	}}
}

window.LavostedRouting = {}
LavostedRouting.Core = Core
LavostedRouting.Link = Link
LavostedRouting.Routing = Routing
LavostedRouting.Component = Component