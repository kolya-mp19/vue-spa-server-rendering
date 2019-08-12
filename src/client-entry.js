import { app } from './app'

app.$mount('#app')

// для корректного отображения
if (module.hot) {
  module.hot.accept()
}
