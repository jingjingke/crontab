import Crontab from "./components/Crontab.vue";

let plugin = {};

plugin.install = function(Vue) {
  Vue.component("crontab", Crontab);
};

export default plugin;
