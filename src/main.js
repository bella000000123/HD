import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './axios/api';
import {
  Message,
  Loading,
  Carousel,
  CarouselItem,
  Tabs,
  TabPane,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  Backtop,
  Dialog,
  Input,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select,
  Option,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Upload,
  MessageBox,
  Radio,
  RadioGroup,
  RadioButton
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './common/reset.css';
import backTop from './components/backTop';

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Backtop);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading.directive);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(Upload);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$api = api;
Vue.component('backTop', backTop);

Vue.config.productionTip = false;
// console.log(process.env)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
