(function
  () {
  'use strict';

  const View = window.View;
  const Form = window.Form;
  const User = window.UserModel;
  const Session = window.SessionModel;

  function validate(data) {
    if (2 > data.login.length || data.login.length > 12) {
      return {name: 'user', result: false};
    }
    if (data.password.length < 3) {
      return {name: 'password', result: false};
    }
    return {result: true};
  }


  class LoginView extends View {
    constructor(options = {}) {
      super(options);
      this.class = 'login';
      this._el = document.querySelector('.' + this.class);
      this.hide();
      this.options = options;
      // TODO: дописать реализацию

    }

    setRouter(router) {
      this.router = router;
      this.render(this.options);
    }

    render(options) {
      this._createComponents();
      this._initListeners();
    }

    _initListeners() {
      this._component.on('submit', event => {
        event.preventDefault();
        let formData = this._component.getFormData();
        let dataCheck = validate(formData);
        if (dataCheck) {
          this.user = new User(formData);
          this.session = new Session(this.user, {});
          console.log(this.session);
          this.session.login()
            .then((result) => {
                  if (result) {
                    this.router.go('/menu');
                  } else {
                    alert('не авторизованы');
                  }
                });
        } else {
          console.log('fail registration');
        }
      });


      this._component.addEventListenerOnChild('click', this.class + '_formlogin_controls_signup', event => {
        event.preventDefault();
        this.router.go('/signup');
      });
    }

    _createComponents() {
      this._component = new Form({
        el: this._el,
        data: {
          class: this.class + '_formlogin',
          title: 'Login',
          fields: [
            {name: 'login', placeholder: 'enter username', type: 'text', required: 'true'},
            {name: 'password', placeholder: 'enter password', type: 'password'},
          ],
          controls: [
            {
              text: 'signin',
              attrs: {
                type: 'submit',
                name: 'aaa'
              }
            },
            {
              text: 'signup',
              attrs: {
                type: 'button'
              }
            }
          ]
        }
      });
    }
  }


  // export
  window.LoginView = LoginView;

})();
