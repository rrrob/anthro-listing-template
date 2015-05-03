
function renderTemplate(data) {
  var text = JSON.stringify(data);
  // console.log(Handlebars.templates);
  var out = Handlebars.templates.listing(data); // precompiled handlebars template
  // console.log(out);
  $('#template').get(0).innerHTML = out;

}

function init() {
  var data = chrome.extension.getBackgroundPage().pageData;
  console.log(' ### POPUP DATA: ', data);
  if (data)
    renderTemplate(data);
}

window.onload = init;
