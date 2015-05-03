function getFirstEleText($eles) {
  if ($eles.length === 0) { return null; }
  if ($eles.length >= 1) {
    return $($eles.get(0)).text();
  }
}

function getPrice() {
  var salePrice = getFirstEleText( $('.was-price') ),
      price;
  if (salePrice) {
    price = salePrice.replace('(', '').replace(')', '');
  } else {
    price = getFirstEleText( $('.product-price') ).trim();
  }
  return price;
}

function getDimensions() {
  var lis = $('.dimensions-wrap li'),
      dimTexts = [];
  if ( lis.length > 0 ) {
    lis.each(function(i, liEle) {
      dimTexts.push( liEle.innerHTML );
    });
  }
  return dimTexts;
}

function getStyleNo() {
  var styleText = $('.col.details>ul').text().trim();
  if (!styleText) { return ''; }
  return styleText.match(/\d+$/)[0];
}

function getDetails() {
  var details = []
  $('.details-description li').each(function(index, ele) {
    return details.push(ele.innerHTML);
  });
  return details;
}

function parseDetails(data) {
  var parsedDetails = [];

  if ( data.details[0].startsWith('By ') ) { // extract designer if present
    data.designer = data.details.shift();
  }

  if ( data.dims.length === 0 ) { // extract dimensions if present
    data.details.forEach(function(det, index) {
      if ( det.startsWith('Regular') || det.startsWith('Petite') ) {
        data.dims.push(det);
      } else {
        parsedDetails.push(det);
      }
    });
    data.details = parsedDetails;
  }
}

function getProductData() {
  var data = {
    name:     $('.product-name span').get(0).innerHTML,
    desc:     getFirstEleText( $('.details[compile="product.moreInfo"]') ),
    color:    $('.product-selected-color').text(),
    designer: getFirstEleText( $('.product-brand a') ),
    price:    getPrice(),
    details:  getDetails(),
    dims:     getDimensions(),
    styleNo:  getStyleNo()
  };
  parseDetails(data);

  return data;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  var imgUrls;
  if (msg === 'generateTemplate') {
    data = getProductData();
    console.log('-- Sending:', data);
    sendResponse(data);
  }

});


console.log('Anthro Listing Template loaded');