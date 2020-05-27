// @ts-ignore
import StateMachine from "../state-machine.ts";

const machine: any = new StateMachine({
  initial: "solid",
  states: {
    solid: [
      {
        action: "melt",
        to: "liquid",
        before: () => {
          console.log("I will melt");
        },
        after: () => {
          console.log("I Melted");
        },
      },
    ],
    liquid: [
      {
        action: "vaporize",
        to: "gas",
        after: () => {
          console.log("I Vaporized");
        },
      },
      {
        action: "freeze",
        to: "solid",
        after: () => {
          console.log("I Freeze");
        },
      },
    ],
    gas: [
      {
        action: "condense",
        to: "liquid",
        after: () => {
          console.log("I Condensed");
        },
      },
    ],
  },
});

const { log } = console;
machine.melt();
log(machine.actions());
machine.vaporize();
log(`Can condense ${machine.can("condense")}`);
machine.condense();
machine.freeze();
