import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
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
  private moveSpeed = 7;
  private images = {};
  private tilesHigh = 10;
  private tileWidth = 50;
  private tileHeight = 50;
  private tileOffsetX = 0;
  private pixelsToRenderOutsideView = 50;
  private lastCalledTime = performance.now();
  private truncatedTimer = 0;
  private fps = '0';
  private moveRight = false;
  private moveLeft = false;
  private jump = false;
  private tileIndex: number[][];

  constructor(private renderer: Renderer2) {
    this.images = loadImages();
    this.tileIndex = DefaultMap();
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
    this.canvas.strokeStyle = 'Black';
    this.canvas.strokeText(this.fps.toString(), 10, 10);
    this.moveCharacter();
    requestAnimationFrame(this.animate.bind(this));
    this.requestAnimFrame();
  }

  private moveCharacter(): void {
    if (this.moveRight) {
        this.tileOffsetX -= this.moveSpeed;
        return;
    }
    if (this.moveLeft) {
      this.tileOffsetX += this.moveSpeed;
      return;
    }
  }

  private renderBlueBackground(): void {
    this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canvas.fillStyle = '#87ceeb';
    this.canvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private renderTilemap(): void {
    for (let x = 0; x < this.tileIndex[0].length; x++) {
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
      switch ((e.code as string)) {
        case 'KeyD':
          this.moveRight = true;
          break;
        case 'KeyA':
          this.moveLeft = true;
          break;
        case 'Space':
          this.jump = true;
          break;
      }
    });

    this.globalListenFunc = this.renderer.listen('document', 'keyup', e => {
      switch ((e.code as string)) {
        case 'KeyD':
          this.moveRight = false;
          break;
        case 'KeyA':
          this.moveLeft = false;
          break;
      }
    });
  }

  private getTile(x: number, y: number): HTMLImageElement {
    if (this.tileIndex.length > x && this.tileIndex[0].length > y) {
      const tile = this.images[this.tileIndex[x][y]];
      if (tile) {
        return tile;
      }
      return null;
    }
    return null;
  }

  requestAnimFrame() {
    if (!this.lastCalledTime) {
      this.lastCalledTime = performance.now();
      this.fps = '0';
      return;

    }
    const delta = (performance.now() - this.lastCalledTime) / 1000;
    this.lastCalledTime = performance.now();

    if (this.truncatedTimer !== Math.trunc(this.lastCalledTime / 1000)) {
      this.truncatedTimer = Math.trunc(this.lastCalledTime / 1000);
      this.fps = `FPS: ${(1 / delta).toPrecision(2)}`;
    }
  }
}
