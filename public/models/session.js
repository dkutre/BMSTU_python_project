(function () {

  const Model = window.Model;


  class Session extends Model {

    constructor(user, attributes) {
      super(attributes);
      this.user = user;
    }


    get url() {
      return (this.baseUrl + '/session');
    }

    logout() {
      return this.send('DELETE', {}, this.url)
        .then(res => console.log(res))
        .catch(res => console.log(res));
    }

    getAuthenticatedId() {
      return this.send('GET', null, this.url)
        .then(response => JSON.parse(response))
        .then(response => {
          return response.userId;
        });
    }

    is_authenticated() {
      return this.send('GET', null, this.url)
        .then(res => JSON.parse(res))
        .then(id => {
          if (id) {
            this.id = id;
            return true;
          } else {
            return false;
          }
        })
        .catch(error => {
          console.log(error);
          return false;
        });
    }

    login() {
      console.log('login__');
      return this.send('POST', this.user.attributes, this.url)
        .then(data => {
          console.log(data);
          return JSON.parse(data);
        })
        .then(data => {
          this.user.attributes.id = data.userId;
          return true;
        })
        .catch(response => console.log(response));
    }

    /* TODO сделать фунцкию создания пользователя, редактирования, удаления*/
  }


  window.SessionModel = Session;
})();
