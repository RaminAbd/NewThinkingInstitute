import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({
  name: 'htmldecoder'
})
export class HtmldecoderPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value:any) {
    value = value.substring(13, value.length-1);
     var doc = new DOMParser().parseFromString(value, "text/html");
     const value123 = doc.documentElement.textContent;
    return this.sanitized.bypassSecurityTrustHtml(value123 as string);
  }

}
