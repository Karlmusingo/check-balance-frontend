// import { SxStyleProp } from "theme-ui";

// declare module "*.png";

// declare module "*.jpg";

// declare global {
//   namespace NodeJS {
//     interface Global {
//       document: Document;
//       window: Window;
//       navigator: Navigator;
//     }
//   }

//   type ActionType = { type: string; payload?: any };
//   type DispatchType = (action: Action) => void;
// }

import { SxStyleProp } from "theme-ui";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    sx?: SxStyleProp;
  }
}

declare module "*.png";

declare module "*.jpg";

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      /**
       * @param {string} str the text to translate
       * @param {number} index the index of the text to translate
       * @return {string} returns the translated text
       */
      translate: (str?: string, index?: number) => string;
    }
  }
  namespace React {
    interface ReactElement {
      sx: SxStyleProp;
    }
  }

  type ActionType = { type: string; payload?: any };
  type DispatchType = (action: Action) => void;
}
