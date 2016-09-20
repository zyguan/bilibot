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
  valstr = valstr.replace(/[Il]/g, '1');
  valstr = valstr.replace(/B/g, '8');
  valstr = valstr.replace(/_/g, '4');
  valstr = valstr.replace(/g/g, '9');
  return valstr;
}


function tryGetAward(ctrl, timer, cnt) {
  if (cnt > 0 && timer.text() == "00:00" &&
      timer.parents('.treasure-box-ctnr').css('display') != "none") {
    ctrl.captcha.refresh();
    $('.acquiring-panel .captcha-img').one("load", function() {
      try {
        var val = eval(ocr(getImgData(this)));
        console.log("tryGetAward("+cnt+"):", val, this);
        ctrl.captcha.userInput = val;
        ctrl.getAward();
      } catch (err) {
        console.error("GetAward:", err);
      } finally {
        setTimeout(function () {
          tryGetAward(ctrl, timer, cnt-1);
        }, 1500);
      }
    });
  }
}

$('.box-doms').bind("DOMSubtreeModified", function() {
  var $boxDoms = $(this);
  var $timer = $boxDoms.find('.count-down');
  if ($timer.text() == "00:00") {
    tryGetAward(avalon.vmodels.treasureCtrl, $timer, 5);
  }
});

// $('.acquiring-panel .captcha-img').on("load", function() {
//   var val = eval(ocr(getImgData(this)));
//   console.log("load captcha", val, this);
// });
