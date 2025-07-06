import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class TerminalAnimationService {

  currentLineIndex = -1;
  lineContentChanged = new EventEmitter<string>();
  resetAnimationChanged = new EventEmitter<boolean>();

  showLinesSequentially(terminalLines: Array<string>): void {
    this.currentLineIndex++;
    this.lineContentChanged.emit(terminalLines[this.currentLineIndex]);
    setTimeout(() => {
      this.resetTerminalAnimation();
      if (this.currentLineIndex === terminalLines.length - 1) {
        this.currentLineIndex = -1;
      }
      this.showLinesSequentially(terminalLines);
    }, 3000);
  }

  private resetTerminalAnimation(): void {
    this.resetAnimationChanged.emit(false);
    setTimeout(() => this.resetAnimationChanged.emit(true), 50);
  }
}
