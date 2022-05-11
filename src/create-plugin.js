const { createPlugin } = require('@agogpixel/pgmmv-plugin-support');

const localizations = require('./locale');

/**
 *
 * @returns
 */
module.exports = function () {
  /**
   * Contains methods and properties from the base plugin that are meant for internal use
   * in our plugin.
   */
  const internalApi = {};

  /**
   * Create our plugin instance - we provide our plugin localization data and our internal
   * object from above
   */
  const self = createPlugin({ localizations }, internalApi);

  // TODO: override examples on our public and internal plugin objects...

  return self;
};
