const sanitizeHtml = require("sanitize-html");

function cleanInputFromHTML(input) {
  
  const clean = sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    allowedIframeHostnames: [],
  });
  return clean;
}

module.exports = { cleanInputFromHTML };
