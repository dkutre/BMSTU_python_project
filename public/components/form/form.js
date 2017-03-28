(function () {
  'use strict';

  // import
  const Block = window.Block;
  const Button = window.Button;
  const Input = window.Input;

  class Form extends Block {

    /**
     * Конструктор класса Form
     */
    constructor(options = {data: {}}) {
      super('form', options);

      this.template = window.fest['form.tmpl'];
      this.data = options.data;
      this._el = options.el;
      this.render();
    }

    /**
     * Обновляем HTML
     */
    render() {
      this._updateHtml();
      this._installControls();
      this._installInputs();
    }

    /**
     * Обнуляем форму
     */
    reset() {
      this._el.querySelector('form').reset();
    }

    /**
     * Обновить html компонента
     */
    _updateHtml() {
      this._el.innerHTML = this.template(this._options.data);
    }

    _installInputs() {
      let {fields = []} = this.data;
      fields.forEach(field => {
        field.class = this.data.class + '_inputs_' + field.name;
        let input = new Input(field);
        this._el.querySelector('.' + this.data.class + '_inputs').appendChild(input._get());
      });
    }

    /**
     * Вешает событие на вложенный блок/элемент в форме
     */

    addEventListenerOnChild(event, childClass, handler) {
      this._el.querySelector('.' + childClass).addEventListener(event, handler);
    }

    /**
     * Вставить управляющие элементы в форму
     */
    _installControls() {
      let {controls = []} = this.data;
      controls.forEach(data => {
        data.attrs.class = this.data.class + '_controls_' + data.class_info;
        let control = new Button(data);
        console.log(control);
        this._el.querySelector("." + this.data.class + '_controls').appendChild(control._get());
      });
    }

    /**
     * Взять данные формы
     * @return {object}
     */
    getFormData() {
      let form = this._el.querySelector('form');
      let elements = form.elements;
      let fields = {};

      Object.keys(elements).forEach(element => {
        let name = elements[element].name;
        let value = elements[element].value;

        if (!name) {
          return;
        }

        fields[name] = value;
      });

      return fields;
    }

  }

  //export
  window.Form = Form;
})();