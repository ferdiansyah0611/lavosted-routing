var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
export var Core = {};
Core.CreateElement = function (data) {
    if (data.type.length === data.data.length) {
        var Create = document.createElement(data.name);
        for (var i = 0; i < data.type.length; i++) {
            Create[data.type[i]] = data.type[i];
        }
        Create[data.type] = data.data;
        document.querySelector(data.query).appendChild(Create);
    }
};
Core.CreateComponent = function (NameElement, ComponentDidMount, ComponentWillmount) {
    var Reactivty = (function (_super) {
        __extends(Reactivty, _super);
        function Reactivty() {
            return _super.call(this) || this;
        }
        Reactivty.prototype.connectedCallback = function () {
            ComponentDidMount();
        };
        Reactivty.prototype.disconnectedCallback = function () {
            ComponentWillmount();
        };
        Reactivty.prototype.adoptedCallback = function () { };
        Reactivty.prototype.attributeChangedCallback = function (name, oldValue, newValue) { };
        return Reactivty;
    }(HTMLElement));
    if (!customElements.get(NameElement)) {
        customElements.define(NameElement, Reactivty);
    }
};
Core.FindingData = function (DataArray, DataFind, DataType) {
    var Filtered = (function () {
        function Filtered($Array, Find, Type) {
            if ($Array === void 0) { $Array = []; }
            if (Find === void 0) { Find = ''; }
            if (Type === void 0) { Type = ''; }
            this.array = $Array;
            this.find = Find;
            this.type = Type;
        }
        Filtered.prototype.run = function () {
            var _this = this;
            return this.array.find(function (DataRoute, KeyRoute) {
                var Path = typeof DataRoute.path, Title = typeof DataRoute.title;
                if ((DataRoute.path + '/').match(_this.find)) {
                    if (Path == 'string' && Title == 'string') {
                        return true;
                    }
                    else
                        throw Error('please check type data in your routing');
                }
                if (_this.type === 'parameter' && DataRoute.params) {
                    DataRoute.params.find(function (dataParams, keyParams) {
                        if (DataRoute.params.length === 1) {
                            if (DataRoute.path.match('<Number>') && dataParams === 'Number') {
                                var stringdata_1 = DataRoute.path, number_1 = '<Number>', count = stringdata_1.length - stringdata_1.match(number_1)['index'] + (number_1.length), index = stringdata_1.match(number_1)['index'], resultingNumber = stringdata_1.slice(0, stringdata_1.match(number_1)['index']) + 1 + stringdata_1.slice(stringdata_1.match(number_1)['index'] + number_1.length, stringdata_1.length), filterNumber_1 = resultingNumber.split('/').filter(function (data) { return data !== ''; }), filterFind_1 = _this.find.split('/').filter(function (data) { return data !== ''; }), arrayFound_1 = '', research = filterFind_1.find(function (dataFilter, keyFilter) {
                                    if (dataFilter.match('^[0-9]$') && filterFind_1.length === filterNumber_1.length) {
                                        filterNumber_1.find(function (numFilter, keyNum) {
                                            if (keyFilter === keyNum && parseInt(dataFilter) !== NaN) {
                                                arrayFound_1 = DataRoute;
                                                arrayFound_1.path = stringdata_1.slice(0, stringdata_1.match(number_1)['index']) + parseInt(dataFilter) + stringdata_1.slice(stringdata_1.match(number_1)['index'] + number_1.length, stringdata_1.length);
                                                arrayFound_1.params = parseInt(dataFilter);
                                                return true;
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        };
        return Filtered;
    }());
    return new Filtered(DataArray, DataFind, DataType);
};
export var Link = function (props) {
    if (props === void 0) { props = []; }
    return { to: function ($url, $string, type) {
            if (type) {
                return "<a " + props + " href=\"" + $url + "\" lavosted=\"link\" async=\"true\">" + $string + "</a>";
            }
            else {
                return "<a " + props + " href=\"" + $url + "\" lavosted=\"link\">" + $string + "</a>";
            }
        } };
};
var passworddb = '';
var Routing = (function () {
    function Routing(DefineOwnRoute, ConfigRoute) {
        if (DefineOwnRoute === void 0) { DefineOwnRoute = []; }
        if (ConfigRoute === void 0) { ConfigRoute = {}; }
        this.DefineOwnRoute = DefineOwnRoute;
        this.ConfigRoute = ConfigRoute;
    }
    Routing.prototype.rendering = function (ElementApp) {
        var _this = this;
        if (this.ConfigRoute.hasOwnProperty('templateIntegratedRouting') && this.ConfigRoute.hasOwnProperty('AppName') && this.ConfigRoute.hasOwnProperty('Type') && this.ConfigRoute.hasOwnProperty('PageError') && typeof ElementApp === 'string') {
            var TemplateIntegrated_1 = this.ConfigRoute.templateIntegratedRouting.template(), BaseUrl = window.location.origin, PathUrl = window.location.pathname, RenderElement_1 = document.body.querySelector(ElementApp), FilterPathUrl_1 = '';
            if (PathUrl.match('1|2|3|4|5|6|7|8|9') || PathUrl.match('string')) {
                FilterPathUrl_1 = Core.FindingData(this.DefineOwnRoute, PathUrl, 'parameter').run();
            }
            if (!PathUrl.match('1|2|3|4|5|6|7|8|9') || !PathUrl.match('string')) {
                FilterPathUrl_1 = Core.FindingData(this.DefineOwnRoute, PathUrl).run();
            }
            var CheckAppRouting_1 = function (OnTrue) {
                if (document.querySelectorAll('app-routing').length === 1) {
                    OnTrue();
                }
                if (document.querySelectorAll('app-routing').length >= 2 || document.querySelectorAll('app-routing').length <= 0) {
                    RenderElement_1.remove();
                    throw Error('query "app-routing" no more than 2 or more or nothing. Must be have 1 element.');
                }
            }, Started = function () {
                if (typeof FilterPathUrl_1 === 'object') {
                    var componentReady = '';
                    if (FilterPathUrl_1.params) {
                        componentReady = FilterPathUrl_1.template(FilterPathUrl_1.name, FilterPathUrl_1.params);
                    }
                    if (!FilterPathUrl_1.params) {
                        componentReady = FilterPathUrl_1.template(FilterPathUrl_1.name);
                    }
                    if (componentReady instanceof Component) {
                        if (typeof componentReady.componentDidMount === 'function' && typeof componentReady.componentWillmount === 'function' && typeof componentReady.beforeMount === 'function' && typeof componentReady.render === 'function' && typeof componentReady.ready === 'function' && typeof componentReady.state === 'object') {
                            var EventClickChangePage_1 = function () {
                                var linkRoute = document.querySelectorAll('a[lavosted="link');
                                linkRoute.forEach(function (dataQuery) {
                                    dataQuery.addEventListener('click', function (e) {
                                        e.preventDefault();
                                        linkRoute.forEach(function (dataQuery2) {
                                            if (dataQuery2.classList.contains('active')) {
                                                dataQuery2.classList.remove('active');
                                            }
                                        });
                                        e.target.classList.add('active');
                                        if (e.target.getAttribute('href') !== window.location.pathname) {
                                            OnChangePage_1(e);
                                        }
                                    });
                                });
                            }, EventClickAsync_1 = function () {
                                var linkRoute = document.querySelectorAll('a[lavosted="link"][async="true"]');
                                linkRoute.forEach(function (dataQuery) {
                                    dataQuery.addEventListener('click', function (e) {
                                        e.preventDefault();
                                        linkRoute.forEach(function (dataQuery2) {
                                            if (dataQuery2.classList.contains('active')) {
                                                dataQuery2.classList.remove('active');
                                            }
                                        });
                                        if (e.target.getAttribute('href') !== window.location.pathname) {
                                            OnChangePage_1(e);
                                        }
                                    });
                                });
                            }, OnMount_1 = window.addEventListener('DOMContentLoaded', function (event) {
                                if (componentReady.DOMContentLoaded) {
                                    componentReady.DOMContentLoaded();
                                }
                            }), MountStart_1 = window.addEventListener('load', function (event) {
                                window.history.replaceState(componentReady.state, componentReady.title, window.location.href);
                                componentReady.beforeMount();
                                document.title = FilterPathUrl_1.title;
                                var PushElement = RenderElement_1 ? function () {
                                    Core.CreateComponent('app-routing', function () { }, function () { });
                                    var start = new Date().getMilliseconds();
                                    var mounted = componentReady.componentDidMount().then(function (result) { return result.data(); });
                                    Core.CreateComponent(componentReady.name, function () { return componentReady.ready(); }, function () { return componentReady.componentWillmount(); });
                                    Core.CreateElement({
                                        name: 'div',
                                        type: ['innerHTML'],
                                        data: [TemplateIntegrated_1],
                                        query: ElementApp
                                    });
                                    var end = new Date().getMilliseconds();
                                    setTimeout(function () {
                                        CheckAppRouting_1(function () {
                                            Core.CreateElement({ name: componentReady.name, type: ['innerHTML'], data: [componentReady.render()], query: ElementApp + ' app-routing' });
                                        });
                                        EventClickChangePage_1();
                                    }, start + end);
                                } : function () {
                                    throw TypeError("not founds element with query " + ElementApp + ". solutions => \"<div id=\"" + ElementApp + "\"></div>\"");
                                };
                                PushElement();
                            }), OnChangePage_1 = function (e) {
                                var componentReadyClick = '', methodCallClick = Core.FindingData(_this.DefineOwnRoute, e.target.getAttribute('href') + '/').run();
                                if (methodCallClick.params) {
                                    componentReadyClick = methodCallClick.template(methodCallClick.name, methodCallClick.params);
                                }
                                if (!methodCallClick.params) {
                                    componentReadyClick = methodCallClick.template(methodCallClick.name);
                                }
                                if (componentReadyClick instanceof Component) {
                                    var UnMountUrlNow_1 = Core.FindingData(_this.DefineOwnRoute, window.location.pathname).run(), StartedClick = function () {
                                        if (typeof methodCallClick === 'object') {
                                            var removedBeforeElement = document.body.querySelector(ElementApp).querySelector(UnMountUrlNow_1.name).remove();
                                            OnMount_1 = setTimeout(function () {
                                                componentReadyClick.beforeMount();
                                            }),
                                                MountStart_1 = setTimeout(function () {
                                                    window.history.pushState(componentReadyClick.state, methodCallClick.title, e.target.getAttribute('href'));
                                                    document.title = methodCallClick.title;
                                                    var PushElement = RenderElement_1 ? function () {
                                                        var start = new Date().getMilliseconds();
                                                        componentReadyClick.componentDidMount().then(function (result) { return result.data(); });
                                                        Core.CreateComponent(methodCallClick.name, function () { return componentReadyClick.ready(); }, function () { return componentReadyClick.componentWillmount(); });
                                                        var end = new Date().getMilliseconds();
                                                        setTimeout(function () {
                                                            CheckAppRouting_1(function () {
                                                                Core.CreateElement({
                                                                    name: methodCallClick.name,
                                                                    type: ['innerHTML'],
                                                                    data: [componentReadyClick.render()],
                                                                    query: ElementApp + ' app-routing'
                                                                });
                                                            });
                                                            EventClickAsync_1();
                                                        }, start + end);
                                                    } : function () {
                                                        throw TypeError("not founds element with query " + ElementApp + ". solutions => \"<div id=\"" + ElementApp + "\"></div>\"");
                                                    };
                                                    PushElement();
                                                });
                                        }
                                    };
                                    StartedClick();
                                }
                            }, OnHash = function () {
                                var ListRoute = _this.DefineOwnRoute;
                                window.addEventListener('popstate', function (event) {
                                    setTimeout(function () {
                                        var RunPop = Core.FindingData(ListRoute, window.location.pathname).run();
                                        if (typeof RunPop === 'object') {
                                            document.body.querySelector(ElementApp).querySelector('app-routing').innerHTML = '';
                                            var componentReadyPop_1 = RunPop.template(), OnMount_2 = setTimeout(function () {
                                                componentReadyPop_1.beforeMount();
                                            }), MountStart_2 = setTimeout(function () {
                                                window.history.replaceState(componentReadyPop_1.state, componentReadyPop_1.title, null);
                                                document.title = RunPop.title;
                                                var PushElement = RenderElement_1 ? function () {
                                                    var start = new Date().getMilliseconds();
                                                    componentReadyPop_1.componentDidMount().then(function (result) { return result.data(); });
                                                    Core.CreateComponent(componentReadyPop_1.name, function () { return componentReadyPop_1.ready(); }, function () { return componentReadyPop_1.componentWillmount(); });
                                                    var end = new Date().getMilliseconds();
                                                    setTimeout(function () {
                                                        CheckAppRouting_1(function () {
                                                            Core.CreateElement({
                                                                name: componentReadyPop_1.name,
                                                                type: ['innerHTML'],
                                                                data: [componentReadyPop_1.render()],
                                                                query: ElementApp + ' app-routing'
                                                            });
                                                        });
                                                        EventClickAsync_1();
                                                    }, start + end);
                                                } : function () {
                                                    throw TypeError("not founds element with query " + ElementApp + ". solutions => \"<div id=\"" + ElementApp + "\"></div>\"");
                                                };
                                                PushElement();
                                            });
                                        }
                                    });
                                }, false);
                            };
                            OnHash();
                        }
                        else {
                            throw Error("\nthe class " + componentReady.constructor.name + " in a methods not type function or object or maybe nothing methods\nRequired methods => beforeMount, componentDidMount, ready, render, componentWillmount and state.");
                        }
                    }
                    else {
                        Core.CreateComponent('app-error', function () { }, function () { });
                        Core.CreateElement({
                            name: 'app-error',
                            type: ['innerHTML'],
                            data: ["the class " + componentReady.constructor.name + " is not inheritance of class Component"],
                            query: ElementApp
                        });
                        throw TypeError("the class " + componentReady.constructor.name + " is not inheritance of class Component");
                    }
                }
                if (typeof FilterPathUrl_1 === 'undefined') {
                    Core.CreateComponent('app-error', function () { }, function () { });
                    Core.CreateElement({ name: 'app-error', type: ['innerHTML'], data: [_this.ConfigRoute.PageError], query: ElementApp });
                    throw Error('the route not same with url now');
                }
            };
            Started();
            return {
                dbprivate: function (pw) {
                    passworddb = pw;
                }
            };
        }
        else {
            throw Error('Error configuration');
        }
    };
    return Routing;
}());
export { Routing };
var dbprivate = {};
window.db = function () {
    if (window.prompt('input the password of database privated') === atob(passworddb)) {
        console.info('the password is confirmed\n');
        return dbprivate;
    }
    else {
        console.error('the password is wrong.');
    }
};
var Component = (function () {
    function Component(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        if (options.hasOwnProperty('name') && options.hasOwnProperty('state')) {
            var dated = new Date(), NowDated = parseInt(dated.getFullYear() + dated.getDay().toLocaleString() + dated.getHours().toLocaleString() + dated.getMinutes().toLocaleString() + dated.getSeconds().toLocaleString());
            if (Object.defineProperty.hasOwnProperty(options.name.split('-').join(''))) {
                dbprivate[options.name.split('-').join('')] = { state: options.state, created_at: NowDated };
            }
            else {
                dbprivate[options.name.split('-').join('')] = { state: options.state, created_at: NowDated };
            }
        }
        else {
            throw TypeError("property at path " + this.path + " tidak lengkap");
        }
    }
    Component.prototype.setState = function () {
        var state = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            state[_i] = arguments[_i];
        }
        console.log.apply(console, state);
    };
    Component.prototype.state = function () {
        return dbprivate[this.options.name.split('-').join('')].state;
    };
    return Component;
}());
export { Component };
var SubComponent = (function () {
    function SubComponent(NameComponent, ActionCallBack) {
        var _this = this;
        if (NameComponent === void 0) { NameComponent = ''; }
        if (ActionCallBack === void 0) { ActionCallBack = {}; }
        this.name = NameComponent;
        this.ActionCallBack = ActionCallBack;
        Core.CreateComponent(this.name, function () { return _this.ActionCallBack.componentDidMount(); }, function () { return _this.ActionCallBack.componentWillmount(); });
        this.start = "<" + this.name + ">" + this.ActionCallBack.render() + ("</" + this.name + ">");
    }
    return SubComponent;
}());
export { SubComponent };
//# sourceMappingURL=routing-next-beta.js.map