import App from '@/App.vue';
import createVueMicroApp from '@microtsm/vue';
import router from './router';

import { WangsVue, ToastService, Tooltip, Focus } from '@fewangsit/wangsvue';
import preset from '@fewangsit/wangsvue-presets/wangsvue';

import '@/assets/css/main.css';
import '@fewangsit/wangsvue/style.css';
import '@fewangsit/wangsvue-presets/wangsvue/style.css';

export const { mount, unmount } = createVueMicroApp(App, {
  el: '#app', // Only used for standalone development
  setupInstance(app) {
    app.use(WangsVue, { preset });

    app.use(router);
    app.use(ToastService);

    app.directive('Tooltip', Tooltip);
    app.directive('focus', Focus);
  },
});
