import crontab from './components/Crontab.vue';
export default crontab;
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(crontab.name, crontab);
}
