import { model } from "./model.js"
import { AppRenderer } from "./appRenderer.js"

(new AppRenderer(".app", "max-w-[1000px] w-full mx-auto relative")).renderApp(model)