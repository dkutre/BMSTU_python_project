(function () {
  'use strict';


  const Block = window.Block;

  class Input extends Block {
    constructor(options) {
      super('div', options);
      this.template = window.fest['input.tmpl'];
      this.render();
    }


    render() {
      this._el.innerHTML = this.template(this._options);
    }




  }



  window.Input = Input;
})();