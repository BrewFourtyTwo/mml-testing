import * as React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

import {
  INTERACTIVE_SLOT_COUNT_X,
  INTERACTIVE_SLOT_COUNT_Z,
  SLOT_DEPTH,
  SLOT_WIDTH,
  SPACE_BETWEEN_SLOTS,
} from "./constants";
import { Slot } from "./Slot";

const DEMO_SLOTS = [
  {
    x: 0,
    z: 0,
    documentUrl: `${(window as any).params.wsProtocol}:///examples/reid.html`,
    title: "Reid Demo",
  },
  {
    x: 0,
    z: 0,
    documentUrl: `${(window as any).params.wsProtocol}:///examples/linetest.html`,
    title: "Line Test",
  },
];

function App() {
  const slotCoordinates: Array<[number, number]> = [];
  for (let x = 0; x < INTERACTIVE_SLOT_COUNT_X; x++) {
    for (let z = 0; z < INTERACTIVE_SLOT_COUNT_Z; z++) {
      if (!(x === 0 && z === 0)) {
        slotCoordinates.push([x, z]);
      }
    }
  }
  return (
    <>
      <Slot
        key={"demo-0"}
        x={0}
        z={0}
        demo={{ url: DEMO_SLOTS[0].documentUrl, title: DEMO_SLOTS[0].title }}
      />
      <Slot
        key={"demo-1"}
        x={0}
        z={0}
        demo={{ url: DEMO_SLOTS[1].documentUrl, title: DEMO_SLOTS[1].title }}
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById("root")!;
const root = createRoot(container);
flushSync(() => {
  root.render(<App />);
});
