export function loadImages(): any {
  const myObject = {};

  myObject[1] = getImg('../../../assets/images/game-images/ground.png');
  myObject[2] = getImg('../../../assets/images/game-images/ground_dirt.png');
  myObject[3] = getImg('../../../assets/images/game-images/rock.png');
  myObject[4] = getImg('../../../assets/images/game-images/cloud_1.png');
  myObject[5] = getImg('../../../assets/images/game-images/crate.png');
  myObject[6] = getImg('../../../assets/images/game-images/bush.png');
  myObject[7] = getImg('../../../assets/images/game-images/grass.png');

  return myObject;
}

function getImg(url: string): HTMLImageElement {
  const image = new Image();
  image.src = url;

  return image;
}
