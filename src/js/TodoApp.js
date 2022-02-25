export default class Tododb extends EventTarget {
  constructor(base) {
    super()
    this._db = []
    switch (typeof base) {
      case 'string':
        this._db = JSON.parse(base)
        break
      case 'object':
        if (base.hasOwnProperty('length')) this._db = base
        else this.alert({ in: 'Constructor', data: base })
        break
      default:
        this.alert({ in: 'Constructor', data: { base, isType: typeof base } })
    }
  }
  get db() {
    return this._db
  }
  set db(base) {
    try {
      switch (typeof base) {
        case 'string':
          this._db = JSON.parse(base)
          break
        case 'object':
          if (base.hasOwnProperty('length')) this._db = base
          else this.alert({ in: 'insert data in db', data: base })
          break
        default:
          this.alert({
            in: 'insert data in db',
            data: { base, isType: typeof base },
          })
      }
    } catch (err) {
      this.alert({ in: 'insert data in db', data: err })
    } finally {
      this.insertEvent('update', base)
    }
  }
  get lastItem() {
    return this.db[this.db.length - 1]
  }
  set lastItem(a) {
    this.update(this.length - 1 > 0 ? this.length - 1 : 0, a)
  }
  get firtsItem() {
    return this.db[0]
  }
  set firtsItem(a) {
    this.update(0, a)
  }
  get length() {
    return this.db.length
  }
  push(data) {
    this.db.push(data)
    this.insertEvent('update', data)
    return this
  }
  get(id) {
    if (id < 0) id = this.length - (0 - id)
    return this.db.filter((e, i) => i == id)[0]
  }
  del(id) {
    this.db = this.db.filter((e, i) => i != id)
    this.insertEvent('delete', { id })
    return this
  }
  update(id, data) {
    if (typeof data === 'object') {
      this.db = this.db.map((e, i) =>
        i == id
          ? ((a) => {
              Object.keys(data).forEach((f) =>
                a.hasOwnProperty(f) ? (a[f] = data[f]) : a[f],
              )
              return a
            })(e)
          : e,
      )
    } else
      this.alert({
        In: 'updateItem',
        data: { data, type: typeof data },
      })
    return this
  }
  clear() {
    this.db = []
    this.insertEvent('clear', { clear: true })
  }
  insertEvent(type, data) {
    try {
      this.dispatchEvent(new CustomEvent(type, { detail: data }))
      return this
    } catch (err) {
      this.alert({ in: 'insertEvent', data: err })
    }
  }
  on(type, callback) {
    try {
      this.addEventListener(type, callback)
      return this
    } catch (err) {
      this.alert({ in: 'on in TodoApp', data: err })
    }
  }
  alert(a) {
    this.insertEvent('error', { detail: a })
    return this
  }
  init() {
    this.insertEvent('update', { init: true })
  }
}
