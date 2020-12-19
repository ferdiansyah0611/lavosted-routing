/**
 * @name Lavosted Routing
 * @description Lightweight Library Single Page Application With Javascript. No Library or Packages Required.
 * @file routing.js
 * @version 1.0-beta
 * @author ferdiansyah0611
 * @license MIT License
 */

/**
 * @constant default
 */
const base = '';
const routeUrl = {};
const passworddb = '';
const viewHistory = []

/**
 * @exports Core
 */
export let Core = Object.create(null)
/**
 * @property ENV
 */
Core.ENV = {}
/**
 * @property database
 */
Core.ENV.database = {}
/**
 * @function write
 * @param {*} msg
 */
Core.write = (msg) => {console.log(msg)}
/**
 * @function CreateElement
 * @param {Array} data
 */
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
/**
 * @function CreateComponent
 * @param {String} NameElement
 * @param {function} ComponentDidMount
 * @param {function} componentWillUnmount
 * @param {{}} options
 */
Core.CreateComponent = (NameElement, ComponentDidMount, componentWillUnmount, options = {}) => {
	class Reactivty extends HTMLElement {
		constructor(){
			super()
			/**
			 * @description create the attribute
			 */
			if(options.createAttr && Array.isArray(options.createAttr)){
				options.createAttr.forEach(data => {
					this.setAttribute(data.name, data.data)
				})
			}
			/**
			 * @description add new class
			 */
			if(options.classAdd){
				this.classList.add(options.classAdd)
			}
			/**
			 * @description add new events
			 */
			if(options.event && Array.isArray(options.event)){
				options.event.forEach(data => {
					if(data.hasOwnProperty('name') && data.hasOwnProperty('action')){
						this.addEventListener(data.name, e => data.action(e))
					}
				})
			}
		}
		connectedCallback(){
			ComponentDidMount();
		}
		disconnectedCallback(){
			componentWillUnmount();
		}
	  	adoptedCallback(){

		}
	  	attributeChangedCallback(name, old, new_) {
		  
		}
	}
	if(!window.customElements){
		throw Error('Not Compatible Browser')
	}else{
		if(!customElements.get(NameElement)) {customElements.define(NameElement, Reactivty);}
	}
}
/**
 * @function findRoute
 * @param {Array} DataArray
 * @param {{}} DataFind
 * @param {Boolean} DataType
 * @returns {Array}
 */
Core.findRoute = (DataArray, DataFind, DataType) => {
	class Filtered {
		constructor($Array = [], Find = '', Type = '') {
			this.array = $Array
			this.find = Find
			this.type = Type
		}
		run() {
			return this.array.find((_dataRoute) => {
				if(typeof this.find === 'object'){
					if(_dataRoute.path === base + this.find.path){
						var matchNumber = [..._dataRoute.path.matchAll('<Number>')], matchString = [..._dataRoute.path.matchAll('<String>')]
						/**
						 * @description <Number> and <String> more than or with 1 length
						 */
						if(matchNumber.length >= 1 || matchString.length >= 1){
							if(matchNumber.length === 1 || matchString.length === 1){
								var urlsplit = this.find.url.split('/'), pathsplit = (_dataRoute.path + '/').split('/')
								pathsplit.find((_pathsplit_data, _pathsplit_key) => {
									/**
									 * @description number
									 */
									if(matchNumber.length ===  1 && _pathsplit_data === '<Number>' && matchString.length === 0){
										pathsplit[_pathsplit_key] = urlsplit[_pathsplit_key]
										_dataRoute.data = [urlsplit[_pathsplit_key]]
									}
									/**
									 * @description string
									 */
									if(matchString.length ===  1 && _pathsplit_data === '<String>'  && matchNumber.length === 0){
										pathsplit[_pathsplit_key] = urlsplit[_pathsplit_key]
										_dataRoute.data = [urlsplit[_pathsplit_key]]
									}
								})
								return true
							}
						}else{
							Core.write('Same Route')
						}
					}
				}else{
					if((_dataRoute.path + '/').match(this.find)) {
						if(typeof _dataRoute.path == 'string' && typeof _dataRoute.title == 'string') {return true}
						else throw Error('please check type data in your routing')
					}
				}
			})
		}
	}
	return new Filtered(DataArray, DataFind, DataType)
}
/**
 * @exports Routing
 * @param {Array} DefineOwnRoute, @param {Array} ConfigRoute
 */
