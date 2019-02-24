import { ImageSet } from './models/image-set';

export function loadImages(): ImageSet[] {
  const imageSet = new Array<ImageSet>();
  imageSet.push(new ImageSet({name: 'ground', tileNumber: 1, image: getImg('../../../assets/images/game-images/ground.png')}));
  imageSet.push(new ImageSet({name: 'dirt',   tileNumber: 2, image: getImg('../../../assets/images/game-images/ground_dirt.png')}));
  imageSet.push(new ImageSet({name: 'rock',   tileNumber: 3, image: getImg('../../../assets/images/game-images/rock.png')}));
  imageSet.push(new ImageSet({name: 'cloud',  tileNumber: 4, image: getImg('../../../assets/images/game-images/cloud_1.png')}));
  imageSet.push(new ImageSet({name: 'crate',  tileNumber: 5, image: getImg('../../../assets/images/game-images/crate.png')}));
  imageSet.push(new ImageSet({name: 'bush',   tileNumber: 6, image: getImg('../../../assets/images/game-images/bush.png')}));
  imageSet.push(new ImageSet({name: 'grass',  tileNumber: 7, image: getImg('../../../assets/images/game-images/grass.png')}));

  return imageSet;
}

function getImg(url: string): HTMLImageElement {
  const image = new Image();
  image.src = url;

  return image;
}
