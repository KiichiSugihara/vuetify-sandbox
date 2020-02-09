import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primeColor: colors.indigo.base, // #3F51B5
        backGroundColor: colors.grey.lighten4, //#F5F5F5
        white: colors.white //#ffffff
      }
    }
  }
});
