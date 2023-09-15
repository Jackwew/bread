import * as ViewUIPlus from "view-ui-plus";
import "view-ui-plus/dist/styles/viewuiplus.css";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(ViewUIPlus, { transfer: true });
});
