import { SSTConfig } from "sst";
import { ConfigStack } from "./stacks/Config";
import { use } from "sst/constructs";
import { ApiStack } from "./stacks/Api";
import { WebStack } from "./stacks/Web";


export default {
  config(_input) {
    return {
      name: "seimywallet",
      region: "us-east-1",
      profile: "seimywallet",
    };
  },
  stacks(app) {

    app.stack(ConfigStack);
    const { layers } = use(ConfigStack);

    app.setDefaultFunctionProps({
      runtime: "nodejs20.x",
      timeout: 6 * 60,
      environment: {
        AXIOM_TOKEN: 'xaat-ce8d0905-b546-4be5-9dac-f5e1d90a57f0',
        AXIOM_DATASET: 'seimywallet',
      },
      layers: [
        layers.AxiomLayer,
      ]
    });


    app.stack(ApiStack);
    app.stack(WebStack);

    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }

  }
} satisfies SSTConfig;
