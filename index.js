function ProgressBar(dom) {
  this.dom = dom;
  this.p = 0.0; // 0.0 - 1.0
}

ProgressBar.prototype.setProgress = function(p) {
  this.p = p;
  this._applyProgressStyle(p);
}

ProgressBar.prototype._toPercentage = function(p) {
  return (p*100).toFixed(2) + '%';
}

ProgressBar.prototype._applyProgressStyle = function(p) {
  var percentage = this._toPercentage(p);
  this.dom.css('background', 'linear-gradient(90deg, green ' + percentage + ', transparent ' + percentage + ')');
}

function upload(blob, pb, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload', true);
  xhr.onload = function(e) {
    console.log('[upload] onload');
    cb(xhr);
  }

  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      pb.setProgress(e.loaded / e.total);
    }
  }

  xhr.send(blob);
}

$(function() {
  console.log('[index] hello');

  var pb = new ProgressBar($('.progress-bar'));

  $('#submit').on('click', function() {
    console.log('[index] onSubmit');
    var file = $("#file")[0];
    upload(file.files[0], pb, function() {
      console.log('uploaded');
    });
  });
});
