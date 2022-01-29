import { TwistyAlgViewer, TwistyPlayer } from "cubing/twisty";
import { randomScrambleForEvent } from "cubing/scramble";

class App {
  // Example of getting an element from the page.
  twistyPlayer: TwistyPlayer = document.querySelector("#main-player");
  // Example of creating a new element and adding it to the page.
  twistyAlgViewer = document.body.appendChild(
    new TwistyAlgViewer({ twistyPlayer: this.twistyPlayer })
  );
  constructor() {
    this.updateScramble();
  }

  async updateScramble() {
    this.twistyPlayer.alg = await randomScrambleForEvent("333");
  }
}

// Make the app object available in the console for debugging.
// Try running: app.updateScramble()
globalThis.app = new App();
