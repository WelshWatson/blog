import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit, AfterViewInit {
  globalListenFunc: Function;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  private hero = new Image();
  subscription: Subscription;
  heroX = 50;
  heroY = 50;
  width = window.innerWidth;
  height = window.innerHeight;

  constructor(private renderer: Renderer2) {
    this.hero.src = '../../../assets/images/Hero1.png';
  }


  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.animate();
  }

  ngOnInit() {
    this.listenForKeyboardInput();
  }

  /**
   * Draws something using the context we obtained earlier on
   */
  private animate() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillText(this.heroX.toString(), 20, 20);
      this.context.drawImage(this.hero, this.heroX, this.heroY);

      requestAnimationFrame(this.animate.bind(this));

  }

  private listenForKeyboardInput() {
    this.globalListenFunc = this.renderer.listen('document', 'keypress', e => {
      switch (e.key) {
        case 'a':
          this.heroX--;
          console.log(e.key + ' pressed');
          break;
        case 'd':
          this.heroX += 5;
          console.log(e.key + ' pressed');
          break;
        case 'w':
          this.heroY--;
          console.log(e.key + ' pressed');
          break;
        case 's':
          this.heroY++;
          console.log(e.key + ' pressed');
          break;
      }
    });
  }
}
