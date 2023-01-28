import { defineConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
export const config = defineConfig({
  /* options */
  presets: [presetAutoprefix(), presetTailwind(/* options */)],
});
