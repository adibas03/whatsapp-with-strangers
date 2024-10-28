import { withTypes } from 'riot';
import erre from 'erre';
import countryCodes from 'country-codes-list';
import * as fs from 'https://deno.land/x/deno@v1.0.4/std/node/fs.ts';
import { Router, Route, route, match, toRegexp } from '@riotjs/route';

const timezonePath = "src/data/time_zone.csv";
let timezonedb;
const timezones = async function () {
    if (!timezonedb) {
        timezonedb = await fs.readFileSync(timezonePath, {
            encoding: "utf8",
            flag: "r",
        }).toString();
    }
    const timezones = timezonedb.split(/\r\n|\n/).reduce((a, t) => {
        const tz = t.split(",");
        if (!tz[0]) {
            return a;
        }
        return {
            ...a,
            [tz[0]]: {
                country: tz[1],
                code: tz[2],
            },
        };
    }, {});
    return timezones;
};
var timezones$1 = await timezones();

var Home = {
  css: `home p span,[is="home"] p span{ font-size: 0.6em; max-width: 75%; margin: 0.6em auto 2em; display: block; } home div p.app,[is="home"] div p.app{ font-size: 0.8em; } home div.history,[is="home"] div.history{ margin-top: 2em; } home select,[is="home"] select{ display: inline; width: 8.8em; margin-right: 0.5em; padding: 0.14em 0.1em; font-size: 0.7em; } home select option,[is="home"] select option{ } home select option span.name,[is="home"] select option span.name{ text-overflow: ellipsis; } home input,[is="home"] input{ margin-top: 0.5em; line-height: 1.17em; width: 10em; font-size: 0.8em; } home div p.app input,[is="home"] div p.app input{ margin: 0.1em 0.2em 0; width: auto; } home p.button,[is="home"] p.button{ margin-top: 1em; } home button,[is="home"] button{ font-size: 0.7em; } home div.history h3,[is="home"] div.history h3{ margin-bottom: 1.2em; } home div.history p,[is="home"] div.history p{ font-size: 0.8em; }`,

  exports: {
    state: {
      codes: countryCodes.customList("countryNameEn", "{countryCallingCode}"),
      countryCodes: countryCodes.customList("countryCode", "{countryNameEn}"),
      activeCountry: "",
      activeNumber: "",
      appPresent: false,
      history: [],
    },

    onMounted() {

      const tz = Intl.DateTimeFormat().resolvedOptions();
      const country = timezones$1[tz.timeZone];
      let activeCountry;

      if(country){
        activeCountry = this.state.codes[this.state.countryCodes[country.country]];
      } else {
        activeCountry = Object.values(this.state.codes)[0];
      }

      this.update({
        activeCountry
      });
    },

    numberOnly(e) {
      return new RegExp(/[0-9]/).test(e.key);
    },

    phoneNumbeChange(p) {
      this.update({
        activeNumber: p.target.value,
      });
    },

    countryChange(e) {
      this.update({
        activeCountry: e.target.value,
      });
    },

    appPresentChange(e) {
      this.update({
        appPresent: !this.state.appPresent,
      });
    },

    chatNow(e) {
      e.preventDefault();

      const api =
        "https://api.whatsapp.com/send/?phone=[n]&text&type=phone_number&app_absent=[a]";
      const n = `${this.state.activeCountry}${this.state.activeNumber.replace(
        this.state.activeNumber.length > 10 ? new RegExp(/^0/) : "",
        ""
      )}`;
      const a = this.state.appPresent ? 0 : 1;
      const apid = api.replace("[n]", n).replace("[a]", a);

      const updateHistory = () => {
        this.update({
          history: this.state.history.concat([
            {
              [n]: apid,
            },
          ]),
        });
      };

      if (this.state.history.length > 0) {
        const findIndex = this.state.history.findIndex((hist) =>
          Object.keys(hist).includes(n)
        );

        if (findIndex > -1) {
          if (Object.values(this.state.history[findIndex]).includes(apid)) ; else {
            const history = this.state.history;
            history.splice(findIndex, 1, {
              [n]: apid,
            });

            this.update({
              history,
            });
          }
        } else {
          updateHistory();
        }
      } else {
        updateHistory();
      }

      window.open(apid, "_blank");
    }
  },

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<h2>Hello <b>Stranger,</b></h2><p>\n    Chat with anyone on Whatsapp without saving the number to your contacts! <br/><span>\n      Ever had to chat with a number on whatsapp just once; perhaps to send some \n      information across or to complete some process? <br/>\n      Now you can, without saving the number as a contact.\n      </span></p><div><form expr5="expr5"></form></div><div class="history"><h3 expr12="expr12"> </h3><p expr13="expr13"></p><p expr15="expr15"></p></div>',
    [
      {
        type: bindingTypes.IF,
        evaluate: _scope => Object.keys(_scope.state.codes).length > 0,
        redundantAttribute: 'expr5',
        selector: '[expr5]',

        template: template(
          '<p><select expr6="expr6" name="countryCode"></select><input expr10="expr10" type="tel" pattern="[0-9]+" minlength="10" maxlength="11" placeholder="xxxxxxxxxx" required/><p class="app"><input expr11="expr11" id="appPresent" type="checkbox"/><label for="appPresent"> \n            Do you have Whatsapp installed?\n          </label></p></p><p class="button"><button> Chat Now </button></p>',
          [
            {
              expressions: [
                {
                  type: expressionTypes.EVENT,
                  name: 'onsubmit',
                  evaluate: _scope => _scope.chatNow
                }
              ]
            },
            {
              type: bindingTypes.IF,
              evaluate: _scope => Object.keys(_scope.state.codes).length > 0,
              redundantAttribute: 'expr6',
              selector: '[expr6]',

              template: template(
                '<option expr7="expr7"></option>',
                [
                  {
                    expressions: [
                      {
                        type: expressionTypes.ATTRIBUTE,
                        isBoolean: false,
                        name: 'value',
                        evaluate: _scope => _scope.state.activeCountry
                      },
                      {
                        type: expressionTypes.EVENT,
                        name: 'onchange',
                        evaluate: _scope => _scope.countryChange
                      }
                    ]
                  },
                  {
                    type: bindingTypes.EACH,
                    getKey: null,
                    condition: null,

                    template: template(
                      '<span expr8="expr8" class="name"> </span><span expr9="expr9"> </span>',
                      [
                        {
                          expressions: [
                            {
                              type: expressionTypes.ATTRIBUTE,
                              isBoolean: false,
                              name: 'value',
                              evaluate: _scope => _scope.cc[1]
                            },
                            {
                              type: expressionTypes.ATTRIBUTE,
                              isBoolean: false,
                              name: null,
                              evaluate: _scope => _scope.state.activeCountry === _scope.cc[1] ? {selected: "selected"} : {}
                            }
                          ]
                        },
                        {
                          redundantAttribute: 'expr8',
                          selector: '[expr8]',

                          expressions: [
                            {
                              type: expressionTypes.TEXT,
                              childNodeIndex: 0,

                              evaluate: _scope => [
                                _scope.cc[0]
                              ].join(
                                ''
                              )
                            }
                          ]
                        },
                        {
                          redundantAttribute: 'expr9',
                          selector: '[expr9]',

                          expressions: [
                            {
                              type: expressionTypes.TEXT,
                              childNodeIndex: 0,

                              evaluate: _scope => [
                                ' ',
                                '(+',
                                _scope.cc[1],
                                ')'
                              ].join(
                                ''
                              )
                            }
                          ]
                        }
                      ]
                    ),

                    redundantAttribute: 'expr7',
                    selector: '[expr7]',
                    itemName: 'cc',
                    indexName: null,

                    evaluate: _scope => Object.entries(
                      _scope.state.codes
                    )
                  }
                ]
              )
            },
            {
              redundantAttribute: 'expr10',
              selector: '[expr10]',

              expressions: [
                {
                  type: expressionTypes.VALUE,
                  evaluate: _scope => _scope.state.activeNumber
                },
                {
                  type: expressionTypes.EVENT,
                  name: 'onkeypress',
                  evaluate: _scope => _scope.numberOnly
                },
                {
                  type: expressionTypes.EVENT,
                  name: 'onchange',
                  evaluate: _scope => _scope.phoneNumbeChange
                }
              ]
            },
            {
              redundantAttribute: 'expr11',
              selector: '[expr11]',

              expressions: [
                {
                  type: expressionTypes.VALUE,
                  evaluate: _scope => _scope.state.appPresent
                },
                {
                  type: expressionTypes.EVENT,
                  name: 'onchange',
                  evaluate: _scope => _scope.appPresentChange
                }
              ]
            }
          ]
        )
      },
      {
        redundantAttribute: 'expr12',
        selector: '[expr12]',

        expressions: [
          {
            type: expressionTypes.TEXT,
            childNodeIndex: 0,

            evaluate: _scope => [
              'Previous Chats (',
              _scope.state.history.length,
              ')'
            ].join(
              ''
            )
          }
        ]
      },
      {
        type: bindingTypes.EACH,
        getKey: null,
        condition: null,

        template: template(
          '<a expr14="expr14" target="_blank"> </a>',
          [
            {
              redundantAttribute: 'expr14',
              selector: '[expr14]',

              expressions: [
                {
                  type: expressionTypes.TEXT,
                  childNodeIndex: 0,

                  evaluate: _scope => [
                    Object.keys(_scope.h)[0]
                  ].join(
                    ''
                  )
                },
                {
                  type: expressionTypes.ATTRIBUTE,
                  isBoolean: false,
                  name: 'href',
                  evaluate: _scope => Object.values(_scope.h)[0]
                },
                {
                  type: expressionTypes.ATTRIBUTE,
                  isBoolean: false,
                  name: 'title',
                  evaluate: _scope => Object.keys(_scope.h)[0]
                }
              ]
            }
          ]
        ),

        redundantAttribute: 'expr13',
        selector: '[expr13]',
        itemName: 'h',
        indexName: null,
        evaluate: _scope => _scope.state.history
      },
      {
        type: bindingTypes.IF,
        evaluate: _scope => _scope.state.history.length === 0,
        redundantAttribute: 'expr15',
        selector: '[expr15]',

        template: template(
          '\n      No history yet.\n    ',
          []
        )
      }
    ]
  ),

  name: 'home'
};

