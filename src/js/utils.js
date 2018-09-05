import $ from 'jquery';

/**
 * Store and cache re-usable DOM elements.
 *
 * @since 1.0.0
 *
 * @var {Object}
 */
export const dom = {
  $window: $(window),
  $document: $(document),
  $body: $('body')
};

/**
 * Checks if website is being loaded from a mobile
 * device.
 *
 * @since 1.0.0
 *
 * @param  {Boolean} viewportCheck Whether to let viewport size help determine.
 * @return {Boolean} Whether we're on a mobile device.
 */
export function isMobile(viewportCheck) {
  const { $body } = dom;

  if ($body.hasClass('mobile')) {
    return true;
  }

  var agentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (agentCheck) {
    return true;
  }

  if (viewportCheck) {
    var $window = $(window);

    if ($window.width() < 992 || $window.height() < 500) {
      return true;
    }
  }

  return false;
}

/**
 * Generate a unqiue ID.
 *
 * @since 1.1.0
 *
 * @param {string} prefix Optional. String to prefix ID with.
 * @return {string} Final HTML ID.
 */
export function uniqueID(prefix) {
  const max = 1000000;

  do {
    prefix += ~~(Math.random() * max); // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix));

  return prefix;
}
