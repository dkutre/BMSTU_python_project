(function () {
  'use strict';

  const Block = window.Block;
  const Button = window.Button;
  const Session = window.SessionModel;

  class MainView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('.mainpage');
      console.log(this._el);
      this.class = 'mainpage';
      this.hide();
      this.render(options);


      // TODO: дописать реализацию

    }

    resume() {
      let session = new window.SessionModel({}, {});
      session.is_authenticated()
        .then(result => {
            if (result) {
              this.show();
              alert('вы авторизованы');
            } else {
              alert('вы не авторизованиы =(');
              this.router.go('/');
            }
          }
        );
    }

    render(options) {
      this._createComponents();
      this._createControls();
      this._initListeners();
    }

    _initListeners() {
      this._component.addEventListenerOnChild('click', 'mainpage__buttons__auth', event => {
        event.preventDefault();
        let session = new window.SessionModel({}, {});
        session.getAuthenticatedId()
          .then(id => {
            console.log(id);
            if (id + 1) {
              alert('вы авторизованы, id = ' + id.toString());
            } else {
              alert('вы не авторизованы');
            }
          })
          .catch(error => console.log(error));
      });


      this._component.addEventListenerOnChild('click', 'mainpage__buttons__exit', event => {
        event.preventDefault();
        let session  = new Session({}, {});
        session.logout();
        this.router.go('/');
      });
    }

    _createControls() {
      let buttons = [
        {
          text: 'проверить аутентификацию',
          attrs: {
            type: 'button',
            name: 'auth'
          }
        },
        {
          text: 'exit',
          attrs: {
            type: 'button',
            name: 'exit'
          }
        }
      ];

      buttons.forEach(buttonInfo => {
        buttonInfo.attrs.class = this._component.getClass() + '__' + buttonInfo.attrs.name;
        let button = new Button(buttonInfo);
        this._component._el.appendChild(button._get());
      });
    };

    _createComponents() {
      this._component = new Block('div', {
        name: 'div',
        attrs: {
          class: this.class + '__buttons'
        }
      });
      this._el.appendChild(this._component._get());
    }

    _init() {
    }
  }

  window.MainView = MainView;

}());