export class Routing {
	constructor(DefineOwnRoute = [], ConfigRoute = {}) {
		this._defineOwnRoute = DefineOwnRoute
		this._configRoute = ConfigRoute
		DefineOwnRoute.forEach(routelist => {
			routeUrl[routelist.name] = routelist.path
		})
		Core.ENV.route = DefineOwnRoute
		Core.ENV.config = ConfigRoute
	}
	/**
	 * @param {String} ElementApp, @description  name querySelector
	 */
	async rendering(ElementApp) {
		if(this._configRoute.hasOwnProperty('BasePath') && this._configRoute.hasOwnProperty('templateIntegratedRouting') && this._configRoute.hasOwnProperty('AppName') && this._configRoute.hasOwnProperty('Mode') && this._configRoute.hasOwnProperty('PageError') && typeof ElementApp === 'string') {
			let TemplateIntegrated = await new this._configRoute.templateIntegratedRouting().render(),
			PathUrl = window.location.pathname,
			renderElement = document.body.querySelector(ElementApp),
			resultRoute = '',
			componentReady = '',
			dataDebug = [],
			configInherit = this._configRoute,
			base = this._configRoute.BasePath,
			/**
			 * @description create console log request
			 */
			debug = () => {
				if(this._configRoute.Mode === 'development'){
					console.groupCollapsed('request');
					dataDebug.forEach(dataDebug => {
						Core.write('> [' + new Date().getUTCHours() + ':' + new Date().getUTCMinutes() + ':' + new Date().getUTCSeconds() + '] ' + dataDebug.msg)
					});console.groupEnd()
				}
			},
			/**
			 * @param {String} append
			 * @description create element error && show in view pages
			 */
			UIError = (append) => {
				Core.CreateComponent('app-error', () => {}, () => {})
				Core.CreateElement({name: 'app-error',type: ['innerHTML'],data: [append],query: ElementApp})
				throw TypeError(`the class ${componentReady.constructor.name} is not inheritance of class Component`)
			},
			/**
			 * @param {*} msg
			 * @description show error in view pages
			 */
			ErrorException = (msg) => {
				document.title = 'Error Founds'
				document.body.style['backgroundColor'] = 'white'
				renderElement.innerHTML = `<div class="error" style="background: #ff000030;border: 4px solid #ff0000;padding: 5px;"><h4>Error Founds</h4><div>${msg}</div></div>`
			},
			/**
			 * @description clearing console
			 */
			cleared = () => {
				console.clear()
			},
			/**
			 * @param {*} searchUrl
			 * @param {function} Success
			 * @param {function} Errors
			 * @description search url with callback
			 */
			filterCustom = (searchUrl, Success, Errors) => {
				resultRoute = ''
				if(typeof searchUrl === 'object'){
					resultRoute = Core.findRoute(this._defineOwnRoute, searchUrl).run()
					resultRoute ? dataDebug.push({type: 'log', msg: 'request to ' + searchUrl.url + ' [200]'}): dataDebug.push({type: 'log', msg: 'request to ' + searchUrl.url + ' [404]'})
				}
				if(typeof searchUrl === 'string'){
					if(searchUrl.match('[0-9]+') || searchUrl.match('<String>')) {
						resultRoute = Core.findRoute(this._defineOwnRoute, searchUrl, 'parameter').run()
					}
					if(!searchUrl.match('[0-9]+') || !searchUrl.match('<String>')) {
						resultRoute = Core.findRoute(this._defineOwnRoute, searchUrl).run()
					}
					resultRoute ? dataDebug.push({type: 'log', msg: 'request to ' + searchUrl + ' [200]'}): dataDebug.push({type: 'log', msg: 'request to ' + searchUrl + ' [404]'})
				}
				if(typeof resultRoute === 'object') {
					componentReady = ''
					if(this._configRoute.extends) {
						if(this._configRoute.extends.Auth){
							resultRoute['Auth'] = () => {
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
					}
					if(resultRoute.params) {
						if(resultRoute.props){
							componentReady = resultRoute.template({name: resultRoute.name, params: resultRoute.data, props: resultRoute.props})
						}else{
							componentReady = resultRoute.template({name: resultRoute.name, params: resultRoute.data})
						}
					}
					if(!resultRoute.params) {
						if(resultRoute.props){
							componentReady = resultRoute.template({name: resultRoute.name, props: resultRoute.props})
						}else{
							componentReady = resultRoute.template({name: resultRoute.name})
						}
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
			/**
			 * @function Started, @description running function on load the web
			 */
			let Started = () => {
				let EventClickChangePage = () => {
					let linkRoute = document.querySelectorAll('a[lavosted="link')
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
					let PushElement = renderElement ? function() {callback()}: function() {throw TypeError(`not founds element with query ${ElementApp}. solutions => "<div id="${ElementApp}"></div>"`)};PushElement()
				},
				filterCustomAction = (searchfilter, hashStatus) => {
					viewHistory.push(searchfilter)
					filterCustom(searchfilter, () => {
						var statusRun = false, statusModel = false;
						async function runnerApp(){
							statusRun = true;
							let removedBeforeElement = document.body.querySelector(ElementApp).querySelector('app-routing').innerHTML = '';
							if(configInherit.Mode === 'production') {
								statusModel = true
							}
							/**
							 * @description before mount the component
							 */
							if(componentReady.beforeMount){
								try{
									await componentReady.beforeMount();Core.ENV.config.Mode == 'production' ? '': Core.write('before mount')
								}catch(e){
									ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
								}
							}
							if(!hashStatus){
								if(typeof searchfilter === 'object'){
									window.history.pushState({},resultRoute.title,searchfilter.url)
								}else{
									window.history.pushState({},resultRoute.title,searchfilter)
								}
							}
							resultRoute.title ? document.title = resultRoute.title: '';
							detectElement(async () => {
								var componentDidMounted;
								if(typeof componentReady.componentDidMount == 'function'){
									try{
										componentDidMounted = await componentReady.componentDidMount()
									}
									catch(e){
										ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
									}
								}
								componentReady.componentDidMount ? componentDidMounted: Core.ENV.config.Mode == 'production' ? '': Core.write('mounted class ' + componentReady.constructor.name)
								document.querySelectorAll('style').forEach(dataStyle => {
									if(dataStyle.dataset.component){
										dataStyle.remove()
									}
								})
								var runstyle = componentReady.style ? () => {
									try{
										var style = document.createElement('style'),
										readystyle = componentReady.style()
										if(typeof readystyle == 'string' && readystyle.length !== 0){
											style.textContent = componentReady.style().replace(',', ';').replace(' ', '')
											style.dataset.component = componentReady.constructor.name
											document.head.appendChild(style)
										}
									}
									catch(e){
										ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
									}
								}: () => {}
								runstyle()
								Core.CreateComponent(resultRoute.name,
									async () => {
										try{componentReady.ready ? await componentReady.ready(): Core.ENV.config.Mode == 'production' ? '': Core.write('ready events')
										}catch(e){ErrorException(`<pre><code>${e.stack}</code></pre>`);throw Error(e.stack);}
									},
									async () => {
										try{componentReady.componentWillUnmount ? await componentReady.componentWillUnmount(): Core.ENV.config.Mode == 'production' ? '': Core.write('willmount')
										}catch(e){ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);}
									}
								)
								if(document.querySelectorAll('app-routing').length === 1){
									var rendering;
									try{
										rendering = await componentReady.render()
									}
									catch(e){
										ErrorException(`<pre><code>${e.stack}</code></pre>`)
										cleared()
										throw Error(e.stack)
									}
									window.scrollTo(0, 0)
									Core.CreateElement({
										name: resultRoute.name,
										type: ['innerHTML'],
										data: [rendering],
										query: ElementApp + ' app-routing'
									})
								}
								if(document.querySelectorAll('app-routing').length >= 2){
									ErrorException('<p>Message: document.querySelectorAll("app-routing").length !== 1</p>')
									throw TypeError('document.querySelectorAll("app-routing").length !== 1')
								}
								EventClickAsync()
							})
						}
						if(typeof resultRoute.beforeEach === 'function') {
							var beforeEach = resultRoute.beforeEach(auth = () => {if(window.localStorage.getItem('user-account')) {return JSON.parse(window.localStorage.getItem('user-account'))}else{return false}})
							if(beforeEach.hasOwnProperty('to') && !beforeEach.hasOwnProperty('next')){
								statusRun = true
								filterCustomAction(this._configRoute.BasePath + beforeEach.to)
							}
							if(!beforeEach.hasOwnProperty('to') && beforeEach.hasOwnProperty('next')){
								statusRun = true
								runnerApp()
							}
						}else if(typeof resultRoute.beforeEach !== 'function'){runnerApp();}debug()
					});
				},
				/**
				 * @description run function if change of the page
				 */
				OnChangePage = (e) => {
					if(e.target.getAttribute('path') !== 'undefined'){
						filterCustomAction({url: e.target.getAttribute('href') + '/', path: e.target.getAttribute('path')})
					}else{
						filterCustomAction(e.target.getAttribute('href'))
					}
				}
				/**
				 * @description first load the web
				 */
				detectElement(async () => {
					Core.CreateComponent('app-routing', () => {}, () => {})
					var templating = new this._configRoute.templateIntegratedRouting()
					/**
					 * @description before mount the component
					 */
					if(templating.beforeMount){
						try{
							await templating.beforeMount();Core.ENV.config.Mode == 'production' ? '': Core.write('before mount')
						}catch(e){
							ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
						}
					}
					/**
					 * @description await mounted the component
					 */
					var componentDidMounted;
					if(typeof templating.componentDidMount == 'function'){
						try{
							componentDidMounted = await templating.componentDidMount()
						}
						catch(e){
							ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
						}
					}
					templating.componentDidMount ? componentDidMounted: Core.ENV.config.Mode == 'production' ? '': Core.write('mounted class ' + templating.constructor.name)
					/**
					 * @description create the style
					 */
					var runstyle = templating.style ? () => {
						try{
							var style = document.createElement('style'),
							readystyle = templating.style()
							if(typeof readystyle == 'string' && readystyle.length !== 0){
								style.textContent = templating.style().replace(',', ';').replace(' ', '')
								style.dataset.component = templating.constructor.name
								document.head.appendChild(style)
							}
						}
						catch(e){
							ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
						}
					}: () => {}
					runstyle()
					/**
					 * @description create the component
					 */
					Core.CreateComponent(templating.options.name,
						async () => {
							try{templating.ready ? await templating.ready(): Core.ENV.config.Mode == 'production' ? '': Core.write('ready events')
							}catch(e){ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);}
						},
						async () => {
							try{templating.componentWillUnmount ? await templating.componentWillUnmount(): Core.ENV.config.Mode == 'production' ? '': Core.write('willmount')
							}catch(e){ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);}
						}
					)
					/**
					 * @description await rendering
					 */
					var rendering;
					try{
						rendering = await templating.render()
					}
					catch(e){
						ErrorException(`<pre><code>${e.stack}</code></pre>`)
						cleared()
						throw Error(e.stack)
					}
					Core.CreateElement({
						name: 'div',
						type: ['innerHTML'],
						data: [`<${templating.options.name}>${rendering}</${templating.options.name}>`],
						query: ElementApp
					})
				})
				/**
				 * @event onload web, @description matching url
				 */
				window.addEventListener('load', e => {
					filterCustomAction(window.location.pathname);EventClickChangePage();
					var fil = window.location.pathname.split('/').filter(res => res !== '')
					fil.map((res, key) => {
						if(res.match('[0-9]+')){
							fil[key] = '<Number>'
							filterCustomAction({url: window.location.href,path: '/' + fil.join('/')});EventClickChangePage();
						}
					})
				})
				/**
				 * @event onpopstate, @description state change (back || next) url
				 */
				window.addEventListener('popstate', function(event) {
					viewHistory.find(dataHistory => {
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
			Core.write(`Lavosted Routing running in mode ${this._configRoute.Mode}.\nRead documentation in https://github.com/ferdiansyah0611/lavosted-routing`)
			Started()
		}else{throw Error('Error configuration')}
	}
}
/**
 * @exports Component
 */
export class Component{
	constructor(options = {}) {
		this.options = options
		this.nameStateOfComponent = options.name.split('-').join('')
		if(options.hasOwnProperty('name') && options.hasOwnProperty('state')) {
			if(Object.defineProperty.hasOwnProperty(this.nameStateOfComponent)){
				Core.ENV.database[this.nameStateOfComponent] = {state: options.state, created_at: this._static__dated, updated_at: this._static__dated}
			}
			else{
				Core.ENV.database[this.nameStateOfComponent] = {state: options.state, created_at: Component._static__dated, updated_at: Component._static__dated}
			}
		}
	}
	static get _static__dated() {
		var dated = new Date()
		return parseInt(dated.getFullYear() + dated.getDay().toLocaleString() + dated.getHours().toLocaleString() + dated.getMinutes().toLocaleString() + dated.getSeconds().toLocaleString())
	}
	get initProps(){
		this.options.props.forEach(data => {
			document.querySelector(this.options.name).setAttribute(data.name, data.data)
		})
		return true
	}
	get props(){
		return this.options.props
	}
	get params(){
		return this.options.params
	}
	setState(stateChange) {
		if(typeof stateChange === 'function') {
			/*output object*/
			var stateOnChange = stateChange(Core.ENV.database[this.nameStateOfComponent])
			Object.getOwnPropertyNames(stateOnChange).forEach(data => {
				/**
				 * @param data "GET NAME"
				 * stateOnChange[data] "GET VALUE"
				*/
				if(Core.ENV.database[this.nameStateOfComponent]['state'][data] !== undefined){
					Core.ENV.database[this.nameStateOfComponent]['state'][data] = stateOnChange[data]
					Core.ENV.database[this.nameStateOfComponent]['updated_at'] = Component._static__dated
				}else{
					throw Error('name state is nothing in constructor(){super({state: {}})}')
				}
			})
		}
		else if(Array.isArray(stateChange)) {
			stateChange.forEach(value => {
				/*
				 * value[0] "GET NAME STATE"
				 * value[1] "GET VALUE STATE"
				*/
				if(Core.ENV.database[this.nameStateOfComponent]['state'][value[0]] !== undefined){
					Core.ENV.database[this.nameStateOfComponent]['state'][value[0]] = value[1]
					Core.ENV.database[this.nameStateOfComponent]['updated_at'] = Component._static__dated
				}
				else{
					throw Error('Name State Is Nothing In constructor(){super({state: {}})}')
				}
			})
		}else{
			throw TypeError('setState in parameter 1 not type function / array.')
		}
	}
	get state() {
		return Core.ENV.database[this.nameStateOfComponent].state;
	}
}
/**
 * @exports Link
 * @param {*} props 
 * @param {*} params 
 */
export const Link = (props = [], params = '') => {
	var tag = new TagHTML().register();
	return{to: ($url, $string, $path, $type) => {
		if(typeof $url === 'object') {
			if($type) {
				return tag.crt('a', {
					attr: `${props} href="${routeUrl[$url]}" lavosted="link" path='${$path}' async="true"`,
					data: $string
				})
			}
			if(params) {
				return tag.crt('a', {
					attr: `${props} href="${routeUrl[$url]}" lavosted="link" path='${$path}' async="true" params="true"`,
					data: $string
				})
			}else{
				return tag.crt('a', {
					attr: `${props} href="${routeUrl[$url]}" lavosted="link" path='${$path}`,
					data: $string
				})
			}
		}
		if(typeof $url === 'string') {
			if($type) {
				return tag.crt('a', {
					attr: `${props} href="${Core.ENV.config.BasePath + $url}" lavosted="link" path='${$path}' async="true"`,
					data: $string
				})
			}
			if(params) {
				return tag.crt('a', {
					attr: `${props} href="${Core.ENV.config.BasePath + $url}" lavosted="link" path='${$path}' async="true" params="true"`,
					data: $string
				})
			}else{
				return tag.crt('a', {
					attr: `${props} href="${Core.ENV.config.BasePath + $url}"` + 'lavosted="link"' + `path="${$path}"`,
					data: $string
				})
			}
		}
	}}
}

export class TagHTML{
	constructor() {
		this.event = []
		this.listevent = [
			{name: 'onClick', type: 'click'},
			{name: 'onChange', type: 'change'},
			{name: 'onContextMenu', type: 'contextmenu'},
			{name: 'onCopy', type: 'copy'},
			{name: 'onCut', type: 'cut'},
			{name: 'onDblClick', type: 'dblclick'},
			{name: 'onDrag', type: 'drag'},
			{name: 'onDragEnd', type: 'dragend'},
			{name: 'onDragEnter', type: 'dragenter'},
			{name: 'onDragLeave', type: 'dragleave'},
			{name: 'onDragOver', type: 'dragover'},
			{name: 'onDragStart', type: 'dragstart'},
			{name: 'onDrop', type: 'drop'},
			{name: 'onFocus', type: 'focus'},
			{name: 'onFocusIn', type: 'focusin'},
			{name: 'onFocusOut', type: 'focusout'},
			{name: 'onInput', type: 'input'},
			{name: 'onKeyDown', type: 'keydown'},
			{name: 'onKeyPress', type: 'keypress'},
			{name: 'onKeyUp', type: 'keyup'},
			{name: 'onLoad', type: 'load'},
			{name: 'onMouseDown', type: 'mousedown'},
			{name: 'onMouseEnter', type: 'mouseenter'},
			{name: 'onMouseLeave', type: 'mouseleave'},
			{name: 'onMouseMove', type: 'mousemove'},
			{name: 'onMouseOver', type: 'mouseover'},
			{name: 'onMouseOut', type: 'mouseout'},
			{name: 'onMouseUp', type: 'mouseup'},
			{name: 'onMouseWheel', type: 'mousewheel'},
			{name: 'onScroll', type: 'scroll'},
			{name: 'onSubmit', type: 'submit'},
			{name: 'onTouchCancel', type: 'touchcancel'},
			{name: 'onTouchEnd', type: 'touchend'},
			{name: 'onTouchMove', type: 'touchmove'},
			{name: 'onTouchStart', type: 'touchstart'},
			{name: 'onUnload', type: 'unload'},
		];
	}
	register() {
		return{
			crt: (name, options) => {
				var {classes, dataset, id, style, attr} = '', random = Math.floor(Math.random() * Math.floor(999999999));
				options.class ? classes = options.class: ''
				options.id ? id = options.id: ''
				options.style ? style = options.style: ''
				options.attr ? attr = options.attr: ''
				this.listevent.forEach((data, key) => {
					if(options[data.name]){
						this.event.push({
							add: () => {
								document.querySelector(`${name}[data-${random}]`).addEventListener(data.type, e => {
									options[data.name](e)
								})
							}
						})
					}
				})
				if(options.data == null || options.data == undefined){
					throw Error('Data null || undefined')
				}else{
					return(`<${name} ${classes ? 'class="' + classes + '"': ''} ${id ? 'id="' + id + '"': ''} ${style ? 'style="' + style + '"': ''} ${attr ? attr: ''} data-${random}>${options.data}</${name}>`)
				}
			},
			load: async (name, options) => {
				var call = new name();
				if(call.__proto__.hasOwnProperty('render')){
					if(call.beforeMount){
						try{
							await call.beforeMount();Core.ENV.config.Mode == 'production' ? '': Core.write('before mount')
						}catch(e){
							ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
						}
					}
					/**
					 * @description await mounted the component
					 */
					var componentDidMounted;
					if(typeof call.componentDidMount == 'function'){
						try{
							componentDidMounted = await call.componentDidMount()
						}
						catch(e){
							ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
						}
					}
					call.componentDidMount ? componentDidMounted: Core.ENV.config.Mode == 'production' ? '': Core.write('mounted class ' + call.constructor.name)
					/**
					 * @description create the style
					 */
					var runstyle = call.style ? () => {
						try{
							var style = document.createElement('style'),
							readystyle = call.style()
							if(typeof readystyle == 'string' && readystyle.length !== 0){
								style.textContent = call.style().replace(',', ';').replace(' ', '')
								style.dataset.component = call.constructor.name
								document.head.appendChild(style)
							}
						}
						catch(e){
							ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);
						}
					}: () => {}
					runstyle()
					/**
					 * @description create the component
					 */
					Core.CreateComponent(call.options.name,
						async () => {
							try{call.ready ? await call.ready(): Core.ENV.config.Mode == 'production' ? '': Core.write('ready events')
							}catch(e){ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);}
						},
						async () => {
							try{call.componentWillUnmount ? await call.componentWillUnmount(): Core.ENV.config.Mode == 'production' ? '': Core.write('willmount')
							}catch(e){ErrorException(`<pre><code>${e.stack}</code></pre>`);cleared();throw Error(e.stack);}
						}
					)
					/**
					 * @description await rendering
					 */
					var rendering;
					try{
						rendering = await call.render()
					}
					catch(e){
						ErrorException(`<pre><code>${e.stack}</code></pre>`)
						cleared()
						throw Error(e.stack)
					}
					return new Promise((res, rec) => {
						res(`<${call.options.name}>${rendering}</${call.options.name}>`)
					})
				}
			},
			mount: () => {
				return this.event.forEach((data, key) => {
					data.add()
				})
			},
			unmount: () => {
				this.event = []
			}
		}
	}
}
window.Core = Core
window.Link = Link
window.Component = Component
window.Routing = Routing