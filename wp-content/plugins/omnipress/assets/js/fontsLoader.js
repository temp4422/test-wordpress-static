
class CustomFontFace {
	constructor(url) {
		this.fontsList = this.fetchData(url);
		this.isAlreadyLoaded = false;
		this.isIframe = false;
		this.usedFontsList=[]
	}

	async fetchData(url) {
		const res = await fetch(url);
		const fonts = await res.json();
		this.fontsList = fonts;
	}

	listFontFamilies() {
		const fontFaces = [...document.fonts.values()];
		const families = fontFaces.map((font) => font.family);

		// converted to set then to array to remove duplicates
		return [...new Set(families)];
	}

	async loadGoogleFonts(name, style="normal", weight="400" ) {
		if (!name) return;
		this.usedFontsList.push({ name, style, weight });
		if (Object.keys(this.fontsList).length === 0) {
			this.fontsList = this.fetchData(window.location.origin + '/wp-json/omnipress/v1/fonts');
		}

		if (this.fontsList) {
			const url = `url(${
				this.fontsList[name]['files'][style || 'normal']?.[weight || '400'] ||
				this.fontsList[name]['files']['normal']?.['400']
			})`;

			const iframe = document.querySelector('iframe');

			if (iframe) {
				this.isIframe = true;
				this.isAlreadyLoaded = iframe.contentWindow.document.fonts.check(
					`10px ${name + weight}`
				);
			} else {
				this.isIframe = false;
				this.isAlreadyLoaded = document.fonts.check(`10px ${name + weight}`);
			}

			if ( !this.isAlreadyLoaded ) {
				if (this.isIframe) {
					const newFont = new FontFace(name, url);
					const document = iframe.contentWindow.document;
					document.fonts.add(newFont);
					await newFont.load();

				} else if (!this.isIframe) {
					const newFont = new FontFace(name + (weight || "400"), url);
					document.fonts.add(newFont);
					await newFont.load();

				}
			}
		}
	}
}
const customFonts = new CustomFontFace(
	window.location.origin + '/wp-json/omnipress/v1/fonts'
);
