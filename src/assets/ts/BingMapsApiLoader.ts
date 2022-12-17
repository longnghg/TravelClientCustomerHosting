import { Injectable } from "@angular/core";

@Injectable()
export class BingMapsAPILoader {

  private getNativeWindow(): any {
    return window;
  }
  private getNativeDocument(): any {
    return document;
  }

  public load(callbackName: string): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      const script = this.getNativeDocument().createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = 'https://www.bing.com/api/maps/mapcontrol?callback=bingAPIReady';
      this.getNativeWindow()[callbackName] = () => {
        resolve();
      };
      script.onerror = (error: Event) => {
        reject(error);
      };
      this.getNativeDocument().body.appendChild(script);
    });
  }
}