var routes = {
    HOME: {
        path: '/',
        label: 'Home',
        component: 'home'
    },
    ABOUT: {
        path: '/about',
        label: 'What\'s Whatsapp with Stangers?',
        component: 'about'
    }
};

var NotFound = {
  css: null,

  exports: withTypes(
    {
      ...routes
    }
  ),

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<h1>Page not found</h1><p>Opsi, wrong page. Go back to <a expr16="expr16"> </a> :(</p>',
    [
      {
        redundantAttribute: 'expr16',
        selector: '[expr16]',

        expressions: [
          {
            type: expressionTypes.TEXT,
            childNodeIndex: 0,
            evaluate: _scope => _scope.HOME.label
          },
          {
            type: expressionTypes.ATTRIBUTE,
            isBoolean: false,
            name: 'href',
            evaluate: _scope => _scope.HOME.path
          }
        ]
      }
    ]
  ),

  name: 'not-found'
};

var About = {
  css: null,
  exports: null,

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<h1>A <b>modern</b> runtime for <b>JavaScript</b> and <b>TypeScript</b>.</h1><p>Deno is a simple, modern and secure runtime for JavaScript, TypeScript, and WebAssembly that uses V8 and is built in Rust.</p><p><a href="https://deno.land/" target="_blank" rel="nofollow">Read More</a></p>',
    []
  ),

  name: 'about'
};

