import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { ImageSet } from './models/image-set';
import { DefaultMap } from './maps/default-map';
import { loadImages } from './tile-loader';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('graphicsCanvas') graphicsCanvas: ElementRef;

  globalListenFunc: Function;
  canvasWidth = 960;
  canvasHeight = 474;

  private canvas: CanvasRenderingContext2D;
  private moveSpeed = 10;
  private images: ImageSet[];
  private tilesHigh = 10;
  private tileWidth = 50;
  private tileHeight = 50;
  private tileOffsetX = 0;
  private pixelsToRenderOutsideView = 50;

  constructor(private renderer: Renderer2) {
    this.images = loadImages();
  }

  ngAfterViewInit(): void {
    this.canvas = (<HTMLCanvasElement>this.graphicsCanvas.nativeElement).getContext('2d');
    this.animate();
    this.listenForKeyboardInput();
  }

  ngOnInit() {
  }

  private animate() {
    this.renderBlueBackground();
    this.renderTilemap();

    requestAnimationFrame(this.animate.bind(this));
  }

  private renderBlueBackground(): void {
    this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canvas.fillStyle = '#87ceeb';
    this.canvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private renderTilemap(): void {
    for (let x = 0; x < DefaultMap()[0].length; x++) {
      for (let y = 0; y < this.tilesHigh; y++) {
        const tilePositionX = x * this.tileWidth;
        const tilePositionY = y * this.tileHeight;

        if (this.viewInsideWindow(tilePositionX, tilePositionY)) {
          const tile = this.getTile(y, x);

          if (tile) {
            this.canvas.drawImage(tile, tilePositionX + this.tileOffsetX, tilePositionY, 50, 50);
          }
        }
      }
    }
  }

  private viewInsideWindow(tilePositionX: number, tilePositionY: number): boolean {
    return tilePositionX + this.tileOffsetX + this.pixelsToRenderOutsideView > 0 &&
      this.canvasWidth + this.pixelsToRenderOutsideView > tilePositionX + this.tileOffsetX &&
      tilePositionY + this.pixelsToRenderOutsideView > 0 &&
      this.canvasHeight + this.pixelsToRenderOutsideView > tilePositionY;
  }

  private listenForKeyboardInput() {
    this.globalListenFunc = this.renderer.listen('document', 'keydown', e => {
      switch ((e.key as string).toLocaleLowerCase()) {
        case 'd':
          this.tileOffsetX -= this.moveSpeed;
          break;
        case 'a':
          this.tileOffsetX += this.moveSpeed;
          break;
      }
    });
  }

  private getTile(x: number, y: number): HTMLImageElement {
    if (DefaultMap().length > x && DefaultMap()[0].length > y) {
      const tile = this.images.find(t => t.tileNumber === DefaultMap()[x][y]);
      if (tile) {
        return tile.image;
      }
      return null;
    }
    return null;
  }
}
