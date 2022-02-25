import TodoApp from './TodoApp'

export default MyPlugin = {
  api: new TodoApp(),
  install: (app, options) => {
    const api = new TodoApp()
    console.log(app, options, api)
  },
}
