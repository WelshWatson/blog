export class ImageSet {
  public constructor (init?: Partial<ImageSet>) {
    Object.assign(this, init);
  }

  public name: string;
  public tileNumber: number;
  public image: HTMLImageElement;
}
