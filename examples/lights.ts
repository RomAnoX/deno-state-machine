// @ts-ignore
import StateMachine from "https://raw.githubusercontent.com/RomAnoX/deno-state-machine/master/state-machine.ts";

// Green -> 120s -> Yellow -> 10s -> Red -> 60s -> Green ...

const machine = new StateMachine({
  initial: "off",
  states: {
    "off": [{
      action: "start",
      to: "green",
      after: (_, m) => {
        console.log(`The lights are ${m.state}`);
        setTimeout(() => m.warn(), 12000);
      },
    }],
    "green": [{
      action: "warn",
      to: "yellow",
      after: (_, m) => {
        console.log(`The lights are ${m.state}`);
        setTimeout(() => m.stop(), 3000);
      },
    }],
    "yellow": [{
      action: "stop",
      to: "red",
      after: (_, m) => {
        console.log(`The lights are ${m.state}`);
        setTimeout(() => m.go(), 6000);
      },
    }],
    "red": [{
      action: "go",
      to: "green",
      after: (_, m) => {
        console.log(`The lights are ${m.state}`);
        setTimeout(() => m.warn(), 12000);
      },
    }],
  },
});

machine.start();
