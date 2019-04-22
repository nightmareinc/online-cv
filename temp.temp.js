/**
 * this is the module that bulids basiscore dashboards.
 * this module contains a serviceMapper constructor and a dashboard object that is
 * where the real thing happens. along with a public API for the module so that 
 * the linked instances of objects won't have access to unnecessary information.\n
 *  note: v2.0.0 was written with constructor calls and prototype methods, this version
 * however uses the better, more performant way of prototype delegation in javascript.
 * it was considered to use delegation as much as possible but there are places that
 * we had a legacy code and a deadtime so we adopted some lagecy code from v.2.0.0 that uses
 * var self = this; kinda syntax, not happy about it but it works.
 */
var DASHBOARD = (function () {
    /** 
     * this is a constructor function used to better utilize the services objects in 
     * the dashboard settings json
     * 
     * @constructor serviceMapper
     */
    var serviceMapper = function serviceMapper(json, type, cache) {
        /**
         * this one is pretty self explanetory, it retrieves the cookie by name
         * and the code is actually coppied from w3schools
         * 
         * @method getCookie
         */
        this.getCookie = function getCookiefn(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };
        /**
         * the reason for this is this function might get an object instead of a 
         * string to parse. it would have been neater if we used only one type though.
         */
        if (typeof (json) === 'string') {
            this.services = JSON.parse(json);
        } else {
            this.services = json;
        }
        /**
            you might jump the gun and ask why not doing:
            services:[{
                ...
                "params": {
                    "wordid": 0,
                    "dmnid": 7
                }
            }]
            in the first place? 
            we did this to normalize json structure so that we make SURE that 
            there'll always be an array with objects in it,and each object is 
            gonna have two keys - title and value -.
            for more info on merging objects algorithm visit: https://stackoverflow.com/questions/27538349/merge-multiple-objects-inside-the-same-array-into-one-object
            for ease of use in internal module we provide a serviceMapper module and it's works like a charm!
        */
        this.getUri = function (servName) {
            var result = this.services.filter(function (service) {
                return service.servicename.toUpperCase() === servName.toUpperCase();
            });
            if (result.length > 0) {
                return result[0].serviceip + '/' + this.getCookie('rkey') + '/' + result[0].servicename;
            } else {
                console.warn('no service found on the given object', '\n\t servicename:' + servName, '\n\t serviceObject:' + this.services)
                return false;
            }
        };
        this.getParams = function (service, param) {
            if (type) {
                if (type == 'link') {
                    var tempService2 = this.services;
                    if (param) {
                        return tempService2[0].params.filter(function (paramItem) {
                            return paramItem.title.toUpperCase() === param.toUpperCase();
                        }).reduce(function (acc, curr) {
                            var temp = {};
                            temp[curr.title] = curr.value;
                            return Object.assign(acc, temp);
                        }, {})[param];
                    } else {
                        return tempService2[0].params.map(function (item) {
                            var temp = {};
                            temp[item.title] = item.value;
                            return temp;
                        }).reduce(function (acc, curr) {
                            return Object.assign(acc, curr);
                        }, {});
                    }
                }
            } else {
                if (service) {
                    var tempService = this.services.filter(function (item) {
                        return item.servicename.toUpperCase() === service.toUpperCase();
                    });
                    if (tempService.length > 0) {
                        if (param) {
                            return tempService[0].params.filter(function (paramItem) {
                                return paramItem.title.toUpperCase() === param.toUpperCase();
                            }).reduce(function (acc, curr) {
                                var temp = {};
                                temp[curr.title] = curr.value;
                                return Object.assign(acc, temp);
                            }, {})[param];
                        } else {
                            return Object.assign(tempService[0].params.map(function (item) {
                                var temp = {};
                                temp[item.title] = item.value;
                                return temp;
                            }).reduce(function (acc, curr) {
                                return Object.assign(acc, curr);
                            }, {}), {
                                _: new Date().getTime()
                            });
                        }
                    }
                } else {
                    console.warn('service name must be specified to retrieve params');
                }
            }
        };
        this.getAllParams = function () {
            var self = this;
            var allParams = {};
            this.services.forEach(function (item) {
                Object.assign(allParams, self.getParams(item.servicename));
            });
            return allParams;
        };
    };
    var dash = {
        modules: [],
        setting: {
            uri: '185.44.36.180',
            name: 'Setting',
            getFullUri: function (rkey) {
                return 'http://' + this.uri + '/' + rkey + '/' + this.name + '/';
            }
        },
        mapper: serviceMapper,
        templates: {
            desktop: {
                editBtn: '<a class="save_form dashboard_action_edit"><i class="fa fa-edit"></i>ویرایش</a>',
                exitEditBtn: '<a class="save_form dashboard_action_exit" style="display:none;"><i class="fa fa-share" aria-hidden="true"></i>خروچ از حالت ویرایش</a>',
                addModules: '<a class="save_form dashboard_action_addModule"  style="display:none;"><i class="fa fa-plus-square"></i>افزودن ماژول</a>',
                saveDashboard: '<a class="save_form dashboard_action_saveDashboard" style="display:none;"><i class="fa fa-floppy-o"></i>ذخیره</a>',
                dashboardHeadPalette: '<div class="box2 dashboard_head_module_picker" style="display:none;"><div class="tree-panel-heading-controls"><label class="tree-panel-label-title"> <i class="fa fa-tags"></i>اضافه کردن لینک جدید<div></div></label><div class="clr"></div></div><div class="filter_resize"><div class="clr"></div></div></div>',
                dashboardBodyPalette: '<div class="box2 dashboard_body_module_picker" style="display:none;"><div class="tree-panel-heading-controls"><label class="tree-panel-label-title"> <i class="fa fa-tags"></i>اضافه کردن ماژول جدید<div></div></label><div class="clr"></div></div><div class="filter_resize"><div class="clr"></div></div></div>',
                modulePreloader: '<div class="modulePreloader"></div>'
            },
            mobile: {
                editBtn: '<a class="save_form dashboard_action_edit"><i class="fa fa-edit"></i>ویرایش</a>',
                exitEditBtn: '<button type="button" class="save_form dashboard_action_exit"><i class="fa fa-share" aria-hidden="true"></i></button>',
                addModules: '<button type="button" class="save_form dashboard_action_addModule" ><i class="fa fa-plus-square"></i></button>',
                saveDashboard: '<button type="button" class="save_form dashboard_action_saveDashboard"><i class="fa fa-floppy-o"></i></button>',
                closeModulePicker: '<button type="button" class="closeModulePicker"><img src="/images/cancel.png"/></button>',
                dashboardHeadPalette: '<div class="dashboard_head_module_picker"><div class="tree-panel-heading-controls"><label class="tree-panel-label-title">اضافه کردن لینک:<div></div></label><div class="clr"></div></div><div class="filter_resize"><div class="clr"></div></div></div>',
                dashboardBodyPalette: '<div class="dashboard_body_module_picker"><div class="tree-panel-heading-controls"><label class="tree-panel-label-title">اضافه کردن ماژول:<div></div></label><div class="clr"></div></div><div class="filter_resize"><div class="clr"></div></div></div>',
                modulePreloader: '<div class="modulePreloader"></div>'
            }
        },
        init: function initfn(config,devMode) {
            this.config = config;
            $.ajax({
                url: devMode.status == true ? devMode.settings : this.setting.getFullUri(config.rkey),
                method: 'GET',
                dataType: 'JSON',
                data: config,
                context: this,
                cache: false,
                success: function (data) {
                    this.setting.json = data;
                    if (this.config.deviceid == 1) {
                        this.renderDesktop();
                    } else if (this.config.deviceid == 2) {
                        this.renderMobile();
                    }
                }
            });
        },
        getModule: function getModule(moduleid) {
            return this.modules.filter(function (item) {
                return item.moduleid == moduleid;
            })[0];
        },
        renderDesktop: function renderDesktopfn() {
            // prevent the menu dropdown to go under modules
            $('#header-sa #menu-manzoomeh').css('z-index', 500);
            //add buttons
            this.addDesktopButtons();
            var body_box = $('.body_box');
            // add modules templates
            if (body_box.length === 0) {
                console.warn('no instance of .body_box was found');
            } else if (body_box.length === 1) {
                // to make sure there is only one instance of dashboard modules
                body_box.find('#dashboard_container').append('<form action="/save-dashboard.bc?" method="post" class="setting">' +
                    '<div>' +
                    '<input type="hidden" name="ownerid" value="' + this.config.ownerid + '"/>' +
                    '<input type="hidden" name="_root.dmnid" value="' + this.config.dmnid + '"/>' +
                    '<input type="hidden" name="sid" value="' + this.config.sid + '"/>' +
                    '<input type="hidden" name="redirect" value="' + window.location.href + '"/>' +
                    '<input type="hidden" name="_root.userid" value="' + this.config.userid + '"/>' +
                    '<input type="hidden" name="_root.rkey" value="' + this.config.rkey + '"/>' +
                    '</div>' +
                    this.templates.desktop.dashboardHeadPalette +
                    this.templates.desktop.dashboardBodyPalette +
                    '<div class="dashboard_head"></div><div class="dashboard_body"></div>' + '</form>');
            } else if (body_box.length > 1) {
                console.warn('more than one intance of .body_box was founds');
            } else {
                console.warn('no instance of .body_box was found');
            }
            // load pallete items
            /* load columns - head 
            load columns - body
            load modules - head 
            load modules - body  */
            //bind event handlers
            this.loadModules();
            this.bindDesktopEvents();
        },
        renderMobile: function renderMobileFn() {
            // prevent the menu dropdown to go under modules
            $('#header-sa #menu-manzoomeh').css('z-index', 500);
            //add buttons
            this.addMobileButtons();
            var body_box = $('.body_box');
            // add modules templates
            if (body_box.length === 0) {
                console.warn('no instance of .body_box was found');
            } else if (body_box.length === 1) {
                // to make sure there is only one instance of dashboard modules
                body_box.find('#dashboard_container').append('<form action="/save-dashboard.bc?" method="post" class="setting">' +
                    '<div>' +
                    '<input type="hidden" name="ownerid" value="' + this.config.ownerid + '"/>' +
                    '<input type="hidden" name="_root.dmnid" value="' + this.config.dmnid + '"/>' +
                    '<input type="hidden" name="sid" value="' + this.config.sid + '"/>' +
                    '<input type="hidden" name="redirect" value="' + window.location.href + '"/>' +
                    '<input type="hidden" name="_root.userid" value="' + this.config.userid + '"/>' +
                    '<input type="hidden" name="_root.rkey" value="' + this.config.rkey + '"/>' +
                    '</div>' + '<div class="modulePickerContainer">' +
                    this.templates.mobile.closeModulePicker +
                    this.templates.mobile.dashboardHeadPalette +
                    this.templates.mobile.dashboardBodyPalette +
                    '</div>' +
                    '<div class="dashboard_head"></div><div class="dashboard_body"></div>' + '</form>');
            } else if (body_box.length > 1) {
                console.warn('more than one intance of .body_box was founds');
            } else {
                console.warn('no instance of .body_box was found');
            }
            // load pallete items
            /* load columns - head 
            load columns - body
            load modules - head 
            load modules - body  */
            this.loadModules();
            //bind event handlers
            this.bindMobileEvents();
        },
        addMobileButtons: function addMobileButtonsFn() {
            var navigation_top = $('body #navigation_top'),
                dashboardContainer = $('#dashboard_container');
            if (navigation_top.length === 0) {
                console.error('no instace of div#navigation_top was found');
                // craete and append
            } else if (navigation_top.length === 1) {
                // add buttons
                navigation_top.find('.tools .panel-header').append(this.templates.desktop.editBtn);
                dashboardContainer.prepend('<div class="editModeButtons">' +
                    this.templates.mobile.exitEditBtn +
                    this.templates.mobile.addModules +
                    this.templates.mobile.saveDashboard +
                    '</div>');
            } else if (navigation_top.length > 1) {
                console.warn('more than one intance of coresponding elements were found.\n make sure you have only ONE instance of these elements:\n\t - div#navigation_top');
                navigation_top.find('.tools .panel-header').append(this.templates.desktop.editBtn);
            } else {
                console.error('no instance of coresponding elements were found (div.#navigation_top)');
            }
        },
        addDesktopButtons: function addDesktopButtonsFn() {
            // adding action buttons
            var btns = this.templates.desktop.editBtn +
                this.templates.desktop.exitEditBtn +
                this.templates.desktop.saveDashboard +
                this.templates.desktop.addModules,
                navigation_top = $('body #navigation_top');
            if (navigation_top.length === 0) {
                console.error('no instace of div#navigation_top was found');
                // craete and append
            } else if (navigation_top.length === 1) {
                // add buttons
                navigation_top.find('.tools .panel-header').append(btns);
            } else if (navigation_top.length > 1) {
                console.warn('more than one intance of coresponding elements were found.\n make sure you have only ONE instance of these elements:\n\t - div#navigation_top');
                navigation_top.find('.tools .panel-header').append(btns);
            } else {
                console.error('no instance of coresponding elements were found (div.#navigation_top)');
            }
        },
        loadModules: function loadModulesfn() {
            var dashboardBody = $('.dashboard_body'),
                dashboardHead = $('.dashboard_head'),
                dashboardHeadModulePicker = $('.dashboard_head_module_picker'),
                dashboardBodyModulePicker = $('.dashboard_body_module_picker');
            this.setting.json[0].setting[0].columns.links.forEach(function (item) {
                dashboardHead.append('<div class="col" data-col="' + item.col +
                    '" style="width:' + item.width +
                    '%"></div>');
            });
            this.setting.json[0].setting[0].columns.modules.forEach(function (item) {
                dashboardBody.append('<div class="col" data-col="' + item.col +
                    '" style="width:' + item.width +
                    '%"></div>');
            });
            this.modules = [].concat(this.setting.json[0].setting[0].used).concat(this.setting.json[0].setting[0].unused);
            this.setting.json[0].setting[0].used.map(function (item) {
                this.modules.forEach(function (modItem, index, modArr) {
                    if (modItem.moduleid == item.moduleid) {
                        modArr[index].active = true;
                    }
                });
            }, this);
            this.setting.json[0].setting[0].unused.map(function (item) {
                this.modules.forEach(function (modItem, index, modArr) {
                    if (modItem.moduleid == item.moduleid) {
                        modArr[index].active = false;
                    }
                });
            }, this);
            // sort objects in used to fix the order in loading modules
            this.modules = this.modules.sort(function (a, b) {
                if (a.ord < b.ord) {
                    return -1;
                }
                if (a.ord > b.ord) {
                    return 1;
                }
                return 0;
            });
            this.modules.filter(function (item) {
                return item.active === false && item.type == 'link';
            }).forEach(function (moduleItem) {
                dashboardHeadModulePicker.find('.filter_resize').prepend(
                    '<div class="add-object draggable" data-module-type="link"' +
                    ' " data-moduleid="' + moduleItem.moduleid +
                    '">' + moduleItem.title + '</div>');
            }, this);
            this.modules.filter(function (item) {
                return item.active === false && item.type == 'module';
            }).forEach(function (moduleItem) {
                dashboardBodyModulePicker.find('.filter_resize').prepend(
                    '<div class="add-object draggable" data-module-type="module"' +
                    ' " data-moduleid="' + moduleItem.moduleid +
                    '">' + moduleItem.title + '</div>');
            }, this);
            this.modules.filter(function (item) {
                return item.active === true && item.type == 'link';
            }).forEach(function (moduleItem, index) {
                this.loadLink(moduleItem, index);
                dashboardHeadModulePicker.find('.filter_resize').prepend(
                    '<div class="add-object" data-module-type="link"' +
                    ' " data-moduleid="' + moduleItem.moduleid +
                    '">' + moduleItem.title + '</div>');
            }, this);
            this.modules.filter(function (item) {
                return item.active === true && item.type == 'module';
            }).forEach(function (moduleItem, index) {
                this.loadModule(moduleItem, index);
                dashboardBodyModulePicker.find('.filter_resize').prepend(
                    '<div class="add-object" data-module-type="module"' +
                    ' " data-moduleid="' + moduleItem.moduleid +
                    '">' + moduleItem.title + '</div>');
            }, this);
        },
        loadLink: function loadLinkfn(moduleItem, index, col) {
            var timestamp = new Date().getTime().toString().slice(-8);
            // face them all
            var linkInfo = new this.mapper(moduleItem.services, 'link');

            $('#dashboard_container .dashboard_head .col[data-col=col' + (col ? col : moduleItem.col) + ']').append(
                '<a data-href="' + linkInfo.getParams('', 'link') + '" href="' + linkInfo.getParams('', 'link') + '" class="module dashbord-title ui-sortable-handle" data-moduleid="' + moduleItem.moduleid + '" data-module-type="link" style="background:' + linkInfo.getParams('', 'color') + '">' +
                '<div class="dashboard-icon"><img src="' + linkInfo.getParams('', 'image') + '"></div>' +
                '<div class="dashboard-text">' + linkInfo.getParams('', 'title') + '</div>' +
                '<div class="clr">' +
                '</div></a>'
            );
            $('#dashboard_container .dashboard_head .col[data-col=col' + moduleItem.col + '] .module[data-moduleid=' + moduleItem.moduleid + ']').attr('data-module-type', 'module');
            $('.dashboard_head').removeClass('alreadyDropped');
            // refresh the sortable element + add the scale effect
            if ($('.dashboard_head .col.ui-sortable').length > 0)
                $('.dashboard_head .col').sortable('refresh');
            $('.dashboard_head .module[data-moduleid=' + moduleItem.moduleid + ']').append(
                '<input type="hidden" name="_root.used__' + ((index + 1) * moduleItem.moduleid * timestamp) + '.moduleid" value="' + moduleItem.moduleid +
                '" data-module="' + moduleItem.moduleid +
                '" ><input type="hidden" name="_root.used__' + ((index + 1) * moduleItem.moduleid * timestamp) +
                '.title" value="' + moduleItem.title +
                '" ><input type="hidden" name="_root.used__' + ((index + 1) * moduleItem.moduleid * timestamp) +
                '.col" value="' + moduleItem.col + '" ><input type="hidden" name="_root.used__' + ((index + 1) * moduleItem.moduleid * timestamp) +
                '.ord" class="ord" value="' + moduleItem.ord + '" >');

            if ($('body').hasClass('edit_mode')) {
                var moduleNode = $('.module[data-moduleid=' + moduleItem.moduleid + ']');
                var text = moduleNode.find('.ModuleTitle').text();
                if (moduleNode.find('.moduleTools').length > 0) {
                    if (moduleNode.find('.moduleTools ul').length > 0) {
                        if (moduleNode.find('.moduleTools .removeBox').length < 1) {
                            moduleNode.find('.moduleTools ul').append('<li><a class="removeBox" href="javascript:void(0)"><img src="/images/cancel.png"/></a><span class="mini-tools-tooltip">حذف</span></li>');
                        }
                    } else {
                        moduleNode.find('.moduleTools ul').append('<ul><li><a class="removeBox" href="javascript:void(0)"><img src="/images/cancel.png"/></a><span class="mini-tools-tooltip">حذف</span></li><ul>');
                    }
                } else {
                    moduleNode.prepend('<div class="moduleTools"><ul><li><a class="removeBox" href="javascript:void(0)"><img src="/images/cancel.png"/></a><span class="mini-tools-tooltip">حذف</span></li></ul></div>')
                }
                $('.dashboard_head .col[data-col=col' + moduleItem.col + '] .module[data-moduleid=' + moduleItem.moduleid + ']').attr('href', 'javascript:void(0)');
                $('.module[data-moduleid=' + moduleItem.moduleid + '] .ModuleTitle').replaceWith(
                    '<div class="ModuleTitle"><input type="text" class="boxtitle" value="' + text + '"></div>');
            }
        },
        loadModule: function loadModulefn(moduleItem, index, col) {
            var timestamp = new Date().getTime().toString().slice(-8);
            $('#dashboard_container .dashboard_body .col[data-col=col' + (col ? col : moduleItem.col) + ']').append('<div class="module" data-moduleid="' + moduleItem.moduleid + '" style="z-index:' + (100 - Number(moduleItem.ord)) + ';">' + this.templates.desktop.modulePreloader + '</div>');
            $.ajax({
                url: '/' + (moduleItem.pagename.indexOf('?') !== -1 ? moduleItem.pagename + '&' : moduleItem.pagename + '?') + "moduleid=" + moduleItem.moduleid + "&dmnid=" + this.config.dmnid,
                type: 'POST',
                context: this,
                data: {
                    services: JSON.stringify(moduleItem.services)
                }
            }).done(function (data) {
                // face them all
                $('#dashboard_container .dashboard_body .col[data-col=col' + (col ? col : moduleItem.col) + '] .module[data-moduleid=' + moduleItem.moduleid + ']').html(data.replace('#title#', moduleItem.title));
                $('#dashboard_container .dashboard_body .col[data-col=col' + moduleItem.col + '] .module[data-moduleid=' + moduleItem.moduleid + ']').attr('data-module-type', 'module');
                $('.dashboard_body').removeClass('alreadyDropped');
                $('#dashboard_container').append('<div cldass="clr"></div>');
                $('#dashboard_container .dashboard_body').append('<div cldass="clr"></div>');
                // refresh the sortable element + add the scale effect
                if ($('.dashboard_body .col.ui-sortable').length > 0)
                    $('.dashboard_body .col').sortable('refresh');
                $('.dashboard_body .module[data-moduleid=' + moduleItem.moduleid + ']').append(
                    '<input type="hidden" name="_root.used__' + ((index + 1) * moduleItem.moduleid * timestamp) + '.moduleid" value="' + moduleItem.moduleid +
                    '" data-module="' + moduleItem.moduleid +
                    '" ><input type="hidden" name="_root.used__' + ((index + 1) * moduleItem.moduleid * timestamp) +
                    '.title" value="' + moduleItem.title +
                    '" ><input type="hidden" name="_root.used__' + ((index + 1) * moduleItem.moduleid * timestamp) +
                    '.col" value="' + moduleItem.col + '" ><input type="hidden" name="_root.used__' + ((index + 1) * moduleItem.moduleid * timestamp) +
                    '.ord" class="ord" value="' + moduleItem.ord + '" >');

                if ($('body').hasClass('edit_mode')) {
                    var moduleNode = $('.module[data-moduleid=' + moduleItem.moduleid + ']');
                    var text = moduleNode.find('.ModuleTitle').text();
                    if (moduleNode.find('.moduleTools').length > 0) {
                        if (moduleNode.find('.moduleTools ul').length > 0) {
                            moduleNode.find('.moduleTools ul').prepend('<li><a class="removeBox" href="javascript:void(0)"><img src="/images/cancel.png"/></a><span class="mini-tools-tooltip">حذف</span></li>');
                        } else {
                            moduleNode.find('.moduleTools').append('<ul><li><a class="removeBox" href="javascript:void(0)"><img src="/images/cancel.png"/></a><span class="mini-tools-tooltip">حذف</span></li><ul>');
                        }
                    } else {
                        moduleNode.prepend('<div class="moduleTools"><ul><li><a class="removeBox" href="javascript:void(0)"><img src="/images/cancel.png"/></a><span class="mini-tools-tooltip">حذف</span></li></ul></div>')
                    }
                    $('.module[data-moduleid=' + moduleItem.moduleid + '] .ModuleTitle').replaceWith(
                        '<div class="ModuleTitle"><input type="text" class="boxtitle" value="' + text + '"></div>');
                }
                // call module load method
                var moduleMapper = new this.mapper(moduleItem.services)
                this.modules.filter(function (item) {
                    return item.moduleid == moduleItem.moduleid;
                })[0].loader(moduleMapper.getAllParams());
            });
        },
        refreshModule: function refreshModulefn(moduleid, params) {
            if (this.paramDiff(this.getModule(moduleid).services), params) {
                this.getModule(moduleid).loader(params);
            }
        },
        refreshChildren: function refreshChildrenfnn(moduleid, params) {
            function findMyKid(moduleid) {
                var kids = this.modules.filter(function (item) {
                    return item.parentid == moduleid && item.active === true;
                });
                if (kids.length > 0) {
                    kids.forEach(function (item) {
                        this.refreshModule(item.moduleid, params);
                        findMyKid.call(this, item.moduleid, params);
                    }, this);
                }
            }
            findMyKid.call(this, moduleid, params);
        },
        addModule: function addModulefn(moduleid, fn) {
            this.modules.forEach(function (item) {
                if (item.moduleid == moduleid) {
                    item.loader = fn;
                }
            });
        },
        removeModule: function removeModulefn(moduleid) {
            this.modules.forEach(function (item, index, arr) {
                if (moduleid == item.moduleid) {
                    arr[index].active = false;
                }
            })
        },
        paramDiff: function paramDiffFn(services, newParams) {
            var serv = new this.mapper(services);
            var old = serv.getAllParams();
            var result = false;
            paramLoop: for (var item in newParams) {
                if (old.hasOwnProperty(item)) {
                    if (newParams[item] === old[item]) {
                        result = false;
                    } else {
                        result = true;
                        // replace the newly found values
                        break paramLoop;
                    }

                }
            }
            return result;
        },
        bindMobileEvents: function bindMobileEventsFn() {
            var self = this;

            function updatejson() {
                var colLink = $(".dashboard_head .col"),
                    colModule = $(".dashboard_body .col");
                colLink.each(function (colIndex) {
                    $(this).find(".module:not(.ui-sortable-helper)").each(function (ordIndex) {
                        var _mod = $(this);
                        $(this).find('input[type=hidden]:not([name=wordid])').each(function () {
                            switch ($(this).attr('name').split('.')[$(this).attr('name').split('.').length - 1]) {
                                case 'col':
                                    $(this).val(colIndex + 1);
                                    break;
                                case 'ord':
                                    $(this).val(ordIndex + 1);
                                    break;
                                default:
                                    console.log('def case');
                                    break;
                            }
                        });
                    });
                });
                colModule.each(function (colIndex) {
                    $(this).find(".module:not(.ui-sortable-helper)").each(function (ordIndex) {
                        var _mod = $(this);
                        $(this).find('input[type=hidden]:not([name=wordid])').each(function () {
                            switch ($(this).attr('name').split('.')[$(this).attr('name').split('.').length - 1]) {
                                case 'title':
                                    var title = _mod.find('.ModuleTitle .boxtitle').val();
                                    $(this).val(title);
                                    break;
                                case 'col':
                                    $(this).val(colIndex + 1);
                                    break;
                                case 'ord':
                                    $(this).val(ordIndex + 1);
                                    break;
                                default:
                                    console.log('def case');
                                    break;
                            }
                        });
                    });
                });
            }

            function drag() {
                $("body .dashboard_head_module_picker .add-object.draggable").draggable({
                    revert: "invalid",
                    helper: "clone",
                    zIndex: 10000,
                    drag: function (event, ui) {
                        $(".ui-draggable-dragging").addClass('active-content');
                    }
                });
                $("body .dashboard_body_module_picker .add-object.draggable").draggable({
                    revert: "invalid",
                    helper: "clone",
                    zIndex: 10000,
                    drag: function (event, ui) {
                        $(".ui-draggable-dragging").addClass('active-content');
                    }
                });
                $("body .dashboard_head .col").droppable({
                    accept: $('.add-object[data-module-type="link"]'),
                    drop: function (event, ui) {
                        if (!$('.dashboard_head').hasClass('alreadyDropped')) {
                            if ($(event.target).find('.module[data-moduleid=' + $(ui.draggable).attr('data-moduleid') + ']').length === 0) {
                                $('.dashboard_head').addClass('alreadyDropped');
                                self.loadLink(self.getModule($(ui.draggable).attr('data-moduleid')), 0, $(event.target).attr('data-col').slice(3));
                                $('.filter_resize [data-moduleid=' + $(ui.draggable).attr('data-moduleid') + ']').removeClass('draggable');
                            }
                        }
                    }
                });
                $("body .dashboard_body .col").droppable({
                    accept: $('.add-object[data-module-type="module"]'),
                    drop: function (event, ui) {
                        if (!$('.dashboard_body').hasClass('alreadyDropped')) {
                            if ($(event.target).find('.module[data-moduleid=' + $(ui.draggable).attr('data-moduleid') + ']').length === 0) {
                                // preventing the function to run twice visit:https://recalll.co/ask/v/topic/jQuery-UI-drop-event-of-droppable-widget-firing-twice/555f1e742bd2738c758b6eb7 for more info
                                $('.dashboard_body').addClass('alreadyDropped');
                                self.loadModule(self.getModule($(ui.draggable).attr('data-moduleid')), 0, $(event.target).attr('data-col').slice(3));
                                $('.filter_resize [data-moduleid=' + $(ui.draggable).attr('data-moduleid') + ']').removeClass('draggable');
                            }
                        }
                    }
                });
            }
            $('body').on('click', 'a.removeBox', function RemoveBox() {
                var eventSelf = $(this);
                self.removeModule(eventSelf.parents('.module').attr('data-moduleid'));
                eventSelf.parents('.module').remove();
                $("#dashboard_container .setting input").each(function () {
                    if (eventSelf.parent().parent().attr("class") == $(this).val()) {
                        $(this).next("input").val(0);
                    }
                });
            });

            $('body').on('click', '.dashboard_action_exit', function exitEditModefn() {
                $('.module').each(function () {
                    var title = $(this).find('.boxtitle').val();
                    $(this).find('.moduleTools ul .removeBox').parents('li').remove();
                    $(this).find('.ModuleTitle').replaceWith(
                        '<div class="ModuleTitle"><p>' + title + '</p></div>');
                });
                $('body').removeClass('edit_mode');
                $('a.module').each(function () {
                    $(this).attr('href', $(this).attr('data-href'));
                });
                $(".box2").hide(0);
                // destroy the sortable and draggable and droppable
                $("body .add-object.draggable").draggable('instance') && $("body .add-object.draggable").draggable('destroy');
                $("body .col").droppable('instance') && $("body .col").droppable('destroy');
                $('.dashboard_head .col').sortable('instance') && $('.dashboard_head .col').sortable('destroy');
                $('.dashboard_body .col').sortable('instance') && $('.dashboard_body .col').sortable('destroy');
                // revert the input titles to text
                $(".col").each(function () {
                    $(this).find('.module').each(function () {
                        var title = $(this).find('.ModuleTitle .boxtitle').val();
                        $(this).find('.ModuleTitle').html(title);
                    });
                });
                // sync the user action with action buttons
                $(".dashboard_action_exit,.dashboard_action_saveDashboard,.dashboard_action_addModule").hide();
                $('.dashboard_action_edit').prop('disabled', false);
            });

            $('body').on('click', '.closeModulePicker', function closeModulePickerfn() {
                $(".modulePickerContainer").hide();
                $('.dashboard_action_exit,.dashboard_action_addModule,.dashboard_action_saveDashboard').show();
            });
            $('body').on('click', '.dashboard_action_addModule', function addbox() {
                $(".modulePickerContainer").show();
                $('.dashboard_action_exit,.dashboard_action_addModule,.dashboard_action_saveDashboard').hide();
            });

            $('body').on('click', '.dashboard_action_saveDashboard', function () {
                function saveSetiing() {
                    updatejson();
                    if ($('.jconfirm-content .defaultSettingBox > input[type=checkbox]').prop('checked') === true) {
                        $('.setting input[name=ownerid]').val(0);
                    }
                    if ($('.setting input[type=hidden]:not([name=wordid])').length < 3) {
                        // all boxes have been removed form DOM --> NOT ALLOWED
                        $('.setting').submit();
                    } else if ($('.setting input[type=hidden]:not([name=wordid])').length > 3) {
                        var err = false;
                        $('.ModuleTitle').each(function (index) {
                            if ($(this).find('.boxtitle').val() === '' || /^\s*$/.test($(this).find('.boxtitle').val())) {
                                err = true;
                                $.dialog({
                                    backgroundDismiss: true,
                                    boxWidth: '350px',
                                    title: false,
                                    content: 'نام ماژول نباید خالی باشد',
                                    rtl: true,
                                    useBootstrap: false,
                                    type: 'red'
                                });
                            } else {
                                if (index + 1 === $('.ModuleTitle').length && !err) {
                                    $('.setting').submit();
                                }
                            }
                        });
                    }
                }
                if (self.config.multiComp == 'true') {
                    $.confirm({
                        backgroundDismiss: true,
                        boxWidth: '350px',
                        title: false,
                        content: '<div class="defaultSettingBox"><input type="checkbox" id="Select_All"><label for="Select_All">ثبت تنظیمات در همه شرکت ها</label></div>',
                        rtl: true,
                        useBootstrap: false,
                        type: 'default',
                        buttons: {
                            doRegularSave: {
                                text: '<span class="btn_icon"><i class="fa fa-check"></i></span> <span class="btn_title">ثبت</span>',
                                btnClass: 'regBtn',
                                action: function () {
                                    saveSetiing();
                                }
                            },
                            cancel: {
                                text: 'لغو',
                                action: function () {
                                    return true;
                                }
                            }
                        }
                    });
                } else {
                    saveSetiing();
                }
            });

            $('body').on('click', '.dashboard_action_edit', function dashboardEditModefn() {
                if (!$("body").hasClass('edit_mode')) {
                    if ($(".module .removeBox").length === 0) {
                        $('.module').each(function () {
                            if ($(this).find('.moduleTools').length == 0) {
                                $(this).prepend('<div class="moduleTools"><ul><li><a class="removeBox"><img src="/images/cancel.png" /></a><span class="mini-tools-tooltip">حذف</span></li></ul></div>');
                            } else {
                                if ($(this).find('.moduleTools ul').length == 0) {
                                    $(this).find('.moduleTools').prepend('<ul><li><a class="removeBox"><img src="/images/cancel.png" /></a><span class="mini-tools-tooltip">حذف</span></li></ul>');
                                } else {
                                    $(this).find('.moduleTools ul').prepend('<li><a class="removeBox"><img src="/images/cancel.png" /></a><span class="mini-tools-tooltip">حذف</span></li>');
                                }
                            }
                        });
                    }
                    $('a.module').each(function () {
                        $(this).attr('href', 'javascript:void(0)');
                    });
                    $("body").addClass('edit_mode');

                    $(".dashboard_action_exit,.dashboard_action_saveDashboard,.dashboard_action_addModule").show();
                    $('.dashboard_action_edit').prop('disabled', true);
                    var sortableHandle_start = function sortableHandle_startfn(event) {
                        var handleMove = function (event) {
                            var scrollSpeed = 5;
                            var scrollUp = function (scrollSpeed) {
                                $(window).scrollTop($(window).scrollTop() - scrollSpeed);
                            }
                            var scrollDown = function (scrollSpeed) {
                                $(window).scrollTop($(window).scrollTop() + scrollSpeed);
                            }
                            if (event.touches[0].clientY < 50) {
                                scrollUp(scrollSpeed);
                            }
                            if (event.touches[0].clientY > ($(window).height() - 50) && event.touches[0].clientY < $(window).height()) {
                                scrollDown(scrollSpeed);

                            }
                        };
                        var collection = document.getElementsByClassName('module');
                        for (var i = 0; i < collection.length; i++) {
                            collection[i].addEventListener('touchmove', handleMove);
                        }
                    };
                    $('.dashboard_head .col').sortable({
                        revert: true,
                        helper: 'clone',
                        cursor: 'move',
                        connectWith: ".dashboard_head .col",
                        placeholder: 'modulePreloaderMini',
                        create: sortableHandle_start
                    });
                    $('.dashboard_body .col').sortable({
                        revert: true,
                        helper: 'clone',
                        cursor: 'move',
                        connectWith: ".dashboard_body .col",
                        placeholder: 'modulePreloader',
                        create: sortableHandle_start
                    });

                    $("body .col").each(function (j) {
                        $(this).children(".module").each(function (i) {
                            var texts;
                            texts = $(this).find(".ModuleTitle").text().trim();
                            $(this).find(".ModuleTitle").replaceWith(
                                '<div class="ModuleTitle"><input type="text" class="boxtitle" value="' +
                                texts + '"></div>');
                        });
                    });
                    drag();
                }
            });

        },
        bindDesktopEvents: function bindEventsfn() {
            var self = this;

            function updatejson() {
                var colLink = $(".dashboard_head .col"),
                    colModule = $(".dashboard_body .col");
                colLink.each(function (colIndex) {
                    $(this).find(".module:not(.ui-sortable-helper)").each(function (ordIndex) {
                        var _mod = $(this);
                        $(this).find('input[type=hidden]:not([name=wordid])').each(function () {
                            switch ($(this).attr('name').split('.')[$(this).attr('name').split('.').length - 1]) {
                                case 'col':
                                    $(this).val(colIndex + 1);
                                    break;
                                case 'ord':
                                    $(this).val(ordIndex + 1);
                                    break;
                                default:
                                    console.log('def case');
                                    break;
                            }
                        });
                    });
                });
                colModule.each(function (colIndex) {
                    $(this).find(".module:not(.ui-sortable-helper)").each(function (ordIndex) {
                        var _mod = $(this);
                        $(this).find('input[type=hidden]:not([name=wordid])').each(function () {
                            switch ($(this).attr('name').split('.')[$(this).attr('name').split('.').length - 1]) {
                                case 'title':
                                    var title = _mod.find('.ModuleTitle .boxtitle').val();
                                    $(this).val(title);
                                    break;
                                case 'col':
                                    $(this).val(colIndex + 1);
                                    break;
                                case 'ord':
                                    $(this).val(ordIndex + 1);
                                    break;
                                default:
                                    console.log('def case');
                                    break;
                            }
                        });
                    });
                });
            }

            function drag() {
                $("body .dashboard_head_module_picker .add-object.draggable").draggable({
                    revert: "invalid",
                    helper: "clone",
                    zIndex: 10000,
                    drag: function (event, ui) {
                        $(".ui-draggable-dragging").addClass('active-content');
                    }
                });
                $("body .dashboard_body_module_picker .add-object.draggable").draggable({
                    revert: "invalid",
                    helper: "clone",
                    zIndex: 10000,
                    drag: function (event, ui) {
                        $(".ui-draggable-dragging").addClass('active-content');
                    }
                });
                $("body .dashboard_head .col").droppable({
                    accept: $('.add-object[data-module-type="link"]'),
                    drop: function (event, ui) {
                        if (!$('.dashboard_head').hasClass('alreadyDropped')) {
                            if ($(event.target).find('.module[data-moduleid=' + $(ui.draggable).attr('data-moduleid') + ']').length === 0) {
                                $('.dashboard_head').addClass('alreadyDropped');
                                self.loadLink(self.getModule($(ui.draggable).attr('data-moduleid')), 0, $(event.target).attr('data-col').slice(3));
                                $('.filter_resize [data-moduleid=' + $(ui.draggable).attr('data-moduleid') + ']').removeClass('draggable');
                            }
                        }
                    }
                });
                $("body .dashboard_body .col").droppable({
                    accept: $('.add-object[data-module-type="module"]'),
                    drop: function (event, ui) {
                        if (!$('.dashboard_body').hasClass('alreadyDropped')) {
                            if ($(event.target).find('.module[data-moduleid=' + $(ui.draggable).attr('data-moduleid') + ']').length === 0) {
                                // preventing the function to run twice visit:https://recalll.co/ask/v/topic/jQuery-UI-drop-event-of-droppable-widget-firing-twice/555f1e742bd2738c758b6eb7 for more info
                                $('.dashboard_body').addClass('alreadyDropped');
                                self.loadModule(self.getModule($(ui.draggable).attr('data-moduleid')), 0, $(event.target).attr('data-col').slice(3));
                                $('.filter_resize [data-moduleid=' + $(ui.draggable).attr('data-moduleid') + ']').removeClass('draggable');
                            }
                        }
                    }
                });
            }
            $('body').on('click', 'a.removeBox', function RemoveBox() {
                var eventSelf = $(this);
                self.removeModule(eventSelf.parents('.module').attr('data-moduleid'));
                eventSelf.parents('.module').remove();
                $("#dashboard_container .setting input").each(function () {
                    if (eventSelf.parent().parent().attr("class") == $(this).val()) {
                        $(this).next("input").val(0);
                    }
                });
            });

            $('body').on('click', '.dashboard_action_exit', function exitEditModefn() {
                $('.module').each(function () {
                    var title = $(this).find('.boxtitle').val();
                    $(this).find('.moduleTools ul .removeBox').parents('li').remove();
                    $(this).find('.ModuleTitle').replaceWith(
                        '<div class="ModuleTitle"><p>' + title + '</p></div>');
                });
                $('body').removeClass('edit_mode');
                $('a.module').each(function () {
                    $(this).attr('href', $(this).attr('data-href'));
                });
                $(".box2").hide(0);
                // destroy the sortable and draggable and droppable
                $("body .add-object.draggable").draggable('instance') && $("body .add-object.draggable").draggable('destroy');
                $("body .col").droppable('instance') && $("body .col").droppable('destroy');
                $('.dashboard_head .col').sortable('instance') && $('.dashboard_head .col').sortable('destroy');
                $('.dashboard_body .col').sortable('instance') && $('.dashboard_body .col').sortable('destroy');
                // revert the input titles to text
                $(".col").each(function () {
                    $(this).find('.module').each(function () {
                        var title = $(this).find('.ModuleTitle .boxtitle').val();
                        $(this).find('.ModuleTitle').html(title);
                    });
                });
                // sync the user action with action buttons
                $(".dashboard_action_exit,.dashboard_action_saveDashboard,.dashboard_action_addModule").hide();
                $('.dashboard_action_edit').prop('disabled', false);
            });

            $('body').on('click', '.dashboard_action_addModule', function addbox() {
                $(".box2").show();
            });

            $('body').on('click', '.dashboard_action_saveDashboard', function () {
                function saveSetiing() {
                    updatejson();
                    if ($('.jconfirm-content .defaultSettingBox > input[type=checkbox]').prop('checked') === true) {
                        $('.setting input[name=ownerid]').val(0);
                    }
                    if ($('.setting input[type=hidden]:not([name=wordid])').length < 3) {
                        // all boxes have been removed form DOM --> NOT ALLOWED
                        $('.setting').submit();
                    } else if ($('.setting input[type=hidden]:not([name=wordid])').length > 3) {
                        var err = false;
                        $('.ModuleTitle').each(function (index) {
                            if ($(this).find('.boxtitle').val() === '' || /^\s*$/.test($(this).find('.boxtitle').val())) {
                                err = true;
                                $.dialog({
                                    backgroundDismiss: true,
                                    boxWidth: '350px',
                                    title: false,
                                    content: 'نام ماژول نباید خالی باشد',
                                    rtl: true,
                                    useBootstrap: false,
                                    type: 'red'
                                });
                            } else {
                                if (index + 1 === $('.ModuleTitle').length && !err) {
                                    $('.setting').submit();
                                }
                            }
                        });
                    }
                }
                if (self.config.multiComp == 'true') {
                    $.confirm({
                        backgroundDismiss: true,
                        boxWidth: '350px',
                        title: false,
                        content: '<div class="defaultSettingBox"><input type="checkbox" id="Select_All"><label for="Select_All">ثبت تنظیمات در همه شرکت ها</label></div>',
                        rtl: true,
                        useBootstrap: false,
                        type: 'default',
                        buttons: {
                            doRegularSave: {
                                text: '<span class="btn_icon"><i class="fa fa-check"></i></span> <span class="btn_title">ثبت</span>',
                                btnClass: 'regBtn',
                                action: function () {
                                    saveSetiing();
                                }
                            },
                            cancel: {
                                text: 'لغو',
                                action: function () {
                                    return true;
                                }
                            }
                        }
                    });
                } else {
                    saveSetiing();
                }
            });

            $('body').on('click', '.dashboard_action_edit', function dashboardEditModefn() {
                if (!$("body").hasClass('edit_mode')) {
                    if ($(".module .removeBox").length === 0) {
                        $('.module').each(function () {
                            if ($(this).find('.moduleTools').length == 0) {
                                $(this).prepend('<div class="moduleTools"><ul><li><a class="removeBox"><img src="/images/cancel.png" /></a><span class="mini-tools-tooltip">حذف</span></li></ul></div>');
                            } else {
                                if ($(this).find('.moduleTools ul').length == 0) {
                                    $(this).find('.moduleTools').prepend('<ul><li><a class="removeBox"><img src="/images/cancel.png" /></a><span class="mini-tools-tooltip">حذف</span></li></ul>');
                                } else {
                                    $(this).find('.moduleTools ul').prepend('<li><a class="removeBox"><img src="/images/cancel.png" /></a><span class="mini-tools-tooltip">حذف</span></li>');
                                }
                            }
                        });
                    }
                    $('a.module').each(function () {
                        $(this).attr('href', 'javascript:void(0)');
                    });
                    $("body").addClass('edit_mode');

                    $(".dashboard_action_exit,.dashboard_action_saveDashboard,.dashboard_action_addModule").show();
                    $('.dashboard_action_edit').prop('disabled', true);

                    $('.dashboard_head .col').sortable({
                        revert: true,
                        helper: 'clone',
                        cursor: 'move',
                        connectWith: ".dashboard_head .col",
                        placeholder: 'modulePreloaderMini'
                    });
                    $('.dashboard_body .col').sortable({
                        revert: true,
                        helper: 'clone',
                        cursor: 'move',
                        connectWith: ".dashboard_body .col",
                        placeholder: 'modulePreloader'
                    });

                    $("body .col").each(function (j) {
                        $(this).children(".module").each(function (i) {
                            var texts;
                            texts = $(this).find(".ModuleTitle").text().trim();
                            $(this).find(".ModuleTitle").replaceWith(
                                '<div class="ModuleTitle"><input type="text" class="boxtitle" value="' +
                                texts + '"></div>');
                        });
                    });

                    drag();
                }
            });
        }
    };
    window.language = function language(lid) {
        switch (lid) {
            case 1:
                return {
                    image: '/images/language/iranflag.png',
                    title: 'فارسی',
                    originaltitle: 'فارسی'
                };
            case 2:
                return {
                    image: '/images/language/englishflag.png',
                    title: 'انگلیسی',
                    originaltitle: 'English'
                };
            case 3:
                return {
                    image: '/images/language/unitedarabemiratesflag.png',
                    title: 'عربی',
                    originaltitle: 'العربية'
                };
            case 4:
                return {
                    image: '/images/language/franceflag.png',
                    title: 'فرانسوی',
                    originaltitle: 'Français'
                };
            case 5:
                return {
                    image: '/images/language/germanyflag.png',
                    title: 'آلمانی',
                    originaltitle: 'Deutsch'
                };
            case 6:
                return {
                    image: '/images/language/spainflag.png',
                    title: 'اسپانیایی',
                    originaltitle: 'Español'
                };
            case 7:
                return {
                    image: '/images/language/russiaflag.png',
                    title: 'روسی',
                    originaltitle: 'Русский'
                };
            case 8:
                return {
                    image: '/images/language/chinaflag.png',
                    title: 'چینی',
                    originaltitle: '中文'
                };
            case 9:
                return {
                    image: '/images/language/turkeyflag.png',
                    title: 'ترکی',
                    originaltitle: 'Turkish'
                };
            case 10:
                return {
                    image: '/images/language/georgiaflag.png',
                    title: 'گرجی',
                    originaltitle: 'ქართული ენა'
                };
            case 11:
                return {
                    image: '/images/language/armeniaflag.png',
                    title: 'ارمنی',
                    originaltitle: 'Հայերեն'
                };
            case 12:
                return {
                    image: '/images/language/azerbaijanflag.png',
                    title: 'آذربایجانی',
                    originaltitle: 'Azərbaycan'
                };
            case 13:
                return {
                    image: '/images/language/indonesiaflag.png',
                    title: 'اندونزیایی',
                    originaltitle: 'Indonesia'
                };
            case 14:
                return {
                    image: '/images/language/thailandflag.png',
                    title: 'تایلندی',
                    originaltitle: 'ภาษาไทย'
                };
            case 15:
                return {
                    image: '/images/language/pakistanflag.png',
                    title: 'اردو',
                    originaltitle: 'اُردُو'
                };
            case 16:
                return {
                    image: '/images/language/indiaflag.png',
                    title: 'هندی',
                    originaltitle: 'हिन्दी'
                };
        }

    };
    var PublicAPI = {
        mapper: serviceMapper,
        init: dash.init.bind(dash),
        addModule: dash.addModule.bind(dash),
        refreshChildren: dash.refreshChildren.bind(dash),
        refreshModule: dash.refreshModule.bind(dash),
    }
    return PublicAPI;
})();