var app = {
  css: `app,[is="app"]{ --primary-color: rgba(96, 165, 254, 1); --background-color: aliceblue; --light-gray: #f4f4f4; font-family: ui-sans-serif, system-ui, sans-serif; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; margin: 0 auto; padding: 2rem 1rem 1rem; min-height: 100vh; text-align: center; background-color: var(--background-color); } app h1,[is="app"] h1{ font-weight: 300; font-size: 1.6rem; margin-bottom: 1.2rem; } app h1 b,[is="app"] h1 b{ font-weight: bold; } app header,[is="app"] header{ display: flex; justify-content: center; align-items: center; padding: 0.2rem 1rem 0.5rem; margin: 1rem 0; gap: 2rem; } app main,[is="app"] main{ margin: 0 auto; max-width: 600px; min-height: 200px; } app main p,[is="app"] main p{ line-height: 1.6; margin-bottom: 1rem; } app nav,[is="app"] nav{ display: flex; align-items: center; justify-content: center; padding: 0rem 1rem 1.4rem; } app a,[is="app"] a{ color: var(--primary-color); text-decoration: none; } app a:focus,[is="app"] a:focus,app a:active,[is="app"] a:active,app a:hover,[is="app"] a:hover{ opacity: 0.7; } app nav a,[is="app"] nav a{ padding: 0 0.4rem; } app nav a.active,[is="app"] nav a.active{ text-decoration: underline; pointer-events: none; }`,

  exports: withTypes(
    {
      components: {
        Router,
        Route,
        Home,
        About,
        NotFound
      },
      state: {
        currentPath: null,
        showNotFound: false
      },
      // the isServer property is automatically injected by @riotjs/ssr
      onBeforeMount({ initialRoute }) {
        // create a stream on all routes
        this.anyRouteStream = route('(.*)');
        // create a stream to check the riot-router state
        this.routerStateStream = erre();
        // update the state of the not found component depending on the initial route
        this.state.showNotFound = this.isNotFoundVisible(initialRoute);
        // check any route change to understand if the not found site should be displayed
        // and to update the menu link classes
        this.anyRouteStream.on.value(this.onAnyRoute);
        // set the initial current path
        this.state.currentPath = initialRoute;
      },
      onRouterStarted() {
        // broadcast the router started event
        this.routerStateStream.push('started');
      },
      // Needed only for SSR
      onAsyncRendering(resolve) {
        const onReady = () => {
          this.routerStateStream.off.value(onReady);
          resolve();
        };

        // wait the router started event
        this.routerStateStream.on.value(onReady);
      },
      getPages() {
        return Object.values(this.props.routes)
      },
      isNotFoundVisible(path) {
        return !this.getPages().some(p => match(path, toRegexp(p.path)))
      },
      onAnyRoute({ pathname }) {
        // show the not found page if none of the page paths are matched
        this.update({
          currentPath: pathname,
          showNotFound: this.isNotFoundVisible(pathname)
        });
      },
      getLinkClass(path) {

        return this.state?.currentPath === path ? 'active' : null
      },
      onBeforeUnmount() {
        this.routerStateStream.end();
        this.anyRouteStream.end();
      }
    }
  ),

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<router expr0="expr0"></router>',
    [
      {
        type: bindingTypes.TAG,
        getComponent: getComponent,
        evaluate: _scope => 'router',

        slots: [
          {
            id: 'default',
            html: '<header><img width="60" height="60" src="./src/images/phone.png" alt="Phone Logo"/>\n      +\n      <img width="75" height="76" src="./src/images/whatsapp.png" alt="Whatsapp Logo"/></header><nav><a expr1="expr1"></a></nav><not-found expr2="expr2"></not-found><main><route expr3="expr3"></route></main>',

            bindings: [
              {
                type: bindingTypes.EACH,
                getKey: null,
                condition: null,

                template: template(
                  ' ',
                  [
                    {
                      expressions: [
                        {
                          type: expressionTypes.TEXT,
                          childNodeIndex: 0,

                          evaluate: _scope => [
                            _scope.page.label
                          ].join(
                            ''
                          )
                        },
                        {
                          type: expressionTypes.ATTRIBUTE,
                          isBoolean: false,
                          name: 'class',

                          evaluate: _scope => _scope.getLinkClass(
                            _scope.page.path
                          )
                        },
                        {
                          type: expressionTypes.ATTRIBUTE,
                          isBoolean: false,
                          name: 'href',
                          evaluate: _scope => _scope.page.path
                        }
                      ]
                    }
                  ]
                ),

                redundantAttribute: 'expr1',
                selector: '[expr1]',
                itemName: 'page',
                indexName: null,
                evaluate: _scope => _scope.getPages()
              },
              {
                type: bindingTypes.IF,
                evaluate: _scope => _scope.state.showNotFound,
                redundantAttribute: 'expr2',
                selector: '[expr2]',

                template: template(
                  null,
                  [
                    {
                      type: bindingTypes.TAG,
                      getComponent: getComponent,
                      evaluate: _scope => 'not-found',
                      slots: [],
                      attributes: []
                    }
                  ]
                )
              },
              {
                type: bindingTypes.EACH,
                getKey: null,
                condition: null,

                template: template(
                  null,
                  [
                    {
                      type: bindingTypes.TAG,
                      getComponent: getComponent,
                      evaluate: _scope => 'route',

                      slots: [
                        {
                          id: 'default',
                          html: '<main expr4="expr4"></main>',

                          bindings: [
                            {
                              type: bindingTypes.TAG,
                              getComponent: getComponent,
                              evaluate: _scope => _scope.page.component,
                              slots: [],
                              attributes: [],
                              redundantAttribute: 'expr4',
                              selector: '[expr4]'
                            }
                          ]
                        }
                      ],

                      attributes: [
                        {
                          type: expressionTypes.ATTRIBUTE,
                          isBoolean: false,
                          name: 'path',
                          evaluate: _scope => _scope.page.path
                        }
                      ]
                    }
                  ]
                ),

                redundantAttribute: 'expr3',
                selector: '[expr3]',
                itemName: 'page',
                indexName: null,
                evaluate: _scope => _scope.getPages()
              }
            ]
          }
        ],

        attributes: [
          {
            type: expressionTypes.EVENT,
            name: 'on-started',
            evaluate: _scope => _scope.onRouterStarted
          },
          {
            type: expressionTypes.ATTRIBUTE,
            isBoolean: false,
            name: 'base',
            evaluate: _scope => _scope.props.base
          },
          {
            type: expressionTypes.ATTRIBUTE,
            isBoolean: false,
            name: 'initial-route',
            evaluate: _scope => _scope.props.initialRoute
          }
        ],

        redundantAttribute: 'expr0',
        selector: '[expr0]'
      }
    ]
  ),

  name: 'app'
};

export { app as default };
