function getImgData(img) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = 120;
  canvas.height = 40;
  context.drawImage(img, 0, 0);
  return context.getImageData(0, 0, 120, 40);
}

function ocr(imgData) {
  var valstr = OCRAD(imgData);
  valstr = valstr.replace(/[zZ]/g, '2');
  valstr = valstr.replace(/[sS]/g, '6');
  valstr = valstr.replace(/[oO]/g, '0');
  valstr = valstr.replace(/B/g, '8');
  valstr = valstr.replace(/_/g, '4');
  valstr = valstr.replace(/l/g, '1');
  valstr = valstr.replace(/g/g, '9');
  return valstr;
}

$('.box-doms').bind("DOMSubtreeModified", function() {
  var $boxDoms = $(this);
  if ($boxDoms.find('.count-down').text() == "00:00") {
    $boxDoms.find('.treasure-box').click();
    setTimeout(function() {
      var valstr = ocr(getImgData($('.captcha-img')[0]));
      avalon.vmodels.treasureCtrl.captcha.userInput = eval(valstr);
      console.log("submit:", eval(valstr), $('.captcha-img')[0]);
      $('.get-award-btn').click();
    }, 5000);
  }
});

