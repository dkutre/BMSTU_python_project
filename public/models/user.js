(function () {
  const Model = window.Model;

  class User extends Model {

    constructor(attributes) {
      super(attributes);
    }

    get url() {
      return this.baseUrl + '/user';
    }

    save() {
      return this.send('POST', this.attributes, this.url)
        .then(data => JSON.parse(data))
        .then(data => {
          this.attributes.id = data.id;
        })
        .catch(error => console.log(error));
    }

    remove() {
      this.send('DELETE', null, '${this.url}/${this.attributes.id}')
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  }

  window.UserModel = User;


}());