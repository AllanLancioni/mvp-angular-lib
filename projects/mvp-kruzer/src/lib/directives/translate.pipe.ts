import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { KruzerService } from "../services/kruzer.service";

@Pipe({
	name: 'kzTranslate',
})
export class TranslatePipe implements PipeTransform {

	constructor(private kzService: KruzerService, private _sanitizer: DomSanitizer) { }

	transform(item: any, html: boolean = false): string | SafeHtml {
		const val = item?.value || item;
		return val && html ? this._sanitizer.bypassSecurityTrustHtml(val[this.kzService.lang]) : val[this.kzService.lang];
	}

}