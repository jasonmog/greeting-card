function GreetingCard(element, imageUrl, insideImgUrl, audioUrl) {
  var canvas, context, isOpened, frontImg, audio, insideImg;

  function clear() {    
    context.fillStyle = 'gray';
    context.fillRect(0, 0, canvas.width(), canvas.height());
  }

  function drawFront() {
    context.drawImage(frontImg[0], 0, 0);
  }

  function drawInside() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, frontImg[0].width, frontImg[0].height);

    context.drawImage(insideImg[0], (frontImg[0].width - insideImg[0].width) / 2, (frontImg[0].height - insideImg[0].height) / 2);
    
    context.strokeStyle = 'black';
    context.strokeRect(0, 0, frontImg[0].width, frontImg[0].height);
  }

  var onClick = function () {
    if (isOpened)
      return;
    
    isOpened = true;
    
    audio[0].play();

    var startTime = new Date().getTime();
    var duration = 3000;
    var interval = setInterval(function () {
      var elapsed = new Date().getTime() - startTime;
      var progress = elapsed / duration;

      if (progress >= 1) {
        clearInterval(progress);

        return;
      }

      clear();
      drawInside();
      context.save();
      context.setTransform(1, 0, 0, 1 - (progress * 0.9), 0, 0);
      drawFront();
      context.restore();
    }, 1);
  };
  
  canvas = $('<canvas>');
  canvas.attr('width', element.width());
  canvas.attr('height', element.height());
  canvas.css('cursor', 'pointer');
  canvas.on('click', onClick);
  context = canvas[0].getContext("2d");
  element.append(canvas);

  clear();

  frontImg = $('<img>');
  frontImg.attr('src', imageUrl);
  frontImg.on('load', function () {
    drawFront();
  });

  insideImg = $('<img>');
  insideImg.attr('src', insideImgUrl);

  if (audioUrl) {
    audio = $('<audio autoplay>');
    audio.attr('src', audioUrl);
    audio.attr('preload', 'auto');
    element.append(audio);
  }
}
