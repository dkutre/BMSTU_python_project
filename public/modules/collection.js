(function () {


  class Collection {

    constructor(attrs) {
      this.comparator = attrs.comparator;
      this.models = attrs.models || [];
      this._sort();
    }

    find(model) {
      for (elem in this.models) {
        if (model === elem) {
          return true;
        }
      }
    }

    getById(id) {
      if (id > 0 && id < this.models.length) {
        return this.models[id];
      } else {
        return {error: 'invalid index'}
      }
    }

    disableSort() {
      this.enableSort = false;
    }

    _sort() {
      this.models.sort(this.comparator);
    }

    saveAll() {
      for (let model in this.models) {
        model.save();
      }
    }

    removeAll() {
      for (let model in this.models) {
        model.remove();
      }
    }

    push_back(model, sort = true) {
      this.models.push(model);
      if (sort) {
        this._sort();
      }
      return true;
    }

    pop() {
      return this.models.pop();
    }

    unshift(model, sort) {
      this.models.unshift(model);
      if (sort) {
        this._sort();
      }
      return true;
    }

    shift() {
      return this.models.shift();
    }

    fetch() {

    }


  }


  window.Collection = Collection;
})();