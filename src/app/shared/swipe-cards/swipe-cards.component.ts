import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ILocation } from '../location/ILocation';
import { ISwipeCard } from './ISwipe-card';

@Component({
  selector: 'app-swipe-cards',
  templateUrl: './swipe-cards.component.html',
  styleUrls: ['./swipe-cards.component.scss']
})
export class SwipeCardsComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() cards: ILocation[];
  @Input()
  requestDistance: number;
  direction: boolean;
  @ViewChildren('swipeCards') swipeCards: QueryList<ElementRef>;
  swipeCardsArray: Array<ElementRef>;
  distanceText: string[] = [];
  distanceValue: number[] = [];

  filteredDistances: number[] = [];
  filteredDistanceTexts: string[] = [];
  filteredCards: ILocation[] = [];

  private moveOutWidth: number;
  private shiftRequired: boolean;
  private transitionInProgress: boolean;

  public like: boolean;
  public dislike: boolean;

  @Output() resetMade = new EventEmitter();
  @Output() selectMade = new EventEmitter<ILocation>();

  constructor(
    private renderer: Renderer2,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {}
  ngOnChanges() {
    this.filterCardsByDistance(this.requestDistance);
  }

  ngAfterViewInit(): void {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.swipeCardsArray = this.swipeCards.toArray();

    this.swipeCards.changes.subscribe(() => {
      this.swipeCardsArray = this.swipeCards.toArray();
    });
  }

  onGetDistanceText(text: string) {
    this.distanceText.unshift(text);
  }

  onGetDistanceValue(distance: number) {
    this.distanceValue.unshift(distance);
  }

  private async filterCardsByDistance(requestedDistance: number) {
    const loading = await this.loadingController.create();
    await loading.present();

    setTimeout(async () => {
      let indexes = [];
      this.filteredDistances = [];
      for (let i = 0; i < this.distanceValue.length; i++) {
        if (this.distanceValue[i] >= requestedDistance) {
          indexes.push(i);
        }
      }

      this.filteredDistances = this.distanceValue.filter((value, index) => {
        return indexes.indexOf(index) == -1;
      });

      this.filteredDistanceTexts = this.distanceText.filter((value, index) => {
        return indexes.indexOf(index) == -1;
      });

      this.filteredCards = this.cards.filter((value, index) => {
        return indexes.indexOf(index) == -1;
      });
    }, 500);
    setTimeout(async () => {
      await loading.dismiss();
    }, 1000);
  }
  panHandler(event): void {
    if (
      event.deltaX === 0 ||
      (event.center.x === 0 && event.center.y === 0) ||
      !this.filteredCards.length
    ) {
      return;
    }

    if (this.transitionInProgress) {
      this.shiftHandler();
    }

    this.renderer.addClass(this.swipeCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) {
      this.toggleChoiceHandler(false, true);
      this.direction = true;
    }
    if (event.deltaX < 0) {
      this.toggleChoiceHandler(true, false);
      this.direction = false;
    }

    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.swipeCardsArray[0].nativeElement,
      'transform',
      'translate(' +
        event.deltaX +
        'px, ' +
        event.deltaY +
        'px) rotate(' +
        rotate +
        'deg)'
    );

    this.shiftRequired = true;
  }

  panEndHandler(event): void {
    this.toggleChoiceHandler(false, false);

    if (!this.filteredCards.length) {
      return;
    }

    this.renderer.removeClass(this.swipeCardsArray[0].nativeElement, 'moving');

    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    if (keep) {
      this.renderer.setStyle(
        this.swipeCardsArray[0].nativeElement,
        'transform',
        ''
      );
      this.shiftRequired = false;
    } else {
      const endX = Math.max(
        Math.abs(event.velocityX) * this.moveOutWidth,
        this.moveOutWidth
      );
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event['velocityY']) * this.moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.swipeCardsArray[0].nativeElement,
        'transform',
        'translate(' +
          toX +
          'px, ' +
          (toY + event.deltaY) +
          'px) rotate(' +
          rotate +
          'deg)'
      );

      this.shiftRequired = true;
      if (this.direction) {
        this.selectMade.emit(this.filteredCards[0]);
      }

      this.filteredDistanceTexts.shift();
    }

    this.transitionInProgress = true;
  }

  shiftHandler(): void {
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.filteredCards.shift();
    }

    this.transitionInProgress = false;
    this.toggleChoiceHandler(false, false);
  }

  toggleChoiceHandler(dislike: boolean, like: boolean): void {
    this.dislike = dislike;
    this.like = like;
  }

  resetCard(): void {
    this.filterCardsByDistance(this.requestDistance);
  }
}
