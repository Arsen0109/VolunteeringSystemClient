import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.css']
})
export class CopyToClipboardComponent {
  @Input() textToCopy!: string;
  copySuccess: boolean = false;

  copyText() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.textToCopy;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    navigator.clipboard.writeText(this.textToCopy)
    document.body.removeChild(selBox);
    this.copySuccess = true;

    setTimeout(() => {
      this.copySuccess = false;
    }, 2000);
  }
}
