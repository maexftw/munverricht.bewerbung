import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b7e2d199f0f29b1656fdb8de286855837bacddf9', queries,  });
export default client;
